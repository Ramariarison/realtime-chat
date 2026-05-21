import Input from "../ui/Input"
import Button from "../ui/Button"
import Logo from "../ui/Logo"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../../hooks/useAuth"

type Props = {
  switchToRegister: () => void
}

export default function LoginForm({ switchToRegister }: Props) {

  const [error, setError] = useState('')

  const [showError, setShowError] = useState(false)

  const { login, isLoading, user } = useAuth()

  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {

    e.preventDefault();

    setError('');

    if ( !formData.email || !formData.password ){

      setError('Please fill in the fields !');

      return;
    }

    const data = new FormData();

    data.append('email', formData.email);

    data.append('password', formData.password);

    try {
      
      login(data);

      setFormData({
        email: '',
        password: ''
      });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {

      setError(err.message);
    }
  }

  useEffect(() => {
    if(user) {
      if(user.role === 'admin') {
        navigate('/admin/users')
      } else {
        navigate('/user/chat')
      }
    }
  }, [user, navigate])

  return (
    <>
      {/* Toast notification d'erreur */}
      <div className={`absolute top-0 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-500 ${
        showError ? 'translate-y-4 opacity-100' : '-translate-y-full opacity-0'
      }`}>
        <div className="bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-3 min-w-[300px]">
          <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="text-sm font-medium">{error}</span>
          <button 
            onClick={() => setShowError(false)}
            className="ml-auto hover:bg-red-600 rounded-full p-1 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="flex flex-col items-center gap-2">
              <Logo />

              <h2 className="text-xl text-gray-900 font-semibold text-center">
                  Welcome back
              </h2>

              <span className="text-gray-400 text-sm text-center">
                  Connect and chat instantly with your friends
              </span>
          </div>

        <Input 
          type="email"
          name_input="email"
          placeholder="Email address"
          value={formData.email}
          change={handleInputChange}
        />
        <Input 
          type="password"
          name_input="password"
          placeholder="Password"
          value={formData.password}
          change={handleInputChange}
        />

        <div className="flex items-center justify-between text-sm">
          
          <label className="flex items-center gap-2 text-gray-900 cursor-pointer">
            <input
              type="checkbox"
              className="bg-gray-800 accent-blue-600"
            />
            Remember me
          </label>

          <span className="text-blue-500 cursor-pointer hover:underline">
            Forgot password?
          </span>

        </div>

        { isLoading ? (<Button type="submit">Sending data...</Button>) : (<Button type="submit">Login</Button>) }

        <p className="text-sm text-gray-900">
          Don’t have an account ?{" "}
          <span
            onClick={switchToRegister}
            className="text-blue-500 cursor-pointer"
          >
            Sign up
          </span>
        </p>
      </form>
    </>
  )
}