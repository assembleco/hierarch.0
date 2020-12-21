import Lens, { Code, P, Box } from './hierarch/lens'
import styled, { keyframes } from "styled-components"
import logo from './logo.svg';

function App() {
  return (
    <Box original={Layout}>
      <Box original={Header}>
        <Box original={Logo} src={logo} alt="logo" />
        <Box original={P}>
          Change <Box original={Code}>src/App.js</Box> using Hierarch.
        </Box>
        <Box original={Link} href="https://github.com/assembleapp/hierarch" target="_blank" rel="noopener noreferrer" >
          Learn Hierarch.
        </Box>
      </Box>
    </Box>
  );
}

const LogoSpin = keyframes`
// from { transform: rotate(0deg); }
// to { transform: rotate(360deg); }
`

const Layout = styled.div`
text-align: center;
`

const Logo = styled.img`
height: 40vmin;

@media (prefers-reduced-motion: no-preference) {
  animation: ${LogoSpin} infinite 20s linear;
}
`

const Header = styled.header`
background-color: #bda862;
min-height: 100vh;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
font-size: calc(10px + 2vmin);
color: #0d408e;
`

const Link = styled.a`
color: #61dafb;
`

export default App;
