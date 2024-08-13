document.addEventListener("DOMContentLoaded", function () {

    const form = document.querySelector("form");

    const nameInput = form.querySelector("input[name = 'name']");

    const phoneInput = form.querySelector("input[name = 'phone']");

    const emailInput = form.querySelector("input[name = 'email']");

    const messageInput = form.querySelector("textarea[name = 'message']");


    form.addEventListener("submit", function (event) {
        event.preventDefault();   // Prevenir el envíodel formulario 


        // Validación de campos

        let valid = true;
        if (nameInput.value.trim() === "") {
            alert("El campo de nombre es obligatorio.");
            valid = false;
        }

        if (phoneInput.value.trim() === "") {
            alert("El campo de teléfonoes obligatorio.");
            valid = false;
        }

        if (emailInput.value.trim() === "") {
            alert("El campo de correo electrónico es obligatorio.");
            valid = false;
        }

        if (messageInput.value.trim() === "") {
            alert("El campo de mensaje es obligatorio.");
            valid = false;
        }

        // validar formato correo

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (
            !emailPattern.test(emailInput.value)
        ) {
            alert("por favor, ingresa un correo electrónico válido.");
            valid = false;
        }

        if (valid) {
            alert("Fomulario enviado con éxito!");
            form.reset();  // Reiniciar el formulario después de enviarlo
        }

    });

});

// Para mostrar/ocultar información adicional

document.addEventListener('DOMContentLoaded', () => {
    const toggleInfoBtn = document.getElementById('toggleInfoBtn');
    const additionalInfo = document.getElementById('additionalInfo');


    toggleInfoBtn.addEventListener('click', () => {
        if
            (additionalInfo.style.display === 'none') {
            additionalInfo.style.display = 'block';
            toggleInfoBtn.textContent = 'Menos información';
        } else {
            additionalInfo.style.display = 'none';
            toggleInfoBtn.textContent = 'Más información';
        }
    });
});