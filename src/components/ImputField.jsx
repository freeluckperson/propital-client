
const InputField = ({ id, label, type, register, error }) => (
  <div className="relative">
    <label htmlFor={id} className="block text-sm font-medium text-gray-700">
      {label}
    </label>
    <input
      type={type}
      id={id}
      {...register}
      className={`w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 ${
        error
          ? "border-red-500 focus:ring-red-500"
          : "border-gray-300 focus:ring-indigo-500"
      }`}
    />
    {error && <p className="mt-1 text-sm text-red-500">{error.message}</p>}
  </div>
);

export default InputField;
