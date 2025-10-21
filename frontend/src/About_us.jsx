import React from 'react'
import {LazyLoadImage} from 'react-lazy-load-image-component'
import 'react-lazy-load-image-component/src/effects/blur.css'

const About_us = () => {
  return (
    <div className='w-full'>
      <div className="w-10/12 mx-auto">
        <h1 className='text-4xl font-bold my-6 text-blue-600 text-shadow-amber-600 text-shadow-xs'>Your Journey, Our Passion</h1>
        <img loading='lazy' src="./Images/about_us.jpg" className='rounded-xl h-[25rem] w-full object-cover' alt="" />
        
        <h1 className='text-2xl font-bold my-2 mt-8'>More Than Metal and Machinery</h1>
        <p className='text-md '>Every car has a story. It’s the story of a family’s first road trip, the thrill of a new commute, the freedom of the open road, and the pride of a dream achieved. At DriveLux Motors, we don't just sell cars; we help you write the next chapter of your story.For over 15 years, we've been a trusted name in the automotive world, but our journey began with a simple frustration: the traditional car buying process was broken. It was filled with uncertainty, pressure, and confusion. We knew it could be better. We believed it could be an experience filled with excitement, confidence, and trust.That belief is the engine that drives everything we do.</p>
        
        <h1 className='text-2xl font-bold my-2 mt-6'>Our Mission: To Empower Your Drive</h1>
        <p className='text-md mb-2 '>Our mission is simple but profound: <span className='font-bold'> to transform the car buying and ownership experience into one of clarity, confidence, and joy.We achieve this by:</span></p>
        <ul className='list-disc w-full px-6 flex flex-col gap-2'>
          <li className='w-full'>
            <div>
              <span className='text-md font-semibold mr-2'>Demanding Transparency:</span>
              <span className='text-md '>No hidden fees, no surprise costs. The price you see is the price you pay, backed by a full vehicle history report for every car.</span>
            </div>
          </li>
          <li>
            <div>
              <span className='text-md font-semibold mr-2'>Curating with Care:</span>
              <span className='text-md '>Our inventory isn't just large; it's meticulously selected. Every pre-owned vehicle undergoes a rigorous 200-Point Inspection by our master technicians, ensuring it meets our uncompromising standards for safety and performance.</span>
            </div>
          </li>
          <li>
            <div>
              <span className='text-md font-semibold mr-2'>Simplifying the Process:</span>
              <span className='text-md '>From advanced search tools and 360-degree virtual tours on our website to streamlined financing and paperwork, we remove the hassle so you can focus on the excitement.</span>
            </div>
          </li>
        </ul>
        
        <h1 className='text-2xl font-bold my-2 mt-6'>The DriveLux Difference: Why Thousands Choose Us</h1>
        <ul className='list-decimal px-6 flex flex-col gap-2'>
          <li className='text-md font-semibold'>An Unmatched Selection, Vetted for Excellence <br/> <span className='font-normal'>Whether you're seeking a dependable family SUV, a fuel-efficient commuter, or a sophisticated luxury vehicle, our diverse inventory is curated for every need and ambition. Every car on our lot has earned its place.</span></li>
          <li className='text-md font-semibold'>A Seamless, No-Pressure Experience <br/> <span className='font-normal'>Browse online in your pajamas or visit our state-of-the-art showroom. Our product experts are here to provide knowledge and answers, not pressure. Their goal is to find the perfect fit for you, not to meet a sales quota.</span></li>
          <li className='text-md font-semibold'>Transparent, Tailored Financing <br/> <span className='font-normal'>Our finance team works with a network of trusted lenders to secure competitive rates and payment plans that fit your budget. We explain every detail in plain English, so you drive away with peace of mind.</span></li>
          <li className='text-md font-semibold'>A Partner for the Long Road <br/> <span className='font-normal'>Our relationship doesn't end at delivery. With exclusive warranties, dedicated service specials, and a customer care team that knows you by name, we're committed to your satisfaction for miles and years to come.</span></li>
          
        </ul>
        <h1 className='text-2xl font-bold my-2 mt-6'>Our Core Values: The Road We Travel By</h1>
        <ul className='list-disc w-full px-6 flex flex-col gap-2'>
          <li className='w-full'>
            <div>
              <span className='text-md font-semibold mr-2'>Integrity First:</span>
              <span className='text-md '>We do the right thing, always. It’s the foundation of every interaction, every recommendation, and every car we sell.</span>
            </div>
          </li>
          <li>
            <div>
              <span className='text-md font-semibold mr-2'>Customer Obsession:</span>
              <span className='text-md '>Your happiness is our ultimate scorecard. We listen, we adapt, and we go the extra mile—literally and figuratively.</span>
            </div>
          </li>
          <li>
            <div>
              <span className='text-md font-semibold mr-2'>Passionate Expertise:</span>
              <span className='text-md '>Our team eats, sleeps, and breathes cars. We’re not just staff; we’re enthusiasts dedicated to sharing our knowledge with you.</span>
            </div>
          </li>
          <li>
            <div>
              <span className='text-md font-semibold mr-2'>Relentless Innovation:</span>
              <span className='text-md '>We are constantly evolving, leveraging new technology to make your experience smoother, smarter, and more connected.</span>
            </div>
          </li>
        </ul>
       
        <h1 className='text-2xl font-bold my-2 mt-6'>Meet the People Behind the Wheel</h1>
        <div className="brands w-11/12 mx-auto mt-10 sm:mt-14 mb-10 sm:mb-14">
        <div className="ourTeamCards flex flex-wrap justify-center sm:justify-between gap-8">
          {[
            { img: "./Images/team3.png", name: "Ms. LR", role: "Production Manager" },
            { img: "./Images/team4.png", name: "Mr. Naeem sadozai", role: "Application Developer" },
            { img: "./Images/team2.png", name: "Ms. Kamlee", role: "Team Manager" },
            { img: "./Images/team1.png", name: "Mr. Saviour", role: "Application Tester" },
          ].map((member, i) => (
            <div key={i} className="card w-60 sm:w-1/5 h-80">
              <LazyLoadImage
                className="object-cover h-4/5 rounded-2xl shadow-xl w-full"
                src={member.img}
                effect='blur'
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

        <h1 className='text-2xl font-bold my-2 mt-6'>Our Promise to You</h1>
        <h1 className='text-lg font-semibold my-2'>When you choose DriveLux Motors, we promise you three things:</h1>
        <ul className='list-decimal px-6 flex flex-col gap-2'>
          <li className='text-md font-semibold'>Clarity: <span className='font-normal'> You will have all the information you need to make a decision you feel great about.</span></li>
          <li className='text-md font-semibold'>Confidence: <span className='font-normal'>You will drive away knowing you made a smart investment in a quality vehicle.</span></li>
          <li className='text-md font-semibold'>Care: <span className='font-normal'>You will be treated not as a customer, but as a member of the DriveLux family.</span></li>          
        </ul>



      </div>      
    </div>
  )
}

export default About_us
