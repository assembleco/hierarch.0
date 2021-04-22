import React from "react"
import styled, {css} from "styled-components"
import { observer, Observer } from "mobx-react"

import Scope from "./scope"
import Logo from "./display/logo"
import Sidebar from "./display/sidebar"

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

  componentDidUpdate() {
    document.oncontextmenu = this.state.open
      ? this.secondaryClick
      : null
  }

  secondaryClick = (e) => {
    e.preventDefault()
    apply_boxes(this.scope.index, this.scope.address).then(this.pullSource)
  }

  render = () => (
    <HierarchScope.Provider value={this.scope} >

    <Observer>{() => (
      <>
        {this.state.open
          ?
          <UpperBar>
            <LogoSpace>
              <Logo
                size={20}
                repeat={5000}
                onClick={() => this.setState({ open: false })}
              />
            </LogoSpace>

            <Sidebar
              close={() => this.setState({ open: false })}
              display={(code) => this.scope.display = code}
            />
          </UpperBar>
          :
          <Corner>
            <Logo
              size={20}
              repeat={5000}
              onClick={() => this.setState({ open: true })}
            />
          </Corner>
        }

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
      </>
    )}</Observer>
    </HierarchScope.Provider>
  )
}

var UpperBar = styled.div`
height: 4rem;
position: fixed;
top: 0;
left: 0;
right: 0;
background-color: #FAF9DD;
border-bottom: 2px solid #3d3b11;
display: flex;
flex-direction: row;
`

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
