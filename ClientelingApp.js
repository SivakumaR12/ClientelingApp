import { useState } from 'react'
import { Mic, Search, Sparkles, User } from 'lucide-react'

const sampleProducts = [
  {
    name: "LG 55-inch 4K TV",
    price: "₹47,999",
    features: ["Smart TV", "HDR10", "AI Upscaling"],
    stock: true
  },
  {
    name: "Samsung Crystal UHD 55",
    price: "₹48,500",
    features: ["Crystal Display", "Voice Assistant", "3 HDMI Ports"],
    stock: true
  },
  {
    name: "Sony Bravia 55-inch",
    price: "₹49,990",
    features: ["X1 Processor", "Dolby Vision", "Android TV"],
    stock: true
  }
]

const customerProfile = {
  name: "Rajesh Kumar",
  lastVisited: "April 10, 2025",
  preferences: ["4K", "Smart TV", "Sony"],
  loyaltyTier: "Gold",
  wishlist: ["Sony Soundbar"]
}

export default function ClientelingApp() {
  const [query, setQuery] = useState("")
  const [response, setResponse] = useState("")

  const handleQuery = () => {
    if (query.toLowerCase().includes("tv")) {
      const suggestions = sampleProducts.map(
        (product) => `\n- ${product.name} (${product.price}): ${product.features.join(", ")}`
      )
      setResponse(
        `Here are top recommendations for 55-inch 4K TVs under ₹50,000:${suggestions.join("")}`
      )
    } else {
      setResponse("Let me fetch that information for you...")
    }
  }

  return (
    <div className="p-4 max-w-md mx-auto space-y-4">
      <h1 className="text-xl font-bold text-center">Roma Clienteling Assistant</h1>

      <div className="p-4 border rounded shadow">
        <div className="text-sm text-gray-600 mb-2 flex items-center">
          <User className="w-4 h-4 mr-2" />
          <span>Customer: <strong>{customerProfile.name}</strong> (Tier: {customerProfile.loyaltyTier})</span>
        </div>
        <div className="text-xs text-gray-500 mb-3">
          Preferences: {customerProfile.preferences.join(", ")} | Wishlist: {customerProfile.wishlist.join(", ")}
        </div>

        <div className="flex items-center gap-2 mb-3">
          <input
            className="border px-2 py-1 rounded flex-1"
            placeholder="Ask about a product, offer, or customer..."
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
    </div>
  )
}