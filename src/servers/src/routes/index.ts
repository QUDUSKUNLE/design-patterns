import express from 'express';
import { AlbumController } from '../controllers/album';
import { PurchaseController } from '../controllers/purchases';

const router = express.Router();

router.post('/albums', AlbumController.PostAlbum)
router.get('/albums', AlbumController.GetAlbums)
router.get('/albums/:id', AlbumController.GetAlbum)
router.put('/albums/:id', AlbumController.PutAlbum)
router.delete('/albums/:id', AlbumController.DeleteAlbum)
router.post('/purchases', PurchaseController.PostPurchase)

export { router }
