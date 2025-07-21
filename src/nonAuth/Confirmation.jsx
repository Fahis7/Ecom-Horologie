import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../common/context/Authprovider";
import axios from "axios";

const AnimatedTick = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        marginBottom: "2rem",
      }}
    >
      <div
        style={{
          width: "80px",
          height: "80px",
          borderRadius: "50%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          border: "1px solid black",
          animation:
            "scaleIn 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards",
        }}
      >
        <svg
          width="36"
          height="36"
          viewBox="0 0 24 24"
          style={{ overflow: "visible" }}
        >
          <path
            d="M5 13l4 4L19 7"
            fill="none"
            stroke="black"
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray="24"
            strokeDashoffset="24"
            style={{ animation: "draw 0.6s ease-out 0.4s forwards" }}
          />
        </svg>
      </div>
      <style>
        {`
          @keyframes scaleIn {
            0% { transform: scale(0); opacity: 0; }
            70% { transform: scale(1.1); }
            100% { transform: scale(1); opacity: 1; }
          }
          @keyframes draw {
            to { stroke-dashoffset: 0; }
          }
        `}
      </style>
    </div>
  );
};

const Confirmation = () => {
  const [totalAmount, settotalamount] = useState(0);
  const navigate = useNavigate();
  const { setCartCount } = useContext(AuthContext);
  const clearCart = async () => {
    try {
      // Clear cart in db.json
      await axios.patch(`http://localhost:5000/users/${user.id}`, { cart: [] });
      setCartCount(0);
      // Clear local storage if you're using it
    } catch (error) {
      console.error("Error clearing cart:", error);
      throw error;
    }
  };

  useEffect(() => {
    const fetchOrderSum = async () => {
      try {
        const response = await fetch(`http://localhost:5000/users/${user.id}`);
        const data = await response.json();
        const orders = data.cart || [];

        const totalSum = orders.reduce(
          (sum, item) => sum + Number(item.price*item.quantity || 0),
          0
        );

        settotalamount(totalSum);
        console.log("Order Total:", totalSum);

        // ✅ Clear cart immediately after fetching total
        await clearCart();
      } catch (error) {
        console.error("Failed to fetch orders:", error);
      }
    };

    fetchOrderSum();
  }, []);

  const user = JSON.parse(localStorage.getItem("user"));
  useEffect(() => {
    if (!user) {
      navigate("/"); // Redirect to home if accessed directly without state
    }
  }, []);

  return (
    <div className="min-h-screen bg-black flex">
      {/* Video Panel */}
      <div className="hidden md:block w-2/5 relative h-screen overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black opacity-70 z-10"></div>
        <video autoPlay loop muted className="w-full h-full object-cover">
          <source
            src="https://media.rolex.com/video/upload/c_limit,q_auto:eco,w_2880/vc_vp9/v1/rolexcom/new-watches/2025/watches/new-dials/videos/player-expand/long-film/new-watches-2025-new-dials-presentation-long-film.webm"
            type="video/webm"
          />
        </video>
        <div className="absolute bottom-1/4 left-0 right-0 z-20 px-8 text-center">
          <p className="text-platinum text-white font-light tracking-widest text-lg mb-2">
            "YOUR LEGACY BEGINS NOW"
          </p>
          <p className="text-gold text-white text-xs font-light opacity-80">
            - Master Horologist
          </p>
        </div>
      </div>

      {/* Confirmation Content */}
      <div className="w-full md:w-3/5 bg-white flex items-center justify-center p-8">
        <div className="max-w-md w-full text-center">
          <AnimatedTick />
          <h2 className="text-2xl font-thin tracking-widest text-charcoal mb-2">
            ACQUISITION CONFIRMED
          </h2>
          <p className="text-xs font-light text-charcoal opacity-70 mb-6">
            Your investment is secured
          </p>

          <div className="mb-8">
            <p className="text-sm font-light text-charcoal mb-4 leading-relaxed">
              We are honored by your trust in our craftsmanship. Your timepiece
              is being prepared with the utmost care and will soon begin its
              journey to you.
            </p>
            <p className="text-xs font-light text-gold italic">
              "True luxury is measured in moments, not minutes"
            </p>
          </div>

          <div className="border-t border-platinum pt-4 mb-6">
            <div className="flex justify-between text-xs font-light text-charcoal mb-2">
              <span>Reference Number</span>
              <span>CHR-{Math.floor(100000 + Math.random() * 900000)}</span>
            </div>
            <div className="flex justify-between text-xs font-light text-charcoal mb-2">
              <span>Estimated Delivery</span>
              <span>5-7 business days</span>
            </div>
            <div className="flex justify-between text-sm font-light text-charcoal mt-4 pt-2 border-t border-platinum">
              <span>Total Investment</span>
              <span>${totalAmount}</span>
            </div>
          </div>

          <div className="mb-8 text-left">
            <h3 className="text-xs font-light text-charcoal tracking-widest mb-2">
              NEXT STEPS
            </h3>
            <ul className="text-xs font-light text-charcoal space-y-2">
              <li className="flex items-start">
                <span className="inline-block w-1 h-1 bg-gold rounded-full mt-1.5 mr-2"></span>
                <span>
                  You'll receive a confirmation email with tracking details
                </span>
              </li>
              <li className="flex items-start">
                <span className="inline-block w-1 h-1 bg-gold rounded-full mt-1.5 mr-2"></span>
                <span>Our concierge will contact you to arrange delivery</span>
              </li>
              <li className="flex items-start">
                <span className="inline-block w-1 h-1 bg-gold rounded-full mt-1.5 mr-2"></span>
                <span>
                  Five-year international warranty documentation will accompany
                  your timepiece
                </span>
              </li>
            </ul>
          </div>

          <div className="flex gap-4">
  <button
    onClick={() => navigate("/")}
    className="w-1/2 bg-gray-700 text-white py-2 px-4 text-xs font-light tracking-widest hover:bg-gray-800 transition-all duration-300"
  >
    RETURN TO HOROLOGIE
  </button>

  <button
    onClick={() => navigate("/orders")}
    className="w-1/2 bg-gray-700 text-white py-2 px-4 text-xs font-light tracking-widest hover:bg-gray-800 transition-all duration-300"
  >
    VIEW ORDERS
  </button>
</div>


          <div className="mt-6 text-xxs font-light text-charcoal opacity-50">
            <p>
              For any inquiries, please contact our{" "}
              <span className="text-gold">concierge service</span>
            </p>
            <p className="mt-1">
              +1 (888) 925-8888 | concierge@horologyhouse.com
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Confirmation;
