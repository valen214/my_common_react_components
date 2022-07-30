
import type { CSSProperties } from "react";

import "./icons.scss";

export default function VerticalDotsIcon({
  style,
  className
}: {
  style?: CSSProperties
  className?: string
}){
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      className={"icon " + className}
      style={style}
    >
      <path
        stroke="none"
        fill="currentColor"
        d="M12,16 A2,2 0 0,1 14,18
          A2,2 0 0,1 12,20
          A2,2 0 0,1 10,18
          A2,2 0 0,1 12,16
          M12,10 A2,2 0 0,1 14,12
          A2,2 0 0,1 12,14
          A2,2 0 0,1 10,12
          A2,2 0 0,1 12,10
          M12,4 A2,2 0 0,1 14,6
          A2,2 0 0,1 12,8
          A2,2 0 0,1 10,6
          A2,2 0 0,1 12,4Z"
      />
    </svg>
  );
}

/*
<span style={style(`
  aspect-ratio: 1 / 1;
  height: 1em;
  line-height: 1em;
  font-size: 1.5em;
  position: absolute;
  top: 50%;
  left: 0.5em;
  transform: translateY(-50%);
`)}>&#8942;</span>&nbsp;


https://fonts.google.com/icons?icon.query=menu

*/