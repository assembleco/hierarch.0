import React from "react"
import styled, { css } from "styled-components"

class Change extends React.Component {
  state = { value: null }

  shouldComponentUpdate = (incomingProps, incomingState) => (
    incomingProps.children !== this.props.children ||
    this.state.value !== incomingState.value
  )

  render = () => (
  <Field
    onClick={(e) => {
      e.preventDefault();
      e.stopPropagation();
      return false
    }}

    onChange={(e) => {
      this.setState({ value: e.target.value || "" })
    }}

    key={this.props.children}
    type="text"
    ref={e => this.props.focus(e)}
    value={this.state.value === null ? this.props.children : this.state.value}

    onKeyDown={(e) => {
      console.log(e.key)
      if(e.key === ' ') {
        e.stopPropagation()
      }
      if(e.key === "Escape") {
        this.props.escape()
      }
      if(e.key === "Enter") {
        this.props.record()
        e.preventDefault();
        e.stopPropagation();
        return false
      }
    }}
  />
  )
}

const Field = styled.input.attrs({
  type: "text",
})`
background: none;
outline: none;
border: none;
display: inline;
color: inherit;
border-bottom: 1px dashed pink;
font-family: "Monaco", monospace;
font-size: inherit;
width: ${p => `${p.value.length}ch`};
`

export { Field }
export default Change
