import React from 'react'
import {Link} from 'react-router-dom'
import {LazyLoadImage} from 'react-lazy-load-image-component'
import 'react-lazy-load-image-component/src/effects/blur.css'

const FullTeam = () => {
  const myTeam = [
    {
      name: "Ms. LR",
      pic: '../Images/team3.png',
      role: "Production Manager",
      email: "lr@company.com",
      phone: "+1 (555) 123-4567",
      responsibilities: [
        "Oversee production workflows",
        "Manage team coordination",
        "Ensure project timelines",
        "Quality assurance"
      ]
    },
    {
      name: "Mr. Naeem Sadozai",
      pic: '../Images/team4.png',
      role: "Application Developer",
      email: "naeem@company.com",
      phone: "+1 (555) 123-4568",
      responsibilities: [
        "Frontend & backend development",
        "Code implementation",
        "Feature development",
        "Technical documentation"
      ]
    },
    {
      name: "Ms. Kamlee",
      pic: '../Images/team2.png',
      role: "Application Test Engineer",
      email: "kamlee@company.com",
      phone: "+1 (555) 123-4569",
      responsibilities: [
        "Test case development",
        "Bug tracking & reporting",
        "Quality validation",
        "Automation testing"
      ]
    },
    {
      name: "Mr. Kamluu",
      pic: '../Images/team1.png',
      role: "Team Manager",
      email: "kamluu@company.com",
      phone: "+1 (555) 123-4570",
      responsibilities: [
        "Team leadership",
        "Project planning",
        "Client communication",
        "Performance monitoring"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
            Our Team
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Meet the dedicated professionals who make our projects successful
          </p>
        </div>

        {/* Team Members Grid - One card per row */}
        <div className="space-y-8">
          {myTeam.map((member, index) => (
            <div 
              key={index}
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100"
            >
              <div className="flex flex-col lg:flex-row items-center lg:items-start p-6 lg:p-8">
                {/* Profile Picture Section */}
                <div className="flex-shrink-0 mb-6 lg:mb-0 lg:mr-8">
                  <div className="w-24 h-24 lg:w-28 lg:h-28 rounded-2xl bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center border border-gray-200 overflow-hidden">
                    <LazyLoadImage 
                      src={member.pic}
                      effect='blur' 
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                {/* Content Section */}
                <div className="flex-1 text-center lg:text-left">
                  <div className="mb-4">
                    <h2 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-2">
                      {member.name}
                    </h2>
                    <p className="text-lg text-blue-600 font-semibold mb-4">
                      {member.role}
                    </p>
                  </div>

                  {/* Contact Info */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-center lg:justify-start gap-4 mb-6">
                    <div className="flex items-center justify-center lg:justify-start text-gray-600">
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      {member.email}
                    </div>
                    <div className="flex items-center justify-center lg:justify-start text-gray-600">
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      {member.phone}
                    </div>
                  </div>

                  {/* Responsibilities */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">Key Responsibilities</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {member.responsibilities.map((responsibility, idx) => (
                        <div key={idx} className="flex items-center text-gray-600">
                          <svg className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          {responsibility}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer Note */}
        <div className="text-center mt-12">
          <p className="text-gray-500 text-sm">
            Working together to deliver exceptional results
          </p>
        </div>
      </div>
    </div>
  );

}

export default FullTeam
