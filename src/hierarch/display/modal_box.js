import styled from "styled-components"
import { observer } from "mobx-react"

import { Icon, InlineIcon } from '@iconify/react';
import add_behind from '@iconify-icons/gg/insert-before-r';
import add_ahead from '@iconify-icons/gg/insert-after-r';

var ModalBox = ({ scope }) => (
  <Border>
    <Icon
      icon={add_ahead}
      height="2rem"
      color={scope.signal === "add_ahead" ? "blue" : "#3d3b11"}
      onClick={() => {
        scope.signal === "add_ahead"
        ? scope.sign(null)
        : scope.sign("add_ahead")
      }}
    />

    <Icon
      icon={add_behind}
      height="2rem"
      color="#3d3b11"
      color={scope.signal === "add_behind" ? "blue" : "#3d3b11"}
      onClick={() => {
        scope.signal === "add_behind"
        ? scope.sign(null)
        : scope.sign("add_behind")
      }}
    />
  </Border>
)

const Border = styled.div`
border: 2px solid #3d3b11;
border-radius: 4px;
background-color: #faf9dd;
padding: 0.5rem;
margin-left: 2.4rem;
height: 2rem;
display: grid;
grid-template-columns: repeat(2, 2rem);
grid-column-gap: 1rem;
`

export default observer(ModalBox)
