import React, { useState } from "react";
import Lotto from "./Components/Lotto/Lotto";


export default function App() {
  const [opt, setOpt] = useState("");

  const checkOptions = (e) => {
    const selectedOption = e.target.value;
    setOpt(selectedOption);
  };

  return (
    <>
      <div className="menu">
        <label htmlFor="jatekTipus">Lottó játék</label>
        <select
          id="jatekTipus"
          className="menu-select"
          onChange={checkOptions}
        >
          <option className="menu-item" value="0">
            Válassz itt!
          </option>
          <option className="menu-item" value="5">
            5-ös lottó
          </option>
          <option className="menu-item" value="6">
            6-os lottó
          </option>
          <option className="menu-item" value="7">
            7-es lottó
          </option>
        </select>
      </div>
      {opt !== '' && opt !== '0' && <Lotto key={opt} option={opt}/>}
    </>
  );
}


