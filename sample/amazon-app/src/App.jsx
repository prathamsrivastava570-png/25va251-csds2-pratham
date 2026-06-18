import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)


import { useState, useEffect, useRef } from "react";

const ALL_PRODUCTS = [
  { id: 1, name: "Apple iPhone 16 Pro", price: 124999, category: "Mobiles", img: "https://www.apple.com/newsroom/images/2024/09/apple-debuts-iphone-16-pro-and-iphone-16-pro-max/article/Apple-iPhone-16-Pro-hero-geo-240909_inline.jpg.large.jpg", rating: 4.8, reviews: 2341 },
  { id: 2, name: "Sony Headphones WH-CH720N", price: 2999, category: "Electronics", img: "https://sell.gameloot.in/wp-content/uploads/sites/4/2024/04/Sony-WH-CH720N-Wireless-Noise-Cancelling-Headphone-Blue.jpg", rating: 4.5, reviews: 876 },
  { id: 3, name: "MacBook Pro 14\"", price: 94999, category: "Electronics", img: "https://images.jdmagicbox.com/quickquotes/images_main/second-hand-apple-laptop-2222941756-q3g8s1h9.jpg", rating: 4.9, reviews: 1123 },
  { id: 4, name: "Smart Watch", price: 2999, category: "Electronics", img: "https://images.unsplash.com/photo-1523275335684-37898b6baf30", rating: 4.3, reviews: 654 },
  { id: 5, name: "Running Shoes", price: 2999, category: "Fashion", img: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcQ7m8qzKGcFVQaCRhAqWQdhDpWQ8htDRKMPJVW0awi2bXWU9jpSSEY_ovM0vEO3NwuKZODqeqILC90WKfG_z83cS4VwcvkrKdF-62_lLcFwyU2ILqDO4A0o8-s", rating: 4.2, reviews: 430 },
  { id: 6, name: "Backpack", price: 999, category: "Fashion", img: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcS4J0Gb_nG4fRJDI2k-PGQ7pGGIv6b01PuOdW-jSDo8XepLBj8YjkfuGxpJpzoZQdrh36Len439IgaQeUkNHcmAdkXuIj8TkVXfQDADzpCHxpQiRHDso6xYsA", rating: 4.1, reviews: 210 },
  { id: 7, name: "Digital Camera 4K", price: 9999, category: "Electronics", img: "https://www.mytrendyphone.eu/images/DC402-AF-4K-Kids-48MP-Digital-Camera-Auto-Focus-16X-Digital-Zoom-Vlogging-Camera-for-Teens-Light-PinkNone-25032024-00-p.webp", rating: 4.4, reviews: 389 },
  { id: 8, name: "DSLR Camera", price: 45999, category: "Electronics", img: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcRN5ebXI0U37dxNKejYV5eGHjcyBSUXhT-kK-ozDkWFHVTZMGg6VOzcE6CsFrWyfaqvEbAcb9JVRtomqUgOpp47dTXh1Xt_", rating: 4.7, reviews: 912 },
  { id: 9, name: "Mechanical Keyboard", price: 3999, category: "Electronics", img: "https://cdn.thewirecutter.com/wp-content/media/2025/12/BEST-MECHANICAL-KEYBOARDS-2048px-EVOWORKS-80-926.jpg?auto=webp&quality=75&width=1024", rating: 4.6, reviews: 567 },
  { id: 10, name: "Wireless Mouse", price: 799, category: "Electronics", img: "https://images.unsplash.com/photo-1527814050087-3793815479db", rating: 4.3, reviews: 345 },
  { id: 11, name: "Tablet", price: 18499, category: "Electronics", img: "https://images.unsplash.com/photo-1542751110-97427bbecf20", rating: 4.4, reviews: 788 },
];

const CATEGORIES = ["All", "Mobiles", "Electronics", "Fashion", "Home", "Deals"];

function Stars({ rating }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 2, marginBottom: 4 }}>
      {[1,2,3,4,5].map(s => (
        <span key={s} style={{ color: s <= Math.round(rating) ? "#f08804" : "#ccc", fontSize: 13 }}>★</span>
      ))}
      <span style={{ fontSize: 12, color: "#555", marginLeft: 4 }}>{rating}</span>
    </div>
  );
}

function Toast({ msg, onDone }) {
  useEffect(() => { const t = setTimeout(onDone, 1800); return () => clearTimeout(t); }, [onDone]);
  return (
    <div style={{
      position: "fixed", bottom: 30, left: "50%", transform: "translateX(-50%)",
      background: "#232f3e", color: "#fff", padding: "12px 28px",
      borderRadius: 8, fontWeight: 600, fontSize: 14, zIndex: 9999,
      boxShadow: "0 4px 16px rgba(0,0,0,0.25)", animation: "fadeIn 0.2s"
    }}>
      {msg}
    </div>
  );
}

