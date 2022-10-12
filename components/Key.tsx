import React from "react";

function Key(props: { className: string; token: String; onClick: () => void }) {
  return (
    <div
      className={`h-20 w-20 text-gray-900 rounded flex items-center justify-center text-3xl cursor-pointer hover:brightness-110 ${props.className}`}
      onClick={props.onClick}
    >
      {props.token}
    </div>
  );
}

export default Key;
