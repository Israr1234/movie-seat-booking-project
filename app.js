function onSignup() {
    // get input values
    var name = document.getElementById('name');
    var email = document.getElementById("email");
    var password = document.getElementById("password");
    var address = document.getElementById('address');
    var number = document.getElementById('number');
    var message = document.getElementById("message");
    var validemail = email.value.slice(-10, email.value.length)
    var inputs = document.getElementsByTagName('input')
    var flag = true;
    for (i = 0; i < inputs.length; i++) {
        if (inputs[i].value == '') {
            flag = false
        }
    }
    if (flag == false) {
        alert('Fill All credentials');
    }
    if (flag == true && password.value.length >= 6 && validemail == '@gmail.com') {


    var user = {
        name: name.value,
        email: email.value,
        password: password.value,
        address: address.value,
        number: number.value
    }

    var users = JSON.parse(localStorage.getItem("users")) || [];
    // get indx
    var userIdx = users.findIndex(function (val) {
        return val.email.toLowerCase() === user.email.toLowerCase()
    });

    if (userIdx === -1) {
        // this user is not exist
        users.push(user);
        // store in storage
        localStorage.setItem("users", JSON.stringify(users));
        // redirect to login page
        location.href = "login.html";
    } else {
        message.innerHTML = user.email + " use in another account";
    }
    // clear state
    setTimeout(() => {
        message.innerHTML = "";
    }, 2000);


    // console.log(user);
}
if (validemail != '@gmail.com') {
    alert('Invalid Email');
}
else if (password.value.length < 6) {
    alert('Password must be at least 6 characters')
}
}

function onLogin() {
    // get input values
    var email = document.getElementById("email");
    var password = document.getElementById("password");
    var message = document.getElementById("message");
    if (email.value != '' && password.value != '') {
    var user = {
        email: email.value,
        password: password.value,
    }

    var users = JSON.parse(localStorage.getItem("users")) || [];
    // get indx
    var currentUser = users.find(function (val) {
        return val.email.toLowerCase() === user.email.toLowerCase() && val.password === user.password;
    });

    if (currentUser) {
        localStorage.setItem("user", JSON.stringify(currentUser));
        // user login
        location.href = "dashboard.html";
    } else {
        message.innerHTML = "Invalid credentials";
        message.style.color='red';
        email.value = "";
        password.value="";
    }
    // clear state
    setTimeout(() => {
        message.innerHTML = "";
    }, 2000);
}
}

function onLogout() {
    // var message = document.getElementById("message");
    localStorage.removeItem("user");
    // message.innerHTML = "Good Bye.!";
    // clear state
    setTimeout(() => {
        location.href = "login.html";
    }, 1000);
}

function getCurrentUser() {
    var detial = document.getElementById("detial");
    var currentUserName = document.getElementById('currentUserName');
    var currentUserEmail = document.getElementById('currentUserEmail');
    var currentUserAddress = document.getElementById('currentUserAddress');
    var currentUserNumber = document.getElementById('currentUserNumber');
    var user = JSON.parse(localStorage.getItem("user"));
    detial.innerHTML = user.name;
    currentUserName.innerHTML = user.name;
    currentUserEmail.innerHTML = user.email;
    currentUserAddress.innerHTML = user.address;
    currentUserNumber.innerHTML = user.number;
}


// OderBooking


function orderbooking(){
   
const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');

populateUI();

let ticketPrice = +movieSelect.value;

// Save selected movie index and price
function setMovieData(movieIndex, moviePrice) {
    localStorage.setItem('selectedMovieIndex', movieIndex);
    localStorage.setItem('selectedMoviePrice', moviePrice);
}

// // Update total and count
function updateSelectedCount() {
    const selectedSeats = document.querySelectorAll('.row .seat.selected');

    const seatsIndex = [...selectedSeats].map(seat => [...seats].indexOf(seat));

    localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));

    const selectedSeatsCount = selectedSeats.length;

    count.innerText = selectedSeatsCount;
    total.innerText = selectedSeatsCount * ticketPrice;

    setMovieData(movieSelect.selectedIndex, movieSelect.value);
}

// // Get data from localstorage and populate UI
function populateUI() {
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));

    if (selectedSeats !== null && selectedSeats.length > 0) {
        seats.forEach((seat, index) => {
            if (selectedSeats.indexOf(index) > -1) {
                seat.classList.add('selected');
            }
        });
    }

    const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');

    if (selectedMovieIndex !== null) {
        movieSelect.selectedIndex = selectedMovieIndex;
    }
}

// Movie select event
movieSelect.addEventListener('change', e => {
    ticketPrice = +e.target.value;
    setMovieData(e.target.selectedIndex, e.target.value);
    updateSelectedCount();
});

// Seat click event
container.addEventListener('click', e => {
    if (
        e.target.classList.contains('seat') &&
        !e.target.classList.contains('occupied')
    ) {
        e.target.classList.toggle('selected');

        updateSelectedCount();
    }
});

// // Initial count and total set
updateSelectedCount();
}
orderbooking();