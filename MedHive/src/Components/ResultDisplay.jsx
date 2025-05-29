import React from 'react';
import PostHome from "./PostHome";
import { Link } from 'react-router-dom';

function ResultDisplay({ results, hasSearched ,fetchProduits, divId}) {
  return (
    <div className="w-full">
      {hasSearched && (
        <div className="mb-4">
          <h2 className="text-lg font-semibold mb-2">
            {results.length > 0 
              ? `Found ${results.length} result${results.length === 1 ? '' : 's'}`
              : 'Search Results'}
          </h2>
          
          {results.length === 0 && (
            <div className="text-center bg-gray-50 rounded-lg p-8 border border-gray-200">
              <i className="fa-solid fa-magnifying-glass-minus text-gray-400 text-4xl mb-3"></i>
              <p className="text-gray-500">No products found matching your search</p>
              <p className="text-gray-400 text-sm mt-1">Try searching with different keywords</p>
            </div>
          )}
        </div>
      )}

      {results.length > 0 && (
        <div className="relative">
          <button
              className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg- bg-opacity-70 hover:bg-opacity-90 rounded-full p-2  transition-all duration-300 focus:outline-none"
              onClick={() => (document.getElementById(divId).scrollLeft -= 290)}
            >
              <i className="fa-solid fa-chevron-left text-green-600"></i>
            </button>
          <div 
            id={divId} 
            className="flex flex-row gap-3 overflow-x-scroll px-6 py-2 scroll-smooth" 
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {results.map((result, index) => (
              // <Link key={index} to={`/produits/${result.id}`} className="block hover:shadow-lg transition-shadow duration-300">
                  <div key={index} className="min-w-64 max-w-64 bg-white border border-gray-200 rounded-lg overflow-hidden h-full ">
                    <PostHome
                      imageSrc={result.imageSrc}
                      price={result.price}
                      product={result.product}
                      description={result.description}
                      name={result.name}
                      contact={result.contact}
                      id={result.id}
                      onDelete={() => fetchProduits()}
                      vendeur={result.vendeur?.id}
                    />
                  </div>
                // </Link>
              ))}
            </div>
            {/* Flèche droite avec meilleur style et positionnement */}
            <button
              className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-transparent bg-opacity-70 hover:bg-opacity-90 rounded-full p-2  transition-all duration-300 focus:outline-none"
              onClick={() => (document.getElementById(divId).scrollLeft += 290)}
            >
              <i className="fa-solid fa-chevron-right text-green-600"></i>
            </button>
          </div>
      )}
    </div>
  );
}

export default ResultDisplay;