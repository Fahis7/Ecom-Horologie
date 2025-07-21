import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import { ProductsApi } from "../../data/ApiEndPoints";
import { AuthContext } from "../../common/context/Authprovider";
import axios from "axios";
import { toast } from "react-hot-toast";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, setUser } = useContext(AuthContext);
  const [product, setProduct] = useState(null);
  const [fullscreenMedia, setFullscreenMedia] = useState(null);

  // ✅ Add to cart handler
  const handleAddCart = async () => {
    if (!user) {
      navigate("/login");
      return;
    }

    const existing = user.cart?.find((item) => item.id === product.id);

    let updatedCart;
    if (existing) {
      updatedCart = user.cart.map((item) =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    } else {
      updatedCart = [...(user.cart || []), { ...product, quantity: 1 }];
    }

    try {
      const res = await axios.patch(`http://localhost:5000/users/${user.id}`, {
        cart: updatedCart,
      });

      if (res.status === 200) {
        setUser({ ...user, cart: updatedCart });
        toast.success("Added to cart!");
      } else {
        toast.error("Failed to update cart.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong.");
    }
  };

  // ✅ Add to wishlist handler
  const handleAddWishlist = async () => {
    if (!user) {
      navigate("/login");
      return;
    }

    const exists = user.wishlist?.some((item) => item.id === product.id);

    if (exists) {
      toast.error("Already in wishlist.");
      return;
    }

    const updatedWishlist = [...(user.wishlist || []), product];

    try {
      const res = await axios.patch(`http://localhost:5000/users/${user.id}`, {
        wishlist: updatedWishlist,
      });

      if (res.status === 200) {
        setUser({ ...user, wishlist: updatedWishlist });
        toast.success("Added to wishlist!");
      } else {
        toast.error("Failed to update wishlist.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong.");
    }
  };

  useEffect(() => {
    fetch(`${ProductsApi}/${id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data));
  }, [id]);

  if (!product) return <div className="p-20 text-center">Loading...</div>;

  return (
    <>
      <div className="min-h-screen bg-white px-6 py-16 mt-14 flex items-center justify-center">
        <div className="max-w-6xl w-full flex flex-col md:flex-row items-center gap-16">
          {/* Left: Product Image */}
          <div className="w-full md:w-2/4">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-[600px] object-cover rounded-lg shadow-md"
            />
          </div>

          {/* Right: Product Info */}
          <div className="w-full md:w-1/2 space-y-6 text-center md:text-left">
            <h1 className="text-4xl font-serif text-gray-800">{product.name}</h1>
            <p className="text-2xl text-gold-600">
              ${product.price.toLocaleString()}
            </p>
            <p className="text-gray-600 text-sm">{product.description}</p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start pt-4">
              <button
                onClick={handleAddCart}
                className="px-6 py-3 bg-gray-700 hover:bg-gray-800 text-white uppercase tracking-wider opacity-85"
              >
                Add to Cart
              </button>

              <button
                onClick={handleAddWishlist}
                className="px-6 py-3 border border-black text-black hover:bg-gray-600 hover:text-white transition-all"
              >
                <FaHeart className="inline mr-2" />
                Add to Wishlist
              </button>
            </div>

            {/* Media Thumbnails */}
            <div className="pt-10 grid grid-cols-3 gap-4">
              <img
                src={product.gallery?.[0]}
                alt="View 1"
                className="w-full h-32 object-cover rounded cursor-pointer hover:scale-105 transition"
                onClick={() => setFullscreenMedia(product.gallery?.[0])}
              />
              <img
                src={product.gallery?.[1]}
                alt="View 2"
                className="w-full h-32 object-cover rounded cursor-pointer hover:scale-105 transition"
                onClick={() => setFullscreenMedia(product.gallery?.[1])}
              />
              <div
                className="relative w-full h-32 rounded cursor-pointer overflow-hidden hover:scale-105 transition"
                onClick={() => setFullscreenMedia(product.video)}
              >
                <video
                  src={product.video}
                  muted
                  loop
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <div className="bg-white/70 p-3 rounded-full shadow-md">
                    ▶
                  </div>
                </div>
              </div>
            </div>
            
            {/* Added text below thumbnails */}
            <div className="text-center text-sm text-gray-500 mt-2">
              Five year warranty • Swiss made
            </div>
          </div>
        </div>
      </div>

      {/* Fullscreen Modal */}
      {fullscreenMedia && (
        <div
          onClick={() => setFullscreenMedia(null)}
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center cursor-pointer"
        >
          {fullscreenMedia.endsWith(".mp4") ||
          fullscreenMedia.endsWith(".webm") ? (
            <video
              src={fullscreenMedia}
              autoPlay
              controls
              className="w-screen h-screen object-contain"
            />
          ) : (
            <img
              src={fullscreenMedia}
              alt="Preview"
              className="w-screen h-screen object-contain"
            />
          )}
        </div>
      )}
    </>
  );
};

export default ProductDetails;