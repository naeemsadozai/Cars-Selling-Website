import { Suspense , lazy } from 'react'
import { createRoot } from 'react-dom/client'
import './main.css'
const Home = lazy(()=> import('./Home'))
const Layout = lazy(()=> import('./Layout'))
const About_us = lazy(()=> import('./About_us'))
const Contact_us = lazy(()=> import('./Contact_us'))
const Login = lazy(()=> import('./Login'))
const CarBrand = lazy(()=> import('./CarBrand'))
const AllCars = lazy(()=> import('./AllCars'))
const ScrollToTop = lazy(()=> import('./ScrollToTop'))
const SingleCar = lazy(()=> import('./SingleCar'))
const AdminProtectedRoute = lazy(()=> import('./AdminProtectedRoute'))
const CreateListing = lazy(()=> import('./CreateListing'))
const Register = lazy(()=> import('./Register'))
const ViewBrands = lazy(()=> import('./ViewBrands'))
const FullTeam = lazy(()=> import('./FullTeam'))
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Edit from './Edit'

createRoot(document.getElementById('root')).render(
    <BrowserRouter>
    <Suspense fallback={<div className='w-full h-full flex items-center justify-center text-2xl'><h1>Loading...</h1></div>}>
    <ScrollToTop/>
      <Routes>
        <Route path='/' element={<Layout/>} >
          <Route index element={<Home></Home>} ></Route>
          <Route path='about_us' element={<About_us></About_us>} ></Route>
          <Route path='team' element={<FullTeam></FullTeam>} ></Route>
          <Route path='contact_us' element={<Contact_us></Contact_us>} ></Route>
          <Route path='cars/brands' element={<ViewBrands></ViewBrands>} ></Route>
          <Route path='cars/brand/:name' element={<CarBrand></CarBrand>} ></Route>
          <Route path='cars/all' element={<AllCars/>} ></Route>
          <Route path='cars/:id' element={<SingleCar/>} ></Route>
          <Route path='admin/createlisting' element={<CreateListing></CreateListing>}></Route>
          <Route path='admin/edit/:id' element={<Edit></Edit>}></Route>
        </Route>
        <Route path='/auth/login' element={<Login></Login>}></Route>
        <Route path='/auth/register' element={<Register/>}></Route>
      </Routes>
      </Suspense>
    </BrowserRouter>
)
