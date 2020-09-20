
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient
const ObjectID = require('mongodb').ObjectID

var db, collection;
const url = "mongodb+srv://Userfh:UfkUJE8ev25NFUu@cluster0.cbfyz.gcp.mongodb.net/cluster0?retryWrites=true&w=majority"
const dbName = "demo";

function connectCallback(error, client) {
  if (error) throw error;
  db = client.db(dbName);
  console.log('Connected!')
}
function mongoConnect() {
  MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true}, connectCallback);
}
app.listen(3000, mongoConnect);


app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(express.static('public'))


app.get('/', (req, res) => {
  db.collection('tasks').find().toArray((err, result) => {
    if (err) return console.log(err)
    res.render('index.ejs', {tasks: result})
  })
})

app.post('/tasks', (req, res) => {
  db.collection('tasks').insertOne({detail: req.body.detail, isComplete: false,}, (err, result) => {
    if (err) return console.log(err)
    console.log('saved to database')
    res.redirect('/')

  })
})

app.put('/tasks', (req, res) => {
  console.log(req.body)
  db.collection('tasks')
  .findOneAndUpdate({_id: new ObjectID(req.body.id)}, {
    $set: {
      //creating a boolean expression and assiging the result of that expression to isComplete
      isComplete:req.body.isComplete
    }
  }, {
    sort: {_id: -1},
    upsert: true
  }, (err, result) => {
    if (err) return res.send(err)
    res.send(result)
  })
})


app.delete('/tasks', (req, res) => {
  db.collection('tasks').findOneAndDelete({detail: req.body.detail}, (err, result) => {
    if (err) return res.send(500, err)
    res.send('Message deleted!')
  })
})












//
//
// let button = document.querySelector("button");
// let clearList = document.getElementById("clear");
// let clearDone = document.getElementById("clearDone")
// //clear done for button clearComplete
// // clearList.addEventListener("click",erase)
// const list = document.getElementById("list")
// let counter = 0
// // counter to go up every time and down every time it strikes
// // unstrike go back up
//
// function addItem() {
//   document.querySelector("input").value;
//   let li = document.createElement("li");
//   li.className = "toDo"
//   let addLi = document.createTextNode(document.querySelector("input").value)
//   li.appendChild(addLi);
//   document.querySelector("ul").appendChild(li);
//   document.getElementById("toDo").innerText = document.querySelectorAll("li").length;
//   // you have 10 todos left
// }
//
// clearList.onclick = function(){
//   list.innerHTML = "";
//   document.getElementById('toDo').innerHTML = 0;
// }
//
//
// function cross(e) {
//   // console.log(e.target.classList)
//   if (e.target.classList.contains("toDo")){
//     e.target.classList.toggle("crossOff");
//     counter++
//     document.getElementById("toDo").innerText = document.querySelectorAll("li").length - document.querySelectorAll(".crossOff").length
//
//   }
//
// }
//
//
// function clearComplete() {
//   document.querySelectorAll(".toDo").forEach((item,) => {
//     if(item.classList.contains("crossOff")) {
//       item.parentNode.removeChild(item);
//     }
//   });
//
//
// }
// clearDone.addEventListener("click", clearComplete);
// list.addEventListener("click", cross)
// button.addEventListener("click",addItem)
