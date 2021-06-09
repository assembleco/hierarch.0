import React from "react"
import styled, { css } from "styled-components"
import { Observer, observer } from "mobx-react"

import { HierarchScope } from "../index"
import makeDisplayBlock from "./block"
import Change from "./change"
import Resize from "./resize"

class Box extends React.Component {
  constructor(p) {
    super(p)
    var { original, children, code, ...remainder } = this.props
    this.Block = makeDisplayBlock(original, code, children)
  }

  render = () => (
    <HierarchScope.Consumer>
    {mainScope => {
      var { original, children, code, ...remainder } = this.props
      var scope = this.props.scope || mainScope

      return (
        <Observer>{() => {
          console.warn(JSON.stringify(scope.rules))

          return (
          scope.change === code
          ?
            <this.Block {...remainder} scope={scope} border="red" >
              {this.renderChangeableChildren(children, scope, code)}
            </this.Block>

          : scope.chosen === code
          ? <Resize
              original={this.Block}
              scope={scope}
              {...remainder}
              border="green"
            >
              {this.renderChildrenIncludingChanges(children, scope, code)}
            </Resize>

          : scope.display === code
          ? <this.Block {...remainder} scope={scope} border="blue" >
              {this.renderChildrenIncludingChanges(children, scope, code)}
            </this.Block>

          : <this.Block {...remainder} scope={scope} >
              {this.renderChildrenIncludingChanges(children, scope, code)}
            </this.Block>

        )
        }}</Observer>
      )
    }}
    </HierarchScope.Consumer>
  )

  renderChildrenIncludingChanges = (children, scope, code) => {
    return (
      scope.cooling_change === code
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

export default observer(Box)
