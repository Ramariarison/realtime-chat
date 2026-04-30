import { motion } from "framer-motion"
import AuthCard from "../components/auth/AuthCard"
import { useState } from "react"

export default function AuthLayout() {

  const [isLogin, setIsLogin] = useState(true)

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-r from-blue-900 to-purple-900">
      
      <div className="flex w-4/5 h-[80%] rounded-2xl overflow-hidden shadow-lg">

        <motion.div
          animate={{ x: isLogin ? "0%" : "100%" }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="w-1/2 h-full"
        >
          <AuthCard isLogin={isLogin} setIsLogin={setIsLogin} />
        </motion.div>

        <motion.div
          animate={{ x: isLogin ? "0%" : "-100%" }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="w-1/2 h-full hidden md:block"
        >
          <img
            src="/images/3d.webp"
            className="w-full h-full object-cover"
          />
        </motion.div>

      </div>
    </div>
  )
}