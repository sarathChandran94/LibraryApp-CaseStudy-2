// Bootstrap validation.
(function() {
    'use strict';
    window.addEventListener('load', function() {
        // Fetch all the forms we want to apply custom Bootstrap validation styles to
        var forms = document.getElementsByClassName('needs-validation');
        // Loop over them and prevent submission
        var validation = Array.prototype.filter.call(forms, function(form) {
            form.addEventListener('submit', function(event) {
                if (form.checkValidity() === false) {
                    event.preventDefault();
                    event.stopPropagation();
                }
                form.classList.add('was-validated');
            },false);
        });
    },false);
})();


let form = document.getElementById("myForm");
let formIp = document.getElementById("myForm").getElementsByTagName("input");
console.log(formIp);
let emptyfb = document.getElementsByClassName('empty-feedback');
// console.log(emptyfb);
let invalidfb = document.getElementsByClassName('invalid-feedback');
let validfb = document.getElementsByClassName('valid-feedback');

formIp[5].onfocus = function myFun() {formIp[5].setAttribute('pattern',formIp[4].value);};
formIp[4].onclick = function myFun() {$('.collapse').collapse("toggle")};
formIp[0].onkeydown = function myFun() {emptyfb[0].style.display = "none";invalidfb[0].style.display = "invalid";};
formIp[3].onchange = function myFun() {emptyfb[3].style.display = "none";invalidfb[3].style.display = "invalid";};

function myVal() {
    for (let i=0; i<formIp.length; i++) {
        if (formIp[i].value == "") {
            emptyfb[i].innerHTML = `<small>Fields cannot be empty!</small>`;
            emptyfb[i].style.display = "block";
            emptyfb[i].style.color = "red";
            invalidfb[i].style.display = "none";
        }
        formIp[i].onkeydown = function myFun() {emptyfb[i].style.display = "none";invalidfb[i].style.display = "";};
    }

    if (formIp[4].value != formIp[5].value) {
        emptyfb[5].innerHTML = `<small>Passwords does not match!</small>`;
        emptyfb[5].style.display = "block";
        emptyfb[5].style.color = "red";
        invalidfb[5].style.display = "none";
        return false;
    }

    return true;
}

// regexpEmail = /^([\w\.\-]+)@([\w\-]+)\.([a-z]{2,3})(\.[a-z]{2,3})?$/g;
// regexpPhone = /^([0-9]){3}([\s|\-|\.]?)([0-9]){3}([\s|\-|\.]?)([0-9]){4}$/g;
// regexpPw = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).{8,}$/g;
