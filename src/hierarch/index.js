import React from "react"
import styled, {css} from "styled-components"
import { observer, Observer } from "mobx-react"
import { runInAction } from "mobx"

import { HTML5Backend } from 'react-dnd-html5-backend'
import { DndProvider } from 'react-dnd'

import Scope from "./scope"

import Hierarchy from "./display/hierarchy"
import Logo from "./display/logo"
import UpperBar from "./display/upper_bar"
import Sidebar from "./display/sidebar"

import Size from "./menu/size"
import Symbols from "./menu/symbols"
import Record from "./menu/_record"
import spacing from "./mockup/spacing.png"
import symbols from "./mockup/typography.png"
import place from "./mockup/position.png"
import dynamics from "./mockup/layout.png"

import apply_boxes from "./engine/apply_boxes"

import { blocks } from "../App.js"

const HierarchScope = React.createContext()

class Hierarch extends React.Component {
  state = {
    open: false,
  }

  constructor(p) {
    super(p)
    this.scope = new Scope()
    window.scope = this.scope
    this.scope.blocks = blocks
    this.scope.pullSource()
  }

  apply_boxes = () => {
    this.setState({ open: !this.state.open })
    // apply_boxes(this.scope.index, this.scope.address)
    //  .then(() => this.scope.pullSource())
    this.scope.pullSource()
  }

  render = () => (
    <HierarchScope.Provider value={this.scope} >

    <Observer>{() => (
      <DndProvider backend={HTML5Backend} >
        <Display
          open={this.state.open}
          onMouseMove={(e) => {
            var code_key = e.target
              && typeof e.target.getAttribute === 'function'
              ? e.target.getAttribute("data-code")
              : null

            if(code_key)
              runInAction(() => this.scope.display = code_key)
          }}
        >
          {this.props.children}
        </Display>

        {this.state.open
          ?
          <>
            <UpperBar display={(code) => this.scope.display = code} >
              <LogoSpace>
                <Logo
                  size={20}
                  repeat={5000}
                  onClick={() => this.apply_boxes()}
                />
              </LogoSpace>
            </UpperBar>

            <Sidebar side="left" >
              <Sidebar.Header>Hierarchy</Sidebar.Header>
              <Hierarchy
                hierarchy={this.scope.hierarchy}
                display={this.props.display}
              />
            </Sidebar>

            <Sidebar side="right" size="16rem" >
              <Record onClick={() =>
                this.scope.applyRulesOnChosen()
              } >Record</Record>

              <Sidebar.Header>Size</Sidebar.Header>
              <Size/>

              <Sidebar.Header>Symbols</Sidebar.Header>
              <Symbols/>
              <Mockup src={symbols} alt="symbols" />
              <br/>

              <Sidebar.Header>Spacing</Sidebar.Header>
              <a href="https://github.com/assembleapp/hierarch/issues/12">Coming Soon</a>
              <Mockup src={spacing} alt="spacing" />
              <br/>

              <Sidebar.Header>Place</Sidebar.Header>
              <a href="https://github.com/assembleapp/hierarch/issues/14">Coming Soon</a>
              <Mockup src={place} alt="place" />
              <br/>

              <Sidebar.Header>Dynamics</Sidebar.Header>
              <a href="https://github.com/assembleapp/hierarch/issues/15">Coming Soon</a>
              <Mockup src={dynamics} alt="dynamics" />
              <br/>
            </Sidebar>
          </>
          :
          <Corner>
            <Logo
              size={20}
              repeat={5000}
              onClick={() => this.apply_boxes()}
            />
          </Corner>
        }
      </DndProvider>
    )}</Observer>
    </HierarchScope.Provider>
  )
}

var LogoSpace = styled.div`
`

const Display = styled.div`
margin: 0;
${({open}) => open && css`
position: fixed;
top: 4rem;
left: 12rem;
right: 16rem;
`}
`

const Corner = styled.div`
position: fixed;
top: 0;
left: 0;
height: 40px;
width: 40px;
`

var Mockup = styled.img`
width: 100%;
`

export { HierarchScope }
export default observer(Hierarch)
