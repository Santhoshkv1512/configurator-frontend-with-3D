import React, { useState } from 'react';
import '../main.css'

import Style from './MainBoard/Style';
import Dimension from './MainBoard/Dimension';
import Material from './MainBoard/Material';
import PrintSpec from './MainBoard/PrintSpec';
import PrintSurface from './MainBoard/PrintSurface';
import Coating from './MainBoard/Coating';
import Finishing from './MainBoard/Finishing';
import Quantity from './MainBoard/Quantity';
import { state } from '../store';

const TAB_DATA = [
  ["Style"],
  ["Dimension"],
  ["Material"],
  ["Print Spec"],
  ["Print Surface"],
  ["Coating"],
  ["Finishing"],
  ["Quantity"]
];

const MainBoard = () => {
  const [active, setActive] = useState(0);

  const clickHandler = (e) => {
    setActive(parseInt(e.currentTarget.attributes.num.value));
    state.currentTab = TAB_DATA[parseInt(e.currentTarget.attributes.num.value)][0].toLowerCase();
  }

  const contentReceive = (label) => {
    switch (label) {
        case "Style":
            return <Style/>
            break;
        case "Dimension":
            return <Dimension/>
            break;
        case "Material":
            return <Material/>
            break;
        case "Print Spec":
            return <PrintSpec/>
            break;
        case "Print Surface":
            return <PrintSurface/>
            break;
        case "Coating":
            return <Coating/>
            break;
        case "Finishing":
            return <Finishing/>
            break;
        case "Quantity":
            return <Quantity/>
            break;
        default:
            return label
            break;
    }
  }
  let content = "";
  const tabs = TAB_DATA.map(([label], i) => {
    content = active === i ? contentReceive(label) : content;
    return (
      <li
        className={active === i ? "tab active" : "tab"}
        key={label}
        num={i}
        onClick={clickHandler}
      >
        {label}
      </li>
    );
  });

  return (
    <section className="tabs">
      <menu>
        <ul>{tabs}</ul>
      </menu>
      <div>{content}</div>
    </section>
  );
};

export default MainBoard;