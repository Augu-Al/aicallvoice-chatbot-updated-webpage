import React from 'react';
import '../css/banner.css';
import fanshaweIcon from '../css/fanshawe_icon.png'; 
// import homeImg from '../src/css/home_img.png'; 
import { useLocation } from 'react-router-dom';

const Banner = () => {
  const location = useLocation();

  return (
    <div className='banner-header'>
      <img src={fanshaweIcon} alt="Fanshawe Icon" className="fanshawe-icon"/>
      <h1 style={{textAlign:'center'}}>Glory Nail Spa</h1>
        {/* {location.pathname === '/' && (
        <img src={homeImg} alt="Home" className="home-image" />
      )} */}
    </div>
   
  );
};

export default Banner;