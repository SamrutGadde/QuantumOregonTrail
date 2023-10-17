import React from 'react'
import PropTypes from 'prop-types'

export default function ChoiceCard({title, description, icon, onClick}) {
  return (
    <div onClick={onClick} className="min-w-[10rem] max-w-[11rem] min-h-[10rem] bg-gray-800 border-gray-700 border-4 rounded-2xl 
                                      flex justify-between items-center flex-col py-4 px-2 hover:bg-gray-700 select-none text-center">
      {icon && <img src={icon} className="w-[4rem] h-[4rem] mb-2" alt="icon" />}
      <h2 className="text-bold text-xl">
        {title}
      </h2>
      <p className="">
        {description}
      </p>
    </div>
  );
}

ChoiceCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  icon: PropTypes.string,
  onClick: PropTypes.func,
}
