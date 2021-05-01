import React from "react"
import styled, {css} from "styled-components"
import { observer, Observer } from "mobx-react"

import { HTML5Backend } from 'react-dnd-html5-backend'
import { DndProvider } from 'react-dnd'
import { useDrag, useDrop } from "react-dnd"

import Scope from "./scope"
import Logo from "./display/logo"
import UpperBar from "./display/upper_bar"

import makeProgram from "./engine/program"
import apply_boxes from "./engine/apply_boxes"
import parse_hierarchy from "./engine/parse_hierarchy"

const HierarchScope = React.createContext()

class Hierarch extends React.Component {
  state = {
    open: false,
  }

  constructor(p) {
    super(p)
    this.scope = new Scope()
    this.pullSource()
  }

  pullSource = () => {
    fetch(`http://${process.env.REACT_APP_HIERARCH_ADDRESS}/source?address=${this.scope.address}`)
      .then(response => response.text())
      .then(response => makeProgram(response))
      .then(program => {
        this.scope.index = program
        parse_hierarchy(program, h => this.scope.hierarchy = h)
      })
  }

  componentDidMount() {
    if(!window.assemble || !window.assemble.repull) {
      window.assemble = {}
      window.assemble.repull = this.pullSource.bind(this)
    }
  }

  componentWillUnmount() {
    window.assemble.repull = null
    if(!Object.keys(window.assemble).length) window.assemble = null
  }

  apply_boxes = () => {
    this.setState({ open: !this.state.open })
    apply_boxes(this.scope.index, this.scope.address).then(this.pullSource)
  }

  render = () => (
    <HierarchScope.Provider value={this.scope} >

    <Observer>{() => (
      <DndProvider backend={HTML5Backend} >
        {this.state.open
          ?
          <UpperBar display={(code) => this.scope.display = code} >
            <LogoSpace>
              <Logo
                size={20}
                repeat={5000}
                onClick={() => this.apply_boxes()}
              />
            </LogoSpace>
          </UpperBar>
          :
          <Corner>
            <Logo
              size={20}
              repeat={5000}
              onClick={() => this.apply_boxes()}
            />
          </Corner>
        }

        <DropZone />

        <Display
          open={this.state.open}
          onMouseMove={(e) => {
            var code_key = e.target
              && typeof e.target.getAttribute === 'function'
              ? e.target.getAttribute("data-code")
              : null

            if(code_key)
              this.scope.display = code_key
          }}
        >
          {this.props.children}
        </Display>
      </DndProvider>
    )}</Observer>
    </HierarchScope.Provider>
  )
}

var DropZone = () => {
  var [{ canDrop, isOver }, drop] = useDrop(() => ({
    accept: "BOX",
    collect: monitor => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
    drop: (item, monitor) => {
      console.log("Dropped", item)
    },
  }))

  return (
    <div
      ref={drop}
      style={{ marginTop: "6rem", backgroundColor: isOver ? 'red' : 'none' }}
    >
      { canDrop ? "Drop here." : "Drop Zone."}
    </div>
  )
}

var LogoSpace = styled.div`
`

const Display = styled.div`
margin: 0;
${({open}) => open && css`margin-top: 4rem;`}
`

const Corner = styled.div`
position: fixed;
top: 0;
left: 0;
height: 40px;
width: 40px;
`

export { HierarchScope }
export default observer(Hierarch)
