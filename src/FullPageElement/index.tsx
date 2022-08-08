
import React, { 
  CSSProperties,
  ReactNode,
  useEffect,
  useLayoutEffect,
  useRef,
  useState, useMemo
} from "react";

import ReactDOM from "react-dom";

import "./FullPageElement.scss";
import { randomstring, toKebab } from "../util/string";

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
  backgroundStyle?: CSSProperties
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
  backgroundStyle,
}: FullPageElementProps){
  const createRootElement = () => {
    console.log("NEWWWWWWW FULL PAGE ELEMT");
    let fullPageElem = document.createElement(element);
    fullPageElem.classList.add("root-element");



    fullPageElem.classList.add(cssClass);

    return fullPageElem;
  };

  const [ cssClass ] = useState(() => randomstring(16))

  const [ fullPageElem, setFullPageElem ] = useState(createRootElement);
  const [ styleElem, setStyleElem ] = useState(() => {
    
    const styleElem = document.createElement("style");
    styleElem.setAttribute(
      "data-description",
      "style used by FullPageElement, " + cssClass
    );
    document.body.appendChild(styleElem);
    return styleElem;
  });

  useEffect(() => {
    console.log("HMMMMMMMM22222222222222");
    // should be aware of reference of onClose
    const listener = (e: MouseEvent) => {
      console.log("HMMMMMMMM");
      if(e.target === fullPageElem){
        onClose?.(e);
      }
    }
    fullPageElem.addEventListener("click", listener)

    return () => {
      console.log("DESSSSSSSTROY FULL PAGE ELEMT");
      // if(document.body.contains(fullPageElem)){
      //   document.body.removeChild(fullPageElem);
      // }
      // if(document.body.contains(styleElem)){
      //   document.body.removeChild(styleElem);
      // }

      fullPageElem.removeEventListener("click", listener)
    };
  }, [ fullPageElem ]);




  useEffect(() => {
    let cssString = Object.entries({
      ...(backgroundStyle || {})
    }).map(([k, v]) => `${toKebab(k)}:${v};`).join("");
    if(styleElem){
      styleElem.innerHTML = `div.root-element.${cssClass} {${cssString}}`;
    }
  }, [ styleElem, backgroundStyle ])


  useEffect(() => {
    let cl = fullPageElem.classList;

    cl.toggle("background", !noBackground);
    cl.toggle("transparent-background", transparentBackground);
    cl.toggle("full-page", !noSize);
  }, [ fullPageElem, noBackground, transparentBackground, noSize ]);
  useEffect(() => {
    fullPageElem.style.backgroundColor = backgroundColor;
  }, [ fullPageElem, backgroundColor ])

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