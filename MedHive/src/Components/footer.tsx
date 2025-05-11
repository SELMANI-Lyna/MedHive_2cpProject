import { Link } from "react-router-dom";

const Footer: React.FC = () => {
  return (
    <div className="p-8 flex flex-col items-center">
      <Link
        to="/"
        className="text-2xl font-bold text-green-500 hover:text-green-700"
      >
        MedHive.com
      </Link>

      <div className="flex flex-row justify-around w-full mt-6 overflow-hidden">
        {/* À propos */}
        <div className="flex flex-col flex-1 basis-2/5 gap-4 p-6 justify-center">
          <p className="text-gray-500 text-sm">
            This website was created in 2025 by a group of students from ESTIN
            as part of their modulo project. It allows users to search for and
            buy non-prescription medicines from pharmacists and other customers,
            making medicine shopping easier and more accessible.
          </p>
          <div className="flex flex-row gap-3 justify-center text-lg">
            <i className="fa-brands fa-instagram"></i>
            <i className="fa-brands fa-facebook"></i>
            <i className="fa-brands fa-linkedin"></i>
            <i className="fa-brands fa-pinterest"></i>
          </div>
        </div>

        {/* Liens utiles */}
        <div className="flex flex-col flex-1 basis-1/5 gap-4 p-6 justify-center items-center">
          <Link to="/help-center" className="underline">
            Help center
          </Link>
          <Link to="/our-pharmacies" className="underline">
            Our Pharmacies
          </Link>
          <Link to="/colaborations" className="underline">
            Colaborations
          </Link>
          <Link to="/about-us" className="underline">
            About us
          </Link>
        </div>

        {/* Infos de contact */}
        <div className="flex flex-col flex-1 basis-2/5 gap-4 p-6 justify-center text-sm">
          <div className="flex items-center gap-2">
            <i className="fa-solid fa-location-dot"></i>
            <Link to="/amizour">
              Route nationale n°75, Amizour 06300 Béjaia
            </Link>
          </div>
          <div className="flex items-center gap-2">
            <i className="fa-solid fa-phone"></i>
            <Link to="/contact">0164_203_819_327</Link>
          </div>
          <div className="flex items-center gap-2">
            <i className="fa-solid fa-envelope"></i>
            <Link to="/amizour">xxxxxxxx@estin.dz</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
