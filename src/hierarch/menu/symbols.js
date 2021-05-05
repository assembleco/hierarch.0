import React from "react"
import styled from "styled-components"
import { Observer } from "mobx-react"

import { HierarchScope } from "../index"

var Symbols = () => (
  <HierarchScope.Consumer>{scope => (
    <Observer>{() => (
      <Grid>
        <Small>Font</Small>
        <select
          type="text"
          placeholder="None"
          onChange={(e) => scope.rules['font-family'] = e.target.value}
          value={scope.rules['font-family'] || ''}
        >
          <option value="">None</option>
          <option value="Times New Roman">Times New Roman</option>
          <option value="Georgia">Georgia</option>
          <option value="Courier">Courier</option>
        </select>

        <Small>Weight</Small>
        <input
          type="text"
          placeholder="None"
          onChange={(e) => scope.rules['font-weight'] = e.target.value}
          value={scope.rules['font-weight'] || ''}
        />

        <Small>Size</Small>
        <input
          type="text"
          placeholder="None"
          onChange={(e) => scope.rules['font-size'] = e.target.value}
          value={scope.rules['font-size'] || ''}
        />

        <Small>Color</Small>
        <input
          type="text"
          placeholder="None"
          onChange={(e) => scope.rules['color'] = e.target.value}
          value={scope.rules['color'] || ''}
        />

      {/*
        <Small>Align</Small>
        <input
          type="text"
          placeholder="None"
          onChange={(e) => scope.rules['text-align'] = e.target.value}
          value={scope.rules['text-align'] || ''}
        />

        <Small>Style</Small>
        <input
          type="text"
          placeholder="None"
          onChange={(e) => scope.rules['text-decoration'] = e.target.value}
          value={scope.rules['text-decoration'] || ''}
        />
      */}
      </Grid>
    )}</Observer>
  )}</HierarchScope.Consumer>
)

var ComingSoonLink = styled.a`
`

var Grid = styled.div`
display: grid;
grid-template-columns: auto 1fr;
grid-template-rows: repeat(6, 1fr);
grid-column-gap: 0.5rem;

${ComingSoonLink} {
  grid-column: span 2;
}
`

var Small = styled.span`
font-size: 0.8rem;
`

export default Symbols
