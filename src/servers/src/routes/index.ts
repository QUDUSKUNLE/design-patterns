import express from 'express';
import { Album } from '../models/album';
import { User } from '../models/user';
import { Purchase } from '../models/purchase'

const router = express.Router();

router.post('/albums', async (req, res) => {
  try {
    const { performer, title, cost } = req.body;
    let albumConstructor = new Album({ title, performer, cost });
    const result = await albumConstructor.save();
    return res.status(201).json({ data: result });
  } catch (error) {
    return res.status(500).json({ data: error });
  }
})

router.get('/albums', async (req, res) => {
  try {
    const result = await Album.find({});
    return res.status(200).json({ data: result });
  } catch (error) {
    return res.status(500).json({ data: error });
  }
})

router.get('/albums/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Album.findById({ _id: id });
    return res.status(200).json({ data: result });
  } catch (error) {
    return res.status(500).json({ data: error });
  }
})

router.put('/albums/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { performer, title, cost } = req.body;
    const result = await Album.findOneAndUpdate({ _id: id }, { title, performer, cost}, { new: true });
    return res.status(200).json({ data: result });
  } catch (error) {
    return res.status(500).json({ data: error });
  }
})

router.delete('/albums/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await Album.findOneAndDelete({ _id: id });
    return res.status(204).json();
  } catch (error) {
    return res.status(500).json({ data: error });
  }
})

router.post('/purchases', async (req, res) => {
  try {
    const { album: { performer, title, cost }, user: { name } } = req.body;
    let [userConstructor, albumConstructor] = [
      new User({ name }),
      new Album({ title, performer, cost })
    ];
    const [user, album] = await Promise.all([
      userConstructor.save(),
      albumConstructor.save()
    ]);
    const purchaseConstructor = new Purchase({ user: user._id, album: album._id })
    const result = await purchaseConstructor.save();
    const data = await Purchase.findById({ _id: result._id }).populate('album').populate('user').exec()
    return res.status(201).json({ data });
  } catch (error) {
    return res.status(500).json({ data: error });
  }
})

export { router }
