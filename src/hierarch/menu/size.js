import React from "react"
import styled from "styled-components"
import { Observer } from "mobx-react"

import { HierarchScope } from "../index"
import Record from "./_record"

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
        <ComingSoonLink href="https://github.com/hierarch/hierarch/issues/11">
          Coming Soon
        </ComingSoonLink>

        <Record onClick={() => scope.recordChangesOnChosen()} >Record</Record>
      </Grid>
    )}</Observer>
  )}</HierarchScope.Consumer>
)

var ComingSoonLink = styled.a`
`

var Grid = styled.div`
display: grid;
grid-template-columns: repeat(4, 4rem);
grid-template-rows: repeat(5, 1fr);
width: 18rem;
grid-column-gap: 0.5rem;

${Record} {
  grid-row: -1;
  grid-column: span 4;
}

${ComingSoonLink} {
  grid-column: span 3;
}
`

export default Size
