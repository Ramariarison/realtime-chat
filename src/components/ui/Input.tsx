type Props = {
  type: string,
  name_input: string,
  placeholder: string,
  value: string,
  change: React.ChangeEventHandler<HTMLInputElement>,
}

export default function Input({ type, placeholder, value, change, name_input }: Props) {
  return (
    <input
      type={type}
      name={name_input}
      placeholder={placeholder}
      value={value}
      onChange={change}
      className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
    />
  )
}