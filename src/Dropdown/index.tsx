
import { CSSProperties, ReactElement, ReactNode, useRef } from "react";
import React, { useState } from "react";
import Button from "../Button";
import FullPageElement from "../FullPageElement";

import "./Dropdown.scss";

/*
  use of FullPageElement (which used ReactDOM.createPortal)
  put the dropdown list out of the main DOM tree, where
  the imported style sheets are located, so .scss won't work


  BUGGED?
https://stackoverflow.com/questions/34130539/
uncaught-error-invariant-violation-element-type-is-invalid-expected-a-string
*/
export type DropdownProps = {
  children?: ReactNode
  style?: CSSProperties
  className?: string
  icon?: string
  text?: string
}
export default function Dropdown({
  children,
  style,
  className = "",
  icon = "arrow_drop_down",
  text = "Dropdown list"
}: DropdownProps){
  const [ showDropdown, _setShowDropdown ] = useState(false);
  const triggerRef = useRef<HTMLElement>(null);
  const [ dropDownDim, setDropDownDim ] = useState([0, 0, 0]);

  const setShowDropdown = (show: boolean) => {
    if(show){
      if(triggerRef.current){

        let rect = triggerRef.current.getBoundingClientRect();
        setDropDownDim([ rect.left, rect.bottom, rect.width ]);
      }


    }
    _setShowDropdown(show);
  }

  return (
    <div className={"dropdown " + className} style={style}>
      <FullPageElement
        open={showDropdown}
        onClose={() => setShowDropdown(false)}
        transparentBackground
      >
        <style>
          .dropdown-list {'{'}
            position: absolute;
            left: {dropDownDim[0] + "px"};
            top: {dropDownDim[1] + "px"};
            width: {dropDownDim[2] + "px"};
            height: auto;

            background: rgba(0, 0, 0, 0.04);

            border: 1px solid black;
            border-top: none;
          {'}'}

          .dropdown-list {'>'} * {'{'}
            padding: 15px;
            cursor: pointer;
            
          {'}'}
          .dropdown-list {'>'} *:hover {'{'}
            background: rgba(0, 0, 0, 0.04);
            
          {'}'}
        </style>
        <div className="dropdown-list">
          {""
            // the style works
            //<Button className="dropdown-item">Hey</Button>
          }
          <div className="dropdown-item">Hey</div>
          <div className="dropdown-item">Hey</div>
          {(children as ReactElement[])?.map?.(elem => {
            console.log(elem);
            return elem;
          })}
        </div>
      </FullPageElement>
      <Button className="dropdown-trigger"
        ref={triggerRef}
        onClick={() => {
          setShowDropdown(!showDropdown);
        }}>
        {icon && <span className="material-icons">{icon}</span>}
        {text}
      </Button>
    </div>
  )
}