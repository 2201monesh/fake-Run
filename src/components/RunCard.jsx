import React from "react";

function RunCard() {
  return (
    <div className="w-[35%] h-[80vh] border m-4 p-2">
      <p>Run Details</p>
      <div className="flex w-full items-center justify-between border mt-3">
        <p>Pace Unit</p>
        <span>Pace Icon</span>
      </div>
      <div className="run-stats bg-gray-50 w-[100%] h-[40%] border mt-3 p-2">
        <p className="border mb-1">Run Stats</p>
        <div className="grid grid-cols-2 gap-2 h-[85%]">
          <div className="bg-white border p-2 flex items-center justify-center">
            Stat 1
          </div>
          <div className="bg-white border p-2 flex items-center justify-center">
            Stat 2
          </div>
          <div className="bg-white border p-2 flex items-center justify-center">
            Stat 3
          </div>
          <div className="bg-white border p-2 flex items-center justify-center">
            Stat 4
          </div>
        </div>
      </div>
      <div className="pace-maker w-[100%] border mt-2">
        <div className="flex items-center justify-between">
          <p>Pace (min/km)</p>
          <p>5.50 min/km</p>
        </div>
        <p>Slider</p>
      </div>
      <div className="w-[100%] border mt-2">
        <p>Run Name</p>
        <input type="text" className="border w-full" />
      </div>
    </div>
  );
}

export default RunCard;
