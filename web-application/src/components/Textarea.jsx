export default function Textarea({
  placeholder,
  error,
  value,
  onChange,
  name,

  row,
}) {
  return (
    <>
      <textarea
        placeholder={placeholder}
        className={`bg-white w-[20rem] px-3 py-1.5 border rounded-md resize-none focus:outline-none focus:ring-2 ${
          error
            ? "border-red-500 focus:ring-red-300"
            : "border-gray-300 focus:border-blue-500 focus:ring-blue-300"
        }`}
        value={value}
        onChange={onChange}
        name={name}
        rows={row}
      />
      {error ? <small className="text-red-500 text-left">{error}</small> : null}
    </>
  );
}
