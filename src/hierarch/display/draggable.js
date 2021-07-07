import { useDrag } from "react-dnd"
import React from "react"

var DraggableBox = ({ ...props }) => {
  var { children, code, ...remainder } = props

  var [, drag, ] = useDrag(() => ({
    type: "BOX",
    item: { code },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    })
  }))

  return (
      <div ref={drag} {...remainder} >
        {children}
      </div>
  )
}

export default DraggableBox
