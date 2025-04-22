import { useState, useEffect } from 'react';
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

    // Dummy GPT Assistant Simulation
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
    <div className="p-4 max-w-2xl mx-auto space-y-4">
      <h1 className="text-xl font-bold text-center">Roma Clienteling Assistant</h1>

      <div className="p-4 border rounded shadow">
        <div className="text-sm text-gray-600 mb-2 flex items-center">
          <User className="w-4 h-4 mr-2" />
          <span>Customer: <strong>{customerProfile.name}</strong> (Tier: {customerProfile.loyaltyTier})</span>
        </div>
        <div className="text-xs text-gray-500 mb-3">
          Preferences: {customerProfile.preferences.join(', ')} | Wishlist: {customerProfile.wishlist.join(', ')}
        </div>

        <div className="flex items-center gap-2 mb-3">
          <input
            className="border px-2 py-1 rounded flex-1"
            placeholder="Ask about TVs, mobiles, etc."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button onClick={handleQuery} className="bg-black text-white px-3 py-1 rounded flex items-center">
            <Search className="w-4 h-4 mr-1" /> Ask
          </button>
          <button className="border px-2 py-1 rounded"><Mic className="w-4 h-4" /></button>
        </div>

        {response && (
          <div className="p-3 bg-gray-100 rounded-md text-sm whitespace-pre-wrap">
            <Sparkles className="w-4 h-4 inline mr-2 text-purple-500" />
            {response}
          </div>
        )}
      </div>

      {/* Product Results */}
      {products.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Matching Products:</h2>
          {products.map(product => (
            <div key={product.id} className="p-3 border rounded-md shadow-sm">
              <p className="font-bold">{product.title}</p>
              <p className="text-sm text-gray-600">Brand: {product.brand}</p>
              <p className="text-sm text-gray-600">Price: ₹{Math.round(product.price * 85)}</p>
              <p className="text-xs mt-1">{product.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
