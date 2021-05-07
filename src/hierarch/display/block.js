import styled, { css } from "styled-components"
import { runInAction } from "mobx"

import Resize from "./resize"

var makeDisplayBlock = (original, code) => {
  console.log("making display block")

  var Block = styled(original).attrs(({ border, scope }) => ({
    "data-code": code,
    style: {
      outline: border && `1px dashed ${border}`,
    },

    onClick: (e) => {
      if(scope.chosen === code)
        runInAction(() => scope.change = code)
      if(scope.display === code)
        runInAction(() => scope.chosen = code)

      e.stopPropagation()
      e.preventDefault()
      e.bubbles = false
      return false
    },
  }))`
  ${({ scope }) => (
  scope.chosen === code && Object.keys(scope.rules).map(change => (
      `${change}: ${scope.rules[change]};
      `
    ))
  )}
  `

  // if(scope.change !== code && scope.chosen === code) {
  //   return (({ children }) => (
  //     <Resize original={Block}>{children}</Resize>
  //   ))
  // }

  return Block
}

export default makeDisplayBlock
