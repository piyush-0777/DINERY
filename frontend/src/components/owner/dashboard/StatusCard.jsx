export const StatusCard = ({ label, count, color }) => {
return (
  <div
      className={`
        rounded-xl p-4 bg-neutral-900 
        border-l-4 ${color}
        transition-all duration-300 ease-out
        hover:-translate-y-1 hover:scale-[1.02]
        hover:shadow-lg hover:shadow-yellow-500/10
        cursor-pointer
      `}
    >
      <p className="text-gray-400 text-sm transition-colors duration-300 hover:text-gray-300">
        {label}
      </p>

      <p className="text-xl font-bold text-white mt-1">
        {count}
      </p>
    </div>

);
};