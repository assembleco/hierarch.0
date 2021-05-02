import React from "react"
import styled, { css } from "styled-components"

import { observer, Observer } from "mobx-react"
import { computed } from "mobx"

import { useDrag } from "react-dnd"
import DropZone from "./drop_zone"

import Change, { Field, ChangeGroup, ChangeScope } from "./change"
import Resize from "./resize"
import apply_changes from "../engine/apply_changes"
import apply_boxes from "../engine/apply_boxes"
import { add_ahead, add_behind } from "../engine/add_block"

import { HierarchScope } from "../index"

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

class Box extends React.Component {
  changes = null

  render = () => (
    <HierarchScope.Consumer>
    {scope => {
      var { original, children, code, ...remainder } = this.props
      if(scope.chosen === code)
        this.assignScopeChanges(original, scope)

      return (
        <Observer>{() => {
        var Original = makeDisplayBlock(original, code, children, scope)

        return (
          <Original
            border={
              scope.change === code ? "black"
              : scope.chosen === code ? "blue"
              : scope.display === code ? "red"
              : "none"
            }
            {...remainder}
          >
            { scope.change === code
            ? this.renderChangeableChildren(children, scope, code)
            : this.renderChangedChildren(children)
            }
          </Original>
        )}}</Observer>
      )
    }}
    </HierarchScope.Consumer>
  )

  assignScopeChanges = (original, scope) => {
    original.componentStyle.rules.forEach(rule => {
      var pieces = rule
        .split(/[:;]/)
        .map(x => x.trim())
        .filter(x => x !== "")
      var label = pieces[0]
      var change = pieces[1]

      scope.changes[label] = change
    })
  }

  renderChangedChildren = (children) => (
    children
  )

  renderChangeableChildren = (children, scope, code) => {
    var focus_count = 0
    if(!this.changes)
      this.changes = new ChangeGroup([children].flat())

    return (
      <ChangeScope.Provider key="change" value={this.changes}>
        <Observer>{() => (
          this.changes.group.map((c, i) => (
            typeof(c) === 'string'
            ?
            <Change
                key={i}
                index={i}
                focus={(e) => {
                  if(e && focus_count === 0) { e.focus(); focus_count += 1 }
                }}
                record={() =>
                  this.recordChanges(scope.address, scope.index)
                  .then(() => scope.change = null)
                }
                escape={() => scope.change = null}
              >
              {children[i]}
              </Change>
            : c
          ))
        )}</Observer>
      </ChangeScope.Provider>
    )
  }

  recordChanges(address, index) {
    var changeArray = [];

    this.changes.group.forEach((child, x) => {
      if(typeof(child) === 'string')
        changeArray = changeArray.concat(child)
    })

    return (
      apply_changes(address, index, this.props.code, changeArray)
    )
  }
}

export default Box
