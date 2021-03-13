import React from "react"
import { HierarchScope } from "../index"
import styled from "styled-components"
import { observer, Observer } from "mobx-react"

class Hierarchy extends React.Component {
  state = {
    hierarchy: [0,0,[],"",false],
  }

  render = () => (
    <pre>
      {display_hierarchy_index(0, this.props.hierarchy)}
    </pre>
  )
}

const display_hierarchy_index = (index, hierarchy) => (
    hierarchy[2].map(h => (
        <>
        {("  ".repeat(index))}
        <Hierarchical name={h[3]} permissions={h[4]} code={h[5]} />
        {"\n"}
        {display_hierarchy_index(index + 1, h)}
        </>
    ))
)

const Hierarchical = observer(({name, permissions, code}) => (
    <HierarchScope.Consumer>
    {scope => (
      <Observer>{() => (
        <Border running={scope.display === code}>

        {
        permissions.indexOf("g-4:change") !== -1
        ?
        <a
            key={code}
            href="#"
            onClick={() => scope.change = code}
            onMouseOver={() => scope.display = code}
        >{name}</a>
        :
        <span
            key={code}
            onMouseOver={() => scope.display = code}
        >{name}</span>
        }

        </Border>
      )}</Observer>
    )}
    </HierarchScope.Consumer>
))

const Border = styled.span`
    border: ${p => p.running ? "1px solid #ee00ee" : "none"};
`

export default Hierarchy
