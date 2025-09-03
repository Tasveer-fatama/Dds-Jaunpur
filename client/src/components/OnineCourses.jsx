import React from 'react'

const OnineCourses = () => {
  return (
    <div>
        <div
        className="relative w-full h-[300px] md:h-[400px] flex items-center justify-center bg-cover bg-center text-white"
        style={{
          backgroundImage:
            "url('https://static.vecteezy.com/system/resources/previews/002/626/082/non_2x/light-red-yellow-gradient-blur-background-vector.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50"></div>
        <div className="relative z-10 max-w-4xl px-6 text-center">
          <h1 className="text-3xl md:text-5xl font-bold">
            <span className="border-l-4 border-red-500 pl-2">Online Courses</span>
          </h1>
        </div>
      </div>
    </div>
  )
}

export default OnineCourses
