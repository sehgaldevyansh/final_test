import React from "react";
import { useReducer } from "react";
import ShiftButton from "../../assets/LoginPage/button_shift.svg";
import { useNavigate } from "react-router-dom";
import "./ButtonLogin.css";
export const ButtonLogin = ({ property1, className }) => {
  const navigate = useNavigate();
  const [state, dispatch] = useReducer(reducer, {
    property1: property1 || "default",
    isHovered: false,
  });
  const handleLogin = () => {
    navigate("/creator/modellist");
  };

  return (
    <button
      className={`login-btn border border-solid flex items-center gap-[12px] px-[26px] py-[12px] rounded-[6px] relative all-[unset] box-border ${
        state.isHovered || state.property1 === "active"
          ? "border-[#171c8f]"
          : "border-white"
      } ${
        state.isHovered || state.property1 === "active"
          ? "w-[145px]"
          : "w-[120px]"
      } ${
        state.isHovered || state.property1 === "active"
          ? "bg-white"
          : "bg-[#171c8f75]"
      } ${className}`}
      onMouseLeave={() => {
        dispatch({ type: "mouse_leave" });
      }}
      onMouseEnter={() => {
        dispatch({ type: "mouse_enter" });
      }}
      onClick={handleLogin}
    >
      <div className="[ font-family:'Inter',Helvetica] w-fit mt-[-1.00px] tracking-[0] text-[22px] font-medium text-center leading-[normal] relative ">
        LOGIN
      </div>
      {state.isHovered && (
        <img
          className="relative w-[13.01px] h-[12.01px]"
          alt="Vector"
          src={ShiftButton}
        />
      )}
    </button>
  );
};

function reducer(state, action) {
  switch (action.type) {
    case "mouse_enter":
      return {
        ...state,
        isHovered: true,
      };

    case "mouse_leave":
      return {
        ...state,
        isHovered: false,
      };

    default:
      return state;
  }
}
