import React from "react";

const JumbotronComponent = ({
  heading = "",
  variant = "default",
  children,
}) => {
  const variantProvider = (variant) => {
    switch (variant) {
      case "success":
        return "turquoise";
      case "critical":
        return "coral";
      case "default":
        return "lavender";
      default:
        break;
    }
  };
  return (
    <div className="jumbotron jumbotron-fluid" style={{ margin: "0.75rem 0" }}>
      <div
        className="container"
        style={{
          padding: "0.5rem",
          backgroundColor: variantProvider(variant),
          borderRadius: "12px",
        }}
      >
        <h1 className="display-4">{heading}</h1>
        <p className="lead">{children}</p>
      </div>
    </div>
  );
};

export default JumbotronComponent;
