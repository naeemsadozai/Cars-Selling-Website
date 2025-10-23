import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'

const Edit = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [data, setData] = useState({})

  const carBrands = ["toyota", "honda", "nissan", "mazda", "mitsubishi", "suzuki", "subaru", "lexus", "acura", "infiniti", "hyundai", "kia", "genesis", "bmw", "mercedes-benz", "audi", "volkswagen", "porsche", "mini", "volvo", "land rover", "jaguar", "ford", "chevrolet", "dodge", "jeep", "gmc", "buick", "cadillac", "tesla", "chrysler", "fiat", "peugeot", "renault", "citroën", "alfa romeo", "ferrari", "lamborghini", "maserati", "bentley", "rolls-royce", "aston martin", "bugatti", "mclaren", "tata motors", "mahindra", "byd", "geely", "changan", "great wall", "rivian", "lucid motors"]
  const carTypes = ["sedan", "hatchback", "suv", "crossover", "coupe", "convertible", "pickup", "wagon", "van", "minivan", "sports car", "luxury car", "supercar", "electric car", "hybrid car", "off-road", "compact", "midsize", "full-size"]
  const carCategories = ["economy", "family", "luxury", "sports", "performance", "off-road", "electric", "hybrid", "commercial", "suv", "compact", "midsize", "premium", "executive", "utility", "convertible", "truck", "van", "crossover"]
  const fuelType = ["petrol", "diesel", "electric", "hybrid", "plug-in hybrid", "cng", "lpg", "hydrogen"]
  const carTransmition = ["automatic", "manual", "semi-automatic", "cvt", "dual clutch"]

  const handleChange = (e) => {
    const { name, value, files } = e.target
    if (name === 'car_pic') {
      setData({ ...data, pic: files[0] })
    } else {
      setData({ ...data, [name]: value })
    }
  }

  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/cars/edit/${id}`, { withCredentials: true })
      setData(response.data.newcar)
    } catch (error) {
      if (error.response) alert(error.response.data.message)
      else alert(error.message)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const formData = new FormData()
    formData.append('name', data.name)
    formData.append('specs', data.specs)
    formData.append('mileage', data.mileage)
    formData.append('category', data.category)
    formData.append('type', data.type)
    formData.append('fuel', data.fuel)
    formData.append('transmission', data.transmission)
    formData.append('brand', data.brand)
    formData.append('price', data.price)
    if (data.pic instanceof File) {
      formData.append('pic', data.pic)
    }

    try {
      const response = await axios.put(`http://localhost:8080/cars/update/${id}`, formData, {
        withCredentials: true,
        headers: { 'Content-Type': 'multipart/form-data' }
      })

      if (response.status === 200) {
        alert('Car updated successfully!')
        navigate('/admin/createlisting')
      } else {
        alert('Update failed!')
      }
    } catch (error) {
      if (error.response) alert(error.response.data.message)
      else alert('Server Error')
    }
  }

  useEffect(() => {
    fetchData()
  }, [id])

  return (
    <main className='w-full bg-[url(/Images/create-bg.jpg)] text-white'>
      <div className='w-full md:w-10/12 mx-auto px-4 md:px-0'>
        <h1 className='text-center text-3xl font-bold text-sky-600 text-shadow-amber-600 text-shadow-2xs'>Update Listing</h1>
        <h1 className='text-center text-2xl font-semibold mt-2 mb-4'>Edit Car Details</h1>

        <form onSubmit={handleSubmit} encType='multipart/form-data' className='w-full md:w-2/3 mx-auto flex flex-col items-center mb-6 gap-6 pb-6'>

          <div className='w-full md:w-3/5 flex flex-col'>
            <h1 className='text-xl font-semibold'>Upload Car Image:</h1>
            {data.pic && typeof data.pic === 'string' && (
              <img width={120} height={120} src={data.pic} alt='Car' className='my-2 rounded-md border' />
            )}
            <input accept='.jpg,.jpeg,.png' name='car_pic' type='file'
              className='mt-2 rounded-lg cursor-pointer w-full border file:mr-4 file:py-2 file:px-4 file:rounded-md file:border file:border-white file:text-white file:bg-transparent file:text-sm file:font-medium transition-colors duration-200'
              onChange={handleChange}
            />
            <p className='text-sm text-white ml-2'>Only .jpeg, .png, .jpg allowed</p>
          </div>

          <div className='w-full md:w-3/5 flex flex-col'>
            <h1 className='text-xl font-semibold'>Car Name:</h1>
            <input value={data.name || ''} type='text' name='name' className='w-full border outline h-12 rounded-lg mt-2 pl-2 text-lg outline-white' placeholder='Car Name' required onChange={handleChange} />
          </div>

          <div className='w-full md:w-3/5 flex flex-col'>
            <h1 className='text-xl font-semibold'>Car Specifications:</h1>
            <textarea value={data.specs || ''} name='specs' className='w-full border outline h-30 rounded-lg mt-2 pl-2 pt-1 text-lg outline-white' required onChange={handleChange} />
          </div>

          {/* CATEGORY & TYPE */}
          <div className='w-full md:w-3/5 flex flex-col gap-6'>
            <div className='flex flex-col sm:flex-row justify-between gap-4'>
              <div className='w-full sm:w-1/2'>
                <h1 className='font-semibold text-xl mb-2'>Category:</h1>
                <select value={data.category || ''} name='category' className='rounded-md border w-full h-10 outline-none bg-slate-800' required onChange={handleChange}>
                  {carCategories.map((cate, index) => (
                    <option key={index} value={cate}>{cate.toUpperCase()}</option>
                  ))}
                </select>
              </div>
              <div className='w-full sm:w-1/2'>
                <h1 className='font-semibold text-xl mb-2'>Car Type:</h1>
                <select value={data.type || ''} name='type' className='rounded-md border h-10 w-full outline-none bg-slate-800' required onChange={handleChange}>
                  {carTypes.map((type, index) => (
                    <option key={index} value={type}>{type.toUpperCase()}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className='flex flex-col sm:flex-row justify-between gap-4'>
              <div className='w-full sm:w-1/2'>
                <h1 className='font-semibold text-xl mb-2'>Fuel Type:</h1>
                <select value={data.fuel || ''} name='fuel' className='rounded-md border w-full h-10 outline-none bg-slate-800' required onChange={handleChange}>
                  {fuelType.map((fuel, index) => (
                    <option key={index} value={fuel}>{fuel.toUpperCase()}</option>
                  ))}
                </select>
              </div>
              <div className='w-full sm:w-1/2'>
                <h1 className='font-semibold text-xl mb-2'>Transmission:</h1>
                <select value={data.transmission || ''} name='transmission' className='rounded-md border h-10 w-full outline-none bg-slate-800' required onChange={handleChange}>
                  {carTransmition.map((tran, index) => (
                    <option key={index} value={tran}>{tran.toUpperCase()}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* BRAND */}
          <div className='w-full md:w-3/5 flex flex-col'>
            <h1 className='text-xl font-semibold mb-1'>Car Brand:</h1>
            <select value={data.brand || ''} name='brand' className='rounded-md border w-full h-10 outline-none bg-slate-800' required onChange={handleChange}>
              {carBrands.map((brand, index) => (
                <option key={index} value={brand}>{brand.toUpperCase()}</option>
              ))}
            </select>
          </div>

          {/* MILEAGE */}
          <div className='w-full md:w-3/5 flex flex-col'>
            <h1 className='text-xl font-semibold mb-1'>Mileage (MPG):</h1>
            <input value={data.mileage || ''} className='rounded-md pl-2 border w-full h-10 outline-none' type='number' name='mileage' placeholder='Enter Mileage in MPG' required onChange={handleChange} />
          </div>

          {/* PRICE */}
          <div className='w-full md:w-3/5 flex flex-col'>
            <h1 className='text-xl font-semibold mb-1'>Price ($):</h1>
            <input value={data.price || ''} className='rounded-md pl-2 border w-full h-10 outline-none' type='number' name='price' placeholder='Enter Price in Dollars' required onChange={handleChange} />
          </div>

          <div className='w-full md:w-3/5 flex justify-end'>
            <button type='submit' className='font-semibold text-lg border px-8 mt-4 rounded-md py-1 bg-slate-950 text-white hover:cursor-pointer'>Update</button>
          </div>

        </form>
      </div>
    </main>
  )
}

export default Edit
