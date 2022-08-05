import React, {
  RefObject,
  forwardRef, PropsWithChildren, useEffect, useRef, useState, ReactNode
} from "react";
import styled from "styled-components";
import { CSSTransition } from 'react-transition-group';


const StyledCollapseWrapper = styled.div<{
  open?: boolean
  height?: number | null
  ref?: RefObject<HTMLDivElement>
}>`


  position: relative;
  overflow: hidden;

  & > div {
    position: absolute;
  }


  &.collapse-wrapper-enter {
    height: 0px;
  }
  &.collapse-wrapper-enter-active {
    ${({height}) => height ? "height: " + height + "px;" : ""}
    transition: height 0.3s;
  }
  &.collapse-wrapper-enter-done {
    ${({height}) => height ? "height: " + height + "px;" : ""}
  }
  &.collapse-wrapper-exit {
    ${({height}) => height ? "height: " + height + "px;" : ""}
  }
  &.collapse-wrapper-exit-active{
    height: 0px;
    transition: height 0.3s;
    overflow: hidden;
  }
  &.collapse-wrapper-exit-done {
  }
`


const Collapse = forwardRef<HTMLDivElement, {
  orientation?: "horizontal" | "vertical"
  open?: boolean
} & Partial<PropsWithChildren<ReactNode>>>(function Collapse({
  orientation = "vertical",
  open,
  children,
  ...props
}, ref){
  const [ height, setHeight ] = useState<number | null>(0);
  const [ _open, setOpen ] = useState(open);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let rect = wrapperRef.current?.
        firstElementChild?.getBoundingClientRect();
      
    if(rect?.height){
      setHeight(rect.height);
    }

    console.log("HEY", rect);
  }, [ open ]);

  return (
    <CSSTransition
      nodeRef={wrapperRef}
      in={open}
      timeout={300}
      classNames="collapse-wrapper"
    >
      <StyledCollapseWrapper
        ref={wrapperRef}
        height={height}
        open={open}
      >
        <div ref={ref} {...props}>
          {children}
        </div>
      </StyledCollapseWrapper>
    </CSSTransition>
  )
});

export default Collapse;
