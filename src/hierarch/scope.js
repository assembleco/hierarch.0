import { observable, makeAutoObservable } from "mobx"

class Scope {
  address = "src/App.js"

  chosen = {
    code: null,
    message: "display",
  }

  hierarchy = [0,0,[],"",false]
  index = null

  constructor() {
    makeAutoObservable(this)
  }

  sign = (message, code) => {
    if(message !== this.chosen.message || code !== this.chosen.code)
      console.log("Signal", message, code)

    this.chosen = { code, message }
  }
}

export default Scope
