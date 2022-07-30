

import type { Dispatch, SetStateAction } from "react"
import {
  useState,
  useEffect,
  useMemo
} from "react";
import ReactDOM from "react-dom";


import  "./style.scss";

export type useFullPageElementOptions = {
  deps?: React.DependencyList
}
/**
 * 
 * @param param0 
 * @returns setMessageElement - Element to display, set null to hide
 */
export default function useFullPageElement({
  deps
}: useFullPageElementOptions = {}): [
  Dispatch<SetStateAction<JSX.Element | null>>
] {
  const [
    messageElement, setMessageElement
  ] = useState<JSX.Element | null>(null);

  const fullPageDiv = useMemo(() => {
    const fullPageDiv = document.createElement("div");
    document.body.appendChild(fullPageDiv);
    return fullPageDiv;
  }, [])
  useEffect(() => {
    return () => {
      document.body.removeChild(fullPageDiv);
    }
  }, []);

  // render
  useEffect(() => {
    const fullPageElement = messageElement ? (
      <div className="full-page">
        <div className="background"
          onClick={() => {
            setMessageElement(null);
          }}
        ></div>
        { messageElement }
      </div>
    ) : (
      <div className="display-none"></div>
    )

    // https://reactjs.org/docs/portals.html
    ReactDOM.render(fullPageElement, fullPageDiv);
    
  }, [ messageElement, ...(deps || []) ]);


  // helper functions
  return [
    setMessageElement
  ];
}