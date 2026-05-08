type Props = {
  children: React.ReactNode,
  onClick?: () => void,
  type: "submit"
}

export default function Button({ children, onClick, type }: Props) {
  return (
    <button
      onClick={onClick}
      type={type}
      className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition"
    >
      {children}
    </button>
  )
}