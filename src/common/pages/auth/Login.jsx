import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Eye, EyeOff } from "lucide-react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/Authprovider";
import { toast } from "react-toastify";

function Login() {
  const { login, user } = useContext(AuthContext);

  const navigate = useNavigate();
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user]);

  const [showPassword, setShowPassword] = useState(false);

  const initialValues = {
    email: "",
    password: "",
  };

  const validationSet = Yup.object({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().required("Password is required"),
  });
  const onSubmit = async (values, { setSubmitting }) => {
    try {
      const res = await axios.get(
        `http://localhost:5000/users?email=${values.email}`
      );
      const user = res.data[0];

      if (!user) {
        toast.error("Invalid email or password");
        return;
      }

      // Check if user is blocked (make sure this matches your DB field exactly)
      if (user.isBlock || user.isblock) {
        // Try both common variations
        toast.error("Your account has been blocked. Please contact support.");
        return;
      }

      if (user.password !== values.password) {
        toast.error("Invalid email or password");
        return;
      }

      login({ id: user.id, name: user.name, role: user.role });
      toast.success("Login successful!");
      navigate("/");
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong!");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center px-4 sm:px-8 md:px-16 lg:px-[15%]">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(https://i.pinimg.com/1200x/5e/b1/06/5eb10640b64b51cd8a72f3fc41f4dc57.jpg)`,
        }}
      ></div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black opacity-10"></div>

      {/* Card */}
      <div className="relative z-10 w-full max-w-5xl">
        <motion.div
          initial={{ opacity: 0, x: 90 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="bg-white/20 backdrop-blur-md rounded-[12px] shadow-xl flex flex-col md:flex-row overflow-hidden h-auto md:h-[500px]"
        >
          {/* Left Image */}
          <div
            className="w-full md:w-1/2 h-[200px] md:h-auto bg-cover bg-center"
            style={{
              backgroundImage: `url(https://i.pinimg.com/736x/4f/57/97/4f57971a3dea504cfe8da63ceee8e353.jpg)`,
            }}
          ></div>

          {/* Right Form */}
          <div className="w-full md:w-1/2 p-6 sm:p-8 flex flex-col justify-center text-white drop-shadow-md">
            <h2 className="text-2xl font-semibold text-center mb-6">
              Login to Your Account
            </h2>

            <Formik
              initialValues={initialValues}
              validationSet={validationSet}
              onSubmit={onSubmit}
            >
              {({ isSubmitting }) => (
                <Form className="space-y-4">
                  <div>
                    <Field
                      type="email"
                      name="email"
                      placeholder="Email"
                      className="w-full px-4 py-2 bg-transparent border border-gray-300 text-white rounded-xl focus:outline-none"
                    />
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="text-sm text-red-400 mt-1"
                    />
                  </div>

                  <div className="relative">
                    <Field
                      type={showPassword ? "text" : "password"}
                      name="password"
                      placeholder="Password"
                      className="w-full px-4 py-2 bg-transparent border border-gray-300 text-white rounded-xl focus:outline-none pr-12"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((prev) => !prev)}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                    <ErrorMessage
                      name="password"
                      component="div"
                      className="text-sm text-red-400 mt-1"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-black text-white py-2 rounded-xl hover:bg-gray-900 transition duration-200"
                  >
                    {isSubmitting ? "Logging in..." : "Login"}
                  </button>
                </Form>
              )}
            </Formik>

            <p className="mt-4 text-center text-sm text-white/60">
              Don&apos;t have an account?{" "}
              <Link
                to="/signup"
                className="text-white font-medium hover:underline"
              >
                Sign Up
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default Login;
