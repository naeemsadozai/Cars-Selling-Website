import { purchaseConfirmation } from "../Config/nodemailer.js";
import Car from "../Models/Car.js";
import User from "../Models/User.js";
import { decodeToken } from "../Utils/decodeToken.js";

export const createListing = async (req,res)=>{
    let {name,specs,type,category,mileage,brand,price,fuel,transmission} = req.body
    let image_name = req.file.originalname;
    let image_type = req.file.mimetype;
    let image_buffer = req.file.buffer;
    if(!name || !specs || !type || !category || !mileage || !brand || !price || !image_name || !image_type || !image_buffer || !fuel || !transmission){
        return res.status(200).json({message: "Please fill all fields"});
    }
    try {        
        let car = await Car.create({
            name,specs,type,category,mileage,brand,price,image_name,image_buffer,image_type,fuel_type: fuel,transmission_type: transmission
        })
        return res.status(201).json({message: "Created Successfully"})
    } catch (error) {
        return res.status(500).json({message: "Internal Server ERROR"})        
    }    
    
}


export const allCars = async (req,res)=>{
    let cookie = req.cookies[process.env.COOKIE_NAME]
    const { page } = req.query;
    let limit = 9;
    let skip = (page - 1) * limit;
    let isAdmin = false;
    if(cookie){
        let decoded = decodeToken(cookie);        
        if(decoded.role === 'admin'){
            isAdmin = true;
        }
    }
    try {
        let carsdata = await Car.find({}).sort({ createdAt: -1 }).skip(skip).limit(limit);
        let totalCars = await Car.countDocuments(); 
        let totalPages = Math.ceil(totalCars / 10);
        if(!carsdata || carsdata.length === 0){
            return res.status(404).json({message: "Cant Find Data"})
        }
        
        let newdata = carsdata.map((car)=>{
            return({id:car._id,name:car.name,specs:car.specs,type:car.type,category:car.category,fuel:car.fuel_type,transmission: car.transmission_type ,mileage: car.mileage,brand: car.brand,price: car.price,pic: `data:${car.image_type};base64,${car.image_buffer.toString('base64')}`})
        })
        return res.status(200).send({newdata,isAdmin,totalPages});
    } catch (error) {
        return res.status(500).send({message: "Server Error"});
    }
}

export const carBrands = async (req,res)=>{
    let cookie = req.cookies[process.env.COOKIE_NAME]
    let {brandname} = req.params;
    let {page} = req.query
    let limit = 9;
    let skip = (page - 1) * limit
    let isAdmin = false;
    if(cookie){
        let decoded = decodeToken(cookie);        
        if(decoded.role === 'admin'){
            isAdmin = true;
        }
    }
    try {
        let carsdata = await Car.find({brand: brandname}).sort({createdAt: -1}).skip(skip).limit(limit);
        let totalcars = await  Car.find({brand: brandname}).countDocuments();
        if(!carsdata){
            return res.status(404).json({message: "Cant Find Data"})
        }
        let totalpages = Math.ceil(totalcars / limit)
        let newdata = carsdata.map((car)=>{
            return({id:car._id,name:car.name,specs:car.specs,type:car.type,category:car.category,mileage: car.mileage,brand: car.brand,fuel:car.fuel_type,transmission: car.transmission_type,price: car.price,pic: `data:${car.image_type};base64,${car.image_buffer.toString('base64')}`})
        }) 
        return res.status(200).json({newdata,totalpages,isAdmin});
    } catch (error) {
        return res.status(500).send({message: "Server Error"});
    }
}


export const singleCar = async (req,res)=>{
    let {id} = req.params;

    let cookie = req.cookies[process.env.COOKIE_NAME];
    let isLoggedin = false;
    if(cookie){
        let decoded = decodeToken(cookie);
        if(decoded.role){
            isLoggedin = true;
        }
    }
    
    try {
        if(!id){
            return res.status(404).json({message: "Enter the Car id"})
        }
        let cardata = await Car.findById(id);
        if(!cardata){
            return res.status(404).json({message: "Can't find the car"})
        }
        let newdata = {isLoggedin,id: cardata._id,name:cardata.name,specs:cardata.specs,type:cardata.type,category:cardata.category,mileage: cardata.mileage,brand: cardata.brand,fuel:cardata.fuel_type,transmission: cardata.transmission_type,price: cardata.price,pic: `data:${cardata.image_type};base64,${cardata.image_buffer.toString('base64')}`}
        return res.status(200).send(newdata);
    } catch (error) {
        return res.status(500).json({message: "Internal server Error"});
    }
}


export const confirmationMail = async (req,res)=>{
    try {
        
        let {name,brand,price} = req.body;
        let cookie = req.cookies[process.env.COOKIE_NAME]
        
        if(!cookie){
            return res.status(403).json({message: "Unauthorized"});
        }
        let decoded = decodeToken(cookie)
        let user = await User.findOne({_id:decoded.id})
        if(!user){
            return res.status(404).json({message: "Can't find user please Sign-up"})
        }
        
        let sent = await purchaseConfirmation(user.name,user.email, name, brand, price);
        if (!sent) {
          return res.status(500).json({ message: "Failed to send confirmation email" });
        }

        return res.status(200).json({message: "Appointment Booked Successfully Please Check you Mail"})
    } catch (error) {
        return res.status(500).json({message: "Server Error Occured"})
    }
}

export const deleteCar = async (req,res)=>{
    let {id} = req.params    
    try {
        let car = await Car.findOne({_id:id})
        console.log(car);
        if(!car){
            return res.status(201).json({message: "Invalid id"})
        }
        let success = await Car.deleteOne({_id:id})        
        return res.status(200).json({message: "Record Deleted Successfully"})
    } catch (error) {
        return res.status(500).json({message: "Internal Server Error"})
    }
}

export const editListing = async (req,res)=>{
    let {id} = req.params
    let cardata = await Car.findOne({_id:id});
    if(!cardata){
        return res.status(404).json({message: "Car not found"})
    }
    let newcar = {
        id: cardata._id,name:cardata.name,specs:cardata.specs,type:cardata.type,category:cardata.category,mileage: cardata.mileage,brand: cardata.brand,fuel:cardata.fuel_type,transmission: cardata.transmission_type,price: cardata.price,pic: `data:${cardata.image_type};base64,${cardata.image_buffer.toString('base64')}`
    }    
    return res.status(200).json({newcar,message:"Car found"})  
}



export const updateCar = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    const car = await Car.findById(id);
    if (!car) {
      return res.status(404).json({ success: false, message: 'Car not found' });
    }
    const updatedCar = await Car.findByIdAndUpdate(id, updateData, {
      new: true, 
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      message: 'Car updated successfully',
      updatedCar,
    });
  } catch (error) {
    console.error('Error updating car:', error);
    res.status(500).json({
      success: false,
      message: 'Internal Server Error',
    });
  }
};


