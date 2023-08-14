<script setup lang="ts">
import { ref } from 'vue';

const email = ref('');
const newPassword = ref('');
const confirmPassword = ref('');

function validateForm(event: Event) {
  if (!emailIsValid(email.value)) {
    alert('Please enter a valid email address.');
    event.preventDefault(); 
  } else if (!passwordsMatch(newPassword.value, confirmPassword.value)) {
    alert('Please enter matching new passwords.');
    event.preventDefault(); 
  } else if (!isStrongPassword(newPassword.value)) {
    alert('New password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one digit, and one special character.');
    event.preventDefault(); 
  }
}

function emailIsValid(email: string): boolean {
  const emailPattern = /^[^\s@]+@gmail\.com$/;
  return emailPattern.test(email);
}

function passwordsMatch(password: string, confirmPassword: string): boolean {
  return password === confirmPassword;
}

function isStrongPassword(password: string): boolean {
  const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&_-])[A-Za-z\d@$!%*?&_-]{7,}$/;
  return passwordPattern.test(password);
}
</script>



<template>
    <head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Login</title>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
        <link rel="stylesheet" href="login.css" />
    </head>

    <body>
        <form @submit="validateForm">
            <div class="login_form_container">
                <div class="login_form">
                    <h2>New Password</h2>
                    <div class="input_group">
                        <i class="fa fa-user"></i>
                        <input type="text" required placeholder="Email" class="input_text" autocomplete="off" v-model="email"/>
                    </div>
                    <div class="input_group">
                        <i class="fa fa-unlock-alt"></i>
                        <input type="password" required placeholder="New Password" class="input_text" autocomplete="off"  v-model="newPassword" />
                    </div>
                    <div class="input_group">
                        <i class="fa fa-unlock-alt"></i>
                        <input type="password" required placeholder="Confirm Password" class="input_text" autocomplete="off" v-model="confirmPassword"/>
                    </div>
                    <input type="submit" value="Login">
                </div>
            </div>
        </form>
    </body>
</template>


<style>
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    letter-spacing: 1px;
    background-color: #0c1022;
}

.login_form_container {
    position: relative;
    width: 400px;
    height: 470px;
    max-width: 400px;
    max-height: 470px;
    background: #040717;
    border-radius: 50px 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    margin-top: 70px;
}

.login_form_container::before {

    position: absolute;
    width: 170%;
    height: 170%;
    content: '';
    background-image: conic-gradient(transparent, transparent, transparent, #ee00ff);
    animation: rotate_border 6s linear infinite;

}

.login_form_container::after {

    position: absolute;
    width: 170%;
    height: 170%;
    content: '';
    background-image: conic-gradient(transparent, transparent, transparent, #00ccff);
    animation: rotate_border 6s linear infinite;
    animation-delay: -3s;
}

@keyframes rotate_border {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}

.login_form {
    position: absolute;
    background-color: #0c1022;
    border-radius: 65px 50px;
    inset: 5px;
    padding: 50px 40px;
    z-index: 10;
    color: #00ccff;

}




h2 {
    font-size: 40px;
    font-weight: 400;
    text-align: center;
}

.input_group {
    margin-top: 40px;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: start;
}

.input_text {
    width: 95%;
    height: 30px;
    background: transparent;
    border-bottom: none;
    border: none;
    outline: none;
    border-bottom: 1px solid #00ccff;
    font-size: 20px;
    padding-left: 10px;
    color: #00ccff;

}

::placeholder {
    font-size: 15px;
    color: #00ccff52;
    letter-spacing: 1px;

}

.fa {
    font-size: 20px;

}

#login_button {
    position: relative;
    width: 300px;
    height: 40px;
    transition: 1s;
    margin-top: 70px;


}

#login_button a {
    position: absolute;
    width: 100%;
    height: 100%;
    text-decoration: #00ccff;
    z-index: 10;
    cursor: pointer;
    font-size: 22px;
    letter-spacing: 2px;
    border: 1px solid #00ccff;
    border-radius: 50px;
    background-color: #0c1022;
    display: flex;
    justify-content: center;
    align-items: center;
}

.fotter {
    margin-top: 30px;
    display: flex;
    justify-content: space-between;

}

.fotter a {
    text-decoration: none;
    cursor: pointer;
    font-size: 18px;
}

.glowIcon {
    text-shadow: 0 0 10px #00ccff;

}

input[type="submit"] {
    color: #0c1022;
    background: #00ccff;
    font-size: 20px;
    border: none;
    outline: none;
    padding: 2px;
    margin-top: 50px;
    border-radius: 90px;
    font-weight: 600;
    cursor: pointer;
    width: 300px;
    height: 40px;
}

input[type="submit"]:hover {
    background: linear-gradient(90deg, #ee00ff, #00ccff);
    opacity: 1;
}

input[type="submit"]:active {
    background: linear-gradient(90deg, #00ccff, #ee00ff);
    opacity: 0.75;
}
</style>