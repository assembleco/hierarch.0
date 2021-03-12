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

    const Original = styled(original).attrs(({ code, running, scope }) => ({
      onClick: (e) => {
        if(scope.chosen.signal === "display")
          scope.signal('change', code)
        if(scope.chosen.signal === "add_ahead") {
          add_ahead(scope.address, scope.index, code, "BlockA")
            .then(block_code => scope.signal('change', block_code))
        }
        if(scope.chosen.signal === "add_behind") {
          add_behind(scope.address, scope.index, code, "BlockB")
            .then(block_code => scope.signal('change', block_code))
        }
        e.stopPropagation()
        e.preventDefault()
        e.bubbles = false
        return false
      },

      "data-code": code,
      style: {
        outline: running ? "1px solid red" : null,
      },
    }))`
    `
    var running = computed(() => (
      scope.chosen &&
      scope.chosen.code === code
    ))

    var focus_count = 0

    return (
    <Observer>{() => (
      children
      ? ( running && scope.chosen.signal === "change"
        ?
        <Original
          ref={this.changeableBox}
          {...remainder}

          code={code}
          running={running.get()}
          scope={scope}
        >
          {children instanceof Array
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
                  record={() => this.recordChanges(scope.address, scope.index).then(() => scope.signal('display', code))}
                  escape={() => scope.signal('display', code)}
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
              record={() => this.recordChanges(scope.address, scope.index).then(() => scope.signal('display', code))}
              escape={() => scope.signal('display', code)}
            >
              {children}
            </Change>
            : children
          )
          }
        </Original>

        :
        <Original
          {...remainder}

          code={code}
          running={running.get()}
          scope={scope}
        >
          {children instanceof Array
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
          }
        </Original>
      )
      : ( running && scope.chosen.signal === "resize"
        ?
        <Resize
          original={original}
          code={code}
          {...remainder}
        />
        :
        <Original
          {...remainder}

          onClick={(e) => {
            scope.signal('resize', code)

            e.stopPropagation()
            e.preventDefault()
            e.bubbles = false
            return false
          }}

          code={code}
          running={running.get()}
          scope={scope}
        />
      )
    )}</Observer>
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
