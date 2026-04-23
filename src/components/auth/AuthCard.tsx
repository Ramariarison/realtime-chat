import { motion, AnimatePresence } from "framer-motion"
import LoginForm from "./LoginForm"
import RegisterForm from "./RegisterForm"

interface AuthCardProps {
  isLogin: boolean
  setIsLogin: (value: boolean) => void
}

export default function AuthCard({ isLogin, setIsLogin }: AuthCardProps) {
  return (
    <div className="flex items-center justify-center w-full h-full bg-gray-900 px-30">
      <AnimatePresence mode="wait">
        <motion.div
          key={isLogin ? "login" : "register"}
          initial={{ x: isLogin ? -100 : 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: isLogin ? 100 : -100, opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          {isLogin ? (
            <LoginForm switchToRegister={() => setIsLogin(false)} />
          ) : (
            <RegisterForm switchToLogin={() => setIsLogin(true)} />
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}