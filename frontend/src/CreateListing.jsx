import axios from 'axios'
import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom'

const CreateListing = () => {
    let navigate = useNavigate();
    let [data,setData] = useState({
        car_category: 'economy',
        car_type: 'sedan',
        car_fuel: 'petrol',
        car_transmission: 'automatic',
        car_brand: 'toyota'
    })

    const carBrands = ["toyota","honda","nissan","mazda","mitsubishi","suzuki","subaru","lexus","acura","infiniti","hyundai","kia","genesis","bmw","mercedes-benz","audi","volkswagen","porsche","mini","volvo","land rover","jaguar","ford","chevrolet","dodge","jeep","gmc","buick","cadillac","tesla","chrysler","fiat","peugeot","renault","citroën","alfa romeo","ferrari","lamborghini","maserati","bentley","rolls-royce","aston martin","bugatti","mclaren","tata motors","mahindra","byd","geely","changan","great wall","rivian","lucid motors"]
    const carTypes = ["sedan","hatchback","suv","crossover","coupe","convertible","pickup","wagon","van","minivan","sports car","luxury car","supercar","electric car","hybrid car","off-road","compact","midsize","full-size"]
    const carCategories = ["economy","family","luxury","sports","performance","off-road","electric","hybrid","commercial","suv","compact","midsize","premium","executive","utility","convertible","truck","van","crossover"]
    const fuelType = ["petrol","diesel","electric","hybrid","plug-in hybrid","cng","lpg","hydrogen"]
    const carTransmition = ["automatic","manual","semi-automatic","cvt","dual clutch"]

    const handleChange = (e)=>{
        let {name,value,files} = e.target;
        if(name == 'car_pic'){
            setData({...data,[name]:files[0]})
        }else{
            setData({...data,[name]:value})
        }
    }

    const handleSubmit = async (e)=> {
        e.preventDefault();
        const formdata = new FormData();
        formdata.append('name',data.car_name);
        formdata.append('specs',data.car_specs);
        formdata.append('mileage',data.mileage);
        formdata.append('category',data.car_category);
        formdata.append('type',data.car_type);
        formdata.append('fuel',data.car_fuel);
        formdata.append('transmission',data.car_transmission);
        formdata.append('brand',data.car_brand);
        formdata.append('price',data.car_price);
        formdata.append('car_pic',data.car_pic);
        try {
            let response = await axios.post('https://cars-selling-website-backend.onrender.com/cars/create',formdata,{withCredentials:true})
            if(response.status === 200){
                alert(response.data.message)
                navigate('/admin/createlisting')

            }else{
                alert(response.data.message)
                navigate('/')
            }
        } catch (error) {
            if(error.response){
                alert(error.response.data.message)
            }else{
                alert("Server Error")
            }            
        }       
        
    }
  return (
    <main className='w-full bg-[url(/Images/create-bg.jpg)] text-white'>
        <div className='w-full md:w-10/12 mx-auto px-4 md:px-0'>
          <h1 className='text-center text-3xl font-bold text-sky-600 text-shadow-amber-600 text-shadow-2xs'>Create new Listing</h1>
          <h1 className='text-center text-2xl font-semibold mt-2 mb-4'>Enter the Following Details</h1>
          <form onSubmit={handleSubmit} encType="multipart/form-data" className='w-full md:w-2/3 mx-auto flex flex-col items-center mb-6 gap-6 pb-6'>
            <div className='w-full md:w-3/5 flex flex-col'>
                <h1 className='text-xl font-semibold'>Upload Car Image:</h1>
                <input accept='.jpg,.jpeg,.png' name='car_pic' type="file" className="mt-2 rounded-lg cursor-pointer file:cursor-pointer w-full file:mr-4 file:py-2 file:px-4 border file:rounded-md file:border file:border-white file:text-white file:bg-transparent file:text-sm file:font-medium transition-colors duration-200" required  onChange={handleChange} />           
                <p className='text-sm text-white ml-2'>only .jpeg/ .png/ .jpg are allowed</p>
            </div>

            <div className='w-full md:w-3/5 flex flex-col'>
                <h1 className='text-xl font-semibold'>Enter Car Name:</h1>
                <input type="text" name="car_name" className='w-full broder outline h-12 rounded-lg mt-2 pl-2 text-lg outline-white ' placeholder='Car Name'  required onChange={handleChange} />
            </div>

            <div className='w-full md:w-3/5 flex flex-col'>
                <h1 className='text-xl font-semibold'>Enter Car Specifications:</h1>
                <textarea type="text" name="car_specs" className='w-full broder outline h-30 rounded-lg mt-2 pl-2 pt-1 text-lg outline-white' required onChange={handleChange} />
            </div>

            <div className='w-full md:w-3/5 flex flex-col gap-1'>
                <h1 className='text-xl font-semibold'>Enter Car Specifications:</h1>
                <div className='flex flex-col sm:flex-row justify-between items-center w-full mt-1 gap-2 sm:gap-0 sm:mb-8'>                    
                    <div className='w-full sm:w-5/12 h-8'>
                        <h1 className='font-semibold text-xl mb-2'>Category:</h1>
                        <select value={data.car_category} name="car_category" id="" className='rounded-md border w-full h-10 outline-none bg-slate-800' required  onChange={handleChange}>
                            {carCategories.map((cate,index)=>{
                                return <option key={index} value={cate}>{cate.toUpperCase()}</option>
                            })}
                        </select>
                    </div>
                    <div className='w-full sm:w-5/12 h-8'>
                        <h1 className='font-semibold text-xl mb-2'>Car Type:</h1>
                        <select value={data.car_type} name="car_type" id="" className='rounded-md border h-10 w-full outline-none bg-slate-800' required  onChange={handleChange}>
                            {carTypes.map((type,index)=>{
                                return <option key={index} value={type}>{type.toUpperCase()}</option>
                            })}
                        </select>
                    </div>
                    
                </div>

                <div className='flex flex-col sm:flex-row justify-between items-center w-full mt-1 gap-2 sm:gap-0 sm:mb-8 sm:mt-6'>
                                        
                    <div className='w-full sm:w-5/12 h-8'>
                        <h1 className='font-semibold text-xl mb-2'>Fuel Type:</h1>
                        <select value={data.car_fuel} name="car_fuel" id="" className='rounded-md border w-full h-10 outline-none bg-slate-800' required  onChange={handleChange}>
                            {fuelType.map((fuel,index)=>{
                                return <option key={index} value={fuel}>{fuel.toUpperCase()}</option>
                            })}
                        </select>
                    </div>
                    <div className='w-full sm:w-5/12 h-8'>
                        <h1 className='font-semibold text-xl mb-2'>Transmition:</h1>
                        <select value={data.car_transmission} name="car_transmission" id="" className='rounded-md border h-10 w-full outline-none bg-slate-800' required  onChange={handleChange}>
                             {carTransmition.map((tran,index)=>{
                                return <option key={index} value={tran}>{tran.toUpperCase()}</option>
                            })}
                        </select>
                    </div>
                    
                </div>

            </div>

            <div className='w-full md:w-3/5 flex flex-col'>
                <h1 className='text-xl font-semibold mb-1'>Enter Car's Brand:</h1>
                <select value={data.car_brand} name="car_brand" id="" className='rounded-md border w-full sm:w-full h-10 outline-none bg-slate-800' required  onChange={handleChange}>
                        {carBrands.map((brand,index)=>{
                            return <option key={index} value={brand}>{brand.toUpperCase()}</option>
                        })}
                    </select>
            </div>


            <div className='w-full md:w-3/5 flex flex-col'>
                <h1 className='text-xl font-semibold mb-1'>Enter Car Mileage (MPG):</h1>
                <input onKeyDown={(e) => {if (!/[0-9]|Backspace|Delete|ArrowLeft|ArrowRight|Tab/.test(e.key)) {e.preventDefault();}}} min={0} step={0.1} pattern='[0-9]*' className='rounded-md pl-2 border w-full h-10 outline-none' type="number"  name="mileage" id="" placeholder='Enter Mileage in MPG' required onChange={handleChange}/>
            </div>

            <div className='w-full md:w-3/5 flex flex-col'>
                <h1 className='text-xl font-semibold mb-1'>Enter Car Price ($):</h1>
                <input onKeyDown={(e) => {if (!/[0-9]|Backspace|Delete|ArrowLeft|ArrowRight|Tab/.test(e.key)) {e.preventDefault();}}} min={0} step={0.1} pattern='[0-9]*' className='rounded-md pl-2 border w-full h-10 outline-none' type="number"  name="car_price" id="" placeholder='Enter Price in Dollars' required onChange={handleChange}/>
            </div>

            <div className='w-full md:w-3/5 flex justify-end'>
                <button type='submit' className='font-semibold text-lg border px-8 mt-4 rounded-md py-1 bg-slate-950 text-white hover:cursor-pointer'>Create</button>
            </div>

          </form>
        </div>
    </main>
  )
}


export default CreateListing
