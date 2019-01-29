import { useState, Dispatch, SetStateAction } from "react";
import { Vector } from "../types";

function useOffset(initialOffset: Vector) {
  const [offset, setOffset] = useState(initialOffset);
  return [offset, setOffset] as [Vector, Dispatch<SetStateAction<Vector>>];
}

export default useOffset;
