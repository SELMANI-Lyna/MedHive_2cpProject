import React, { useRef } from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Img1 from "../images/medoc.png";
import Img2 from "../images/mapp.png";
import Img3 from "../images/bot.png";
import { useAuth } from '../hooks/AuthContext';
import { useNavigate } from 'react-router-dom';
const Carousel = () => {
  // Référence pour accéder aux méthodes du carrousel
  const sliderRef = useRef(null);

  // Fonction pour naviguer vers la diapositive précédente
  const goToPrev = () => {
    if (sliderRef.current) {
      sliderRef.current.slickPrev();
    }
  };

  // Fonction pour naviguer vers la diapositive suivante
  const goToNext = () => {
    if (sliderRef.current) {
      sliderRef.current.slickNext();
    }
  };

  // Configuration du carrousel
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false, // Désactiver les flèches par défaut
    dotsClass: "slick-dots custom-dots", // Classe personnalisée pour les points
    appendDots: dots => (
      <div style={{ 
        position: "absolute",
        bottom: "10px",
        width: "100%",
        padding: "0",
        margin: "0",
        listStyle: "none",
        textAlign: "center"
      }}>
        <ul className="flex justify-center items-center gap-2">{dots}</ul>
      </div>
    ),
    customPaging: i => (
      <div className="w-3 h-3 bg-white opacity-50 rounded-full transition-all duration-300 hover:opacity-100 hover:scale-125 hover:bg-green-500"></div>
    )
  };
  const {isAuthenticated} =useAuth();
  const navigate =useNavigate();
  const handleChat = () => {
    if (isAuthenticated) {
      navigate('/chatbot');
    } else {
      navigate('/loginchatbot');
      alert('You need to be signed in to perform this action');
    }
  };
  const handleFindNearestPharmacy = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const bingUrl = `https://www.bing.com/maps?q=pharmacies&cp=${latitude}~${longitude}&lvl=14`;
        window.open(bingUrl, "_blank");
      },
      (error) => {
        alert("Unable to retrieve your location.");
      }
    );
  };
  return (
    <div className="w-full md:h-[40vh] relative bg-gray-50 mb-8">
      
      <Slider ref={sliderRef} {...settings}>
        {/* Slide 1 */}
        <div className="h-[40vh] bg-gradient-to-r from-green-100 via-white to-blue-100">
          <div className="flex flex-col md:flex-row items-center justify-between px-10 h-full">
            <div className="md:w-1/2 text-center md:text-left">
              <h2 className="text-4xl font-bold text-green-800 mb-4">Welcome to Medhive</h2>
              <p className="text-lg text-gray-700 mb-6">Search for medicines easily and join us as a seller or a pharmacy to help others find what they need faster.</p>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <img src={Img1} alt="Welcome" className="max-h-64 object-contain" />
            </div>
          </div>
        </div>

        {/* Slide 2 */}
        <div className="h-[40vh] bg-gradient-to-r from-blue-100 via-white to-purple-100">
          <div className="flex flex-col md:flex-row items-center justify-between px-10 h-full">
            <div className="md:w-1/2 text-center md:text-left">
              <h2 className="text-4xl font-bold text-blue-800 mb-4">Find Nearby Pharmacies</h2>
              <p className="text-lg text-gray-700 mb-6">Use your current location or enter an address to locate the nearest pharmacy that has your medicine in stock.</p>
              <button onClick={handleFindNearestPharmacy} className="bg-blue-600 text-white px-12 py-1 rounded-full">Try Now</button>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <img src={Img2} alt="Location Search" className="max-h-64 object-contain" />
            </div>
          </div>
        </div>

        {/* Slide 3 */}
        <div className="h-[40vh] bg-gradient-to-r from-yellow-100 via-white to-orange-100">
          <div className="flex flex-col md:flex-row items-center justify-between px-10 h-full">
            <div className="md:w-1/2 text-center md:text-left">
              <h2 className="text-4xl font-bold text-yellow-800 mb-4">Need Help?</h2>
              <p className="text-lg text-gray-700 mb-6">Chat with our assistant bot for any issues you face during your search or use of Medhive. We're here to support you 24/7!</p>
              <button onClick={handleChat} className="bg-yellow-600 text-white px-12 py-1 rounded-full">Chat Now</button>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <img src={Img3} alt="Chat Bot Help" className="max-h-64 object-contain" />
            </div>
          </div>
        </div>
      </Slider>

      {/* Boutons de navigation sur les côtés */}
      <button 
        onClick={goToPrev} 
        className="absolute top-1/2 left-4 transform -translate-y-1/2 w-10 h-10 rounded-full bg-transparent bg-opacity-60 hover:bg-opacity-90 shadow-md flex items-center justify-center transition-all duration-300 z-10"
        aria-label="Previous slide"
      >
        <i className="fa-solid fa-chevron-left text-green-700"></i>
      </button>
      
      <button 
        onClick={goToNext}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 w-10 h-10 rounded-full bg-transparent bg-opacity-60 hover:bg-opacity-90 shadow-md flex items-center justify-center transition-all duration-300 z-10"
        aria-label="Next slide"
      >
        <i className="fa-solid fa-chevron-right text-green-700"></i>
      </button>

      {/* Zones cliquables pour navigation latérale */}
      <div 
        className="absolute top-0 left-0 w-1/5 h-full z-0 cursor-pointer opacity-0"
        onClick={goToPrev}
        aria-hidden="true"
      ></div>
      
      <div 
        className="absolute top-0 right-0 w-1/5 h-full z-0 cursor-pointer opacity-0"
        onClick={goToNext}
        aria-hidden="true"
      ></div>

      {/* Ajouter du CSS personnalisé pour les points */}
      <style jsx>{`
        :global(.custom-dots li) {
          margin: 0 4px;
        }
        :global(.custom-dots li.slick-active div) {
          background-color: #16a34a;
          opacity: 1;
          transform: scale(1.2);
          width: 10px;
          height: 10px;
        }
      `}</style>
    </div>
  );
};

export default Carousel;