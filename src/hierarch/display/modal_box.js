import styled from "styled-components"

import { Icon, InlineIcon } from '@iconify/react';
import insertBeforeR from '@iconify-icons/gg/insert-before-r';
import insertAfterR from '@iconify-icons/gg/insert-after-r';


var ModalBox = () => (
  <Border>
    <Icon icon={insertBeforeR} height="2rem" color="#3d3b11" />
    <Icon icon={insertAfterR} height="2rem" color="#3d3b11" />
  </Border>
)

const Border = styled.div`
border: 2px solid #3d3b11;
border-radius: 4px;
background-color: #faf9dd;
padding: 0.5rem;
margin-left: 2.4rem;
height: 2rem;
`

export default ModalBox
