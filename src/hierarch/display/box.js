import React from "react"
import styled, { css } from "styled-components"

import { observer, Observer } from "mobx-react"
import { computed } from "mobx"

import Change, { Field } from "./change"
import Resize from "./resize"
import apply_changes from "../engine/apply_changes"
import apply_boxes from "../engine/apply_boxes"
import { add_ahead, add_behind } from "../engine/add_block"

import { HierarchScope } from "../index"

var makeDisplayBlock = (original, code, children, scope) => (
  styled(original).attrs(({ border }) => ({
    "data-code": code,
    style: { outline: border && `1px dashed ${border}` },

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
  }))``
)

class Box extends React.Component {
  changeableBox = React.createRef()
  state = { changes: [] }

  render = () => (
    <HierarchScope.Consumer>
    {this.renderUsingScope.bind(this)}
    </HierarchScope.Consumer>
  )

  renderUsingScope(scope) {
    var { original, children, code, ...remainder } = this.props

    var Original = makeDisplayBlock(original, code, children, scope)

    return (
      <Observer>{() => (

      scope.change === code
      ?
      <Original
        ref={this.changeableBox}
        {...remainder}
      >
        {this.renderChangeableChildren(children, scope, code)}
      </Original>

      :
      scope.chosen === code
      ?
      <Original border="blue" {...remainder} >
        {children}
      </Original>

      :
      scope.display === code
      ?
      <Original border="red" {...remainder} >
        {this.renderChangedChildren(children)}
      </Original>

      :
      <Original {...remainder} >{children}</Original>

      )}</Observer>
    )
  }

  renderChangedChildren = (children) => (
    children instanceof Array
    ? (() => {
      var child_index = 0
      return children.map((c, i) => {
        if(typeof(c) === 'string' && this.state.changes[child_index]) {
          child_index += 1
          return this.state.changes[child_index - 1]
        }
        return c
      })
    })()
    : (this.state.changes[0] || children)
  )

  renderChangeableChildren = (children, scope, code) => {
    var focus_count = 0

    return (
      children instanceof Array
      ? children.map((c, i) => {
        if(typeof(c) === 'string') {

          return (
            <Change
            key={i}
            focus={(e) => {
              console.log('focusing?', focus_count, c)
              if(e && focus_count === 0) {
                e.focus()
                focus_count += 1
              }
            }}
            record={() =>
              this.recordChanges(scope.address, scope.index)
              .then(() => scope.change = null)
            }
            escape={() => scope.change = null}
            >
            {c}
            </Change>
          )
        }
        return c
      })
      :
      (typeof(children) === 'string'
        ? <Change
        focus={e => e && e.focus()}
        record={() =>
          this.recordChanges(scope.address, scope.index)
          .then(() => scope.change = null)
        }
        escape={() => scope.change = null}
        >
        {children}
        </Change>
        : children
      )
    )
  }

  recordChanges(address, index) {
    var changeArray = [];

    // Group all possibly-changed values
    [...this.changeableBox.current.children].forEach((child, x) => {
      if(
        [...child.classList]
        .some(klass => klass === Field.toString().slice(1))
      )
        changeArray = changeArray.concat(child.value)
    })

    return (
      apply_changes(address, index, this.props.code, changeArray)
      .then(() => this.setState({ changes: changeArray }))
    )
  }
}

export default observer(Box)
