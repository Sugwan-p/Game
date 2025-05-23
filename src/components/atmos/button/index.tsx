interface ButtonProps {
  text: string;
  onClick: () => void;
}

export const Button = ({ text, onClick }: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      className="w-45 bg-indigo-600 text-white py-3 rounded-full text-center font-semibold text-lg mt-8"
    >
      {text}
    </button>
  );
};
