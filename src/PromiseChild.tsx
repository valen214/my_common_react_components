

import { useEffect, useState } from "react";

export default function PromiseChild({
  defaultValue,
  children
}: {
  defaultValue?: any
  children?: Promise<any>
}){
  const [ resolvedValue, setResolvedValue ] = useState(defaultValue);

  useEffect(() => {
    children?.then?.(value => {
      setResolvedValue(value);
    })
  }, [ children ])

  return (
    <>
      {resolvedValue}
    </>
  )
}