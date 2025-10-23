import React, { useState } from 'react'
import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'
import {LazyLoadImage} from 'react-lazy-load-image-component'
import 'react-lazy-load-image-component/src/effects/blur.css'

const AllBrands = () => {
  let {name} = useParams();
    let [loader,setLoader] = useState(false);
    const [page,setpage] = useState(1)
    const [totalpage,settotalpage] = useState(0);
    let [isAdmin, setisAdmin] = useState(false);    
    let [data,setData] = useState([]);
    const handleCount = ()=>{
      let count = showCount + 6
      if(count > data.length){
        setShowCount(data.length);
        setShowBtn(false);
      }else{
        setShowCount(count);
      }
    }


    const dataFetching = async (name)=>{
      try {
        setLoader(true);
        window.scrollTo(0,0);
        let cars = await axios.get(`https://cars-selling-website-backend.onrender.com/cars/brand/${name}?page=${page}`,{withCredentials:true});
        console.log(cars.data);
        setData(cars.data.newdata)      
        settotalpage(cars.data.totalpages)
        setisAdmin(cars.data.isAdmin);
        setLoader(false);
        }catch (error) {
        if(error.response){
          alert(error.response.data.message)
        }else{
          alert(error)
        }
      }
    }

    useEffect(()=>{
      dataFetching(name);
    },[page])

    
  return (
    <main className='w-full'>
      {(loader) && <div className='w-full h-[80vh] flex flex-col items-center justify-center'>
          <h1>Loading data please wait</h1>
          <div className='w-20 h-20 border-t-1 mt-8 rounded-full rotate_transition'></div>
        </div>}

      {(!loader) &&  
        <div className='w-10/12 mx-auto mt-2'>
            <h1 className='text-3xl font-bold text-sky-700 text-shadow-xs text-shadow-amber-700'>{name.toUpperCase()} Zone</h1>
           <div className="cards flex flex-wrap justify-center gap-3 lg:gap-12 sm:6 my-8">
            {data.reverse().map((car, index) => (
              <div
                key={index}
                className="relative card bg-white shadow-xl h-auto sm:h-[35rem] max-sm:w-full w-2/5 lg:w-80 flex flex-col gap-2 rounded-2xl overflow-hidden hover:scale-105 transition-all duration-100 ease-in"
              >
                <LazyLoadImage
                  src={car.pic}
                  effect='blur'
                  alt="car-image"
                  className="h-40 sm:h-44 w-full object-cover rounded-t-2xl"
                />
                <div className="details w-11/12 border-b pb-1 mx-auto">
                  <h1 className="text-lg sm:text-xl font-semibold">
                    {car.name.toUpperCase()}
                  </h1>
                  <h1 className="line-clamp-1 text-sm sm:text-md text-slate-800">
                    {car.specs}
                  </h1>
                </div>

                <div className="enginesdetails flex justify-between w-11/12 border-b mx-auto py-3 items-center text-slate-800 text-xs sm:text-sm">
                  <div className="flex flex-col items-center">
                    <i className="text-lg sm:text-xl fa-solid fa-gas-pump"></i>
                    <p>{car.mileage} MPG</p>
                  </div>
                  <div className="flex flex-col items-center">
                    <i className="text-lg sm:text-xl fa-solid fa-gauge-high"></i>
                    <p>{car.type.toUpperCase()}</p>
                  </div>
                  <div className="flex flex-col items-center">
                    <i className="text-lg sm:text-xl fa-solid fa-gauge"></i>
                    <p>{car.category.toUpperCase()}</p>
                  </div>
                </div>

                <div className='w-11/12 mx-auto flex flex-col justify-between border-b py-3 pb-4 gap-2'>
                    <h1 className='w-full font-semibold text-md px-2  shadow shadow-slate-300 py-1 rounded-sm bg-slate-100 text-black'><span className='font-bold mr-4'>Brand:</span> {car.brand.toUpperCase()}</h1>
                    <h1 className='w-full font-semibold text-md px-2  shadow shadow-slate-300 py-1 rounded-sm bg-slate-100 text-black'><span className='font-bold mr-4'>Fuel Type:</span> {car.fuel.toUpperCase()}</h1>
                    <h1 className='w-full font-semibold text-md px-2  shadow shadow-slate-300 py-1 rounded-sm bg-slate-100 text-black'><span className='font-bold mr-4'>Transmission:</span>{car.transmission.toUpperCase()}</h1>
                </div>

                {isAdmin && (
                                  <div className="w-11/12 mx-auto flex justify-end items-center">
                                    <div className="buttons flex gap-2">
                                      <Link to={`/admin/edit/${car.id}`} className="bg-slate-100 text-slate-800 border border-slate-300 px-2 py-0.5 rounded-md update">
                                        Edit <i className="fa-solid fa-gear"></i>
                                      </Link>
                                      <button
                                        onClick={() => {
                                          handleDelete(car.id);
                                        }}
                                        className="bg-slate-100 text-slate-800 border border-slate-300 px-2 py-0.5 cursor-pointer deleted rounded-md">
                                        Delete <i className="fa-solid fa-trash"></i>
                                      </button>
                                    </div>
                                  </div>
                                )}

                <div className="price flex justify-between items-center w-11/12 mx-auto my-2">
                  <h1 className="text-lg sm:text-xl font-bold">
                    ${new Intl.NumberFormat('en-US').format(car.price)}
                  </h1>
                  <a
                    href={`/cars/${car.id}`}
                    className="text-blue-600 text-xs sm:text-sm"
                  >
                    View Details{" "}
                    <i className="fa-solid fa-arrow-up-right-from-square"></i>
                  </a>
                </div>
              </div>
            ))}
          </div>
          <div className='flex items-center justify-center gap-2'>
          {(page > 1) &&
          <div className='w-full flex items-center justify-center'>
            <button onClick={()=>setpage(page - 1)} className='border px-2 py-1 bg-blue-600 text-white rounded-md cursor-pointer'>Previous page</button>
          </div>
          }
          {(page < totalpage) &&
          <div className='w-full flex items-center justify-center'>
            <button onClick={()=>setpage(page + 1)} className='border px-2 py-1 bg-blue-600 text-white rounded-md cursor-pointer'>Next Page</button>
          </div>
          }
          </div>
        </div>
        }

    </main>
  )
}

export default AllBrands

