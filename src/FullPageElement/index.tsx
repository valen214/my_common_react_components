
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
  transparentBackground?: boolean
  noSize?: boolean
}

export default function FullPageElement({
  children,
  onClose,
  open = false,
  element = "div",
  flexCentered = true,
  noBackground,
  transparentBackground = false,
  noSize
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
    document.body.appendChild(fullPageElem);
    return () => {
      document.body.removeChild(fullPageElem);
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