const express = require('express')
const app = express()
app.get('/', function (req, res) { res.send('Hello World') })
app.listen(3000)
let num1 = 5
let num2 = 10
function dodawanie(num1,num2)
{
 var wartosc = num1 + num2 

  return wartosc;
  
}
app.get('/', function dodawanie (req, res) {res.send(wartosc)})