function CartDrawer({ cart, onClose, onRemove, onQtyChange }) {
  const total = cart.reduce((s, i) => s + i.price * i.qty, 0);
  return (
    <div style={{
      position: "fixed", top: 0, right: 0, bottom: 0, width: 360,
      background: "#fff", boxShadow: "-4px 0 24px rgba(0,0,0,0.18)",
      zIndex: 1000, display: "flex", flexDirection: "column"
    }}>
      <div style={{ background: "#131921", color: "#fff", padding: "18px 20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontSize: 18, fontWeight: 700 }}>🛒 Your Cart ({cart.reduce((s,i)=>s+i.qty,0)})</span>
        <button onClick={onClose} style={{ background: "none", border: "none", color: "#fff", fontSize: 22, cursor: "pointer" }}>✕</button>
      </div>
      <div style={{ flex: 1, overflowY: "auto", padding: 16 }}>
        {cart.length === 0 ? (
          <div style={{ textAlign: "center", color: "#888", marginTop: 60, fontSize: 15 }}>
            <div style={{ fontSize: 48 }}>🛒</div>
            <p style={{ marginTop: 12 }}>Your cart is empty</p>
          </div>
        ) : cart.map(item => (
          <div key={item.id} style={{ display: "flex", gap: 12, marginBottom: 16, paddingBottom: 16, borderBottom: "1px solid #eee" }}>
            <img src={item.img} alt={item.name} style={{ width: 70, height: 70, objectFit: "cover", borderRadius: 6 }} />
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 600, fontSize: 13, marginBottom: 4 }}>{item.name}</div>
              <div style={{ color: "#B12704", fontWeight: 700, fontSize: 14 }}>₹{item.price.toLocaleString()}</div>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 8 }}>
                <button onClick={() => onQtyChange(item.id, -1)} style={{ width: 26, height: 26, border: "1px solid #ccc", borderRadius: 4, cursor: "pointer", background: "#f5f5f5", fontWeight: 700 }}>−</button>
                <span style={{ fontWeight: 600 }}>{item.qty}</span>
                <button onClick={() => onQtyChange(item.id, 1)} style={{ width: 26, height: 26, border: "1px solid #ccc", borderRadius: 4, cursor: "pointer", background: "#f5f5f5", fontWeight: 700 }}>+</button>
                <button onClick={() => onRemove(item.id)} style={{ marginLeft: 8, color: "#c45500", background: "none", border: "none", fontSize: 12, cursor: "pointer", textDecoration: "underline" }}>Remove</button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {cart.length > 0 && (
        <div style={{ padding: 16, borderTop: "1px solid #ddd" }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12, fontSize: 15 }}>
            <span>Subtotal ({cart.reduce((s,i)=>s+i.qty,0)} items):</span>
            <span style={{ fontWeight: 700, color: "#B12704" }}>₹{total.toLocaleString()}</span>
          </div>
          <button onClick={() => alert("Proceeding to checkout! Total: ₹" + total.toLocaleString())}
            style={{ width: "100%", padding: "12px", background: "#ffd814", border: "1px solid #fcd200", borderRadius: 8, fontWeight: 700, fontSize: 15, cursor: "pointer" }}>
            Proceed to Buy
          </button>
        </div>
      )}
    </div>
  );
}

function ProductCard({ product, onAddToCart }) {
  const [added, setAdded] = useState(false);
  const handleAdd = () => {
    onAddToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  };
  const discount = Math.floor(Math.random() * 20) + 5;
  const originalPrice = Math.round(product.price / (1 - discount / 100));
  return (
    <div style={{
      background: "#fff", borderRadius: 8, padding: 16, textAlign: "center",
      boxShadow: "0 2px 8px rgba(0,0,0,0.08)", transition: "transform 0.2s, box-shadow 0.2s",
      display: "flex", flexDirection: "column"
    }}
      onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.14)"; }}
      onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.08)"; }}
    >
      <div style={{ position: "relative" }}>
        <img src={product.img} alt={product.name} style={{ width: "100%", height: 180, objectFit: "cover", borderRadius: 6 }} />
        <span style={{ position: "absolute", top: 8, left: 8, background: "#cc0c39", color: "#fff", fontSize: 11, fontWeight: 700, padding: "3px 7px", borderRadius: 4 }}>-{discount}%</span>
      </div>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", marginTop: 10 }}>
        <h3 style={{ fontSize: 14, fontWeight: 600, marginBottom: 6, lineHeight: 1.4 }}>{product.name}</h3>
        <Stars rating={product.rating} />
        <span style={{ fontSize: 11, color: "#888", marginBottom: 6 }}>{product.reviews.toLocaleString()} ratings</span>
        <div style={{ marginBottom: 10 }}>
          <span style={{ fontWeight: 700, color: "#B12704", fontSize: 16 }}>₹{product.price.toLocaleString()}</span>
          <span style={{ textDecoration: "line-through", color: "#888", fontSize: 12, marginLeft: 8 }}>₹{originalPrice.toLocaleString()}</span>
        </div>
        <span style={{ fontSize: 11, color: "#007600", marginBottom: 10 }}>✓ In Stock · FREE Delivery</span>
        <button onClick={handleAdd} style={{
          marginTop: "auto", padding: "9px 12px",
          background: added ? "#5cb85c" : "#ffd814",
          border: added ? "1px solid #4cae4c" : "1px solid #fcd200",
          cursor: "pointer", borderRadius: 6, fontWeight: 700, fontSize: 13,
          transition: "background 0.2s", color: added ? "#fff" : "#111"
        }}>
          {added ? "✓ Added!" : "Add to Cart"}
        </button>
      </div>
    </div>
  );
}

