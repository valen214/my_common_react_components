

import {
  useState,
  useEffect,
  useRef,
  CSSProperties
} from "react"


export const style = (cssString: string): CSSProperties => {
  let out: any = {};
  // I know it would break in ::after - content: ";:"
  cssString.split(";"
  ).map(s => s.split(":")
  ).forEach(([key, value]) => {
    if(!value) return;
    
    let camelKey = key.replace(
      /-[a-z]/g, g => g[1].toUpperCase()
    ).trim();
    out[camelKey] = value.trim();
  })
  // Object.fromEntries() // 91.97% on caniuse

  return out;
};


export function useScript(src: string){
  useEffect(() => {
    let elem = document.createElement("script");
    elem.src = src;
    document.body.appendChild(elem);
    return () => {
      document.body.removeChild(elem);
    }
  }, [ src ])
}




export function useAsyncEffect<A,B,C,D,E,F,G>(
  effect: (isMounted: () => boolean) => any,
  deps?: Partial<[A, B, C, D, E, F, G]> | [],
){
  const [ a, b, c, d, e, f, g ] = deps || [];
  useEffect(() => {
    let mounted = true;
    let isMounted = () => mounted;

    effect(isMounted);

    return () => { mounted = false; }
  }, [ a, b, c, d, e, f, g, effect ])
}

export function useDrunkState(obj: object){
  let out = {};
  const _b = useState // trick the static analyzer
  for(let [key, value] of Object.entries(obj)){
    const [ foo, setFoo ] = _b(value);
    Object.defineProperty(out, key, {
        set: setFoo, get(){ return foo; },
        // configurable: true
    });
  }
  return out;
}

// https://overreacted.io/making-setinterval-declarative-with-react-hooks/
export function useInterval(callback: Function, delay: number) {
  const savedCallback = useRef<Function>();

  useEffect(() => {
    savedCallback.current = callback;
  });

  useEffect(() => {
    function tick(){
      savedCallback.current?.();
    }

    let id = setInterval(tick, delay);
    return () => clearInterval(id);
  }, [ delay ]);
}
