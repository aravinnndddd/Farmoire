import React from 'react';
import { ArrowLeft, ShoppingBasket } from 'lucide-react';
import { useNavigate } from 'react-router-dom'; // Use the useNavigate hook

export function Products() {
  const navigate = useNavigate(); // Initialize the navigate hook

  const products = [
    {
      name: 'Fresh Organic Tomatoes',
      farmer: 'Green Valley Farm',
      price: '₹399/kg',
      image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&q=80'
    },
    {
      name: 'Sweet Corn',
      farmer: 'Sunshine Fields',
      price: '₹60/piece',
      image: 'https://images.unsplash.com/photo-1551754655-cd27e38d2076?auto=format&fit=crop&q=80'
    },
    {
      name: 'Farm Fresh Eggs',
      farmer: 'Happy Hens Farm',
      price: '₹499/dozen',
      image: 'https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?auto=format&fit=crop&q=80'
    }
  ];

  return (
    <div className="min-h-screen bg-green-50 py-12">
      {/* Back Button */}
      <button
    onClick={() => navigate(-1)} // Navigate back to the previous page
    className="text-xl text-green-700 hover:text-white hover:bg-green-700  py-2 px-5 flex rounded-full m-auto  space-x-2 shadow-lg transform transition-all duration-300 ease-in-out hover:scale-105"
  >
    <ArrowLeft className="w-5 h-5" />
    <span>Back</span></button>
      
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-gray-800 mb-12">Available Products</h1>
    
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-56 object-cover"
              />
              <div className="p-6">
                <h3 className="text-2xl font-semibold mb-2">{product.name}</h3>
                <p className="text-xl text-gray-600 mb-4">{product.farmer}</p>
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-green-700">{product.price}</span>
                  <button className="bg-green-700 text-white text-xl px-6 py-3 rounded-lg hover:bg-green-800">
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
