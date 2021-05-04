import React from "react"
import styled, { css } from "styled-components"
import { Observer } from "mobx-react"

class Sidebar extends React.Component {
  render = () => (
    <Observer>{() => (
      <Bar side={this.props.side} size={this.props.size}>
        {this.props.children}
      </Bar>
    )}</Observer>
  )
}

var Bar = styled.div`
position: fixed;
${({ side }) => css`
  ${side}: 0;
  border-${{left: 'right', right: 'left'}[side]}: 2px solid #3d3b11;
`}
top: 4rem;
bottom: 0;
width: ${({size}) => size || '12rem'};
background-color: #faf9dd;
display: flex;
flex-direction: column;
align-items: flex-start;
`

export default Sidebar
