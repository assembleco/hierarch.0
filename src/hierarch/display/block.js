import styled, { css } from "styled-components"
import { runInAction } from "mobx"

var makeDisplayBlock = (original, code, children) => {
  console.log("making display block")

  var Block = styled(original).attrs(({ border, scope }) => ({
    "data-code": code,
    style: {
      outline: border && `1px dashed ${border}`,
    },

    onClick: (e) => {
      if(scope.chosen === code)
        runInAction(() => {
          scope.change = code
          scope.changes = [children].flat()
        })
      if(scope.display === code)
        runInAction(() => {
          scope.chosen = code
          scope.rules = {}

          assignChosenRules(original, scope)
        })

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

  return Block
}

var assignChosenRules = (original, scope) => {
  original.componentStyle.rules[0]
    .split("\n").filter(x => x !== "")
    .forEach(rule => {
      var pieces = rule
        .split(/[:;]/)
        .map(x => x.trim())
        .filter(x => x !== "")
      var label = pieces[0]
      var rule = pieces[1]

      scope.rules[label] = rule
    })
}

export default makeDisplayBlock
