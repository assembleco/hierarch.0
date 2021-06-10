import styled, { css } from "styled-components"
import { runInAction } from "mobx"
import DraggableBox from "./draggable"

var makeDisplayBlock = (original, code, children) => {
  console.log("making display block")

  var Block = styled(original).attrs(({ border, scope }) => ({
    "data-code": code,
    style: {
      outline: border && `1px dashed ${border}`,
    },

    onClick: (e) => {
      scope.click(code, original, children)

      e.stopPropagation()
      e.preventDefault()
      e.bubbles = false
      return false
    },
  }))`
  ${({ scope }) => {
    if(scope.chosen === code || scope.cooling_chosen === code) {
      console.log("Rendering display block", code)
      return (
        Object.keys(scope.rules).map(change => (
          `${change}: ${scope.rules[change]};
          `
        ))
      )
    } else return null
  }}
  `

  return (props) => (
    <DraggableBox code={code}>
      <Block {...props} />
    </DraggableBox>
  )
}

export default makeDisplayBlock
