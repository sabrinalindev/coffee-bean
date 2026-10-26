var minus = document.getElementsByClassName("fa-circle-minus");
var trash = document.getElementsByClassName("fa-trash");

Array.from(minus).forEach(function(element) {
      element.addEventListener('click', function(){
        const dataSetID = this.parentNode.parentNode.childNodes[1].dataset.msgId
        
        fetch('coffeeBean', {
          method: 'put',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            'userID':dataSetID
          })
        })
        .then(response => {
          if (response.ok) return response.json()
        })
        .then(data => {
          console.log(data)
          window.location.reload(true)
        })
      });
});


Array.from(trash).forEach(function(element) {
      element.addEventListener('click', function(){
        const dataSetID = this.parentNode.parentNode.childNodes[1].dataset.msgId
        fetch('coffeeBean', {
          method: 'delete',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            //target ID
            'userID':dataSetID
          })
        }).then(function (response) {
          window.location.reload()
        })
      });
});
