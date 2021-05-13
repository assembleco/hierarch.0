import React from "react"
import styled from "styled-components"
import { Observer } from "mobx-react"

import { Portal } from "reakit/Portal";
import {
  useDialogState,
  Dialog,
  DialogDisclosure,
  DialogBackdrop,
} from "reakit/Dialog";

function Modal() {
  const dialog = useDialogState();
  return (
    <>
      <ModalCollapsed {...dialog}>Open dialog</ModalCollapsed>
      <DialogBackdrop {...dialog}>
        <ModalOpened {...dialog} aria-label="Welcome">
          Welcome to Reakit!
        </ModalOpened>
      </DialogBackdrop>
    </>
  );
}

class UpperBar extends React.Component {
  render = () => (
    <Observer>{() => (
      <Bar>
        {this.props.children}

        <UpperBar.Header>
          <Modal/>
        </UpperBar.Header>
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
justify-content: flex-start;
align-items: flex-start;
`

UpperBar.Header = styled.div`
margin-left: 10rem;
`

var ModalCollapsed = styled(DialogDisclosure)`
height: 2rem;
width: 60vw;
background-color: #a0a0d0;
border: 2px solid #3d3b11;
border-radius: 4px;
margin-top: 1rem;
`

var ModalOpened = styled(Dialog)`
z-index: 10;
margin-top: 12rem;
margin-left: 12rem;
`

export default UpperBar
