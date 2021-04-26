import React from "react"
import styled from "styled-components"
import Icon from "@mdi/react"
import { mdiClose } from "@mdi/js"
import { observable } from "mobx"
import { Observer } from "mobx-react"

import { HierarchScope } from "../index"
import Scope from "../engine/scope"

import Grid from "./grid"
import Hierarchy from "./hierarchy"

import {
  usePopoverState,
  Popover,
  PopoverDisclosure,
  PopoverArrow,
} from "reakit/Popover"

import Size from "../menu/size"
import size from "../mockup/size.png"
import spacing from "../mockup/spacing.png"
import symbols from "../mockup/typography.png"
import place from "../mockup/position.png"
import dynamics from "../mockup/layout.png"

class Sidebar extends React.Component {
  state = {
    open: null,
  }

  render = () => (
    <HierarchScope.Consumer>
    {scope => (
      <Observer>{() => (
      <Bar>
        {this.props.children}

        <Opener name="hierarchy" >
          <Hierarchy
            hierarchy={scope.hierarchy}
            display={this.props.display}
          />
        </Opener>

        <Opener name="size" >
          <Size />
        </Opener>

        <Opener name="spacing" >
          <img src={spacing} alt="spacing" />
        </Opener>

        <Opener name="symbols" >
          <img src={symbols} alt="symbols" />
        </Opener>

        <Opener name="place" >
          <img src={place} alt="place" />
        </Opener>

        <Opener name="dynamics" >
          <img src={dynamics} alt="dynamics" />
        </Opener>
      </Bar>
      )}</Observer>
    )}
    </HierarchScope.Consumer>
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

const BaseColumn = styled.div`
background: #2a2a2aa0;
color: #b1b1e2cc;
`

const Column = styled(BaseColumn)`
padding: 0.5rem;
`

const ScrollColumn = styled(Column)`
position: relative;
overflow: hidden;
display: flex;
flex-direction: row;
`

const Scroller = styled.div`
width: 100%;
height: 10000px;
display: flex;
flex-direction: column;
`
const Scrollable = styled.div`
position: absolute;
top: 0;
left: 0;
right: 0;
bottom: 0;
overflow-y: scroll;
::-webkit-scrollbar {
  display: none;
}
`

const Close = styled.span`
float: right;
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

export default Sidebar
