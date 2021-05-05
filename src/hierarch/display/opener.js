import React from "react"
import styled from "styled-components"

import {
  usePopoverState,
  Popover,
  PopoverDisclosure,
  PopoverArrow,
} from "reakit/Popover"

var Opener = ({ name, visible, children, style }) => {
  var popover = usePopoverState({ animated: 250, visible })

  return (
    <>
      <PopoverDisclosure {...popover} style={style}>
        {name}
      </PopoverDisclosure>
      <Popover {...popover} aria-label={name}>
        <PopoverWrapper>
          <PopoverArrow {...popover} />
          {children}
        </PopoverWrapper>
      </Popover>
    </>
  )
}

var PopoverWrapper = styled.div`
  background-color: #faf9dd;
  padding: 8px;
  border: 2px solid #3d3b11;
  border-radius: 4px;
  transition: opacity 250ms ease-in-out, transform 250ms ease-in-out;
  opacity: 0;
  transform-origin: top center;
  transform: translate3d(0, -20px, 0);
  [data-enter] & {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
`

export default Opener
