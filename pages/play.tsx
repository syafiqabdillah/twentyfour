import Head from "next/head";
import React, { useEffect, useState } from "react";
import Bracket from "../components/Bracket";
import Key from "../components/Key";
import Num from "../components/Num";
import Operator from "../components/Operator";

type OperatorType = {
  label: string;
  token: string;
};

const OPERATORS: OperatorType[] = [
  {
    label: "+",
    token: "+",
  },
  {
    label: "-",
    token: "-",
  },
  {
    label: ":",
    token: ":",
  },
  {
    label: "x",
    token: "*",
  },
];

function getRandomNumber(): number {
  return Math.floor(1000 + Math.random() * 9000);
}

function Play() {
  const [num, setNum] = useState(0);
  const [usedNumIndexes, setUsedNumIndexes] = useState<number[]>([]);
  const [solution, setSolution] = useState("");
  const [lastResult, setLastResult] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    setNum(getRandomNumber());
    // setNum(2046);
  }, []);

  function playAgain() {
    setNum(getRandomNumber());
    setUsedNumIndexes([]);
    setSolution("");
    setLastResult("");
    setDone(false);
  }

  function onClickNum(token: string, index: number): void {
    if (
      usedNumIndexes.includes(index) ||
      (solution.length > 0 &&
        "1234567890".includes(solution[solution.length - 1]))
    ) {
      console.log("do nothing");
    } else {
      setSolution((cur) => cur + token);
      setUsedNumIndexes((cur) => [...cur, index]);
    }
  }

  function onClickOperator(token: string): void {
    if (
      solution.length === 0 ||
      (solution.length > 0 && "+-x:(".includes(solution[solution.length - 1]))
    ) {
      console.log("do nothing");
    } else {
      setSolution((cur) => cur + token);
    }
  }

  function isLastOperator() {
    return solution.length > 0
      ? "+-:x".includes(solution[solution.length - 1])
      : false;
  }

  function isLastNumber() {
    return solution.length > 0
      ? "1234567890".includes(solution[solution.length - 1])
      : false;
  }

  function onClickBracket(token: string): void {
    switch (token) {
      case "(":
        setSolution((cur) => cur + token);
        break;
      case ")":
        setSolution((cur) => cur + token);
        break;
    }
  }

  function replaceTimes(s: string): string {
    return s.replaceAll("x", "*");
  }

  function evaluate(): void {
    console.log("evaluate", solution);
    try {
      const result = eval(replaceTimes(solution));
      console.log(result);
      setLastResult(result);
    } catch (err) {
      console.log("not a valid eval", solution);
      alert("invalid evaluation");
      playAgain();
    }
  }

  function backspace() {
    if (solution.length > 0) {
      if (isLastNumber()) {
        setUsedNumIndexes((cur) => cur.slice(0, usedNumIndexes.length - 1));
      }
      setSolution((cur) => cur.slice(0, solution.length - 1));
    }
  }

  function submit(): void {
    evaluate();
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-300 flex flex-col items-center justify-center gap-6">
      <Head>
        <title>Play 24</title>
      </Head>
      <h1 className="text-xl">Make it as close as possible to 24</h1>
      <h2 className="font-bold text-6xl tracking-widest">{num}</h2>
      <div className=" text-5xl tracking-[20px]">{solution}</div>
      <div className="flex w-full max-w-xl justify-center items-start gap-2">
        <div className="grid grid-cols-2 gap-2 ">
          {num
            .toString()
            .split("")
            .map((char, index) => (
              <Num
                token={char}
                index={index}
                key={`num-${index}`}
                active={!usedNumIndexes.includes(index)}
                onClick={() => {
                  onClickNum(char, index);
                }}
              ></Num>
            ))}
        </div>
        <div className="grid grid-cols-3 gap-2">
          {OPERATORS.map((op, index) => (
            <Operator
              key={"operator" + index}
              token={op.token}
              onClick={() => onClickOperator(op.label)}
              label={op.label}
            ></Operator>
          ))}
          <Bracket token={"("} onClick={() => onClickBracket("(")}></Bracket>
          <Bracket token={")"} onClick={() => onClickBracket(")")}></Bracket>
          <Key
            className="bg-blue-400"
            token={"DEL"}
            onClick={() => backspace()}
          ></Key>
        </div>
      </div>
      {usedNumIndexes.length === 4 && (
        <div
          onClick={() => submit()}
          className="bg-blue-500 text-2xl font-semibold uppercase mt-10 px-6 py-4 rounded-xl cursor-pointer text-white  tracking-[3px]"
        >
          submit
        </div>
      )}
      {done && (
        <div className="mt-8">
          <button onClick={() => playAgain()} className="">
            Play Again
          </button>
        </div>
      )}
    </div>
  );
}

export default Play;
