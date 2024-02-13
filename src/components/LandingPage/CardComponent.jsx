

import React from 'react';
import { useNavigate } from 'react-router-dom';

const CardComponent = ({ title, subtitle, to }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (to) {
      navigate(to);
    }
  };
  return (
    <div
      className="flex flex-col w-[25%] max-md:w-full max-md:ml-0 flex-wrap"
      onClick={handleClick}
      style={{ cursor: to ? 'pointer' : 'default', zIndex: 10 }}
    >
      <div className="justify-center items-stretch rounded border shadow-sm bg-white flex grow flex-col w-full mx-auto px-3 py-16 border-solid border-slate-200 max-md:mt-10">
        <h2 className="text-blue-900 text-center text-3xl font-bold tracking-tighter uppercase">{title}</h2>
        <p className="text-zinc-700 text-center text-2xl tracking-tighter mt-2.5">{subtitle}</p>
      </div>
    </div>
  );
};

export default CardComponent;
