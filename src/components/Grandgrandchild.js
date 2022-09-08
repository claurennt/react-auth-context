import React from "react";

import Grandgrandgrandchild from "./Grandgrandgrandchild";
const Grandgrandchild = () => (
  <div className="Grandgrandchild">
    <h4>Grandgrandchild</h4>

    <Grandgrandgrandchild />
  </div>
);

export default Grandgrandchild;
