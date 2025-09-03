import React from 'react'
import Hero from './Hero.jsx'
import AboutUs from './About.jsx'
import Feature from './Features.jsx'
import Banner from './Banner.jsx'
import Cards from './Cards.jsx'
import InquiryForm from '../Inquiryform.jsx'

const Home = () => {
  return (
    <div>
       <Hero/>
       <AboutUs/>
       <Feature/>
       <Banner/>
       <Cards/>
       <InquiryForm/>
    </div>
  )
}

export default Home
