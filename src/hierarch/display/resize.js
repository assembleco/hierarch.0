import React from "react"
import styled from "styled-components"
import { runInAction } from "mobx"
import { Observer } from "mobx-react"

import { HierarchScope } from "../index"
import apply_resize from "../engine/apply_resize"

class Resize extends React.Component {
  state = {
    height: null,
    width: null,
  }

  constructor(p) {
    super(p)
    this.component = styled(p.original).attrs(p => {
      var styles = {}
      styles.height = p.height || null
      styles.width = p.width || null
      return { style: styles }
    })``
  }

  render = () => {
    const Component = this.component

    var resizeable = (scope) => ({
      resize: dimensions => runInAction(() =>
        Object.keys(dimensions).forEach(x => scope.rules[x] = dimensions[x])
      ),
      recordSize: () => this.recordSize(scope),
    })

    return (
      <HierarchScope.Consumer>
        {scope => (
          <Observer>{() => (
            <ResizeBox width={scope.rules.width} height={scope.rules.height} >
              <ModalBox>
                <div>Hello.</div>
              </ModalBox>

              <Corner {...resizeable(scope)} x={-1} y={-1} />
              <Corner {...resizeable(scope)} x={-1} y={1} />
              <Corner {...resizeable(scope)} x={1} y={-1} />
              <Corner {...resizeable(scope)} x={1} y={1} />

              <Component
                width={scope.rules.width}
                height={scope.rules.height}
                {...this.props}
              />
            </ResizeBox>
          )}</Observer>
        )}
      </HierarchScope.Consumer>
    )
  }

  recordSize = (scope) => {
    apply_resize(
      scope.index,
      scope.address,
      this.props.code,
      scope.rules.width,
      scope.rules.height,
    )
    .then(() => scope.pullSource())
  }
}

var original_mouseX = 0
var original_mouseY = 0
// var element_original_x = 0
// var element_original_y = 0
var element_original_width = 0
var element_original_height = 0

const resize = p => e => {
  var mouseX = e.pageX
  var mouseY = e.pageY
  var new_width = 0
  var new_height = 0
  // var new_x = 0
  // var new_y = 0

  var width_scaling_factor = 2
  var height_scaling_factor = 1

  // bottom-right:
  if(p.x > 0 && p.y > 0) {
    new_width = element_original_width + width_scaling_factor * (mouseX - original_mouseX)
    new_height = element_original_height - height_scaling_factor * (mouseY - original_mouseY)
  }
  // bottom-left:
  if(p.x < 0 && p.y > 0) {
    new_width = element_original_width - width_scaling_factor * (mouseX - original_mouseX)
    new_height = element_original_height - height_scaling_factor * (mouseY - original_mouseY)
    // new_x = element_original_x - (mouseX - original_mouseX)
  }
  // top-right:
  if(p.x > 0 && p.y < 0) {
    new_width = element_original_width + width_scaling_factor * (mouseX - original_mouseX)
    new_height = element_original_height + height_scaling_factor * (mouseY - original_mouseY)
    // new_y = element_original_y + (mouseY - original_mouseY)
  }
  // top-left:
  if(p.x < 0 && p.y < 0) {
    new_width = element_original_width - width_scaling_factor * (mouseX - original_mouseX)
    new_height = element_original_height + height_scaling_factor * (mouseY - original_mouseY)
    // new_x = element_original_x + (mouseX - original_mouseX)
    // new_y = element_original_y + (mouseY - original_mouseY)
  }

  p.resize({width: `${new_width}px`, height: `${new_height}px`})
}

const endResize = (resizer, recordSize) => () => {
  window.removeEventListener('mousemove', resizer)
  window.removeEventListener('mouseup', recordSize)
}


const ResizeBox = styled.div`
border: 1px dashed #a0a0c0;
overflow: hidden;
position: relative;
overflow: visible;
`

const ModalBox = styled.div`
position: absolute;
top: -4rem;

div {
position: fixed;

border: 2px solid #3d3b11;
border-radius: 4px;
background-color: #faf9dd;
padding: 0.5rem 1rem;
height: 2rem;
}
`

const Corner = styled.span.attrs(p => ({
  onMouseDown: (e) => {
    e.preventDefault()
    original_mouseX = e.pageX
    original_mouseY = e.pageY
    // element_original_x = e.target.parentElement.getBoundingClientRect().left
    // element_original_y = e.target.parentElement.getBoundingClientRect().bottom
    element_original_width = e.target.parentElement.getBoundingClientRect().width
    element_original_height = e.target.parentElement.getBoundingClientRect().height
    var resizer = resize(p)
    window.addEventListener('mousemove', resizer)
    window.addEventListener('mouseup', p.recordSize)
    window.addEventListener('mouseup', endResize(resizer, p.recordSize))
  },
  onClick: (e) => { e.stopPropagation() },
}))`
position: absolute;
height: 1rem;
width: 1rem;
background-color: rgba(128,128,212,0.2);
border: 1px solid darkgrey;
border-radius: 50%;
${p => p.x > 0 ? "right" : "left"}: -0.5rem;
${p => p.y > 0 ? "top" : "bottom"}: -0.5rem;
cursor: ${p => p.x === p.y ? "nesw" : "nwse"}-resize;
`

export default Resize
