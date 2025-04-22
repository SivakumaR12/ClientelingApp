import { useState } from 'react';
import { Mic, Search, Sparkles, User } from 'lucide-react';

const customerProfile = {
  name: 'Rajesh Kumar',
  lastVisited: 'April 10, 2025',
  preferences: ['4K', 'Smart TV', 'Sony'],
  loyaltyTier: 'Gold',
  wishlist: ['Sony Soundbar'],
};

export default function ClientelingApp() {
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState('');
  const [products, setProducts] = useState([]);

  const handleQuery = async () => {
    setResponse('Thinking...');

    if (query.toLowerCase().includes('tv')) {
      const res = await fetch('https://dummyjson.com/products/search?q=tv');
      const data = await res.json();
      setProducts(data.products);
      setResponse(`I found ${data.products.length} products related to “TV”. Scroll down to explore.`);
    } else {
      setProducts([]);
      setResponse("I'm still learning about that. Try asking about TVs or phones!");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-6 px-4 sm:px-8 md:px-12">
      <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">
        Roma Clienteling Assistant
      </h1>

      {/* Customer Info Card */}
      <div className="bg-white p-5 rounded-2xl shadow-lg mb-6 border border-gray-200">
        <div className="text-sm text-gray-500 mb-1 flex items-center">
          <User className="w-4 h-4 mr-2 text-gray-400" />
          Customer: <strong className="text-gray-700 ml-1">{customerProfile.name}</strong>
        </div>
        <div className="text-xs text-gray-400 mb-2">
          Tier: <span className="font-semibold text-yellow-600">{customerProfile.loyaltyTier}</span><br />
          Preferences: {customerProfile.preferences.join(', ')} | Wishlist: {customerProfile.wishlist.join(', ')}
        </div>

        {/* Input and Buttons */}
        <div className="flex gap-2 mt-3">
          <input
            className="border border-gray-300 px-4 py-2 rounded-lg flex-1 focus:outline-none focus:ring-2 focus:ring-purple-400 shadow-sm"
            placeholder="Ask about TVs, phones, etc."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button
            onClick={handleQuery}
            className="bg-purple-600 text-white px-4 py-2 rounded-lg shadow hover:bg-purple-700 transition"
          >
            <Search className="w-4 h-4 inline mr-1" /> Ask
          </button>
          <button className="border border-gray-300 px-3 py-2 rounded-lg hover:bg-gray-100 transition">
            <Mic className="w-4 h-4" />
          </button>
        </div>

        {/* Assistant Response */}
        {response && (
          <div className="mt-4 p-4 bg-gray-100 rounded-lg border text-sm text-gray-700">
            <Sparkles className="w-4 h-4 inline mr-2 text-purple-500" />
            {response}
          </div>
        )}
      </div>

      {/* Product Suggestions */}
      {products.length > 0 && (
        <div className="space-y-5 mt-6">
          <h2 className="text-lg font-semibold text-gray-800">Matching Products:</h2>
          {products.map(product => (
            <div key={product.id} className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
              <p className="text-base font-semibold text-gray-800">{product.title}</p>
              <p className="text-sm text-gray-500">Brand: {product.brand}</p>
              <p className="text-sm text-gray-600 font-medium">Price: ₹{Math.round(product.price * 85)}</p>
              <p className="text-xs text-gray-400 mt-2">{product.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
