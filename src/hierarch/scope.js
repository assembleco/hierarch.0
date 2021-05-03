import { makeAutoObservable, autorun } from "mobx"

import apply_changes_by_code from "./engine/apply_changes_by_code"
import apply_changes from "./engine/apply_changes"
import makeProgram from "./engine/program"
import parse_hierarchy from "./engine/parse_hierarchy"

class Scope {
  address = "src/App.js"

  display = null
  chosen = null
  change = null
  cooling = null

  hierarchy = [0,0,[],"",false]
  index = null

  changes = []
  rules = {}

  constructor() {
    makeAutoObservable(this)
    autorun(() => console.log("display", this.display))
    autorun(() => console.log("chosen", this.chosen))
    autorun(() => console.log("change", this.change))
    autorun(() => console.log("rules", JSON.stringify(this.rules)))
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

  recordChangesOnChosen = () => {
    apply_changes_by_code(
      this.index,
      this.address,
      this.chosen,
      this.rules,
    )
    .then(() => this.pullSource())
  }

  cooldown = () => {
    this.cooling = this.change
    this.change = null
    setTimeout(() => {
      this.cooling = null
      this.changes = []
    }, 2000)
  }

  recordChanges() {
    var changeArray = [];

    this.changes.forEach((child, x) => {
      if(typeof(child) === 'string')
        changeArray = changeArray.concat(child)
    })

    apply_changes(this.address, this.index, this.change, changeArray)
    this.cooldown()
  }
}

export default Scope
