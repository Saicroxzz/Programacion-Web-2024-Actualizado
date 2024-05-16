import { confirmacion, registerauth, addDataUser } from "../Controllers/Firebase.js";

const save_auth = document.getElementById('btnregister');
const specialCharacters = /[!@#$%^&*(),.?":{}|<>]/

async function register() {
    const email = document.getElementById('edtuser').value;
    const password = document.getElementById('edtpassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const confirmEmail = document.getElementById('confirmEmail').value;

    const Id= document.getElementById('id').value;
    const name = document.getElementById('nameR').value;
    const Fecha = document.getElementById('dateR').value;
    const direccion = document.getElementById('direccion').value;
    const telefono = document.getElementById('telefono').value;

    // Validar que las contraseñas coincidan
    if (password.length < 8) {
        alert('La contraseña debe tener al menos 8 caracteres')
        return
      } else if (!specialCharacters.test(password)) {
        alert('La contraseña debe contener al menos un caracter especial')
        return
      } else if (email != confirmEmail) {
        alert('El usuario y la confirmación de usuario no coinciden')
        return
      } else if (password != confirmPassword) {
        alert('La contraseña y la confirmación de contraseña no coinciden')
        return
      }
      
    try {
      // Registrar usuario en Firebase Authentication
      const userCredential = await registerauth(email, password);
      const user = userCredential.user;

      // Agregar datos del usuario a Firestore
      await addDataUser(Id, name, Fecha, direccion, telefono,email,password);
      
      // Envía correo de confirmación
      await confirmacion();
      
      alert('Usuario registrado exitosamente');
      
      // Redirige al usuario a la página de inicio
      window.location.href = "/Index.html";
  } catch (error) {
      alert(error.message);
  }
}

window.addEventListener('DOMContentLoaded', () => {
  save_auth.addEventListener('click', register);
});