import React from "react"
import styled from "styled-components"
import { Observer } from "mobx-react"

class UpperBar extends React.Component {
  render = () => (
    <Observer>{() => (
      <Bar>
        {this.props.children}
      </Bar>
    )}</Observer>
  )
}

var Bar = styled.div`
height: 4rem;
position: fixed;
top: 0;
left: 0;
right: 0;
background-color: #faf9dd;
border-bottom: 2px solid #3d3b11;
display: flex;
flex-direction: row;
justify-content: space-between;
align-items: baseline;
`

export default UpperBar
