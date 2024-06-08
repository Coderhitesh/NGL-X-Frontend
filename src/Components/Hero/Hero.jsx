import React, { useEffect, useState } from 'react';
import './Hero.css';
import axios from 'axios';

function Hero() {
  const [banners, setBanners] = useState([]);

  useEffect(() => {
    const dataFetch = async () => {
      try {
        const response = await axios.get('https://nglx-cosmetic-backend-git-io.onrender.com/api/get-Banners');
        console.log(response.data.data);
        setBanners(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    dataFetch();
  }, []);

  // Assuming you want to use the first banner as the background image
  const banner = banners.length > 0 ? banners[0] : null;

  return (
    <section className="hero-section">
      <div className="container">
        {banner && (
          <div 
            className="main-container" 
            style={{ backgroundImage: `url(${banner.image})` }}
          >
            <div className="left">
              {/* You can add additional banner content here if needed */}
              {/* <span>NEW IN TOWN</span>
              <h1>The New Beauty Collection</h1>
              <p>This new collection brings with it the most exciting beauty Products.</p>
              <a href="">Shop Now</a> */}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default Hero;
