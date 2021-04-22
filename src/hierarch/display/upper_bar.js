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

import size from "../mockup/size.png"
import spacing from "../mockup/spacing.png"
import symbols from "../mockup/typography.png"
import place from "../mockup/position.png"
import dynamics from "../mockup/layout.png"

const panes = {
  size,
  spacing,
  symbols,
  place,
  dynamics,
}

class Sidebar extends React.Component {
  state = {
    open: null,
  }

  render = () => (
    <HierarchScope.Consumer>
    {scope => (
      <Bar>
        {this.props.children}

        <Opener name="Hierarch" >
          <Hierarchy
            hierarchy={scope.hierarchy}
            display={this.props.display}
          />
        </Opener>

        {Object.keys(panes).map((pane, i) => (
          <Opener name={pane} >
            <img src={panes[pane]} alt={pane} />
          </Opener>
        ))}
      </Bar>
    )}
    </HierarchScope.Consumer>
  )
}

var Opener = ({ name, children }) => {
  var popover = usePopoverState()

  return (
    <>
      <PopoverDisclosure {...popover}>{name}</PopoverDisclosure>
      <Popover {...popover} aria-label={name}>
        <PopoverArrow {...popover} />
        {children}
      </Popover>
    </>
  )
}

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
background-color: #FAF9DD;
border-bottom: 2px solid #3d3b11;
display: flex;
flex-direction: row;
justify-content: space-between;
align-items: baseline;
`

export default Sidebar
