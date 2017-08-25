console.log('Loaded!');
var submit = document.getElementById('submit_btn');

submit.onclick = function () {
    alert('Something went wrong on the sever1');
    var request = new XMLHttpRequest();
    
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;
    alert('Something went wrong on the sever2');
    console.log(username);
    request.open('POST', 'http://datasci1204.imad.hasura-app.io/',true);
    alert('Something went wrong on the sever3');
    request.setRequestHeader('Content-Type', 'application/json');
    request.send(JSON.stringify({username: username, password: password}));

    
    request.onreadystatechange = function() {
        if (request.readyState === XMLHttpRequest.Done) {
            
            if (request.status === 200) {
                alert('Logged in successfully')
            } else if (request.readyState === 403) {
                alert('Username/password is incorrect');
            } else if (request.status === 500) {
                alert('Something went wrong on the sever');
            } else {
                alert('Something went wrong on the sever3');
            
            }
        }
    };



};
