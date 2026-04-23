import Input from "../ui/Input"
import Button from "../ui/Button"
import Logo from "../ui/Logo"

type Props = {
  switchToLogin: () => void
}

export default function RegisterForm({ switchToLogin }: Props) {
  return (
    <div className="space-y-4">

        <div className="flex flex-col items-center gap-2">
            <Logo />

            <h2 className="text-xl text-white font-semibold text-center">
                Sign up to Vintsy
            </h2>

            <span className="text-gray-400 text-sm text-center">
                Connect, chat, and stay in sync with your friends in real time
            </span>
        </div>

      <Input type="text" placeholder="Name" />
      <Input type="email" placeholder="Email address" />
      <Input type="password" placeholder="Password" />
      <Input type="password" placeholder="Password confirmation" />

      <Button>Register</Button>

      <p className="text-sm text-gray-400">
        Already have an account ?{" "}
        <span
          onClick={switchToLogin}
          className="text-blue-500 cursor-pointer"
        >
          Login
        </span>
      </p>
    </div>
  )
}