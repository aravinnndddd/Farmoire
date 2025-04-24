import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

interface LoginProps {
  isSeller: boolean;
}

export function Login({ isSeller }: LoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // For now, just redirect based on user type
    if (isSeller) {
      navigate('/seller/dashboard');
    } else {
      navigate('/products');
    }
  };

  return (
    <>
    <div className="h-[90vh] bg-green-50 flex items-center justify-center px-4">
   
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
          {isSeller ? 'Seller Login' : 'Customer Login'}
        </h2>
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-xl text-gray-700 mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full text-xl p-4 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:outline-none"
              placeholder="Enter your email"
              required
            />
          </div>
          <div>
            <label className="block text-xl text-gray-700 mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full text-xl p-4 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:outline-none"
              placeholder="Enter your password"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-green-700 text-white text-xl py-4 rounded-lg hover:bg-green-800 transition-colors"
          >
            Sign In
          </button>
        </form>
        
      </div>
      
    </div>
    <button
    onClick={() => navigate(-1)} // Navigate back to the previous page
    className="text-xl text-green-700 hover:text-white hover:bg-green-700  py-2 px-5 flex rounded-full m-auto  space-x-2 shadow-lg transform transition-all duration-300 ease-in-out hover:scale-105"
  >
    <ArrowLeft className="w-5 h-5" />
    <span>Back</span></button>
    </>
  );
}