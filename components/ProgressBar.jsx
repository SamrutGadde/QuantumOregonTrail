import React from 'react';

const ProgressBar = ({ stage }) => {

  function RenderStages() {
    let stages = [];
    for (let i = 0; i < 5; i++) {
      stages.push(<div key={i} className="w-4 h-4 bg-black "></div>)
    }
    return stages;
  }

  return (
    <div className="flex justify-center mt-[5rem]">
      <div className="w-4/5 bg-gray-200 rounded-full h-8 dark:bg-gray-700 justify-center">
        <div className="bg-blue-600 h-8 rounded-full flex flex-row justify-around items-center">
          {
            stage.map((stage, index) => {
              return (
                <div key={index} className="bg-black flex-1 h-[10rem]">
                  {stage}
                </div>
              )
            })
          }
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;
