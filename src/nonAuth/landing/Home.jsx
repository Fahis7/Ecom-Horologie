import React, { useEffect } from "react";
import Navbar from "../../layout/Navbar";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
      delayChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: [0.6, -0.05, 0.01, 0.99]
    }
  }
};

const fadeInUp = {
  hidden: { y: 60, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: [0.6, -0.05, 0.01, 0.99]
    }
  }
};

const scaleIn = {
  hidden: { scale: 0.9, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: [0.6, -0.05, 0.01, 0.99]
    }
  }
};

const slideInFromLeft = {
  hidden: { x: -100, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: [0.6, -0.05, 0.01, 0.99]
    }
  }
};

const slideInFromRight = {
  hidden: { x: 100, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: [0.6, -0.05, 0.01, 0.99]
    }
  }
};

const hoverEffect = {
  scale: 1.03,
  transition: { duration: 0.3, ease: "easeOut" }
};

const tapEffect = {
  scale: 0.98
};

function Home() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (user && user.role == "admin") {
      navigate("/admin");
    }
    window.scrollTo(0, 0);
  }, []);

  return (
    <div id="heritage" className="bg-[#faf9f5]">
      <Navbar />
      <div className="text-gray-800 font-serif">
        {/* Hero Section */}
        <section className="h-screen flex items-center justify-center relative overflow-hidden bg-black">
          {/* Video Background */}
          <div className="absolute inset-0 z-0">
            <video
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover opacity-110"
            >
              <source
                src="https://media.rolex.com/video/upload/c_limit,q_auto:eco,w_2880/vc_vp9/v1/rolexcom/new-watches/2025/watches/datejust-31/videos/player-expand/long-film/new-watches-2025-datejust-31-presentation-long-film.webm"
                type="video/webm"
              />
              <img
                src="https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                alt="Luxury watches background"
                className="w-full h-full object-cover"
              />
            </video>
            <div className="absolute inset-0 bg-black/40"></div>
          </div>

          {/* Content */}
          <motion.div 
            className="relative z-10 p-8 max-w-4xl text-center"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <motion.h1 
              className="text-5xl sm:text-6xl lg:text-7xl font-light tracking-wider mb-8 leading-tight text-white"
              variants={itemVariants}
            >
              <motion.span 
                className="block font-playfair italic text-gold-500"
                variants={fadeInUp}
              >
                Horological
              </motion.span>
              <motion.span 
                className="block font-thin mt-2"
                variants={fadeInUp}
                transition={{ delay: 0.2 }}
              >
                Mastery
              </motion.span>
            </motion.h1>
            
            <motion.p 
              className="text-xl mb-10 text-gray-200 font-extralight tracking-wider leading-relaxed"
              variants={fadeInUp}
              transition={{ delay: 0.4 }}
            >
              Where centuries of craftsmanship meet timeless elegance. Each tick
              echoes the pinnacle of human achievement.
            </motion.p>
            
            <motion.div 
              className="flex justify-center space-x-6"
              variants={fadeInUp}
              transition={{ delay: 0.6 }}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <Link
                  to="/products"
                  className="bg-transparent border border-white text-white px-8 py-3 rounded-none hover:bg-white/10 transition-all duration-300 text-lg font-extrabold tracking-wider uppercase opacity-80"
                >
                  Explore Collections
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            className="absolute bottom-10 left-1/2 transform -translate-x-1/2 cursor-pointer"
            onClick={() =>
              document
                .getElementById("featured")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            initial={{ y: 0 }}
            animate={{ y: [0, -15, 0] }}
            transition={{ 
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <svg
              className="w-8 h-8 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1"
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              ></path>
            </svg>
          </motion.div>
        </section>

        {/* Featured Collection */}
        <section id="featured" className="py-28 bg-[#f8f5f0] overflow-hidden">
          <div className="max-w-7xl mx-auto px-8">
            <motion.div 
              className="text-center mb-20"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={containerVariants}
            >
              <motion.h2 
                className="text-3xl font-light mb-4 text-gray-700 tracking-widest uppercase"
                variants={fadeInUp}
              >
                <span className="border-b border-gold-500 pb-2">
                  Signature Timepieces
                </span>
              </motion.h2>
              <motion.p 
                className="text-gray-500 font-light max-w-2xl mx-auto"
                variants={fadeInUp}
                transition={{ delay: 0.2 }}
              >
                Curated selections that define generations
              </motion.p>
            </motion.div>
            
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-3 gap-10"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={{
                visible: {
                  transition: {
                    staggerChildren: 0.2,
                    delayChildren: 0.3
                  }
                }
              }}
            >
              {[
                {
                  name: "Patek Philippe Grandmaster Chime",
                  image:
                    "https://i.pinimg.com/1200x/61/ea/89/61ea895c7ff6a79796b4e88b95681e51.jpg",
                  desc: "The most complicated wristwatch ever created by Patek Philippe",
                },
                {
                  name: "Rolex Daytona Platinum",
                  image:
                    "https://i.pinimg.com/1200x/d3/d0/72/d3d072d0afc8ee5ed3946cca8867a49a.jpg",
                  desc: "The Oyster Perpetual Cosmograph Daytona in platinum with an ice-blue dial",
                },
                {
                  name: "Rado Captain Cook Ceramic Skeleton",
                  image:
                    "https://i.pinimg.com/1200x/52/32/62/523262305e9299699f5edf5af496789b.jpg",
                  desc: "A bold 43 mm ceramic diver with a lightweight monobloc case, skeletonized R808 automatic movement",
                },
              ].map((watch, index) => (
                <motion.div 
                  key={index} 
                  className="group relative overflow-hidden"
                  variants={scaleIn}
                  whileHover="hover"
                >
                  <motion.div 
                    className="overflow-hidden"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.5 }}
                  >
                    <img
                      src={watch.image}
                      alt={watch.name}
                      className="w-full h-96 object-cover"
                    />
                  </motion.div>
                  <motion.div 
                    className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                  >
                    <h3 className="text-xl text-white font-light mb-1">
                      {watch.name}
                    </h3>
                    <p className="text-gold-500 mb-2">{watch.price}</p>
                    <p className="text-gray-300 text-sm font-extralight">
                      {watch.desc}
                    </p>
                  </motion.div>
                  <motion.div 
                    className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300 bg-black/20"
                    whileHover={{ opacity: 1 }}
                  >
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Link
                        to={`/products`}
                        className="bg-transparent border border-white text-white px-6 py-2 hover:bg-white hover:text-black transition duration-300 font-light tracking-wider"
                      >
                        Explore
                      </Link>
                    </motion.div>
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Heritage Section */}
        <section id="heritage" className="py-28 bg-white overflow-hidden">
          <div className="max-w-7xl mx-auto px-8">
            <motion.div 
              className="flex flex-col md:flex-row items-center"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={containerVariants}
            >
              <motion.div 
                className="md:w-1/2 mb-10 md:mb-0 md:pr-10"
                variants={slideInFromLeft}
              >
                <motion.h2 
                  className="text-3xl font-light mb-6 text-gray-700 tracking-widest uppercase"
                  variants={fadeInUp}
                >
                  <span className="border-b border-gold-500 pb-2">
                    Our Heritage
                  </span>
                </motion.h2>
                <motion.h3 
                  className="text-xl text-gray-600 font-light mb-4"
                  variants={fadeInUp}
                  transition={{ delay: 0.2 }}
                >
                  A Century of Timeless Tradition
                </motion.h3>
                <motion.p 
                  className="text-gray-500 font-light mb-4 leading-relaxed"
                  variants={fadeInUp}
                  transition={{ delay: 0.3 }}
                >
                  Since 1924, we have been custodians of horological excellence.
                  Our family has built relationships with the finest
                  watchmakers, bringing unparalleled craftsmanship to discerning
                  collectors.
                </motion.p>
                <motion.p 
                  className="text-gray-500 font-light mb-4 leading-relaxed"
                  variants={fadeInUp}
                  transition={{ delay: 0.4 }}
                >
                  Each timepiece we offer is more than an instrument of time —
                  it's a legacy, a story, and an heirloom for generations to
                  come.
                </motion.p>
                <motion.p 
                  className="text-gray-500 font-light mb-6 leading-relaxed"
                  variants={fadeInUp}
                  transition={{ delay: 0.5 }}
                >
                  Rooted in heritage, our philosophy embraces authenticity and
                  precision. Every watch is a reflection of our enduring passion
                  for detail, elegance, and the pursuit of excellence in the art
                  of timekeeping.
                </motion.p>
                <motion.blockquote 
                  className="text-gray-600 italic border-l-4 border-gold-500 pl-4 mb-8"
                  variants={fadeInUp}
                  transition={{ delay: 0.6 }}
                >
                  "Preserving the past, inspiring the future — one timepiece at
                  a time."
                </motion.blockquote>
                <motion.div
                  variants={fadeInUp}
                  transition={{ delay: 0.7 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    to={`/products`}
                    className="bg-gray-700 border text-white px-6 py-2 hover:bg-white hover:text-black transition duration-300 font-light tracking-wider opacity-85"
                  >
                    Be Our Fam
                  </Link>
                </motion.div>
              </motion.div>
              
              <motion.div 
                className="md:w-1/2 relative"
                variants={slideInFromRight}
              >
                <motion.div 
                  className="relative before:absolute before:inset-0 before:border-2 before:border-gold-500 before:translate-x-6 before:translate-y-6 before:z-0"
                  whileHover={{ 
                    scale: 1.02,
                    transition: { duration: 0.5 }
                  }}
                >
                  <motion.img
                    src="https://i.pinimg.com/736x/a7/b0/7c/a7b07c09035140becd5cf407f77a85a4.jpg"
                    alt="Watchmaker at work"
                    className="relative z-10 w-full h-auto object-cover rounded"
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4, duration: 0.8 }}
                  />
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Home;