import React, { Dispatch, SetStateAction } from "react";
import { Vector } from "./types";

type Props = {
  spacing: number;
  setSpacing: Dispatch<SetStateAction<number>>;
};

const DebugToolbar = ({ spacing, setSpacing }: Props) => {
  const changeSpacing = (e: React.ChangeEvent<HTMLInputElement>) =>
    setSpacing(Number.parseInt(e.target.value));
  return (
    <>
      <input type="number" onChange={changeSpacing} value={spacing} />
    </>
  );
};

export default DebugToolbar;
