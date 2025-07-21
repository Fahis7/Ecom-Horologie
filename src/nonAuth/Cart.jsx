import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../common/context/Authprovider";
import { useNavigate, Link } from "react-router-dom";
import { Trash2 } from "lucide-react";
import axios from "axios";

function Cart() {
  const { user, setUser } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user || !user.id) {
      navigate("/login");
    }
  }, [user, navigate]);

  useEffect(() => {
    const fetchUser = async () => {
      if (!user?.id) return;
      try {
        const res = await axios.get(`http://localhost:5000/users/${user.id}`);
        setUser(res.data);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch cart:", error);
        setLoading(false);
      }
    };
    fetchUser();
  }, [user?.id, setUser]);

  const updateCartInDB = async (updatedCart) => {
    try {
      const res = await axios.patch(`http://localhost:5000/users/${user.id}`, {
        cart: updatedCart,
      });
      if (res.status === 200) {
        setUser({ ...user, cart: updatedCart });
      }
      return true;
    } catch (error) {
      console.error("Failed to update cart:", error);
      return false;
    } finally {
      setUpdating(false);
    }
  };

  const handleRemove = async (id) => {
    setUpdating(true);
    const updatedCart = user.cart.filter((item) => item.id !== id);
    await updateCartInDB(updatedCart);
  };

  const handleQuantityChange = async (id, newQuantity) => {
    if (newQuantity < 1) {
      // If quantity would go to 0, remove the item instead
      await handleRemove(id);
      return;
    }

    setUpdating(true);
    const updatedCart = user.cart.map((item) =>
      item.id === id ? { ...item, quantity: newQuantity } : item
    );
    await updateCartInDB(updatedCart);
  };

  const getTotal = () => {
    return (
      user?.cart?.reduce((sum, item) => sum + item.price * item.quantity, 0) ||
      0
    );
  };

  const getTotalItems = () => {
    return user?.cart?.reduce((sum, item) => sum + item.quantity, 0) || 0;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <p className="font-serif text-gray-600">Loading your collection...</p>
      </div>
    );
  }

  if (!user || !user.cart || user.cart.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white p-8 text-center">
        <h2 className="text-3xl font-serif text-gray-900 mb-4">
          Your Collection Awaits
        </h2>
        <p className="text-gray-600 mb-8 max-w-md">
          Your curated selection is currently empty. Discover our exceptional
          timepieces.
        </p>
        <Link
          to="/products"
          className="px-8 py-3 bg-black text-white text-xs font-bold tracking-widest uppercase hover:bg-gray-800 transition-colors duration-300 border border-black"
        >
          Explore Collections
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white py-12 px-4 mt-10 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-3xl font-serif text-gray-900 mb-2 tracking-tight">
          Your Curated Collection
        </h1>
        <p className="text-gray-500">Total items: {getTotalItems()}</p>
      </div>

      {/* Main Content - Responsive Layout */}
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8">
        {/* Cart Items - Left Column */}
        <div className="lg:w-2/3">
          <div className="space-y-6">
            {user.cart.map((item) => (
              <div
                key={item.id}
                className="group flex flex-col sm:flex-row border border-gray-100 rounded-lg overflow-hidden bg-white hover:shadow-lg transition-all duration-300"
              >
                {/* Image with Enhanced Hover Effect */}
                <div className="sm:w-1/3 relative overflow-hidden h-48">
                  <div className="relative h-full w-full overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="absolute h-full w-full object-contain transition-all duration-500 group-hover:scale-110 group-hover:rotate-1"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-black/5 to-transparent"></div>
                  </div>
                </div>

                {/* Product Details */}
                <div className="sm:w-2/3 p-6 space-y-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-serif font-medium text-gray-900 tracking-tight">
                        {item.name}
                      </h3>
                      <span className="text-xs uppercase tracking-widest text-gray-500">
                        {item.brand}
                      </span>
                    </div>
                    <button
                      onClick={() => handleRemove(item.id)}
                      className="text-gray-400 hover:text-black transition-colors"
                      title="Remove"
                      disabled={updating}
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <p className="text-2xl font-serif text-gray-900">
                      ${(item.price * item.quantity).toLocaleString()}
                    </p>
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center border border-gray-200 rounded">
                        <button
                          className="px-3 py-1 text-gray-500 hover:text-gray-900 disabled:opacity-50"
                          onClick={() =>
                            handleQuantityChange(item.id, item.quantity - 1)
                          }
                          disabled={updating}
                        >
                          -
                        </button>
                        <span className="px-4">{item.quantity}</span>
                        <button
                          className="px-3 py-1 text-gray-500 hover:text-gray-900 disabled:opacity-50"
                          onClick={() =>
                            handleQuantityChange(item.id, item.quantity + 1)
                          }
                          disabled={updating}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Summary Card - Centered on Mobile, Right on Desktop */}
        <div className="lg:w-1/3">
          <div className="lg:sticky lg:top-28 mx-auto max-w-md lg:max-w-full">
            <div className="border border-gray-100 rounded-lg p-6 bg-white shadow-sm hover:shadow-md transition-shadow duration-300">
              <h2 className="text-xl font-serif text-gray-900 mb-6 text-center lg:text-left">
                Order Summary
              </h2>

              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-sm uppercase tracking-widest text-gray-500">
                    Items ({getTotalItems()})
                  </span>
                  <span className="font-serif text-gray-900">
                    ${getTotal().toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm uppercase tracking-widest text-gray-500">
                    Shipping
                  </span>
                  <span className="text-sm text-gold-600">COMPLIMENTARY</span>
                </div>
                <div className="border-t border-gray-100 pt-4"></div>
                <div className="flex justify-between font-serif text-lg">
                  <span>Total</span>
                  <span>${getTotal().toLocaleString()}</span>
                </div>
              </div>

              <button
                onClick={() =>
                  navigate("/payment", {
                    state: {
                      totalAmount: getTotal(),
                      cartItems: user.cart,
                      userId: user.id
                    }
                  })
                }
                className="w-full mt-6 px-6 py-3 bg-gray-700 text-white text-xs font-bold tracking-widest uppercase hover:bg-gray-800 transition-colors duration-300 border border-black disabled:opacity-50"
                disabled={updating || getTotalItems() === 0}
              >
                {updating ? "UPDATING..." : "SECURE CHECKOUT"}
              </button>

              <p className="text-xs text-gray-500 mt-4 text-center">
                Complimentary worldwide shipping & returns
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;