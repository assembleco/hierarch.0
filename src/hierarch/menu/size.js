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
          onChange={(e) => scope.rules['width'] = e.target.value}
          value={scope.rules['width'] || ''}
        />

        <span>Height</span>
        <input
          type="text"
          placeholder="None"
          onChange={(e) => scope.rules['height'] = e.target.value}
          value={scope.rules['height'] || ''}
        />

        <span>Min W</span>
        <input
          type="text"
          placeholder="None"
          onChange={(e) => scope.rules['min-width'] = e.target.value}
          value={scope.rules['min-width'] || ''}
        />

        <span>Min H</span>
        <input
          type="text"
          placeholder="None"
          onChange={(e) => scope.rules['min-height'] = e.target.value}
          value={scope.rules['min-height'] || ''}
        />

        <span>Max W</span>
        <input
          type="text"
          placeholder="None"
          onChange={(e) => scope.rules['max-width'] = e.target.value}
          value={scope.rules['max-width'] || ''}
        />

        <span>Max H</span>
        <input
          type="text"
          placeholder="None"
          onChange={(e) => scope.rules['max-height'] = e.target.value}
          value={scope.rules['max-height'] || ''}
        />

        <Small>Overflow</Small>
        <ComingSoonLink href="https://github.com/assembleapp/hierarch/issues/11">
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
grid-template-columns: repeat(4, 3.6rem);
grid-template-rows: repeat(5, 1fr);
grid-column-gap: 0.4rem;
padding: 0.2rem;

${Record} {
  grid-row: -1;
  grid-column: span 4;
}

${ComingSoonLink} {
  grid-column: span 3;
}
`

var Small = styled.span`
font-size: 0.8rem;
`

export default Size
