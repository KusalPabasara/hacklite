import React, { useState, useEffect } from 'react';

const InstituteCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const institutes = [
    {
      name: 'VTA - Vocational Training Authority',
      image: '/images/vta.png',
      description: 'Technical and vocational training for various skilled trades'
    },
    {
      name: 'German Technical Training',
      image: '/images/german_tech.png',
      description: 'Advanced technical training with German standards'
    },
    {
      name: 'NTS - Nursing Training School',
      image: '/images/nts.png',
      description: 'Professional nursing training program'
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === institutes.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000); // Change every 5 seconds

    return () => clearInterval(interval);
  }, [institutes.length]);

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div className="institute-carousel">
      <div className="carousel-container">
        <div 
          className="carousel-track"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {institutes.map((institute, index) => (
            <div key={index} className="carousel-slide">
              <img 
                src={institute.image} 
                alt={institute.name}
                className="institute-image"
                onError={(e) => {
                  e.target.src = '/images/placeholder-institute.png';
                }}
              />
              <div className="institute-info">
                <h3>{institute.name}</h3>
                <p>{institute.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="carousel-indicators">
        {institutes.map((_, index) => (
          <button
            key={index}
            className={`indicator ${index === currentIndex ? 'active' : ''}`}
            onClick={() => goToSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default InstituteCarousel;
