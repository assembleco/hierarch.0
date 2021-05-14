import React from "react"
import styled from "styled-components"
import { Observer } from "mobx-react"

class UpperBar extends React.Component {
  state = {
    open: false,
  }

  render = () => (
    <Observer>{() => (
      <Bar>
        {this.props.children}

        <UpperBar.Header>
          <Modal
            open={this.state.open}
            onClick={() => this.setState({open: !this.state.open})}
          >
            {this.state.open &&
              <Monaco/>
            }
          </Modal>
        </UpperBar.Header>
      </Bar>
    )}</Observer>
  )
}

var Bar = styled.div`
height: 4rem;
position: fixed;
overflow: visible;
top: 0;
left: 0;
right: 0;
background-color: #faf9dd;
border-bottom: 2px solid #3d3b11;
display: flex;
flex-direction: row;
justify-content: flex-start;
align-items: flex-start;
`

UpperBar.Header = styled.div`
margin-left: 10rem;
`

var Modal = styled.div`
height: ${({open}) => open ? '80vh' : '0rem'};
transition: height ease-in-out 0.5s;
width: calc(100vw - 12rem - 18rem - 2rem);
background-color: #a0a0d0;
border: 2px solid #3d3b11;
border-radius: 4px;
margin-top: 1rem;
padding: 1rem;
`

var Monaco = styled.div`
border: 2px solid #3d3b11;
background: #d0d0d0;
height: 100%;
`

export default UpperBar
