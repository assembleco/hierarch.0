import { useDrag } from "react-dnd"
import React from "react"

import makeDisplayBlock from "./block"

var DraggableBox = ({ scope, ...props }) => {
  var { original, children, code, ...remainder } = props
  var Original = makeDisplayBlock(original, code, children, scope)

  var [{ isDragging }, drag, dragPreview] = useDrag(() => ({
    type: "BOX",
    item: { code },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    })
  }))

  return (
    <Original
      ref={drag}
      border={
        scope.change === code ? "black"
        : scope.chosen === code ? "blue"
        : scope.display === code ? "red"
        : "none"
      }
      {...remainder}
    >
      {children}
    </Original>
  )
}

export default DraggableBox
