
import type { CSSProperties } from "react";

export default function SortButton({
  style
}: {
  style?: CSSProperties
}){
  return (
    <svg
        style={style}
        className="sort-button"
        width="35" height="35" viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg">
      <path d="
        M 10 12.5 h 80 v 15 h -80 Z
        M 10 42.5 h 55 v 15 h -55 Z
        M 10 72.5 h 30 v 15 h -30 Z"
      stroke="black" fill="black" />
    </svg>
  );
}

/*

https://fonts.google.com/icons?icon.query=menu

*/