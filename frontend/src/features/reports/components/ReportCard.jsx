const ReportCard = ({ title, value }) => {
  return (
    <div className="bg-[#111] border border-yellow-500/20 
                    rounded-xl p-5 
                    hover:border-yellow-500 
                    hover:shadow-yellow-500/10 
                    hover:shadow-lg 
                    transition duration-300">
      <p className="text-gray-400 text-sm">{title}</p>
      <h2 className="text-2xl font-semibold text-yellow-400 mt-2">
        {value}
      </h2>
    </div>
  );
};

export default ReportCard;