'use client';

import { useParams, useRouter } from 'next/navigation';
import { useStore } from '../../../store/useStore';
import Link from 'next/link';

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { products, toggleLike, deleteProduct } = useStore();
  
  const productId = parseInt(params.id as string);
  const product = products.find(p => p.id === productId);

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Product not found</h1>
        <Link href="/products" className="text-blue-500 hover:text-blue-600">
          ← Back to Products
        </Link>
      </div>
    );
  }

  const handleDelete = () => {
    deleteProduct(product.id);
    router.push('/products');
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <Link 
        href="/products"
        className="text-blue-400 hover:text-blue-300 mb-6 inline-block transition-colors"
      >
        ← Back to Products
      </Link>

      <div className="bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-700">
        <div className="md:flex">
          <div className="md:flex-1">
            <img 
              src={product.image} 
              alt={product.title}
              className="w-full h-96 object-cover"
            />
          </div>
          
          <div className="md:flex-1 p-8">
            <div className="flex justify-between items-start mb-4">
              <h1 className="text-3xl font-bold text-white">{product.title}</h1>
              <button
                onClick={() => toggleLike(product.id)}
                className={`text-2xl ${product.isLiked ? 'text-red-500' : 'text-gray-400'} hover:scale-110 transition-transform`}
              >
                {product.isLiked ? '❤️' : '🤍'}
              </button>
            </div>
            
            <p className="text-green-400 text-2xl font-bold mb-6">${product.price}</p>
            
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-200 mb-2">Description</h2>
              <p className="text-gray-300 leading-relaxed">{product.description}</p>
            </div>
            
            <div className="flex space-x-4">
              <button
                onClick={handleDelete}
                className="flex-1 bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors font-semibold"
              >
                Delete Product
              </button>
              <Link 
                href="/products"
                className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors text-center font-semibold"
              >
                Back to Products
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}