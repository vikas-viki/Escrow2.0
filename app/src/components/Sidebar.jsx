import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useStateContext } from "../context";
import { mainlogo, logout } from "../assets";
import { navlinks } from "../constants";

const Icon = ({ styles, name, imgUrl, isActive, disabled, handleClick }) => (
  <div
    className={`w-[48px] h-[48px] rounded-[10px] ${
      isActive && isActive === name && "bg-[#2c2f32]"
    } flex justify-center items-center ${
      !disabled && "cursor-pointer"
    } ${styles}`}
    onClick={handleClick}
  >
    {!isActive ? (
      <img src={imgUrl} alt="fund_logo" className="w-1/2 h-1/2" />
    ) : (
      <img
        src={imgUrl}
        alt="fund_logo"
        className={`w-1/2 h-1/2 ${isActive !== name && "grayscale"}`}
      />
    )}
  </div>
);

const Sidebar = () => {
  const { setAddress, isActive, setIsActive } = useStateContext();
  const navigate = useNavigate();

  return (
    <div className="flex justify-between items-center flex-col sticky top-5 h-[93vh]">
      <Link
        to="/"
        onClick={() => {
          setIsActive("dashboard");
        }}
      >
        <img className="w-[47px] h-[47px] bg-[#2c2f32] rounded-[12px] " src={mainlogo} alt='w3'/>
      </Link>

      <div className="flex-1 flex flex-col justify-between items-center bg-[#1c1c24] rounded-[20px] w-[76px] py-4 mt-12">
        <div className="flex flex-col justify-center items-center gap-3">
          {navlinks.map((link) => (
            <Icon
              key={link.name}
              {...link}
              isActive={isActive}
              handleClick={() => {
                if (!link.disabled) {
                  setIsActive(link.name);
                  navigate(link.link);
                }
              }}
            />
          ))}
        </div>
        <Icon
          styles="bg-[#1c1c24] shadow-secondary"
          imgUrl={logout}
          handleClick={() => {
            setAddress("");
          }}
        />
      </div>
    </div>
  );
};

export default Sidebar;
