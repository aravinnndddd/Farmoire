import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingBasket, Tractor } from 'lucide-react';

export function Home() {
  const navigate = useNavigate();

  return (
    <div 
      className="min-h-screen flex items-center justify-center"
      style={{
        backgroundImage: 'url("https://images.pexels.com/photos/2165688/pexels-photo-2165688.jpeg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    > 
 
      <div className="bg-black bg-opacity-50 min-h-screen w-full flex items-center justify-center">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-6xl font-bold text-white mb-8">
          <img src="./logo.png" width={100} className='m-auto'/>
            Welcome to Farmoire
          </h1>
          <p className="text-2xl text-white mb-12">
            Connect with local farmers for fresh produce
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button
              onClick={() => navigate('/login')}
              className="bg-green-600 text-white text-2xl px-12 py-6 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center"
            >
              <ShoppingBasket className="h-8 w-8 mr-3" />
              Buy Products
            </button>
            <button
              onClick={() => navigate('/seller/login')}
              className="bg-white text-green-700 text-2xl px-12 py-6 rounded-lg hover:bg-green-50 transition-colors flex items-center justify-center"
            >
              <Tractor className="h-8 w-8 mr-3" />
              Sell Products
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}