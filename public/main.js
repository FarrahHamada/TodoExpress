
//client side javascript
let checked = document.getElementsByName('isComplete')
var trash = document.getElementsByClassName("fa-trash");

Array.from(checked).forEach(function(element) {
      element.addEventListener('change', function(){
        console.log(this.id)
        fetch('tasks', {
          method: 'put',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            'isComplete': this.checked,
            'id': this.id,

          })
        })
        .then(response => {
          if (response.ok) return response.json()
        })
        .then(data => {
          console.log(data)
          window.location.reload(true) //reload page
        })
      });
});
Array.from(trash).forEach(function(element) {
      element.addEventListener('click', function(){
        const tasks = this.parentNode.parentNode.childNodes[1].innerText
        console.log("it works")
        fetch('tasks', {
          method: 'delete',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            'detail': tasks
            // 'msg': msg
          })
        }).then(function (response) {
          window.location.reload()
        })
      });
});
