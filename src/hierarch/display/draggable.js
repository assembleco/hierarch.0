import { useDrag } from "react-dnd"
import React from "react"
import styled from "styled-components"

import makeDisplayBlock from "./block"

var DraggableBox = ({ ...props }) => {
  var { children, code, ...remainder } = props

  var [{ isDragging }, drag, dragPreview] = useDrag(() => ({
    type: "BOX",
    item: { code },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    })
  }))

  return (
    <div ref={drag} >
      {children}
    </div>
  )
}

export default DraggableBox
