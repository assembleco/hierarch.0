import { Box, P, Div } from './hierarch/display/lens'

import Scope from './hierarch/engine/scope'
import styled, { keyframes } from "styled-components"
import logo from './logo.svg'

function App() {
  return (
    <Box original="Column" code="38071053986258363">
      <Box original="Header" code="7874390589898883">
        <Box original="Logo" code="7791605515319688" src={logo} alt="hierarch logo" />

        <Box original="Div" code="820713828901745">
          <Box original="H3" code="35956821817278684">Hierarch!</Box>

          <Box original="P" code="4083578664536587">
            A programming engine breaking many rules –<br/>
            change code by clicking and clacking.
          </Box>

          <Box original="Div" code="7819632276226269">
            click. clack!
          </Box>

          <Box original="Link" code="5525793050494476" address="https://github.com/assembleapp/hierarch" target="_blank" rel="noopener noreferrer" >
            Read our engine's code.
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

const Column = styled.div`
min-height: 100vh;

@media(max-width: 800px) {
  grid-template-columns: 1fr;
  grid-template-rows: 1fr auto;
  min-height: 100vh;
}

background: #f8f6bb;
color: #3d3b11;

display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
padding: 0 4rem;
`

const Logo = styled.img`
height: 6rem;
margin-right: 2rem;
`

const Header = styled.div`
border: 2px solid purple;
border-radius: 6px;
padding: 2rem;
overflow: hidden;
background: #2a2a2a2a;
display: flex;
flex-direction: row;
font-size: 1rem;
align-items: flex-end;
`

const Link = styled.a.attrs(p => ({
  href: p.address,
}))`
color: #3f0894;
`

const H3 = styled.h3`
margin: 0px;
font-family: Georgia;
font-size: 1rem;
`

var blocks = { Column, Logo, Header, Link, H3, Div, P }
export { blocks }
export default App;
