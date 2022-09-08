import React from "react";

import Grandchild from "./Grandchild";

const Child = () => (
  <div className="Child">
    <h2>Child component</h2>
    <Grandchild />
  </div>
);

export default Child;
