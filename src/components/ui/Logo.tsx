import logo from "../../assets/MyApp.png"

type Props = {
  size?: number
}

export default function Logo({ size = 100 }: Props) {
  return (
    <div className="flex justify-center items-center">
      <img
        src={logo}
        alt="logo"
        style={{ width: size, height: size }}
        className="object-contain"
      />
    </div>
  )
}