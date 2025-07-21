import React, { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Heart } from "lucide-react";
import { AuthContext } from "../context/Authprovider";
import axios from "axios";
import toast from "react-hot-toast";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);
  const { user, setUser } = useContext(AuthContext);
  const [isWished, setIsWished] = useState(false);

  // check wishlist state on mount and user change
  useEffect(() => {
    if (user && user.wishlist) {
      const found = user.wishlist.some((item) => item.id === product.id);
      setIsWished(found);
    }
  }, [user, product.id]);

  const handleWishList = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!user) {
      navigate("/login");
      return;
    }

    let updatedWishlist;

    if (isWished) {
      // Remove from wishlist
      updatedWishlist = user.wishlist.filter((item) => item.id !== product.id);
    } else {
      // Add to wishlist
      updatedWishlist = [...(user.wishlist || []), { ...product, quantity: 1 }];
    }

    try {
      const res = await axios.patch(`http://localhost:5000/users/${user.id}`, {
        wishlist: updatedWishlist,
      });

      if (res.status === 200) {
        setUser({ ...user, wishlist: updatedWishlist });
        setIsWished(!isWished);
        toast.success(isWished ? "Removed from wishlist" : "Added to wishlist");
      } else {
        toast.error("Failed to update wishlist.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong.");
    }
  };

  return (
    <Link to={`/product/${product.id}`}>
      <div
        className="group relative rounded-lg overflow-hidden bg-white hover:shadow-lg transition"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative border border-none rounded-lg overflow-hidden transition-all duration-500 group bg-white">
          {/* Heart icon */}
          <button
            onClick={handleWishList}
            className={`absolute top-4 right-4 z-10 p-2 rounded-full backdrop-blur-sm transition-all ${
              isHovered ? "opacity-100" : "opacity-0 group-hover:opacity-100"
            }`}
            aria-label="Toggle wishlist"
          >
            <Heart
              className={`w-5 h-5 cursor-pointer ${
                isWished
                  ? "fill-black stroke-black"
                  : "fill-none stroke-black"
              }`}
            />
          </button>

          {/* Product Image */}
          <div className="relative overflow-hidden h-64">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
          </div>

          {/* Product Info */}
          <div className="p-6 space-y-4">
            <div className="flex justify-between items-start">
              <h3 className="text-xl font-serif font-medium text-gray-900 tracking-tight">
                {product.name}
              </h3>
              <span className="text-xs uppercase tracking-widest text-gray-500 border-gray-200 pb-1">
                {product.brand}
              </span>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
              <p className="text-2xl font-serif text-gray-900">
                ${product.price.toLocaleString()}
              </p>
              <button className="px-6 py-2 bg-gray-700 text-white text-xs font-bold tracking-widest uppercase hover:bg-gray-800 transition-colors duration-300 opacity-85 rounded-b-xs">
                Acquire
              </button>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
