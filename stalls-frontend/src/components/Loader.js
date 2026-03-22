import React from "react";

function Loader() {
  return (
    <div style={loader}>
      <div style={spinner}></div>
    </div>
  );
}

const loader = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  background: "rgba(255,255,255,0.6)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 9999
};

const spinner = {
  width: "50px",
  height: "50px",
  border: "5px solid #ddd",
  borderTop: "5px solid #1976d2",
  borderRadius: "50%",
  animation: "spin 1s linear infinite"
};

export default Loader;