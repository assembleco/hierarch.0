import { observable, makeAutoObservable } from "mobx"

class Scope {
  address = "src/App.js"

  signal = {
    code: null,
    message: "display",
  }

  hierarchy = [0,0,[],"",false]
  index = null

  constructor() {
    makeAutoObservable(this)
  }

  sign = (message, code) => {
    if(message !== this.signal.message || code !== this.signal.code)
      console.log("Signal", message, code)

    this.signal = { code, message }
  }
}

export default Scope
