var email = "manueltalavera857@gmail.com";
var password = "123456789";

document.addEventListener('DOMContentLoaded', function() {
    const btnLog = document.getElementById('btnInicioSesion');
    const mail = document.getElementById('email');
    const contraseña = document.getElementById('contraseña');

    btnLog.addEventListener('click', function() {
        if (mail.value === email && contraseña.value === password) {
            window.location.href = "ABM.html";
        } else {
            alert("Email o contraseña incorrectos.");
        }
    });
});