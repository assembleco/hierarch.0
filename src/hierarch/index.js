import React from "react"
import styled from "styled-components"
import { observer, Observer } from "mobx-react"
import { runInAction } from "mobx"

import { HTML5Backend } from 'react-dnd-html5-backend'
import { DndProvider } from 'react-dnd'

import Scope from "./scope"

import Logo from "./display/logo"
import ModalBox from "./display/modal_box"

import apply_boxes from "./engine/apply_boxes"

const HierarchScope = React.createContext()

class Hierarch extends React.Component {
  state = {
    open: false,
  }

  constructor(p) {
    super(p)
    this.scope = new Scope()
    window.scope = this.scope
    this.scope.pullSource()
  }

  apply_boxes = () => {
    this.setState({ open: !this.state.open })
    apply_boxes(this.scope.index, this.scope.address)
      .then(() => this.scope.pullSource())
    // this.scope.pullSource()
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

        <Corner>
          <Logo
            size={20}
            repeat={5000}
            onClick={() => this.apply_boxes()}
          />
          {this.state.open
            ? <ModalBox scope={this.scope} />
            : null
          }
        </Corner>
      </DndProvider>
    )}</Observer>
    </HierarchScope.Provider>
  )
}

const Display = styled.div`
margin: 0;
`

const Corner = styled.div`
position: fixed;
top: 0;
left: 0;
height: 60px;
display: flex;
justify-content: space-between;
align-items: center;
`

export { HierarchScope }
export default observer(Hierarch)