export default function App() {
  const [cart, setCart] = useState([]);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [cartOpen, setCartOpen] = useState(false);
  const [toast, setToast] = useState(null);
  const [sortBy, setSortBy] = useState("default");
  const searchRef = useRef();

  const handleSearch = () => setQuery(search.trim().toLowerCase());
  const handleKey = e => { if (e.key === "Enter") handleSearch(); };

  const addToCart = (product) => {
    setCart(prev => {
      const exists = prev.find(i => i.id === product.id);
      if (exists) return prev.map(i => i.id === product.id ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { ...product, qty: 1 }];
    });
    setToast(`"${product.name}" added to cart!`);
  };

  const removeFromCart = id => setCart(prev => prev.filter(i => i.id !== id));
  const changeQty = (id, delta) => setCart(prev =>
    prev.map(i => i.id === id ? { ...i, qty: Math.max(1, i.qty + delta) } : i)
  );

  let filtered = ALL_PRODUCTS
    .filter(p => category === "All" || p.category === category)
    .filter(p => !query || p.name.toLowerCase().includes(query) || p.category.toLowerCase().includes(query));

  if (sortBy === "lowHigh") filtered = [...filtered].sort((a, b) => a.price - b.price);
  else if (sortBy === "highLow") filtered = [...filtered].sort((a, b) => b.price - a.price);
  else if (sortBy === "rating") filtered = [...filtered].sort((a, b) => b.rating - a.rating);

  const cartCount = cart.reduce((s, i) => s + i.qty, 0);

  return (
    <div style={{ fontFamily: "Arial, Helvetica, sans-serif", background: "#e3e6e6", minHeight: "100vh" }}>
      <style>{`@keyframes fadeIn{from{opacity:0;transform:translateX(-50%) translateY(10px)}to{opacity:1;transform:translateX(-50%) translateY(0)}}`}</style>

      {/* Header */}
      <header style={{ background: "#131921", color: "#fff", display: "flex", alignItems: "center", padding: "10px 20px", gap: 16, flexWrap: "wrap" }}>
        <div style={{ fontSize: 28, fontWeight: 700, color: "#f08804", cursor: "pointer" }} onClick={() => { setQuery(""); setSearch(""); setCategory("All"); }}>
          amazon
        </div>
        <div style={{ flex: 1, display: "flex", minWidth: 200 }}>
          <input ref={searchRef} type="text" value={search}
            onChange={e => setSearch(e.target.value)} onKeyDown={handleKey}
            placeholder="Search Amazon"
            style={{ width: "100%", padding: "10px 14px", border: "none", outline: "none", fontSize: 15, borderRadius: "4px 0 0 4px" }} />
          <button onClick={handleSearch}
            style={{ padding: "10px 18px", border: "none", background: "#febd69", cursor: "pointer", fontWeight: 700, borderRadius: "0 4px 4px 0", fontSize: 15 }}>
            🔍
          </button>
        </div>
        <div onClick={() => setCartOpen(true)} style={{ fontWeight: 700, cursor: "pointer", whiteSpace: "nowrap", display: "flex", alignItems: "center", gap: 6, padding: "8px 14px", border: "1px solid transparent", borderRadius: 4 }}
          onMouseEnter={e => e.currentTarget.style.border = "1px solid #fff"}
          onMouseLeave={e => e.currentTarget.style.border = "1px solid transparent"}>
          🛒 Cart
          <span style={{ background: "#f08804", color: "#fff", borderRadius: "50%", width: 22, height: 22, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700 }}>
            {cartCount}
          </span>
        </div>
      </header>

      {/* Nav */}
      <nav style={{ background: "#232f3e", padding: "8px 20px", display: "flex", gap: 4, flexWrap: "wrap" }}>
        {CATEGORIES.map(cat => (
          <button key={cat} onClick={() => setCategory(cat)} style={{
            color: "#fff", background: category === cat ? "rgba(255,255,255,0.15)" : "none",
            border: category === cat ? "1px solid #fff" : "1px solid transparent",
            padding: "5px 14px", borderRadius: 4, cursor: "pointer", fontSize: 13, fontWeight: category === cat ? 600 : 400
          }}>
            {cat}
          </button>
        ))}
      </nav>

      {/* Banner */}
      <div style={{
        width: "100%", height: 140, background: "linear-gradient(135deg, #232f3e 0%, #37475a 50%, #131921 100%)",
        display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column"
      }}>
        <div style={{ color: "#febd69", fontSize: 26, fontWeight: 700 }}>🛍️ Great Indian Sale</div>
        <div style={{ color: "#fff", fontSize: 14, marginTop: 6 }}>Up to 70% off on top brands · Free delivery on eligible orders</div>
      </div>

      {/* Sort + result count */}
      <div style={{ padding: "14px 20px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 10 }}>
        <span style={{ fontSize: 14, color: "#555" }}>
          {query ? `Results for "${query}" · ` : ""}{filtered.length} product{filtered.length !== 1 ? "s" : ""}
          {category !== "All" ? ` in ${category}` : ""}
        </span>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: 13, color: "#555" }}>Sort by:</span>
          <select value={sortBy} onChange={e => setSortBy(e.target.value)}
            style={{ padding: "6px 10px", border: "1px solid #ccc", borderRadius: 4, fontSize: 13, cursor: "pointer" }}>
            <option value="default">Featured</option>
            <option value="lowHigh">Price: Low to High</option>
            <option value="highLow">Price: High to Low</option>
            <option value="rating">Avg. Customer Review</option>
          </select>
        </div>
      </div>

      {/* Products */}
      <main style={{ padding: "0 20px 20px" }}>
        {filtered.length === 0 ? (
          <div style={{ textAlign: "center", padding: "60px 20px", color: "#555" }}>
            <div style={{ fontSize: 48 }}>🔍</div>
            <h2 style={{ marginTop: 16, fontSize: 20 }}>No results for "{query}"</h2>
            <p style={{ marginTop: 8, fontSize: 14 }}>Try checking your spelling or use more general terms.</p>
            <button onClick={() => { setQuery(""); setSearch(""); }} style={{ marginTop: 16, padding: "10px 24px", background: "#ffd814", border: "1px solid #fcd200", borderRadius: 8, cursor: "pointer", fontWeight: 700 }}>
              Clear Search
            </button>
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 20 }}>
            {filtered.map(p => <ProductCard key={p.id} product={p} onAddToCart={addToCart} />)}
          </div>
        )}
      </main>

      {/* Footer */}
      <div style={{ background: "#37475a", color: "#fff", textAlign: "center", padding: "14px", fontSize: 14, cursor: "pointer" }}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
        ↑ Back to top
      </div>
      <footer style={{ background: "#232f3e", color: "#fff", padding: "40px 60px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 30, marginBottom: 30 }}>
          {[
            { title: "Get to Know Us", links: ["About Amazon", "Careers", "Press Releases", "Amazon Science"] },
            { title: "Connect with Us", links: ["Facebook", "Twitter", "Instagram"] },
            { title: "Make Money with Us", links: ["Sell on Amazon", "Become an Affiliate", "Advertise Your Products", "Amazon Pay"] },
            { title: "Let Us Help You", links: ["Your Account", "Returns Centre", "Help", "Amazon App Download"] },
          ].map(col => (
            <div key={col.title}>
              <h4 style={{ marginBottom: 12, fontSize: 15 }}>{col.title}</h4>
              {col.links.map(l => <a key={l} href="#" style={{ display: "block", color: "#ddd", textDecoration: "none", fontSize: 13, marginBottom: 6 }}>{l}</a>)}
            </div>
          ))}
        </div>
        <div style={{ borderTop: "1px solid #3a4553", paddingTop: 20, textAlign: "center", color: "#ccc", fontSize: 13 }}>
          🌐 English &nbsp;|&nbsp; 🇮🇳 India
        </div>
      </footer>
      <div style={{ background: "#131a22", color: "#ccc", textAlign: "center", padding: 16, fontSize: 12 }}>
        © 1996–2026, Amazon.com, Inc. or its affiliates
      </div>

      {/* Cart Drawer */}
      {cartOpen && (
        <>
          <div onClick={() => setCartOpen(false)} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.4)", zIndex: 999 }} />
          <CartDrawer cart={cart} onClose={() => setCartOpen(false)} onRemove={removeFromCart} onQtyChange={changeQty} />
        </>
      )}

      {/* Toast */}
      {toast && <Toast msg={toast} onDone={() => setToast(null)} />}
    </div>
  );
}
