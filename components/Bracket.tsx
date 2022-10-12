import React from "react";
import Key from "./Key";

function Bracket(props: { token: String; onClick: () => void }) {
  return (
    <Key
      className="bg-green-400 text-gray-900"
      token={props.token}
      onClick={() => props.onClick()}
    ></Key>
  );
}

export default Bracket;
