import { makeAutoObservable, runInAction, autorun } from "mobx"

import * as add_block from "./engine/add_block"
import apply_rules_by_code from "./engine/apply_rules_by_code"
import apply_changes from "./engine/apply_changes"
import makeProgram from "./engine/program"
import parse_hierarchy from "./engine/parse_hierarchy"

class Scope {
  address = "src/App.js"
  signal = null

  display = null
  chosen = null
  change = null
  cooling_change = null
  cooling_chosen = null

  hierarchy = [0,0,[],"",false]
  index = null

  changes = []
  rules = {}

  constructor() {
    makeAutoObservable(this)
    // autorun(() => console.log("display", this.display))
    // autorun(() => console.log("chosen", this.chosen))
    // autorun(() => console.log("change", this.change))
    // autorun(() => console.log("rules", JSON.stringify(this.rules)))
    autorun(() => console.log("signal", this.signal))
  }

  pullSource = () => {
    fetch(`http://${process.env.REACT_APP_HIERARCH_ADDRESS}/source?address=${this.address}`)
      .then(response => response.text())
      .then(response => makeProgram(response))
      .then(program => {
        this.index = program
        parse_hierarchy(program, h => this.hierarchy = h)
      })
  }

  applyRulesOnChosen = () => {
    apply_rules_by_code(
      this.index,
      this.address,
      this.chosen,
      this.rules,
    )
    // .then(this.cooldown)
    .then(() => this.pullSource())
  }

  cooldown = () => {
    // this.cooling_chosen = this.chosen
    // this.chosen = null
    // setTimeout(() => {
    //   this.cooling_chosen = null
    //   this.rules = {}
    // }, 2000)

    this.cooling_change = this.change
    this.change = null
    setTimeout(() => {
      this.cooling_change = null
      this.changes = []
    }, 2000)
  }

  applyChanges() {
    var changeArray = [];

    this.changes.forEach((child, x) => {
      if(typeof(child) === 'string')
        changeArray = changeArray.concat(child)
    })

    apply_changes(this.address, this.index, this.change, changeArray)
    .then(this.cooldown)
  }

  click = (code, original, children) => {
    if(this.signal === "add_ahead" || this.signal === "add_behind") {
      add_block[this.signal](
        this.address,
        this.index,
        code,
      )
      .then(() => this.pullSource())
    }

    if(this.chosen === code)
      runInAction(() => {
        this.change = code
        this.changes = [children].flat()
      })
    if(this.display === code)
      runInAction(() => {
        this.chosen = code
        this.rules = {}

        this.assignChosenRules(original)
      })
  }

  assignChosenRules = (original) => {
    original.componentStyle.rules[0]
      .split("\n").filter(x => x !== "")
      .forEach(rule => {
        var pieces = rule
          .split(/[:;]/)
          .map(x => x.trim())
          .filter(x => x !== "")
        var label = pieces[0]
        var rule = pieces[1]

        this.rules[label] = rule
      })
  }

  sign = (signal) => runInAction(() => {
    if(this.chosen) {
      add_block[signal](
        this.address,
        this.index,
        this.chosen,
      )
      .then(() => this.pullSource())
    }
    else {
      if(this.signal === signal)
        this.signal = null
      else
        this.signal = signal
    }
  })
}

export default Scope
