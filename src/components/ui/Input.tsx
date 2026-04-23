type Props = {
  type: string
  placeholder: string
}

export default function Input({ type, placeholder }: Props) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className="w-full p-2 rounded bg-gray-800 text-white outline-none"
    />
  )
}