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
grid-template-columns: repeat(4, 1fr);
grid-template-rows: repeat(3, 1fr) 1.5fr;
`

export default Size
