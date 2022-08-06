import React, {
  RefObject,
  forwardRef, PropsWithChildren, useEffect, useRef, useState, ReactNode
} from "react";
import styled from "styled-components";
import { CSSTransition } from 'react-transition-group';


const StyledCollapseWrapper = styled.div<{
  _in?: boolean
  height?: number | null
  ref?: RefObject<HTMLDivElement>
}>`


  position: relative;
  overflow: hidden;

  & > div {
    position: absolute;
  }


  &:not([class*="collapse-wrapper"]) {
    ${({_in, height}) => _in && height ? "height: " + height + "px;" : ""}
  }
  &.collapse-wrapper-enter {
    height: 0;
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
  in?: boolean
} & Partial<PropsWithChildren<ReactNode>>>(function Collapse({
  orientation = "vertical",
  in: _in,
  children,
  ...props
}, ref){
  const [ height, setHeight ] = useState<number | null>(0);
  const [ __in, set_in ] = useState(_in);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let rect = wrapperRef.current?.
        firstElementChild?.getBoundingClientRect();
      
    if(rect?.height){
      setHeight(rect.height);
    }

    console.log("HEY", rect);
  }, [ _in ]);

  return (
    <CSSTransition
      appear
      nodeRef={wrapperRef}
      in={_in}
      timeout={300}
      classNames="collapse-wrapper"
    >
      <StyledCollapseWrapper
        ref={wrapperRef}
        height={height}
        _in={_in}
      >
        <div ref={ref} {...props}>
          {children}
        </div>
      </StyledCollapseWrapper>
    </CSSTransition>
  )
});

export default Collapse;
