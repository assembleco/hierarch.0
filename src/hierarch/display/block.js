import styled from "styled-components"

var makeDisplayBlock = (original, code, children) => {
  console.log("making display block")

  // var sizingRules = ["padding", "width", "height", "border", "margin"]
  // var sizingStyles =
  //   original
  //   .componentStyle
  //   .rules[0]
  //   .split('\n')
  //   .filter(x => x.split(':')[0].split('-').some(y => sizingRules.includes(y)))
  //   .join('\n')

  // var SizingBlock = styled.div`${sizingStyles}`
    // <SizingBlock>
    // </SizingBlock>

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
    <Block {...props} />
  )
}

export default makeDisplayBlock
