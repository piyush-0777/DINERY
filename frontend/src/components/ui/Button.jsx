export function Button({ className = "", variant, ...props }) {
  const base =
    "inline-flex items-center justify-center rounded-2xl font-semibold transition-all duration-300";
  const solid = "bg-white text-black hover:bg-gray-200";
  const outline =
    "border border-white text-white hover:bg-white hover:text-black";

  return (
    <button
      className={`${base} ${
        variant === "outline" ? outline : solid
      } ${className}`}
      {...props}
    />
  );
}
