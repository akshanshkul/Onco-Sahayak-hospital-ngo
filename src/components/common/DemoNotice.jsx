import React from "react";

export default function DemoNotice({ children = "Sample data is shown until this module is connected to the backend." }) {
  return <p className="demo-notice"><span className="demo-badge">Demo</span>{children}</p>;
}
