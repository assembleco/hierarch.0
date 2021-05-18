import Box from './hierarch/display/box'

import Scope from './hierarch/engine/scope'
import styled, { keyframes } from "styled-components"
import logo from './logo.svg'

import { HierarchScope } from "./hierarch/index"
import { makeAutoObservable, autorun, runInAction } from "mobx"
import { Observer } from "mobx-react"
import { ChromePicker } from "react-color"

var makeBlock = () => {
  var Block = styled.div`
  ${({ scope }) => {
  console.log("Rendering local block")
  return (
    Object.keys(scope.rules).map(change => (
        `${change}: ${scope.rules[change]};
        `
      ))
    )
    }
  }
  `

  return Block
}

class LocalScope {
  chosen = "abc"
  rules = {}

  constructor() {
    makeAutoObservable(this)
    autorun(() => console.log("local rules", JSON.stringify(this.rules)))
  }
}

var localScope = new LocalScope()
var Block = makeBlock()

function App() {
  return (
    <Box original={Column} code="925588771933622">
      <Box original={Header} code="07915938704153302">
        <Box original={Logo} code="8480688490305877" src={logo} alt="hierarch logo" />

        <Box original={Div} code="5969100518791792">
          <Box original={H3} code="1383673215796528">Hierarch!</Box>


    <HierarchScope.Consumer>
    {mainScope => (
        <Observer>{() => (
          <Box original={P} code="5520927980384607" scope={mainScope} >
            A programming engine breaking many rules –<br/>
            change code by clicking and clacking.
          </Box>
        )}</Observer>
    )}
    </HierarchScope.Consumer>

          <Box original={Div} code="4169704637156062">
            click. clack!
          </Box>

          <Box original={Link} code="6164124580793706" address="https://github.com/assembleapp/hierarch" target="_blank" rel="noopener noreferrer" >
            Read our engine's code.
          </Box>
        </Box>

        <Observer>{() => (
          <>
          <Box code="abc" scope={localScope} original={Div}>Hello</Box>
          <Block scope={localScope} >Hello</Block>

          <ChromePicker
            onChange={(color) => runInAction(() => localScope.rules['color'] = color.hex)}
            color={localScope.rules['color'] || ''}
          />
          </>
        )}</Observer>

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
flex-direction: column;
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
