import axios from 'axios';
import React, { useState ,useEffect} from 'react';
import { useParams, Link, useNavigate} from 'react-router-dom';
import {LazyLoadImage} from 'react-lazy-load-image-component'
import 'react-lazy-load-image-component/src/effects/blur.css'

// Utility to capitalize strings, e.g., 'bmw' -> 'Bmw' or 'luxury car' -> 'Luxury car'
const capitalize = (s) => s && s.charAt(0).toUpperCase() + s.slice(1);


const SingleCar = () => {
    let { id } = useParams();
    let navigate = useNavigate()
    let [carData,setCarData] = useState({});
    let [purchase,setPurchase] = useState(false);
    const [loader, setLoader] = useState(false);

    const handleConfirmation = async ()=>{
        try {
            setPurchase(true)
            window.scrollTo(0,0)
            let response = await axios.post("https://cars-selling-website-backend.onrender.com/cars/purchase/confirmation",{name: carData.name,brand:carData.brand,price:carData.price},{withCredentials:true})
            alert(response.data.message)
            if(response){
                setPurchase(false)
            }
            navigate('/')
        } catch (error) {
            if(error.response){
                setPurchase(false)
                alert(error.response.data.message)
                window.location.reload()
            }else{
                setPurchase(false)
                alert(error)
                window.location.reload()
            }
        }
    }

    const fetchData = async(id)=>{
        setLoader(true);
        window.scrollTo(0, 0);
      let singleCar = await axios.get(`https://cars-selling-website-backend.onrender.com/cars/${id}`,{withCredentials:true});
      setCarData(singleCar.data);
        setLoader(false);
    }
useEffect(()=>{
  fetchData(id)
},[])
    return (
        {(!loader) && <div>
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
            {(purchase) && <div className='w-full h-[80vh]'>
               <div className='w-full h-full flex flex-col justify-center items-center'>
                <h1>Please wait your request is being Processed</h1>
                <div className='w-20 h-20 border-t-1 mt-8 rounded-full rotate_transition'></div>
                </div> 
            </div>}

            {(!purchase)&&
            <div className="max-w-7xl mx-auto">
                
                {/* Header and Breadcrumbs */}
                <div className="mb-12 text-center">

                    
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold  mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                        {carData.name}
                    </h1>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed capitalize">
                        {capitalize(carData.brand)} • {capitalize(carData.type)} • {capitalize(carData.category)}
                    </p>
                </div>
                
                {/* Main Hero Section: Image and Purchase Details */}
                <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100 mb-12">
                    <div className="flex flex-col xl:flex-row">
                        
                        {/* Car Image and Quick Stats (Left) */}
                        <div className="xl:w-1/2 p-8 lg:p-12">
                            <div className="bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 rounded-3xl border-2 border-white shadow-inner p-8 lg:p-12 flex items-center justify-center relative overflow-hidden h-[450px]">
                                <LazyLoadImage 
                                    src={carData.pic} 
                                    alt={carData.name}
                                    effect='blur'
                                    className="w-full h-full object-contain transform hover:scale-105 transition-transform duration-500 z-10"
                                />
                                <div className="absolute top-6 right-6 bg-gradient-to-r from-green-500 to-green-400 text-white px-4 py-2 rounded-full text-lg font-bold shadow-xl">
                                    ${new Intl.NumberFormat('en-US').format(carData.price)}
                                </div>
                            </div>
                            
                            {/* Quick Stats Grid */}
                            <div className="grid grid-cols-2 gap-4 mt-8 lg:grid-cols-4">
                                {[
                                    { label: "Mileage", value: `${carData.mileage} MPG`, icon: "🛣️" },
                                    { label: "Transmission", value: capitalize(carData.transmission), icon: "⚡" },
                                    { label: "Fuel Type", value: capitalize(carData.fuel), icon: "⛽" },
                                    { label: "Body Type", value: capitalize(carData.type), icon: "🚗" },
                                ].map((stat, index) => (
                                    <div key={index} className="text-center p-4 bg-blue-50 rounded-2xl border border-blue-100 flex flex-col justify-center min-h-[110px]">
                                        <div className="text-lg font-bold text-blue-600 flex items-center justify-center gap-x-1.5">
                                            <span>{stat.icon}</span>
                                            {/* break-words handles long values like 'eight-speed-steptronic-automatic' */}
                                            <span className="break-words text-sm sm:text-base">{stat.value}</span>
                                        </div>
                                        <div className="text-sm text-gray-600 mt-1">{stat.label}</div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Car Details and Actions (Right) */}
                        <div className="xl:w-1/2 p-8 lg:p-12 bg-gradient-to-br from-gray-50 to-white">
                            
                            <div className="mb-8 text-center lg:text-left">
                                <p className="text-lg text-gray-600 mb-1">Starting MSRP</p>
                                <div className="text-4xl lg:text-5xl font-extrabold text-blue-600 mb-4">
                                    ${new Intl.NumberFormat('en-US').format(carData.price)}
                                </div>
                                <div className="inline-block bg-purple-100 text-purple-800 px-4 py-2 rounded-full text-sm font-semibold capitalize">
                                    {capitalize(carData.category)} Vehicle
                                </div>
                            </div>

                            <div className="mb-8">
                                <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                                    <span className="w-3 h-3 bg-blue-500 rounded-full mr-3"></span>
                                    Core Specifications
                                </h3>
                                
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                    {[
                                        { icon: "🏭", label: "Brand", value: capitalize(carData.brand) },
                                        { icon: "🏷️", label: "Category", value: capitalize(carData.category) },
                                        { icon: "🏎️", label: "Type", value: capitalize(carData.type) },
                                        { icon: "⛽", label: "Fuel Type", value: capitalize(carData.fuel) },
                                        { icon: "⚙️", label: "Transmission", value: capitalize(carData.transmission) },
                                        { icon: "📊", label: "Mileage", value: `${carData.mileage} MPG` }
                                    ].map((spec, index) => (
                                        <div key={index} className="flex items-start p-4 bg-white rounded-2xl border border-gray-100 shadow-sm">
                                            <span className="text-2xl mr-4 flex-shrink-0">{spec.icon}</span>
                                            <div>
                                                <div className="font-semibold text-gray-700">{spec.label}</div>
                                                <div className="text-gray-600 break-words text-sm">{spec.value}</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            {(carData.isLoggedin) &&        
                            <div className="space-y-4 pt-4 border-t border-gray-100">
                                <button onClick={handleConfirmation} className="cursor-pointer w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold py-4 px-8 rounded-2xl transition-all duration-300 transform hover:scale-[1.01] shadow-xl flex items-center justify-center text-lg">
                                    <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                                    Confirm Purchase (${new Intl.NumberFormat('en-US').format(carData.price)})
                                </button>
                            </div>
                            }

                            {(!carData.isLoggedin) &&        
                            <div className="space-y-4 pt-4 border-t border-gray-100">
                                <Link to={'/auth/login'} className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold py-4 px-8 rounded-2xl transition-all duration-300 transform hover:scale-[1.01] shadow-xl flex items-center justify-center text-lg">
                                    <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                                    Please Login to Purchase the Car
                                </Link>
                            </div>
                            }

                        </div>
                    </div>
                </div>

                {/* Detailed Description Section */}
                <div className="bg-white rounded-3xl shadow-2xl p-8 lg:p-12 border border-gray-100">
                    <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center border-b pb-4">Vehicle Overview: The {carData.name} Experience</h2>
                    <div className="text-gray-700 leading-relaxed">
                        <p className="text-xl font-medium mb-4">Manufacturer's Note:</p>
                        <p className="text-lg italic bg-gray-50 p-4 rounded-xl border-l-4 border-blue-400">"{carData.specs}"</p>
                        <p className="mt-6 text-base">This high-end model, a symbol of German engineering, combines cutting-edge performance with an interior designed for ultimate comfort and connectivity. The automatic transmission and petrol fuel type offer a smooth, powerful, and efficient driving experience.</p>
                    </div>
                </div>

                {/* Call to Action */}
                <div className="text-center mt-12">
                    <Link 
                        to={`/cars/brand/${carData.brand}`}
                        className="inline-flex items-center bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold py-4 px-8 rounded-2xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-xl text-lg capitalize"
                    >
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                        Explore More {capitalize(carData.brand)} Models
                    </Link>
                </div>
            </div>
            }

        </div>
        </div>
        }
    )
}


export default SingleCar;


