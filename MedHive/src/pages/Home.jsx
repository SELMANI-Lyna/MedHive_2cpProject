import { useState, useEffect } from "react"
import ResultDisplay from "../Components/ResultDisplay"
import Carousel from "../Components/Carousel";
import Header from "../Components/header";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/AuthContext";
import medoc from "../images/medicine.webp"
import { FaTag } from "react-icons/fa";

function Home() {
  const [results, setResults] = useState([]);
  const [allResults, setAllResults] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { isAuthenticated } = useAuth();
  const [lastQuery, setLastQuery] = useState("");
  const navigate = useNavigate();

  const handleSell = () => {
    if (isAuthenticated) {
      navigate('/post');
    } else {
      alert('you need to be signed in to perform this action');
    }
  };

  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/produit/produits", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });

        if (!response.ok) throw new Error(`Erreur serveur: ${response.status}`);

        const data = await response.json();

        if (Array.isArray(data) && data.length === 0) {
          setAllResults([]);
          return;
        }
console.log(data);

        const formattedData = Array.isArray(data)
          ? data.map(product => ({
             imageSrc: product.photo ? `http://localhost:5000${product.photo}` : medoc,
              price: `${product.prix || 160} DZ`,
              product: product.nom || "Doliprane Paracetamol 1000mg",
              description: product.description || "used to treat mild to moderate pain. It can also be used to treat fever",
              name: product.vendeur?.nom || "El Amal",
              contact: product.vendeur?.telephone || "0677777777",
              id: product._id || "1",
              vendeur: product.vendeur || "2"
            }))
          : [];

        setAllResults(formattedData);
      } catch (error) {
        console.error("Error fetching search results:", error);
        setError(error.message || "Une erreur est survenue lors de la recherche");
        setAllResults([]);
      } finally {
        setLoading(false);
      }
    };

    fetchAllProducts();
  }, []);

  const handleSearch = async (query) => {
    if (!query || query.trim() === "") return;

    try {
      setLastQuery(query);
      setLoading(true);
      setHasSearched(true);
      setError(null);

      const encodedQuery = encodeURIComponent(query.trim());
      const endpoint = `http://localhost:5000/api/produit/produits/search/nom?nom=${encodedQuery}&exactMatch=false&limit=10`;

      const response = await fetch(endpoint);

      if (!response.ok) throw new Error(`Erreur serveur: ${response.status}`);

      const data = await response.json();

      if (Array.isArray(data) && data.length === 0) {
        setResults([]);
        return;
      }
console.log(data);

      const formattedData = Array.isArray(data)
        ? data.map(product => ({
            imageSrc: `http://localhost:5000/uploads/produits${product.photo}` ,
            price: `${product.prix || 160} DZ`,
            product: product.nom || "Doliprane Paracetamol 1000mg",
            description: product.description || "used to treat mild to moderate pain. It can also be used to treat fever",
            name: product.vendeur?.nom || "El Amal",
            contact: product.vendeur?.telephone || "0677777777",
            id: product._id || "1",
            vendeur: product.vendeur || "2"
          }))
        : [];

      setResults(formattedData);
    } catch (error) {
      console.error("Error fetching search results:", error);
      setError(error.message || "Une erreur est survenue lors de la recherche");
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  const handleFindNearestPharmacy = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const bingUrl = `https://www.bing.com/maps?q=pharmacies&cp=${latitude}~${longitude}&lvl=14`;
        window.open(bingUrl, "_blank");
      },
      () => {
        alert("Unable to retrieve your location.");
      }
    );
  };

  const fetchProduits = () => {
    handleSearch(lastQuery);
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="bg-custom-image">
        <Header onSearch={handleSearch} />
        <Carousel />
      </div>

      <div className="flex flex-row gap-10">
        <div className="flex-1 basis-1/3 flex-col space-y-6">
          <div className="sticky top-4" style={{ maxHeight: "calc(100vh - 2rem)" }}>
            <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100">
              <div className="bg-gradient-to-r from-green-300 to-green-600 p-2">
                <p className="text-xl font-bold text-white">Nearby Pharmacies</p>
              </div>

              <div className="p-4">
                <div className="rounded-lg overflow-hidden shadow-sm">
                  <iframe
                    src="https://www.bing.com/maps/embed?h=300&w=400&cp=36.750476~5.058373&lvl=13.7&typ=d&q=pharmacies+bejaya"
                    width="400"
                    height="300"
                    style={{ border: 0, overflow: 'hidden' }}
                    allowFullScreen
                    loading="lazy"
                    title="Pharmacies in Bejaia"
                  ></iframe>
                </div>

                <button
                  onClick={handleFindNearestPharmacy}
                  className="w-full mt-3 bg-green-100 hover:bg-green-200 text-green-700 font-medium py-2 px-4 rounded-md flex items-center justify-center transition-colors duration-200"
                >
                  <i className="fa-solid fa-location-crosshairs mr-2"></i>
                  Find nearest pharmacy
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1 basis-2/3 overflow-hidden">
          <div className="flex items-center justify-between mb-3">
            <button
              onClick={handleSell}
              className="px-15 py-1 font-bold rounded focus:outline-none disabled:bg-gray-400 disabled:cursor-not-allowed bg-green-400 hover:bg-green-700 text-white flex flex-row items-center gap-2"
            >
              <FaTag /> Sell Something
            </button>
            <p className="text-md text-gray-500 mx-5">Turn unused items into cash today! 💰</p>
          </div>

          {loading && (
            <div className="flex justify-center py-6">
              <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-green-500"></div>
            </div>
          )}

          {error && (
            <div className="text-center text-red-500 py-6">Error: {error}</div>
          )}

          {hasSearched && !loading && !error && (
            <ResultDisplay divId="scrollable1" results={results} hasSearched={hasSearched} fetchProduits={fetchProduits} />
          )}

          <div className="relative my-4">
            <h1 className="font-bold text-xl">Popular Products</h1>
            {!loading && !error && (
              <ResultDisplay divId="scrollable2" results={allResults} fetchProduits={fetchProduits} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
