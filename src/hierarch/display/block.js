import styled, { css } from "styled-components"

var makeDisplayBlock = (original, code, children, scope) => (
  styled(original).attrs(({ border }) => ({
    "data-code": code,
    style: {
      outline: border && `1px dashed ${border}`,
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
  }))`
  ${scope.chosen === code && Object.keys(scope.changes).map(change => (
      `${change}: ${scope.changes[change]}px;
      `
    ))
  }
  `
)

export default makeDisplayBlock
