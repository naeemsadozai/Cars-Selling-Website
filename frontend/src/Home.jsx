import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const Home = () => {
  const [currIndex, setCurrIndex] = useState(0);
  const [page, setPage] = useState(1);
  const [loader, setLoader] = useState(false);
  const [isAdmin, setisAdmin] = useState(false);
  const [data, setData] = useState([]);
  let navigate = useNavigate();
  const dataFetching = async () => {
    try {
      setLoader(true);
      window.scrollTo(0, 0);
      let cars = await axios.get(`https://cars-selling-website-backend.onrender.com/cars/all?page=${page}`, {
        withCredentials: true,
      });
      if (cars.data.newdata.length > 9) {
        setLoader(false);
        setData(cars.data.newdata);
        setisAdmin(cars.data.isAdmin);
      } else {
        setLoader(false);
        setisAdmin(cars.data.isAdmin);
        setData(cars.data.newdata);
      }
    } catch (error) {
      if (error.response) {
        alert(error.response.data.message);
      } else {
        alert(error);
      }
    }
  };
  useEffect(() => {
    dataFetching();
  }, []);

  const images = [
    {
      img: "./Images/Home_slider2.png",
      price: 127700,
      name: "Audi e-tron GT",
      fuel: "EV",
      mileage: 91,
      type: "Luxury",
    },
    {
      img: "./Images/Home_slider.png",
      price: 62450,
      name: "Mercedes-Benz E-Class Sedan",
      fuel: "(MHEV) / Petrol",
      mileage: 25,
      type: "Luxury",
    },
    {
      img: "./Images/Home_slider3.png",
      price: 42119,
      name: "Ford EV",
      fuel: "Electric",
      mileage: 38,
      type: "Automatic",
    },
  ];

  const allReviews = [
    {
      stars: 4,
      review: "Good work you have done",
      details:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis aspernatur hic aperiam.",
      writer: "Naeem khan sadozai",
    },
    {
      stars: 3,
      review: "Good work you have done",
      details:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis aspernatur hic aperiam.",
      writer: "Naeem khan sadozai",
    },
    {
      stars: 5,
      review: "Good work you have done",
      details:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis aspernatur hic aperiam.",
      writer: "Naeem khan sadozai",
    },
    {
      stars: 4,
      review: "Good work you have done",
      details:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis aspernatur hic aperiam.",
      writer: "Naeem khan sadozai",
    },
  ];

  const handleDelete = async (id) => {
    try {
      setLoader(true);
      window.scrollTo(0, 0);
      let deleted = await axios.delete(
        `https://cars-selling-website-backend.onrender.com/cars/delete/${id}`,
        { withCredentials: true }
      );
      if (deleted.response === 201) {
        alert(deleted.data.message);
        setLoader(false);
        window.location.reload();
      } else {
        alert(deleted.data.message);
        setLoader(false);
        window.location.reload();
      }
    } catch (error) {
      if (error.response) {
        alert(error.response.data.message);
      } else {
        alert(error);
      }
    }
  };
  const brandImages = [
    { brand: "bmw", img: "./car_logos/bmw.svg" },
    { brand: "audi", img: "./car_logos/audi.svg" },
    { brand: "volkswagen", img: "./car_logos/volkswagen.svg" },
    { brand: "peugeot", img: "./car_logos/peugeot.svg" },
    { brand: "ford", img: "./car_logos/ford.svg" },
    { brand: "mercedes-benz", img: "./car_logos/mercedes-benz.svg" },
  ];

  const handleNextSlide = () => {
    setCurrIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrevSlide = () => {
    setCurrIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <main className="w-full overflow-hidden px-2 sm:px-0">
      {loader && (
        <div className="w-full h-[80vh] flex flex-col items-center justify-center">
          <h1>Loading data please wait</h1>
          <div className="w-20 h-20 border-t-1 mt-8 rounded-full rotate_transition"></div>
        </div>
      )}

      {!loader && (
        <div>
          {/* Hero Slider */}
          <div className="relative w-full h-[30rem] sm:h-[35rem] lg:h-[40rem] overflow-hidden">
            <div
              className="flex transition-transform duration-700 ease-in-out"
              style={{ transform: `translateX(-${currIndex * 100}%)` }}>
              {images.map((image, index) => (
                <div key={index} className="w-full flex-shrink-0 relative">
                  <LazyLoadImage
                    src={image.img}
                    effect="blur"
                    alt={image.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-1/3 sm:top-1/2 left-5 sm:left-20 md:left-32 lg:left-72 flex flex-col items-start">
                    <p className="text-white text-lg sm:text-xl md:text-2xl">
                      Price: ${image.price}
                    </p>
                    <h2 className="text-white text-3xl sm:text-4xl md:text-5xl my-4 sm:my-6">
                      {image.name}
                    </h2>
                    <div className="text-white flex flex-wrap gap-2 sm:gap-3 text-sm sm:text-md mt-3">
                      <p className="px-3 sm:px-4 py-1.5 rounded-full">
                        <i className="fa-solid fa-gas-pump"></i> {image.fuel}
                      </p>
                      <p className="px-3 sm:px-4 py-1.5 rounded-full">
                        <i className="fa-solid fa-gauge-high"></i>{" "}
                        {image.mileage} Miles
                      </p>
                      <p className="px-3 sm:px-4 py-1.5 rounded-full z-20">
                        <i className="fa-solid fa-gauge"></i> {image.type}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={handlePrevSlide}
              className="absolute top-1/5 left-0 sm:top-1/2 sm:left-4 -translate-y-1/2 bg-white/70 hover:bg-white text-black p-2 sm:p-3 rounded-full shadow text-xs sm:text-xl">
              &lt;
            </button>
            <button
              onClick={handleNextSlide}
              className="absolute top-1/5 right-0 sm:top-1/2 sm:right-4 -translate-y-1/2 bg-white/70 hover:bg-white text-black p-2 sm:p-3 rounded-full shadow text-xs sm:text-xl">
              &gt;
            </button>
          </div>

          {/* Cars Section */}
          <div className="carsSection w-full bg-sky-50 py-12 sm:py-16">
            <div className="w-11/12 mx-auto">
              <div className="allVehicles flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                <h1 className="text-2xl sm:text-3xl font-semibold">
                  Explore All Vehicles
                </h1>
                <a className="text-sm hover:text-blue-600" href="/cars/all">
                  View All{" "}
                  <i className="fa-solid fa-arrow-up-right-from-square"></i>
                </a>
              </div>

              <div className="cards flex flex-wrap justify-center gap-3 lg:gap-12 sm:6 my-8">
                {data.map((car, index) => (
                  <div
                    key={index}
                    className="relative card bg-white shadow-xl h-auto sm:h-[35rem] max-sm:w-full w-2/5 lg:w-80 flex flex-col gap-2 rounded-2xl overflow-hidden hover:scale-105 transition-all duration-100 ease-in">
                    <LazyLoadImage
                      src={car.pic}
                      effect="blur"
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

                    <div className="w-11/12 mx-auto flex flex-col justify-between border-b py-3 pb-4 gap-2">
                      <h1 className="w-full font-semibold text-md px-2  shadow shadow-slate-300 py-1 rounded-sm text-black">
                        <span className="font-bold mr-4">Brand:</span>{" "}
                        {car.brand.toUpperCase()}
                      </h1>
                      <h1 className="w-full font-semibold text-md px-2  shadow shadow-slate-300 py-1 rounded-sm text-black">
                        <span className="font-bold mr-4">Fuel Type:</span>{" "}
                        {car.fuel.toUpperCase()}
                      </h1>
                      <h1 className="w-full font-semibold text-md px-2  shadow shadow-slate-300 py-1 rounded-sm text-black">
                        <span className="font-bold mr-4">Transmission:</span>
                        {car.transmission.toUpperCase()}
                      </h1>
                    </div>
                    {isAdmin && (
                      <div className="w-11/12 mx-auto flex justify-end items-center">
                        <div className="buttons flex gap-2">
                          <Link to={'/auth/edit'} className="bg-slate-100 text-slate-800 border border-slate-300 px-2 py-0.5 rounded-md update">
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

                    <div className="price flex justify-between items-center w-11/12 mx-auto my-1 mb-2">
                      <h1 className="text-lg sm:text-xl font-bold">
                        ${new Intl.NumberFormat("en-US").format(car.price)}
                      </h1>
                      <a
                        href={`/cars/${car.id}`}
                        className="text-blue-600 text-xs sm:text-sm">
                        View Details{" "}
                        <i className="fa-solid fa-arrow-up-right-from-square"></i>
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Why Choose Us */}
          <div className="whyChooseUs w-11/12 mx-auto mt-10 sm:mt-14 mb-10 sm:mb-14">
            <div className="flex justify-between items-center my-4">
              <h1 className="text-2xl sm:text-3xl font-semibold">
                Why Choose Us?
              </h1>
            </div>
            <div className="chooseUsCards w-full flex flex-wrap justify-center sm:justify-between gap-6">
              {[
                {
                  icon: "fa-tv",
                  title: "Special Financing Offers",
                },
                {
                  icon: "fa-gem",
                  title: "Trusted Car Dealership",
                },
                {
                  icon: "fa-hand-holding-dollar",
                  title: "Transparent Pricing",
                },
                {
                  icon: "fa-car-side",
                  title: "Expert Car Service",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="card w-72 sm:w-1/4 px-3 py-3 flex flex-col text-center sm:text-left">
                  <i
                    className={`fa-solid ${item.icon} text-3xl sm:text-4xl mb-3`}></i>
                  <h1 className="text-base sm:text-lg font-semibold">
                    {item.title}
                  </h1>
                  <p className="text-sm">
                    Our Stress-free finance department that can find financial
                    solutions to save your money.
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Reviews */}
          <div className="customerReviews w-full bg-sky-50 py-10">
            <div className="w-11/12 mx-auto">
              <div className="customerSays flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                <h1 className="text-2xl sm:text-3xl font-semibold">
                  What our customers say
                </h1>
                <h1 className="text-xs sm:text-sm text-slate-800 font-semibold">
                  Rated 4.7 / 5 based on 28,370 reviews Showing our 4 & 5 star
                  reviews
                </h1>
              </div>

              <div className="reviews mt-8 mb-8 flex flex-wrap justify-center gap-4">
                {allReviews.map((rev, index) => (
                  <div
                    key={index}
                    className="card w-72 sm:w-1/4 px-5 flex flex-col gap-2 py-8 rounded-2xl bg-white shadow-2xl">
                    <div className="first-section flex justify-between">
                      <div className="stars">
                        <div className="flex gap-1">
                          {[...Array(5)].map((_, i) => (
                            <div
                              key={i}
                              className={`flex justify-center items-center w-5 sm:w-6 h-5 sm:h-6 rounded-sm ${
                                i < rev.stars
                                  ? "bg-blue-500 text-white"
                                  : "bg-gray-300 text-gray-500"
                              }`}>
                              <i className="fa-solid fa-star"></i>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="verified flex gap-1 items-center text-xs sm:text-sm">
                        <i className="fa-solid fa-circle-check"></i>
                        <p>Verified</p>
                      </div>
                    </div>
                    <div className="review text-md sm:text-lg font-bold">
                      {rev.review}
                    </div>
                    <div className="line-clamp-2 text-slate-800 text-sm sm:text-base">
                      {rev.details}
                    </div>
                    <div className="writer text-xs sm:text-sm font-semibold">
                      {rev.writer}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Team */}
          <div className="brands w-11/12 mx-auto mt-10 sm:mt-14 mb-10 sm:mb-14">
            <div className="flex justify-between items-center my-4">
              <h1 className="text-2xl sm:text-3xl font-semibold">Our Team</h1>
              <Link
                to="/team"
                className="flex items-center gap-1 hover:text-blue-600 text-sm sm:text-base">
                <p>View All</p>{" "}
                <i className="fa-solid fa-arrow-up-right-from-square"></i>
              </Link>
            </div>
            <div className="ourTeamCards flex flex-wrap justify-center sm:justify-between gap-8">
              {[
                {
                  img: "./Images/team3.png",
                  name: "Ms. LR",
                  role: "Production Manager",
                },
                {
                  img: "./Images/team4.png",
                  name: "Mr. Naeem sadozai",
                  role: "Application Developer",
                },
                {
                  img: "./Images/team2.png",
                  name: "Ms. Kamlee",
                  role: "Team Manager",
                },
                {
                  img: "./Images/team1.png",
                  name: "Mr. Saviour",
                  role: "Application Tester",
                },
              ].map((member, i) => (
                <div key={i} className="card w-60 sm:w-1/5 h-80">
                  <LazyLoadImage
                    className="object-cover h-4/5 rounded-2xl shadow-xl w-full"
                    src={member.img}
                    effect="blur"
                    alt="team"
                  />
                  <div className="teamDetails text-center sm:text-left mt-2">
                    <h1 className="name text-lg sm:text-xl font-semibold">
                      {member.name}
                    </h1>
                    <p className="text-sm">{member.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* App Section */}
          <div className="app w-11/12 mx-auto relative my-10">
            <LazyLoadImage
              src="./Images/App.png"
              effect="blur"
              className="object-cover w-full h-80 sm:h-96 rounded-2xl"
              alt=""
            />
            <div className="absolute top-1/3 sm:top-1/2 left-6 sm:left-10 text-black">
              <h1 className="text-2xl sm:text-3xl font-semibold">
                Download Our App
              </h1>
              <p className="text-sm sm:text-base my-2 sm:my-4">
                Find cars anytime, anywhere!
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  to={"/"}
                  className="hover:scale-105 transition-all duration-100 ease-in">
                  <div className="w-56 border rounded-xl h-14 flex bg-slate-950 text-white">
                    <div className="logo w-2/6 flex items-center justify-center">
                      <i className="fa-brands fa-apple text-3xl"></i>
                    </div>
                    <div className="linkText w-4/6 flex items-center">
                      <div className="h-11/12 w-full border-l border-gray-600 px-3 text-md">
                        <h1 className="text-sm">Download on the</h1>
                        <h1 className="text-lg font-semibold">Apple Store</h1>
                      </div>
                    </div>
                  </div>
                </Link>
                <Link
                  to={"/"}
                  className="hover:scale-105 transition-all duration-100 ease-in">
                  <div className="w-56 border rounded-xl h-14 flex bg-slate-950 text-white">
                    <div className="logo w-2/6 flex items-center justify-center">
                      <i className="fa-brands fa-google text-3xl"></i>
                    </div>
                    <div className="linkText w-4/6 flex items-center">
                      <div className="h-11/12 w-full border-l border-gray-600 px-3 text-md">
                        <h1 className="text-sm">Download on the</h1>
                        <h1 className="text-lg font-semibold">Google Play</h1>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </div>

          {/* Brand Categories */}
          <div className="Brands w-11/12 mx-auto py-15 flex flex-col">
            <div className="flex justify-between mb-5">
              <h1 className="text-2xl sm:text-3xl font-semibold">
                Explore By Brands
              </h1>
              <Link to={"/cars/brands"} className="text-md hover:text-blue-600">
                View All{" "}
                <i className="fa-solid fa-arrow-up-right-from-square"></i>
              </Link>
            </div>
            <div className="categories flex flex-wrap justify-center sm:justify-between gap-4 sm:gap-6">
              {brandImages.map((type, index) => (
                <a key={index} href={`cars/brand/${type.brand}`}>
                  <div className="category hover:scale-110 transition-all duration-100 ease-in font-semibold flex flex-col gap-3 justify-center items-center w-32 sm:w-40 h-32 sm:h-36 rounded-md shadow-xl">
                    <div className="flex justify-center items-center">
                      <LazyLoadImage
                        effect="blur"
                        src={type.img}
                        className="object-cover w-20"
                        alt=""
                      />
                    </div>{" "}
                    {type.brand.toUpperCase()}
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default Home;
