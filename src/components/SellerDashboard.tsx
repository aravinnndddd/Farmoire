import React, { useState, useEffect } from 'react';
import { Plus, Pencil, Trash, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function SellerDashboard() {
  const [products, setProducts] = useState<any[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    unit: 'kg',
    stock: '',
    image: ''
  });
  const [editingProduct, setEditingProduct] = useState<any | null>(null);

  // Initialize useNavigate
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch products from the backend
    fetch('/products')
      .then((response) => response.json())
      .then((data) => setProducts(data));
  }, []);

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    fetch('/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newProduct),
    })
      .then((response) => response.json())
      .then((data) => {
        setProducts([...products, data]);
        setNewProduct({ name: '', price: '', unit: 'kg', stock: '', image: '' });
        setShowAddForm(false);
      });
  };

  const handleEditProduct = (product: any) => {
    setEditingProduct(product);
    setShowAddForm(true);
    setNewProduct(product); // Fill the form with the existing product data
  };

  const handleDeleteProduct = (id: string) => {
    fetch(`/products/${id}`, {
      method: 'DELETE',
    }).then(() => {
      setProducts(products.filter((product) => product.id !== id));
    });
  };

  const handleUpdateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    fetch(`/products/${editingProduct.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newProduct),
    })
      .then((response) => response.json())
      .then((data) => {
        setProducts(products.map((product) => (product.id === data.id ? data : product)));
        setEditingProduct(null);
        setNewProduct({ name: '', price: '', unit: 'kg', stock: '', image: '' });
        setShowAddForm(false);
      });
  };

  return (
    <div className="min-h-screen bg-green-50 py-12 px-4">
     <button
    onClick={() => navigate(-1)} // Navigate back to the previous page
    className="text-xl text-green-700 hover:text-white hover:bg-green-700  py-2 px-5 flex rounded-full m-auto  space-x-2 shadow-lg transform transition-all duration-300 ease-in-out hover:scale-105"
  >
    <ArrowLeft className="w-5 h-5" />
    <span>Back</span></button>
      
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800">Seller Dashboard</h1>
          <button
            onClick={() => {
              setShowAddForm(true);
              setEditingProduct(null); // Clear any existing product data when adding new
            }}
            className="bg-green-700 text-white text-xl px-6 py-3 rounded-lg hover:bg-green-800 flex items-center"
          >
            <Plus className="mr-2" /> Add Product
          </button>
        </div>

        {showAddForm && (
          <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
            <h2 className="text-2xl font-bold mb-6">{editingProduct ? 'Edit Product' : 'Add New Product'}</h2>
            <form onSubmit={editingProduct ? handleUpdateProduct : handleAddProduct} className="space-y-4">
              <div>
                <label className="block text-xl text-gray-700 mb-2">Product Name</label>
                <input
                  type="text"
                  value={newProduct.name}
                  onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                  className="w-full text-xl p-4 border-2 border-gray-300 rounded-lg"
                  required
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xl text-gray-700 mb-2">Price (₹)</label>
                  <input
                    type="number"
                    value={newProduct.price}
                    onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                    className="w-full text-xl p-4 border-2 border-gray-300 rounded-lg"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xl text-gray-700 mb-2">Stock</label>
                  <input
                    type="number"
                    value={newProduct.stock}
                    onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
                    className="w-full text-xl p-4 border-2 border-gray-300 rounded-lg"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-xl text-gray-700 mb-2">Image URL</label>
                <input
                  type="url"
                  value={newProduct.image}
                  onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
                  className="w-full text-xl p-4 border-2 border-gray-300 rounded-lg"
                  required
                />
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="text-xl px-6 py-3 rounded-lg border-2 border-gray-300 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-green-700 text-white text-xl px-6 py-3 rounded-lg hover:bg-green-800"
                >
                  {editingProduct ? 'Update Product' : 'Add Product'}
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-xl font-semibold text-gray-700">Product</th>
                <th className="px-6 py-4 text-left text-xl font-semibold text-gray-700">Price</th>
                <th className="px-6 py-4 text-left text-xl font-semibold text-gray-700">Stock</th>
                <th className="px-6 py-4 text-left text-xl font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {products.map((product) => (
                <tr key={product.id}>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="h-16 w-16 object-cover rounded"
                      />
                      <span className="ml-4 text-xl">{product.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-xl">₹{product.price}/{product.unit}</td>
                  <td className="px-6 py-4 text-xl">{product.stock}</td>
                  <td className="px-6 py-4">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEditProduct(product)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                      >
                        <Pencil className="h-6 w-6" />
                      </button>
                      <button
                        onClick={() => handleDeleteProduct(product.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                      >
                        <Trash className="h-6 w-6" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
