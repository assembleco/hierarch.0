import React from "react"
import styled from "styled-components"

class Change extends React.Component {
  render = () => (
    <Field
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        return false
      }}

      onChange={(e) => {
        console.log("Change", e.target.value || "")
        this.props.scope.changes[this.props.index] = e.target.value || ""
      }}

      key={this.props.children}
      type="text"
      ref={e => this.props.focus(e)}
      value={this.props.scope.changes[this.props.index]}

      onKeyDown={(e) => {
        if(e.key === ' ') e.stopPropagation() // no scrolling please
        if(e.key === "Escape") this.props.escape()

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
font-family: monospace;
font-size: inherit;
width: ${p => `${p.value.length}ch`};
`

export default Change
