import mongoose from 'mongoose';

const carSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    specs: {
        type: String,
        required: true,
        trim: true
    },
    image_buffer: {
        type: Buffer,
        required: true
    },
    image_name: {
        type: String,
        required: true
    },
    image_type: {
        type: String,
        required: true
    },
    mileage: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true,
        enum: ["economy","family","luxury","sports","performance","off-road","electric","hybrid","commercial","suv","compact","midsize","premium","executive","utility","convertible","truck","van","crossover"]

    },
    type: {
        type: String,
        required: true,
        enum: ["sedan","hatchback","suv","crossover","coupe","convertible","pickup","wagon","van","minivan","sports car","luxury car","supercar","electric car","hybrid car","off-road","compact","midsize","full-size"]
    },
    fuel_type: {
        type: String,
        required: true,
        enum: ["petrol","diesel","electric","hybrid","plug-in hybrid","cng","lpg","hydrogen"]

    },
    transmission_type: {
        type: String,
        required: true,
        enum: ["automatic","manual","semi-automatic","cvt","dual clutch"]

    },
    price: {
        type: Number,
        required: true
    },
    brand: {
        type: String,
        required: true,
        enum: ["toyota","honda","nissan","mazda","mitsubishi","suzuki","subaru","lexus","acura","infiniti","hyundai","kia","genesis","bmw","mercedes-benz","audi","volkswagen","porsche","mini","volvo","land rover","jaguar","ford","chevrolet","dodge","jeep","gmc","buick","cadillac","tesla","chrysler","fiat","peugeot","renault","citroën","alfa romeo","ferrari","lamborghini","maserati","bentley","rolls-royce","aston martin","bugatti","mclaren","tata motors","mahindra","byd","geely","changan","great wall","rivian","lucid motors"]
    }
},{timestamps:true});

const Car = mongoose.model('cars',carSchema);
export default Car;