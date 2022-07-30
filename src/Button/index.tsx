
import type {
  MouseEvent,
  MouseEventHandler,
  ReactNode
} from "react";
import React from "react";

import "./Button.scss";

export type ButtonProps = {
  children?: ReactNode
  href?: string
  onClick?: MouseEventHandler<HTMLAnchorElement | HTMLDivElement>
  className?: string
  disabled?: boolean
  [ key: string ]: any
}


export default function Button({
  children,
  href,
  onClick,
  className = "",
  disabled,
  ...props
}: ButtonProps){
  const actualProps = {
    className: "button " + (
      disabled ? " disabled " : ""
    ) + className,
    href,
    onClick,
    ...props
  };


  if(href){

    return (
      <a { ...actualProps }>
        { children }
      </a>
    );
  }

  return (
    <div { ...actualProps }>
      { children }
    </div>
  )
}