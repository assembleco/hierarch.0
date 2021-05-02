import { makeAutoObservable, autorun } from "mobx"

import apply_changes_by_code from "./engine/apply_changes_by_code"

class Scope {
  address = "src/App.js"

  display = null
  chosen = null
  change = null
  cooldown = null

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

  recordChangesOnChosen = () => {
    apply_changes_by_code(
      this.index,
      this.address,
      this.chosen,
      this.rules,
    )
    .then(() => {
      if(window.assemble && window.assemble.repull)
        window.assemble.repull()
    })
  }
}

export default Scope
