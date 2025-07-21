import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Formik, Form, Field, ErrorMessage } from "formik";
import axios from "axios";
import * as Yup from "yup";
import { UserRegisterTemplate } from "../../../data/template/UserRegisterTemplate";
import { Eye, EyeOff } from "lucide-react";
import { AuthContext } from "../../context/Authprovider";

function Register() {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user]);

  const initialValues = UserRegisterTemplate;

  const validationSet = Yup.object({
    name: Yup.string()
      .matches(/^[a-zA-Z\s]+$/, "Only letters and spaces are allowed")
      .min(3, "Name must be at least 3 characters")
      .required("Name is required"),
    email: Yup.string()
      .matches(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/, "Enter a valid email address")
      .required("Email is required"),
    password: Yup.string()
      .matches(
        /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        "Min 8 chars, 1 uppercase, 1 number, 1 special character"
      )
      .required("Password is required"),
  });

  const onSubmit = async (values, { setSubmitting }) => {
    try {
      const existing = await axios.get(
        `http://localhost:5000/users?email=${values.email}`
      );
      if (existing.data.length > 0) {
        alert("User already exists!");
        return;
      }

      await axios.post("http://localhost:5000/users", values);
      alert("Account created successfully!");
      navigate("/login");
    } catch (err) {
      console.error(err);
      alert("Something went wrong!");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center px-4 sm:px-8 md:px-16 lg:px-[15%]">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-bottom"
        style={{
          backgroundImage: `url(https://i.pinimg.com/1200x/58/96/b1/5896b1e70319bda42a39c3c60fef4ff1.jpg)`,
        }}
      ></div>
      <div className="absolute inset-0 bg-black opacity-60"></div>

      {/* Card */}
      <div className="relative z-10 w-full max-w-5xl">
        <motion.div
          initial={{ opacity: 0, x: -90 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="bg-white/20 backdrop-blur-md rounded-[12px] shadow-xl flex flex-col lg:flex-row overflow-hidden h-auto lg:h-[500px]"
        >
          {/* Left Form */}
          <div className="w-full lg:w-1/2 p-6 sm:p-8 flex flex-col justify-center text-white drop-shadow-md">
            <h2 className="text-2xl font-semibold text-center mb-6">
              Create a New Account
            </h2>

            <Formik
              initialValues={initialValues}
              validationSchema={validationSet}
              onSubmit={onSubmit}
            >
              {({ isSubmitting }) => (
                <Form className="space-y-4">
                  <div>
                    <Field
                      type="text"
                      name="name"
                      placeholder="Full Name"
                      className="w-full px-4 py-2 bg-transparent border text-white border-gray-300 rounded-xl focus:outline-none"
                    />
                    <ErrorMessage
                      name="name"
                      component="div"
                      className="text-sm text-red-400 mt-1"
                    />
                  </div>

                  <div>
                    <Field
                      type="email"
                      name="email"
                      placeholder="Email"
                      className="w-full px-4 py-2 bg-transparent border text-white border-gray-300 rounded-xl focus:outline-none"
                    />
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="text-sm text-red-400 mt-1"
                    />
                  </div>

                  <div className="relative">
                    <div className="relative">
                      <Field
                        type={showPassword ? "text" : "password"}
                        name="password"
                        placeholder="Password"
                        className="w-full px-4 py-2 pr-12 bg-transparent border text-white border-gray-300 rounded-xl focus:outline-none"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword((prev) => !prev)}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white"
                      >
                        {showPassword ? (
                          <EyeOff size={18} />
                        ) : (
                          <Eye size={18} />
                        )}
                      </button>
                    </div>
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
                    {isSubmitting ? "Registering..." : "Sign Up"}
                  </button>
                </Form>
              )}
            </Formik>

            <p className="mt-4 text-center text-sm text-white/60">
              Already have an account?{" "}
              <a
                href="/login"
                className="text-white font-medium hover:underline"
              >
                Login
              </a>
            </p>
          </div>

          {/* Right Image */}
          <div
            className="w-full lg:w-1/2 h-[200px] lg:h-auto bg-cover bg-center"
            style={{
              backgroundImage: `url(https://media.rolex.com/image/upload/q_auto/f_auto/c_limit,w_1920/v1741014185/rolexcom/new-watches/2025/watches/new-dials/new-watches-2025-new-dials-gmt-master-ii-iron-eye-dial-m126715chnr-0002_2501stojan_002_rvb.jpg)`,
              backgroundSize: "200%",
            }}
          ></div>
        </motion.div>
      </div>
    </div>
  );
}

export default Register;
