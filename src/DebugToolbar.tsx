import React, { Dispatch, SetStateAction } from "react";
import { Vector } from "./types";

type Props = {
  offset: Vector;
  setOffset: Dispatch<SetStateAction<Vector>>;
  spacing: number;
  setSpacing: Dispatch<SetStateAction<number>>;
};

const DebugToolbar = ({ offset, setOffset, spacing, setSpacing }: Props) => {
  const changeSpacing = (e: React.ChangeEvent<HTMLInputElement>) =>
    setSpacing(Number.parseInt(e.target.value));
  const changeOffsetX = (e: React.ChangeEvent<HTMLInputElement>) =>
    setOffset({ x: Number.parseInt(e.target.value), y: offset.y } as Vector);
  const changeOffsetY = (e: React.ChangeEvent<HTMLInputElement>) =>
    setOffset({ y: Number.parseInt(e.target.value), x: offset.x } as Vector);

  return (
    <>
      (<input type="number" onInput={changeOffsetX} step={5} value={offset.x} />
      ,
      <input type="number" onInput={changeOffsetY} step={5} value={offset.y} />)
      <input type="number" onInput={changeSpacing} value={spacing} />
    </>
  );
};

export default DebugToolbar;
