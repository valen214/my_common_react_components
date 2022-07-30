
import type { CSSProperties, ReactNode } from "react";
import { useState } from "react";
import Button from "../Button";

import "./Dropdown.scss";


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
  className,
  icon="arrow_drop_down",
  text="Dropdown list"
}: DropdownProps){
  const [ showDropdown, setShowDropdown ] = useState(false);

  return (
    <div className={"dropdown " + className} style={style}>
      <Button className="dropdown-trigger"
        onClick={() => {
          setShowDropdown(!showDropdown);
        }}>
        {icon && <span className="material-icons">{icon}</span>}
        {text}
      </Button>
      { showDropdown && (
        <div className="dropdown-list">
          <span className="dropdown-item">Hey</span>
          <span className="dropdown-item">Hey</span>
          <span className="dropdown-item">Hey</span>
        </div>
    )}
    </div>
  )
}