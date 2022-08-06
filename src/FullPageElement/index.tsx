
import type { 
  ReactNode
} from "react";
import React, {
  useEffect, useState, useMemo
} from "react";

import ReactDOM from "react-dom";

import "./FullPageElement.scss";

export type FullPageElementProps = {
  children?: ReactNode
  onClose?: Function
  open?: boolean
  element?: string
  flexCentered?: boolean
  noBackground?: boolean
  backgroundColor?: any
  transparentBackground?: boolean
  noSize?: boolean
}


/*
https://github.com/mui/material-ui/blob/master/
packages/mui-base/src/Portal/Portal.js

do I need to cloneElement?
*/
export default function FullPageElement({
  children,
  onClose,
  open = false,
  element = "div",
  flexCentered = true,
  noBackground,
  backgroundColor,
  transparentBackground = false,
  noSize,
}: FullPageElementProps){

  const [ fullPageElem ] = useState(() => {
    const fullPageElem = document.createElement(element);
    fullPageElem.classList.add("root-element");

    // should be aware of reference of onClose
    fullPageElem.addEventListener("click", (e) => {
      if(e.target === fullPageElem){
        onClose?.(e);
      }
    })

    return fullPageElem;
  });
  useEffect(() => {
    let cl = fullPageElem.classList;

    cl.toggle("background", !noBackground);
    cl.toggle("transparent-background", transparentBackground);
    cl.toggle("full-page", !noSize);
  }, [ noBackground, transparentBackground, noSize ]);
  useEffect(() => {
    fullPageElem.style.backgroundColor = backgroundColor;
  }, [ backgroundColor ])
  useEffect(() => {
    document.body.appendChild(fullPageElem);
    return () => {
      if(document.body.contains(fullPageElem)){
        document.body.removeChild(fullPageElem);
      }
    }
  }, [ fullPageElem ]);

  useEffect(() => {
    fullPageElem.classList.toggle("flex", flexCentered);
  }, [ flexCentered, fullPageElem ])
  useEffect(() => {
    fullPageElem.classList.toggle("show", open);
  }, [ open, fullPageElem ])

  return ReactDOM.createPortal(
    children,
    fullPageElem
  );
}