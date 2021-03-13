import React from "react"
import styled from "styled-components"
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
    mouse: {
      x: 0,
      y: 0,
      scroll: 0,
      hold: false,
    },
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

  constructor(p) {
    super(p)
    this.scope = new Scope()
    this.pullSource()
  }

  componentDidMount() {
    if(!window.assemble || !window.assemble.repull) {
      window.assemble = {}
      window.assemble.repull = this.pullSource.bind(this)
    }

    document.onkeydown = e => {
      if(e.code === "Space") {
        e.preventDefault()
        var original_scroll = this.state.mouse.scroll
        this.setState({ mouse: Object.assign(
          this.state.mouse,
          {
            hold: !this.state.mouse.hold,
            scroll: this.state.mouse.hold
            ? 0
            : window.pageYOffset,
          },
        )})
        if(!this.state.mouse.hold) {
          window.scrollBy(0, original_scroll)
        }
      }
    }
  }

  componentWillUnmount() {
    document.onkeydown = null

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
      <Display
        hold={this.state.mouse.hold}
        scroll={this.state.mouse.scroll}
        open={this.state.open}
        onMouseMove={(e) => {
          if(this.state.open && !this.state.mouse.hold)
            this.setState({ mouse: { x: e.clientX, y: e.clientY }})

          var code_key = e.target
            && typeof e.target.getAttribute === 'function'
            ? e.target.getAttribute("data-code")
            : null

          if(
            code_key
            && ["display", "add_ahead", "add_behind"].some(x =>
              this.scope.chosen.signal === x
            )
          )
            this.scope.sign(this.scope.chosen.signal, code_key)
        }}
      >
        {this.props.children}

        {this.state.open
        ?
          <Sidebar
            close={() => this.setState({ open: false })}
            display={(code) => this.scope.sign("display", code)}
            place={this.state.mouse}
          />
        :
          <Corner>
            <Logo
              size={20}
              repeat={100000}
              onClick={() => this.setState({ open: true, mouse: { hold: false } })}
            />
          </Corner>
        }
      </Display>
    )}</Observer>
    </HierarchScope.Provider>
  )
}

const Display = styled.div`
margin: 0;
${({hold, scroll, open}) => open && hold && `
  position: fixed;
  top: ${-1 * (scroll || 0)}px;
  left: 0;
  right: 0;
  bottom: 0;
`}
`

const Corner = styled.div`
position: fixed;
bottom: 40px;
right: 80px;
height: 40px;
width: 40px;
`

export { HierarchScope }
export default observer(Hierarch)
