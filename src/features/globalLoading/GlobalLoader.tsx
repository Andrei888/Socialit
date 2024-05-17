import React from "react";

const GlobalLoader: React.FC = () => {
  return (
    <div className="global-loader-wrapper">
      <div className="global-loader">
        <div className="global-loader-spinner"></div>
      </div>
    </div>
  );
};

export default GlobalLoader;
