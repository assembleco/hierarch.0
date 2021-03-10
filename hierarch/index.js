const express = require('express')
const bodyParser = require("body-parser")
const escape = require("escape-html")
const responder = express.Router()

const {
  apply_upgrades,
  source,
} = require("./parse")

var address = `http://${
  process.env.DOMAIN || "0.0.0.0"
}:${
  process.env.PACKAGE_CHANNEL || "3000"
}`

responder.use(bodyParser.json())

// https://enable-cors.org/server_expressjs.html
responder.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", address)
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  next();
});

responder.get("/source", (call, response) => {
  source(call.query.address, s => response.send(s))
})

responder.post("/upgrade", (call, response) => {
  check_upgrade_sequence_collisions(call.body.upgrades)
  apply_upgrades(call.body.address, call.body.upgrades)

  source(call.body.address, s => response.send(s))
})

const check_upgrade_sequence_collisions = (upgrades) => {
  // change.
}

module.exports = responder
