import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-5xl font-bold text-white mb-6">
          Welcome to Products App
        </h1>
        <p className="text-xl text-gray-300 mb-8 max-w-2xl">
          A modern and intuitive products management application built with Next.js, TypeScript, and Tailwind CSS.
        </p>
        <div className="space-x-4">
          <Link 
            href="/products"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            View Products
          </Link>
          <Link 
            href="/create-product"
            className="bg-green-600 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-green-700 transition-colors"
          >
            Add Product
          </Link>
        </div>
      </div>
    </div>
  );
}