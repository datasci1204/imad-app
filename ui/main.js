console.log('Loaded!');
var submit = document.getElementById('submit_btn');

submit.onclick = function () {
    var request = new XMLHttpRequest();
    
    
    console.log(username);
    
    /*request.setRequestHeader('Content-Type', 'application/json');
    --request.send(JSON.stringify({username: username, password: password}));
*/
    
    request.onreadystatechange = function() {
        if (request.readyState === XMLHttpRequest.DONE) {
            
            if (request.status === 200) {
                var counter = request.responseText;
                alert('Logged in successfully'+counter.toString());
            } else if (request.readyState === 403) {
                alert('Username/password is incorrect');
            } else if (request.status === 500) {
                alert('Something went wrong on the sever');
            } else {
                alert('User Created Successfully');
            
            }
        }
    };
/*
request.open('GET', 'http://datasci1204.imad.hasura-app.io/login',true);
request.send(null); 
*/
var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;
request.open('POST', 'http://datasci1204.imad.hasura-app.io/create',true);
  request.setRequestHeader('Content-Type', 'application/json');
  request.send(JSON.stringify({username: username, password: password}));

};
