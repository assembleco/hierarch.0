import React from "react"
import styled from "styled-components"
import { Observer } from "mobx-react"

import CodeMirror from "codemirror"
import "codemirror/lib/codemirror.css"
import "codemirror/mode/jsx/jsx"

class UpperBar extends React.Component {
  state = {
    open: false,
  }

  constructor(p) {
    super(p)
    this.source = React.createRef()
  }

  render = () => (
    <Observer>{() => (
      <Bar>
        {this.props.children}

        <Modal
          open={this.state.open}
          onClick={() => this.setState({open: !this.state.open})}
        >
          <Wrapper
            style={{visibility: this.state.open ? 'visible' : 'hidden' }}
            onClick={(e) => e.stopPropagation() }
          >
            <textarea
              ref={this.source}
              value={this.props.index.source}
            />
          </Wrapper>
        </Modal>
      </Bar>
    )}</Observer>
  )

  componentDidMount() {
    this.codemirror = CodeMirror.fromTextArea(
      this.source.current,
      {
        lineNumbers: true,
        mode: "jsx"
      },
    )
  }
}

var Bar = styled.div`
height: 4rem;
position: fixed;
overflow: visible;
top: 0;
left: 0;
right: 0;
background-color: #faf9dd;
border-bottom: 2px solid #3d3b11;
display: flex;
flex-direction: row;
justify-content: flex-start;
align-items: flex-start;
`

var Modal = styled.div`
height: ${({open}) => open ? '90vh' : '0rem'};
cursor: pointer;
transition: height ease-in-out 0.5s;
width: calc(100vw - 12rem - 18rem - 2rem);
background-color: #a0a0d0;
border: 2px solid #3d3b11;
border-radius: 4px;
margin-top: 1rem;
margin-left: 10rem;
padding: 1rem;
position: relative;
`

var Wrapper = styled.div`
position: relative;
height: 100%;

.CodeMirror {
height: 100%;
}
`

export default UpperBar
