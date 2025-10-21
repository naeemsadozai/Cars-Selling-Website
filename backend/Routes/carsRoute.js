import express from 'express'
import { allCars, carBrands, confirmationMail, createListing, deleteCar, editListing, singleCar, updateCar } from '../Controllers/carController.js';
const router = express.Router();
import upload from "../Config/multer.js";
import { isAdmin } from '../Middlewares/isAdmin.js';


router.get('/all',allCars)

router.get('/brand/:brandname',carBrands)

router.get('/:id',singleCar)

router.post('/create',isAdmin,upload.single('car_pic'),createListing)

router.delete('/delete/:id',isAdmin,deleteCar)
router.get('/edit/:id',isAdmin,editListing)

router.put('/update/:id', upload.single('car_pic'), updateCar);


router.post('/purchase/confirmation',confirmationMail)
export default router