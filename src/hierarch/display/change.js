import React from "react"
import styled, { css } from "styled-components"

import { makeAutoObservable, autorun } from "mobx"

class Change extends React.Component {
  render = () => (
    <ChangeScope.Consumer>
    {scope => (
      <Field
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          return false
        }}

        onChange={(e) => {
          console.log("Change", e.target.value || "")
          scope.change(this.props.index, e.target.value || "")
        }}

        key={this.props.children}
        type="text"
        ref={e => this.props.focus(e)}
        value={scope.group[this.props.index]}

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
    )}
    </ChangeScope.Consumer>
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

class ChangeGroup {
  group = []

  constructor(group) {
    this.group = group
    makeAutoObservable(this)
    autorun(() => console.log("Changes", this.group))
  }

  change(index, value) {
    console.log("Change", index, value)
    this.group[index] = value
  }
}

var ChangeScope = React.createContext()

export { ChangeGroup, ChangeScope }
export default Change
