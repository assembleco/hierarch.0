import React from "react"
import styled, { css } from "styled-components"
import { Observer } from "mobx-react"

import { HierarchScope } from "../index"
import makeDisplayBlock from "./block"
import Change from "./change"

import Resize from "./resize"

class Box extends React.Component {
  render = () => (
    <HierarchScope.Consumer>
    {scope => {
      var { original, children, code, ...remainder } = this.props
      this.displayBlock = makeDisplayBlock(original, code, children)

      return (
        <Observer>{() => (
          scope.change === code
          ?
            <this.displayBlock {...remainder} scope={scope} border="red" >
              {this.renderChangeableChildren(children, scope, code)}
            </this.displayBlock>

          : scope.chosen === code
          ? <Resize original={this.displayBlock} scope={scope} {...remainder} >
              {this.renderChildrenIncludingChanges(children, scope, code)}
            </Resize>

          : scope.display === code
          ? <this.displayBlock {...remainder} scope={scope} border="blue" >
              {this.renderChildrenIncludingChanges(children, scope, code)}
            </this.displayBlock>

          : <this.displayBlock {...remainder} scope={scope} >
              {this.renderChildrenIncludingChanges(children, scope, code)}
            </this.displayBlock>

        )}</Observer>
      )
    }}
    </HierarchScope.Consumer>
  )

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
