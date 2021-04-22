import React from "react"
import styled from "styled-components"

var Size = () => (
  <Grid>
    <span>Width</span>
    <input type="text" placeholder="None" />

    <span>Height</span>
    <input type="text" placeholder="None" />

    <span>Min W</span>
    <input type="text" placeholder="None" />

    <span>Min H</span>
    <input type="text" placeholder="None" />

    <span>Max W</span>
    <input type="text" placeholder="None" />

    <span>Max H</span>
    <input type="text" placeholder="None" />

    <span>Overflow</span>
  </Grid>
)

var Grid = styled.div`
display: grid;
grid-template-columns: repeat(4, 4rem);
grid-template-rows: repeat(3, 1fr) 1.5fr;
width: 18rem;
grid-column-gap: 0.5rem;
`

export default Size
