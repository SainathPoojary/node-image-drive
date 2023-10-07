export default function TextInput({ placeholder, value, onChange, type }) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="px-5 py-3 w-full placeholder-gray-200 bg-primary rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-opacity-50"
    />
  );
}
