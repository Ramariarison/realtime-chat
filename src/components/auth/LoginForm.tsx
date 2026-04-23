import Input from "../ui/Input"
import Button from "../ui/Button"
import Logo from "../ui/Logo"

type Props = {
  switchToRegister: () => void
}

export default function LoginForm({ switchToRegister }: Props) {
  return (
    <div className="space-y-4">
        <div className="flex flex-col items-center gap-2">
            <Logo />

            <h2 className="text-xl text-white font-semibold text-center">
                Welcome back
            </h2>

            <span className="text-gray-400 text-sm text-center">
                Connect and chat instantly with your friends
            </span>
        </div>

      <Input type="email" placeholder="Email address" />
      <Input type="password" placeholder="Password" />

      <div className="flex items-center justify-between text-sm">
        
        <label className="flex items-center gap-2 text-gray-400 cursor-pointer">
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

      <Button>Login</Button>

      <p className="text-sm text-gray-400">
        Don’t have an account ?{" "}
        <span
          onClick={switchToRegister}
          className="text-blue-500 cursor-pointer"
        >
          Sign up
        </span>
      </p>
    </div>
  )
}