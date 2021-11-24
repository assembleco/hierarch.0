import { makeAutoObservable /*, autorun */ } from "mobx"

import apply_rules_by_code from "./engine/apply_rules_by_code"
import apply_changes from "./engine/apply_changes"
import makeProgram from "./engine/program"
import parse_hierarchy from "./engine/parse_hierarchy"

class Scope {
  address = "src/App.js"

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
  }

  pullSource = () => {
    // fetch(`http://${process.env.REACT_APP_HIERARCH_ADDRESS}/source?address=${this.address}`)
    //   .then(response => response.text())
    //   .then(response => makeProgram(response))
    //   .then(program => {
    //     this.index = program
    //     parse_hierarchy(program, h => this.hierarchy = h)
    //   })
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
}

export default Scope
