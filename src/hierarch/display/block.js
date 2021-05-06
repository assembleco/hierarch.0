import styled, { css } from "styled-components"

import Resize from "./resize"

var makeDisplayBlock = (original, code, children, scope) => {
  var Block = styled(original).attrs({
    "data-code": code,
    style: {
      outline: `1px dashed ${
        scope.change === code ? "black"
          : scope.chosen === code ? "blue"
          : scope.display === code ? "red"
          : "none"
      }`,
    },

    onClick: (e) => {
      if(scope.chosen === code)
        scope.change = code
      if(scope.display === code)
        scope.chosen = code

      e.stopPropagation()
      e.preventDefault()
      e.bubbles = false
      return false
    },
  })`
  ${scope.chosen === code && Object.keys(scope.rules).map(change => (
      `${change}: ${scope.rules[change]};
      `
    ))
  }
  `

  if(scope.change !== code && scope.chosen === code) {
    return (({ children }) => (
      <Resize original={Block}>{children}</Resize>
    ))
  }

  return Block
}

export default makeDisplayBlock
