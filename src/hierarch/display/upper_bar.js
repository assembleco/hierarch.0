import React from "react"
import styled from "styled-components"
import { Observer } from "mobx-react"

import {
  usePopoverState,
  Popover,
  PopoverDisclosure,
  PopoverArrow,
} from "reakit/Popover"


class UpperBar extends React.Component {
  render = () => (
    <Observer>{() => (
      <Bar>
        {this.props.children}
      </Bar>
    )}</Observer>
  )
}

var Opener = ({ name, visible, children }) => {
  var popover = usePopoverState({ animated: 250, visible })

  return (
    <>
      <PopoverDisclosure {...popover}>{name}</PopoverDisclosure>
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

var Bar = styled.div`
height: 4rem;
position: fixed;
top: 0;
left: 0;
right: 0;
background-color: #faf9dd;
border-bottom: 2px solid #3d3b11;
display: flex;
flex-direction: row;
justify-content: space-between;
align-items: baseline;
`

export default UpperBar
