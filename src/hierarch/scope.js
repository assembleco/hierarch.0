import { observable, makeAutoObservable, autorun } from "mobx"

import apply_changes_by_code from "./engine/apply_changes_by_code"

class Scope {
  address = "src/App.js"

  display = null
  chosen = null
  change = null

  hierarchy = [0,0,[],"",false]
  index = null

  changes = {}

  constructor() {
    makeAutoObservable(this)
    autorun(() => console.log("display", this.display))
    autorun(() => console.log("chosen", this.chosen))
    autorun(() => console.log("change", this.change))
    autorun(() => console.log("changes", JSON.stringify(this.changes)))
  }

  recordChangesOnChosen = () => {
    apply_changes_by_code(
      this.index,
      this.address,
      this.chosen,
      this.changes,
    )
    .then(() => {
      if(window.assemble && window.assemble.repull)
        window.assemble.repull()
    })
  }
}

export default Scope
