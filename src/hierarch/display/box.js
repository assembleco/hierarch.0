import React from "react"
import styled, { css } from "styled-components"

import { observer, Observer } from "mobx-react"
import { computed } from "mobx"

import DropZone from "./drop_zone"

import Change from "./change"
import Resize from "./resize"
import apply_changes from "../engine/apply_changes"
import apply_boxes from "../engine/apply_boxes"
import { add_ahead, add_behind } from "../engine/add_block"

import { HierarchScope } from "../index"

import makeDisplayBlock from "./block"

class Box extends React.Component {
  render = () => (
    <HierarchScope.Consumer>
    {scope => {
      var { original, children, code, ...remainder } = this.props

      if(scope.chosen === code)
        this.assignScopeChanges(original, scope)

      if(scope.change === code && !scope.changes.some(() => 1))
        scope.changes = [children].flat()

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
            : this.renderChildrenIncludingChanges(children, scope, code)
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

      scope.rules[label] = change
    })
  }

  renderChildrenIncludingChanges = (children, scope, code) => {
    return children
  }

  renderChangeableChildren = (children, scope, code) => {
    var focus_count = 0

    return (
      <Observer>{() => (
        scope.changes.map((c, i) => (
          typeof(c) === 'string'
          ?
          <Change
            key={i}
            index={i}
            scope={scope}
            focus={(e) => {
              if(e && focus_count === 0) { e.focus(); focus_count += 1 }
            }}
            record={() =>
              this.recordChanges(scope).then(() => scope.change = null)
            }
            escape={() => scope.change = null}
          >
          {children[i]}
          </Change>
          : c
        ))
      )}</Observer>
    )
  }

  recordChanges(scope) {
    var changeArray = [];

    scope.changes.forEach((child, x) => {
      if(typeof(child) === 'string')
        changeArray = changeArray.concat(child)
    })

    return (
      apply_changes(scope.address, scope.index, this.props.code, changeArray)
    )
  }
}

export default Box
