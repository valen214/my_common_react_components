

import { useEffect, useRef, useState } from "react";

export default function PromiseChild({
  defaultValue,
  children
}: {
  defaultValue?: any
  children?: Promise<any>
}){
  const [ resolvedValue, setResolvedValue ] = useState(defaultValue);
  const callbackContainer = useRef(setResolvedValue);

  useEffect(() => {
    children?.then?.(value => {
      callbackContainer?.current(value);
    }).catch(err => {
      console.error(err);
    })

    return () => {
      // callbackContainer.current = () => {};
    }
  }, [ children ])

  return (
    <>
      {resolvedValue}
    </>
  )
}