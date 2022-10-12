import React from "react";
import Key from "./Key";

function Operator(props: {
  token: string;
  onClick: (token: string) => void;
  label: string;
}) {
  return (
    <Key
      className="bg-green-400  text-gray-900"
      token={props.label || props.token}
      onClick={() => props.onClick(props.token)}
    ></Key>
  );
}
export default Operator;
