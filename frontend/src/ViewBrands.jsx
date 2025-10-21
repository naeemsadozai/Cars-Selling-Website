import React from 'react'
import { Link } from 'react-router-dom'
import {LazyLoadImage} from 'react-lazy-load-image-component'
import 'react-lazy-load-image-component/src/effects/blur.css'

const ViewBrands = () => {

const allBrands = [
  { brand: "toyota", logo: "../car_logos/toyota.svg" },
  { brand: "honda", logo: "../car_logos/honda.svg" },
  { brand: "nissan", logo: "../car_logos/nissan.svg" },
  { brand: "mazda", logo: "../car_logos/mazda.svg" },
  { brand: "mitsubishi", logo: "../car_logos/mitsubishi.svg" },
  { brand: "suzuki", logo: "../car_logos/suzuki.svg" },
  { brand: "subaru", logo: "../car_logos/subaru.svg" },
  { brand: "lexus", logo: "../car_logos/lexus.svg" },
  { brand: "acura", logo: "../car_logos/acura.svg" },
  { brand: "infiniti", logo: "../car_logos/infiniti.svg" },
  { brand: "hyundai", logo: "../car_logos/hyundai.svg" },
  { brand: "kia", logo: "../car_logos/kia.svg" },
  { brand: "genesis", logo: "../car_logos/genesis.svg" },
  { brand: "bmw", logo: "../car_logos/bmw.svg" },
  { brand: "mercedes-benz", logo: "../car_logos/mercedes_benz.svg" },
  { brand: "audi", logo: "../car_logos/audi.svg" },
  { brand: "volkswagen", logo: "../car_logos/volkswagen.svg" },
  { brand: "porsche", logo: "../car_logos/porsche.svg" },
  { brand: "mini", logo: "../car_logos/mini.svg" },
  { brand: "volvo", logo: "../car_logos/volvo.svg" },
  { brand: "land rover", logo: "../car_logos/land_rover.svg" },
  { brand: "jaguar", logo: "../car_logos/jaguar.svg" },
  { brand: "ford", logo: "../car_logos/ford.svg" },
  { brand: "chevrolet", logo: "../car_logos/chevrolet.svg" },
  { brand: "dodge", logo: "../car_logos/dodge.svg" },
  { brand: "jeep", logo: "../car_logos/jeep.svg" },
  { brand: "gmc", logo: "../car_logos/gmc.svg" },
  { brand: "buick", logo: "../car_logos/buick.svg" },
  { brand: "cadillac", logo: "../car_logos/cadillac.svg" },
  { brand: "tesla", logo: "../car_logos/tesla.svg" },
  { brand: "chrysler", logo: "../car_logos/chrysler.svg" },
  { brand: "fiat", logo: "../car_logos/fiat.svg" },
  { brand: "peugeot", logo: "../car_logos/peugeot.svg" },
  { brand: "renault", logo: "../car_logos/renault.svg" },
  { brand: "citroën", logo: "../car_logos/citroen.svg" },
  { brand: "alfa romeo", logo: "../car_logos/alfa.svg" },
  { brand: "ferrari", logo: "../car_logos/ferrari.svg" },
  { brand: "lamborghini", logo: "../car_logos/lamborghini.svg" },
  { brand: "maserati", logo: "../car_logos/maserati.svg" },
  { brand: "bentley", logo: "../car_logos/bentley.svg" },
  { brand: "rolls-royce", logo: "../car_logos/rolls_royce.svg" },
  { brand: "aston martin", logo: "../car_logos/aston_martin.svg" },
  { brand: "bugatti", logo: "../car_logos/bugatti.svg" },
  { brand: "mclaren", logo: "../car_logos/mclaren.svg" },
  { brand: "tata motors", logo: "../car_logos/tata_motors.svg" },
  { brand: "mahindra", logo: "../car_logos/mahindra.svg" },
  { brand: "byd", logo: "../car_logos/byd.svg" },
  { brand: "geely", logo: "../car_logos/geely.svg" },
  { brand: "changan", logo: "../car_logos/changan.svg" },
  { brand: "great wall", logo: "../car_logos/great_wall.svg" },
  { brand: "rivian", logo: "../car_logos/rivian.svg" },
  { brand: "lucid motors", logo: "../car_logos/lucid.svg" }
]

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
            Explore All Brands
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our wide range of automotive brands and find your perfect match
          </p>
        </div>

        {/* Brands Grid - One card per row */}
        <div className="space-y-6">
          {allBrands.map((car, index) => (        
            <Link 
              key={index} 
              to={`/cars/brand/${car.brand}`}
              className="block bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:scale-105"
            >
              <div className="flex flex-col lg:flex-row items-center lg:items-start p-6 lg:p-8">
                {/* Logo Container */}
                <div className="flex-shrink-0 mb-4 lg:mb-0 lg:mr-8">
                  <div className="w-20 h-20 lg:w-24 lg:h-24 rounded-2xl bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center border border-gray-200">
                    <LazyLoadImage 
                      src={car.logo}
                      effect='blur' 
                      className="w-16 h-16 lg:w-20 lg:h-20 object-contain" 
                      alt={`${car.brand} logo`}
                    />
                  </div>
                </div>
                
                {/* Brand Name and Info */}
                <div className="flex-1 text-center lg:text-left">
                  <h2 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-2">
                    {car.brand.charAt(0).toUpperCase() + car.brand.slice(1)}
                  </h2>
                  <p className="text-gray-600 mb-4">
                    Explore the complete lineup of {car.brand} vehicles
                  </p>
                  
                  {/* Additional Info */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-center lg:justify-start gap-4 text-sm text-gray-500">
                    <div className="flex items-center justify-center lg:justify-start">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                      Premium Quality
                    </div>
                    <div className="flex items-center justify-center lg:justify-start">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                      Trusted Brand
                    </div>
                  </div>
                </div>

                {/* View More Arrow */}
                <div className="hidden lg:flex items-center justify-center ml-4">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Footer Note */}
        <div className="text-center mt-12">
          <p className="text-gray-500 text-sm">
            {allBrands.length} premium automotive brands to choose from
          </p>
        </div>
      </div>
    </div>
  )
}

export default ViewBrands