import React from "react";

const RemoveIcon = ({ width = 12, height = 16, color = "#9E9E9E" }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 12 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0.999349 13.8333C0.999349 14.75 1.74935 15.5 2.66602 15.5H9.33268C10.2493 15.5 10.9993 14.75 10.9993 13.8333V3.83333H0.999349V13.8333ZM11.8327 1.33333H8.91602L8.08268 0.5H3.91602L3.08268 1.33333H0.166016V3H11.8327V1.33333Z"
        fill={color}
      />
    </svg>
  );
};

export default RemoveIcon;
