import React from "react";

const StatCard = ({ title, value }) => {
  return (
    <div className="bg-black border border-yellow-500 
    rounded-xl p-5 
    hover:scale-105 
    transition-all 
    duration-300 
    shadow-lg">

      <h2 className="text-yellow-400 text-sm">{title}</h2>

      <p className="text-white text-2xl font-bold mt-2">
        {value}
      </p>

    </div>
  );
};

export default StatCard;