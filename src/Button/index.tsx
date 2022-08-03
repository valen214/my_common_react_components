
import type {
  MouseEvent,
  MouseEventHandler,
  ReactNode,
  ForwardedRef
} from "react";
import React, {
  forwardRef,
} from "react";

import "./Button.scss";

export type ButtonProps = {
  children?: ReactNode
  href?: string
  onClick?: MouseEventHandler<HTMLAnchorElement | HTMLDivElement>
  className?: string
  disabled?: boolean
  [ key: string ]: any
}


function Button({
  children,
  href,
  onClick,
  className = "",
  disabled,
  ...props
}: ButtonProps, ref: ForwardedRef<Element>){
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
      <a ref={ref as ForwardedRef<HTMLAnchorElement>} { ...actualProps }>
        { children }
      </a>
    );
  }

  return (
    <div ref={ref as ForwardedRef<HTMLDivElement>} { ...actualProps }>
      { children }
    </div>
  )
}
export default forwardRef(Button);