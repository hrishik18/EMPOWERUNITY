import React from 'react';
import SideNav from "../components/SideNav/SideNav";
import Slideshow from '../components/Slideshow/Slideshow';
import "./Home.css"

const Home = () => {
  return (
    <div className="container">
    <div className="row">
      <div className="col-sm-3">
        <SideNav />
      </div>
      <div className="col-sm-9">
        <Slideshow />
      </div>
    </div>
  </div>
  );
};

export default Home;
