export default function Button({ text, onClick }) {
  return (
    <button
      onClick={onClick}
      className="px-5 py-3 w-full bg-secondary rounded-md"
    >
      {text}
    </button>
  );
}
