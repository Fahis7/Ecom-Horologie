import React, { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../common/context/Authprovider";
import axios from "axios";
import { Heart } from "lucide-react";

const Wishlist = () => {
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate()
  window.scrollTo(0, 0);

    useEffect(() => {
      if (!user || !user.id) {
        navigate("/login");
      }
    }, [user, navigate]);
  
  const handleRemove = async (productId) => {
    const updatedWishlist = user.wishlist.filter((item) => item.id !== productId);
    try {
      await axios.patch(`http://localhost:5000/users/${user.id}`, {
        wishlist: updatedWishlist,
      });
      setUser({ ...user, wishlist: updatedWishlist });
    } catch (error) {
      console.error("Error removing from wishlist:", error);
    }
  };

  return (
    <div className="min-h-screen bg-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <h1 className="text-3xl font-serif text-gray-900 mb-4 tracking-tight">
          Your Wishlist
        </h1>
        <div className="w-24 h-px bg-gray-300 mx-auto mb-6"></div>
        <p className="text-gray-500 max-w-2xl mx-auto">
          Horological aspirations, meticulously preserved.
        </p>
      </div>

      {!user?.wishlist || user.wishlist.length === 0 ? (
        <div className="flex flex-col items-center justify-center min-h-[50vh] text-center">
          <div className="mb-8">
            <svg
              className="w-16 h-16 mx-auto text-gray-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1"
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-serif text-gray-900 mb-4">
            No Wishlist Items
          </h2>
          <p className="text-gray-500 mb-8 max-w-md">
            Begin building your collection of exceptional timepieces
          </p>
          <Link
            to="/products"
            className="px-8 py-3 bg-black text-white text-xs font-bold uppercase tracking-widest hover:bg-gray-800 transition"
          >
            Explore Watches
          </Link>
        </div>
      ) : (
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {user.wishlist.map((item) => (
              <div
                key={item.id}
                className="relative group rounded-lg p-4 hover:shadow-lg transition overflow-hidden"
              >
                {/* Heart Button */}
                <button
                  onClick={() => handleRemove(item.id)}
                  className="absolute top-4 right-4 p-2 mr-2 z-10 cursor-pointer"
                  aria-label="Remove from wishlist"
                >
                  <Heart className="w-5 h-5 stroke-black fill-black" />
                </button>

                {/* Clickable Product Link */}
                <Link to={`/product/${item.id}`}>
                  {/* Product Image */}
                  <div className="h-56 flex items-center justify-center overflow-hidden bg-gradient-to-t from-black/30 to-transparent">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="object-contain h-full transition-transform duration-300 ease-in-out group-hover:scale-105"
                    />
                  </div>

                  {/* Product Info */}
                  <div className="mt-4 space-y-1">
                    <h3 className="text-lg font-serif font-semibold text-gray-900">
                      {item.name}
                    </h3>
                    <p className="text-sm text-gray-500">{item.brand}</p>
                    <p className="text-xl font-serif text-gray-900 mt-2">
                      ${item.price.toLocaleString()}
                    </p>
                  </div>
                </Link>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <Link
              to="/products"
              className="inline-block px-8 py-3 bg-gray-700 text-white text-xs font-bold uppercase tracking-widest hover:bg-gray-800 transition"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Wishlist;
