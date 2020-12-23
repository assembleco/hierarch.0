import React from "react"
import styled from "styled-components"
import Logo from "./logo"
import Sidebar from "./sidebar"

const HierarchScope = React.createContext({ chosen: null, signal: null })

class Hierarch extends React.Component {
    state = { open: false }

    render = () => (
        this.state.open
        ?
        <HierarchScope.Provider value={{ chosen: "abc31", signal: "display" }}>
            <Grid>
                <Page>
                    {this.props.children}
                </Page>
                <Sidebar close={() => this.setState({ open: false })} />
            </Grid>
        </HierarchScope.Provider>
        :
        <>
        {this.props.children}
        <Corner>
            <Logo
                size={20}
                repeat={100000}
                onClick={() => this.setState({ open: true })}
            />
        </Corner>
        </>
    )
}

const Grid = styled.div`
display: grid;
grid-template-columns: 1fr auto;
width: 100vw;
margin: 0;
`

const Page = styled.div`
  overflow: hidden;
  transform: scale(0.8);
`

const Corner = styled.div`
position: absolute;
bottom: 40px;
right: 80px;
height: 40px;
width: 40px;
`

export { HierarchScope }
export default Hierarch