import React from 'react';
import PostHome from "./PostHome";
import { Link } from 'react-router-dom';

function ResultDisplay({ results, hasSearched ,fetchProduits}) {
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
        <div 
        id="scrollableDiv" 
        className="flex flex-row gap-3 overflow-x-scroll px-6 py-2 scroll-smooth" 
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {results.map((result, index) => (
            <Link key={index} to={`/produits/${result.id}`} className="block hover:shadow-lg transition-shadow duration-300">
              <div className="bg-white border border-gray-200 rounded-lg overflow-hidden h-full">
                <PostHome
                  imageSrc={result.imageSrc}
                  price={result.price}
                  product={result.product}
                  description={result.description}
                  name={result.name}
                  contact={result.contact}
                  id={result.id}
                  onDelete={() => fetchProduits()} 
                />
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default ResultDisplay;