import React from "react"
import styled from "styled-components"
import { Observer } from "mobx-react"
import { observable, autorun } from "mobx"

import { HierarchScope } from "../index"

var Size = () => (
  <HierarchScope.Consumer>{scope => (
    <Observer>{() => (
      <Grid>
        <span>Width</span>
        <input
          type="text"
          placeholder="None"
          onChange={(e) => scope.changes['width'] = e.target.value}
          value={scope.changes['width'] || ''}
        />

        <span>Height</span>
        <input
          type="text"
          placeholder="None"
          onChange={(e) => scope.changes['height'] = e.target.value}
          value={scope.changes['height'] || ''}
        />

        <span>Min W</span>
        <input
          type="text"
          placeholder="None"
          onChange={(e) => scope.changes['min-width'] = e.target.value}
          value={scope.changes['min-width'] || ''}
        />

        <span>Min H</span>
        <input
          type="text"
          placeholder="None"
          onChange={(e) => scope.changes['min-height'] = e.target.value}
          value={scope.changes['min-height'] || ''}
        />

        <span>Max W</span>
        <input
          type="text"
          placeholder="None"
          onChange={(e) => scope.changes['max-width'] = e.target.value}
          value={scope.changes['max-width'] || ''}
        />

        <span>Max H</span>
        <input
          type="text"
          placeholder="None"
          onChange={(e) => scope.changes['max-height'] = e.target.value}
          value={scope.changes['max-height'] || ''}
        />

        <span>Overflow</span>
      </Grid>
    )}</Observer>
  )}</HierarchScope.Consumer>
)

var Grid = styled.div`
display: grid;
grid-template-columns: repeat(4, 4rem);
grid-template-rows: repeat(3, 1fr) 1.5fr;
width: 18rem;
grid-column-gap: 0.5rem;
`

export default Size
