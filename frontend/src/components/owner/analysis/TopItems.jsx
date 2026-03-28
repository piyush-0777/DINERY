import React from "react";

const TopItems = ({ data }) => {
  return (
    <div className="bg-black p-5 rounded-xl border border-yellow-500">

      <h2 className="text-yellow-400 mb-3">
        Top Items
      </h2>

      {data.map((e, i) => (
        <div
          key={i}
          className="flex justify-between text-white border-b py-2"
        >
          <span>{e.name}</span>
          <span>{e.count}</span>
        </div>
      ))}
    </div>
  );
};

export default TopItems;