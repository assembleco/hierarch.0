import { observable, makeAutoObservable } from "mobx"

class Scope {
  address = "src/App.js"

  chosen = {
    code: null,
    signal: "display",
  }

  hierarchy = [0,0,[],"",false]
  index = null

  constructor() {
    makeAutoObservable(this)
  }

  sign = (signal, code) => {
    if(signal !== this.chosen.signal || code !== this.chosen.code)
      console.log("Signal", signal, code)

    this.chosen = { code, signal }
  }
}

export default Scope
