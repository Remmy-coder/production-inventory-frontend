import { CircularProgress } from "@mui/material";
import React from "react";

const Loader: React.FC = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      {/* <img
        src={require("../assets/images/loader.gif")}
        alt="Loading..."
      /> */}
      <CircularProgress
        sx={{ color: "slateblue" }}
        size={100}
        thickness={5}
      />
    </div>
  );
};

export default Loader;
