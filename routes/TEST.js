// example code
const bcrypt = require("bcrypt")
const saltRounds = 10
const password = "1234"

// bcrypt
//   .genSalt(saltRounds)
//   .then(salt => {
//     console.log('---Salt: ', salt)
//     return bcrypt.hash(password, salt)
//   })
//   .then(hash => {
//     console.log('++++Hash: ', hash)
//   })
//   .catch(err => console.error(err.message))

// bcrypt
//   .hash(password, saltRounds)
//   .then(hash => {
//     userHash = hash
//     console.log('^^Hash ', hash)
//     validateUser(hash)
//   })
//   .catch(err => console.error(err.message))
// let hashedPassword;
// bcrypt.hash(password, saltRounds, (err, hashedPasswordInternal) => {
// // hashedPassword = hashedPasswordInternal;
// console.log("hashedPasswordInternal: ", hashedPasswordInternal);
// })

function validateUser(hash) {
  bcrypt
    .compare(password, hash)
    .then(res => {
      console.log(res) // return true
    })
    .catch(err => console.error(err.message))
}

validateUser("$2b$10$By51UDuiTV0dnFhUiewpte.3g6qz5nd68OzBRWUdwqy6/WjmJr.Am")
