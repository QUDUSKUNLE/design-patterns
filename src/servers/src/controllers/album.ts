import { Request, Response } from 'express';
import { Album } from '../models/album';

class AlbumController {
  static async PostAlbum(req: Request, res: Response) {
    try {
      const { performer, title, cost } = req.body;
      let albumConstructor = new Album({ title, performer, cost });
      const result = await albumConstructor.save();
      return res.status(201).json({ data: result });
    } catch (error) {
      return res.status(500).json({ data: error });
    }
  }
  static async GetAlbums(req: Request, res: Response) {
    try {
      const result = await Album.find({});
      return res.status(200).json({ data: result });
    } catch (error) {
      return res.status(500).json({ data: error });
    }
  }
  static async GetAlbum(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const result = await Album.findById({ _id: id });
      return res.status(200).json({ data: result });
    } catch (error) {
      return res.status(500).json({ data: error });
    }
  }
  static async PutAlbum(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { performer, title, cost } = req.body;
      const result = await Album.findOneAndUpdate({ _id: id }, { title, performer, cost}, { new: true });
      return res.status(200).json({ data: result });
    } catch (error) {
      return res.status(500).json({ data: error });
    }
  }
  static async DeleteAlbum(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await Album.findOneAndDelete({ _id: id });
      return res.status(204).json();
    } catch (error) {
      return res.status(500).json({ data: error });
    }
  }
}

export { AlbumController }
