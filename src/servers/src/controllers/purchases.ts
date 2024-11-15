import { Request, Response } from 'express';
import { Album } from '../models/album';
import { User } from '../models/user';
import { Purchase } from '../models/purchase'

class PurchaseController {
  static async PostPurchase(req: Request, res: Response) {
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
      const purchaseConstructor = new Purchase({ user: user._id, album: album._id });
      const result = await purchaseConstructor.save();
      const data = await Purchase.findById({ _id: result._id }).populate('album').populate('user').exec();
      return res.status(201).json({ data });
    } catch (error) {
      return res.status(500).json({ data: error });
    }
  }
}

export { PurchaseController }
