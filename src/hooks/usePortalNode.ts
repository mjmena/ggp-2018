import React, { useLayoutEffect } from "react";

const usePortalNode = () => {
  const node = document.createElement("div");

  useLayoutEffect(() => {
    document.body.appendChild(node);
    node.style.position = "absolute";
    node.style.height = "100px";
    node.style.width = "100px";
    node.style.backgroundColor = "red";
    return () => {
      document.body.removeChild(node);
    };
  }, []);

  return node;
};

export default usePortalNode;
