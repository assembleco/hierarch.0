import React from "react"
import styled, { css } from "styled-components"
import { Observer } from "mobx-react"

import { HierarchScope } from "../index"
import makeDisplayBlock from "./block"
import Change from "./change"

class Box extends React.Component {
  render = () => (
    <HierarchScope.Consumer>
    {scope => {
      var { original, children, code, ...remainder } = this.props
      original = scope.blocks[original]
      this.displayBlock = makeDisplayBlock(original, code)

      if(scope.chosen === code)
        this.assignScopeChanges(original, scope)

      if(scope.change === code && !scope.changes.some(() => 1))
        scope.changes = [children].flat()

      return (
        <Observer>{() => (
          <this.displayBlock
          {...remainder}
          scope={scope}
          border={
            scope.change === code ? "black"
            : scope.chosen === code ? "blue"
            : scope.display === code ? "red"
            : null
          }
          >
            { scope.change === code
            ? this.renderChangeableChildren(children, scope, code)
            : this.renderChildrenIncludingChanges(children, scope, code)
            }
          </this.displayBlock>
        )}</Observer>
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
    return (
      scope.cooling === code
      ? scope.changes
      : children
    )
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
            record={() => scope.applyChanges() }
            escape={() => scope.change = null}
          >
          {children[i]}
          </Change>
          : c
        ))
      )}</Observer>
    )
  }
}

export default Box
