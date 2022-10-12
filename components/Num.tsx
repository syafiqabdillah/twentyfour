import React from "react";
import Key from "./Key";

function Num(props: {
  token: string;
  index: number;
  active: boolean;
  onClick: (token: string, index: number) => void;
}) {
  return (
    <Key
      className={
        props.active ? "bg-blue-400 text-gray-900" : "bg-gray-400 text-gray-900"
      }
      token={props.token}
      onClick={() => props.onClick(props.token, props.index)}
    ></Key>
  );
}

export default Num;
