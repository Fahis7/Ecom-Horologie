import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../common/context/Authprovider";

const PaymentPage = () => {
  window.scrollTo(0, 0);
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location;
  
  // Validate navigation state
  const user = JSON.parse(localStorage.getItem("user"))
  useEffect(() => {
    if (!user) {
      navigate("/"); // Redirect to home if accessed directly without state
    }
  }, []);

  // Get the total amount and cart items from navigation state
  const { totalAmount = 0, cartItems = [] } = state || {};

  const [paymentMethod] = useState("credit"); // Removed unused setter
  const [cardDetails, setCardDetails] = useState({
    number: "",
    name: "",
    expiry: "",
    cvv: "",
  });
  const [address, setAddress] = useState({
    street: "",
    city: "",
    state: "",
    zip: "",
    country: "",
  });
  const [showAddress, setShowAddress] = useState(true);
  const [isFormValid, setIsFormValid] = useState(false);
  const [addressTouched, setAddressTouched] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  // Validate form whenever card details or address changes
  useEffect(() => {
    const isCardValid =
      cardDetails.number.replace(/\s/g, "").length === 16 &&
      cardDetails.name.trim() !== "" &&
      cardDetails.expiry.match(/^\d{2}\/\d{2}$/) &&
      cardDetails.cvv.length >= 3;

    const isAddressValid =
      address.street.trim() !== "" &&
      address.city.trim() !== "" &&
      address.state.trim() !== "" &&
      address.zip.trim() !== "" &&
      address.country.trim() !== "";

    setIsFormValid(isCardValid && isAddressValid);
  }, [cardDetails, address]);

 
  const isAddressFieldInvalid = (fieldValue) => {
    return addressTouched && fieldValue.trim() === "";
  };

  const addToOrders = async () => {
  try {
    // Fetch latest user data to get cart and existing orders
    const { data: userData } = await axios.get(
      `http://localhost:5000/users/${user.id}`
    );

    const serverCart = userData.cart || [];       // ✅ latest cart
    const existingOrders = userData.orders || [];

    if (serverCart.length === 0) {
      console.warn("Cart is empty, nothing to add to orders.");
      return;
    }

    // Add current cart items from server to orders
    const updatedOrders = [...existingOrders, ...serverCart];

    // Update user's orders in the server
    await axios.patch(`http://localhost:5000/users/${user.id}`, {
      orders: updatedOrders,
    });

    console.log("Orders updated successfully");
  } catch (err) {
    console.error("Failed to update orders:", err);
  }
};


  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!showAddress) {
      setShowAddress(true);
      setAddressTouched(true);
      return;
    }

    if (isFormValid && !isSubmitting) {
      setIsSubmitting(true);

      try {
         await addToOrders();
        
       

        navigate("/confirmation", {
          state: {
            totalAmount,
            paymentDetails: {
              ...cardDetails,
              paymentMethod,
              address,
            },
            cartItems,
          },
        });
      } catch (error) {
        console.error("Payment processing error:", error);
        setError("Payment processing failed. Please try again.");
        setIsSubmitting(false);
      }
    }
  };

  const handleCardChange = (e) => {
    const { name, value } = e.target;

    // Format card number with spaces every 4 digits
    if (name === "number") {
      const formattedValue = value
        .replace(/\s/g, "")
        .replace(/(\d{4})/g, "$1 ")
        .trim()
        .substring(0, 19);
      setCardDetails((prev) => ({
        ...prev,
        [name]: formattedValue,
      }));
      return;
    }

    // Format expiry date with slash
    if (name === "expiry") {
      const formattedValue = value
        .replace(/\D/g, "")
        .replace(/(\d{2})(\d)/, "$1/$2")
        .substring(0, 5);
      setCardDetails((prev) => ({
        ...prev,
        [name]: formattedValue,
      }));
      return;
    }

    // For CVV - only allow numbers
    if (name === "cvv") {
      const formattedValue = value.replace(/\D/g, "").substring(0, 4);
      setCardDetails((prev) => ({
        ...prev,
        [name]: formattedValue,
      }));
      return;
    }

    setCardDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setAddress((prev) => ({
      ...prev,
      [name]: value,
    }));
    setAddressTouched(true);
  };

  const toggleAddressSection = () => {
    setShowAddress(!showAddress);
    if (!showAddress) {
      setAddressTouched(true);
    }
  };

 
  const isCardFieldInvalid = (fieldName) => {
    switch (fieldName) {
      case "number":
        return (
          cardDetails.number.replace(/\s/g, "").length < 16 && addressTouched
        );
      case "name":
        return cardDetails.name.trim() === "" && addressTouched;
      case "expiry":
        return !cardDetails.expiry.match(/^\d{2}\/\d{2}$/) && addressTouched;
      case "cvv":
        return cardDetails.cvv.length < 3 && addressTouched;
      default:
        return false;
    }
  };

  return (
    <div  className="min-h-screen bg-black flex">
      {/* Luxury Video Panel (40%) */}
      <div className="hidden md:block w-2/5 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black opacity-70 z-10"></div>
        <video
          autoPlay
          loop
          muted
          className="w-full h-full object-cover"
          poster="https://images.unsplash.com/photo-1523170335258-f5ed11844a49?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
        >
          <source
            src="https://www.rado.com/media/sgecom_contentsystem/PDP_Images/Captain_Cook_HTC_Chronograph_chrono_bico_1920X1080.mp4"
            type="video/mp4"
          />
          <img
            src="https://images.unsplash.com/photo-1523170335258-f5ed11844a49?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
            alt="Luxury watch background"
          />
        </video>

        <div className="absolute bottom-1/4 left-0 right-0 z-20 px-8 text-center">
          <p className="text-platinum text-white font-light tracking-widest text-lg mb-2">
            "PRECISION IS THE SOUL OF TIMELESS ELEGANCE"
          </p>
          <p className="text-gold text-white text-xs font-light opacity-80">
            - Master Horologist -
          </p>
        </div>
      </div>

      {/* Compact Payment Section (60%) */}
      <div className="w-full md:w-3/5 bg-white flex items-center mt-10 justify-center p-4 sm:p-6">
        <div className="max-w-md w-full py-4">
          <div className="text-center mb-6">
            <h2 className="text-xl sm:text-2xl font-thin tracking-widest text-charcoal mb-1">
              SECURE TRANSACTION
            </h2>
            <p className="text-xs font-light text-charcoal opacity-70">
              Finalize your acquisition
            </p>
          </div>

          {error && (
            <div className="mb-4 text-red-500 text-xs text-center">{error}</div>
          )}

          <form onSubmit={handleSubmit}>
            {/* Payment Method Selection */}
            <div className="mb-4">
              <h3 className="text-xs ml-40 font-light text-charcoal tracking-widest mb-2">
                PAYMENT METHOD
              </h3>
              <div className="space-y-2">
                <div className="flex items-center">
                  <label
                    htmlFor="credit"
                    className="ml block text-xs font-light text-charcoal"
                  >
                    CREDIT CARD
                  </label>
                </div>
              </div>
            </div>

            {/* Shipping Address Dropdown */}
            <div className="mb-4">
              <button
                type="button"
                className="flex items-center justify-between w-full text-l font-light text-charcoal tracking-widest mb-2 focus:outline-none"
                onClick={toggleAddressSection}
              >
                <span>SHIPPING ADDRESS *</span>
                <svg
                  className={`h-3 w-3 transform transition-transform ${
                    showAddress ? "rotate-180" : ""
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {showAddress && (
                <div className="space-y-2 pt-2">
                  <div>
                    <input
                      type="text"
                      name="street"
                      placeholder="STREET ADDRESS *"
                      className={`w-full border-b ${
                        isAddressFieldInvalid(address.street)
                          ? "border-red-500"
                          : "border-gray-200"
                      } bg-transparent text-charcoal placeholder-gray-300 py-1 px-0 text-xs focus:outline-none focus:border-gold`}
                      value={address.street}
                      onChange={handleAddressChange}
                      required
                    />
                    {isAddressFieldInvalid(address.street) && (
                      <p className="text-red-500 text-xxs mt-1">
                        Street address is required
                      </p>
                    )}
                  </div>
                  <div>
                    <input
                      type="text"
                      name="city"
                      placeholder="CITY *"
                      className={`w-full border-b ${
                        isAddressFieldInvalid(address.city)
                          ? "border-red-500"
                          : "border-gray-200"
                      } bg-transparent text-charcoal placeholder-gray-300 py-1 px-0 text-xs focus:outline-none focus:border-gold`}
                      value={address.city}
                      onChange={handleAddressChange}
                      required
                    />
                    {isAddressFieldInvalid(address.city) && (
                      <p className="text-red-500 text-xxs mt-1">
                        City is required
                      </p>
                    )}
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <input
                        type="text"
                        name="state"
                        placeholder="STATE *"
                        className={`w-full border-b ${
                          isAddressFieldInvalid(address.state)
                            ? "border-red-500"
                            : "border-gray-200"
                        } bg-transparent text-charcoal placeholder-gray-300 py-1 px-0 text-xs focus:outline-none focus:border-gold`}
                        value={address.state}
                        onChange={handleAddressChange}
                        required
                      />
                      {isAddressFieldInvalid(address.state) && (
                        <p className="text-red-500 text-xxs mt-1">
                          State is required
                        </p>
                      )}
                    </div>
                    <div>
                      <input
                        type="text"
                        name="zip"
                        placeholder="ZIP CODE *"
                        className={`w-full border-b ${
                          isAddressFieldInvalid(address.zip)
                            ? "border-red-500"
                            : "border-gray-200"
                        } bg-transparent text-charcoal placeholder-gray-300 py-1 px-0 text-xs focus:outline-none focus:border-gold`}
                        value={address.zip}
                        onChange={handleAddressChange}
                        required
                      />
                      {isAddressFieldInvalid(address.zip) && (
                        <p className="text-red-500 text-xxs mt-1">
                          ZIP code is required
                        </p>
                      )}
                    </div>
                  </div>
                  <div>
                    <select
                      name="country"
                      className={`w-full border-b ${
                        isAddressFieldInvalid(address.country)
                          ? "border-red-500"
                          : "border-gray-200"
                      } bg-transparent text-charcoal py-1 px-0 text-xs focus:outline-none focus:border-gold appearance-none`}
                      value={address.country}
                      onChange={handleAddressChange}
                      required
                    >
                      <option value="">SELECT COUNTRY *</option>
                      <option value="AE">UNITED ARAB EMIRATES</option>
                      <option value="US">UNITED STATES</option>
                      <option value="IN">INDIA</option>
                      <option value="UK">UNITED KINGDOM</option>
                      <option value="CH">SWITZERLAND</option>
                    </select>
                    {isAddressFieldInvalid(address.country) && (
                      <p className="text-red-500 text-xxs mt-1">
                        Country is required
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Section Divider */}
            <div className="border-t border-platinum my-4"></div>

            {/* Credit Card Form */}
            <div className="mb-4">
              <div className="grid grid-cols-1 gap-y-3 gap-x-3 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <label
                    htmlFor="card-number"
                    className="block text-xxs font-light text-charcoal tracking-widest mb-1"
                  >
                    CARD NUMBER *
                  </label>
                  <input
                    type="text"
                    name="number"
                    id="card-number"
                    className={`block w-full border-b ${
                      isCardFieldInvalid("number")
                        ? "border-red-500"
                        : "border-gray-200"
                    } py-1 px-0 text-charcoal placeholder-gray-300 focus:outline-none focus:border-gold text-xs bg-transparent`}
                    placeholder="•••• •••• •••• ••••"
                    value={cardDetails.number}
                    onChange={handleCardChange}
                    maxLength={19}
                    required
                  />
                  {isCardFieldInvalid("number") && (
                    <p className="text-red-500 text-xxs mt-1">
                      Valid card number is required
                    </p>
                  )}
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="name-on-card"
                    className="block text-xxs font-light text-charcoal tracking-widest mb-1"
                  >
                    NAME ON CARD *
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name-on-card"
                    className={`block w-full border-b ${
                      isCardFieldInvalid("name")
                        ? "border-red-500"
                        : "border-gray-200"
                    } py-1 px-0 text-charcoal placeholder-gray-300 focus:outline-none focus:border-gold text-xs bg-transparent`}
                    value={cardDetails.name}
                    onChange={handleCardChange}
                    required
                  />
                  {isCardFieldInvalid("name") && (
                    <p className="text-red-500 text-xxs mt-1">
                      Name is required
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="expiration-date"
                    className="block text-xxs font-light text-charcoal tracking-widest mb-1"
                  >
                    EXP DATE *
                  </label>
                  <input
                    type="text"
                    name="expiry"
                    id="expiration-date"
                    className={`block w-full border-b ${
                      isCardFieldInvalid("expiry")
                        ? "border-red-500"
                        : "border-gray-200"
                    } py-1 px-0 text-charcoal placeholder-gray-300 focus:outline-none focus:border-gold text-xs bg-transparent`}
                    placeholder="MM/YY"
                    value={cardDetails.expiry}
                    onChange={handleCardChange}
                    maxLength={5}
                    required
                  />
                  {isCardFieldInvalid("expiry") && (
                    <p className="text-red-500 text-xxs mt-1">
                      Valid expiry date is required
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="cvv"
                    className="block text-xxs font-light text-charcoal tracking-widest mb-1"
                  >
                    CVV *
                  </label>
                  <input
                    type="text"
                    name="cvv"
                    id="cvv"
                    className={`block w-full border-b ${
                      isCardFieldInvalid("cvv")
                        ? "border-red-500"
                        : "border-gray-200"
                    } py-1 px-0 text-charcoal placeholder-gray-300 focus:outline-none focus:border-gold text-xs bg-transparent`}
                    placeholder="•••"
                    value={cardDetails.cvv}
                    onChange={handleCardChange}
                    maxLength={4}
                    required
                  />
                  {isCardFieldInvalid("cvv") && (
                    <p className="text-red-500 text-xxs mt-1">
                      Valid CVV is required
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Section Divider */}
            <div className="border-t border-platinum my-4"></div>

            {/* Compact Order Summary */}
            <div className="mb-4">
              <h3 className="text-xxs font-light text-charcoal tracking-widest mb-2">
                ORDER SUMMARY
              </h3>
              <div className="flex justify-between text-xs font-light text-charcoal mb-1">
                <span>Investment</span>
                <span>${totalAmount.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-xs font-light text-charcoal mb-1">
                <span>Delivery</span>
                <span>COMPLIMENTARY</span>
              </div>
              <div className="flex justify-between text-xs font-light text-charcoal mb-1">
                <span>Assurance</span>
                <span>INCLUDED</span>
              </div>
              <div className="flex justify-between text-sm font-light text-charcoal mt-2 pt-2 border-t border-platinum">
                <span>TOTAL</span>
                <span>${totalAmount.toLocaleString()}</span>
              </div>
            </div>

            {/* Submit Button */}
            <div className="mt-6">
              <button
                type="submit"
                className={`w-full py-2 px-4 text-xs font-light tracking-widest transition-all duration-300 ${
                  isFormValid && !isSubmitting
                    ? "bg-gray-700 text-white hover:bg-gray-800"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
                disabled={!isFormValid || isSubmitting}
              >
                {isSubmitting ? "PROCESSING..." : "CONFIRM ACQUISITION"}
              </button>
            </div>

            {/* Secure Payment Notice */}
            <div className="mt-4 flex items-center justify-center text-xxs font-light text-charcoal opacity-50">
              <svg
                className="h-2 w-2 mr-1"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                  clipRule="evenodd"
                />
              </svg>
              ENCRYPTED TRANSACTION
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
