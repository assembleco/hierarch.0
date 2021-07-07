import Box from './hierarch/display/box'

import styled from "styled-components"
import logo from './logo.svg'

function App() {
  return (
    <Box original={Column} code="13525001524008662">
      <Box original={Header} code="9554438041073858">
        <Box original={Logo} code="5921037502634912" src={logo} alt="hierarch logo" />

        <Box original={Div} code="5394112737296386">
          <Box original={H3} code="2214143356039595">Hierarch!</Box>

          <Box original={Div} code="4753211320021966">
            click and change.
          </Box>

          <Box original={P} code="5517781731929035">
            A programming engine breaking many rules –<br/>
            change code by clicking and clacking.
          </Box>

          <Box original={Div} code="7678377854145912">
            click. clack!
          </Box>

          <Box original={Link} code="9664058381279854" address="https://github.com/assembleapp/hierarch" target="_blank" rel="noopener noreferrer" >
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

const P = styled.p`
`

const Div = styled.div`
`

export default App;
