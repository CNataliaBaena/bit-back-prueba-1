import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "El nombre es obligatorio"],
        // Atributo que permite eliminar los espacios en blancos que sean innecesarios.
        trim: true,
    },
    lastname: {
        type: String,
        required: [true, "El apellido es obligatorio"],
        trim: true,
    },
    email: {
        type: String,
        // Atributo para hacerlo obligatorio, permite al ingresar los datos que ingrese el correo para que sea obligatorio
        required: [true, "El email es obligatorio"],
        // Atributo para hacer el correo de manera unica, esto permite que no quede correos repetidos y se cometa un error al momento de ingresarlos repetidos
        unique: true,
        // Atributo para identificar el correo en mayuscula y definirlo de manera miniscula, permitiendo la conversión del ingreso de los datos y enviarlos en minusculas si el correo fue ingresado en mayusculas
        lowercase: true,
        // Atributo que permite validar el nombre del correo correctamente, lo que realiza es la validación que sea un correo valido "example.com -> example@example.com"
        match: [/^\S+@\S+\.\S+$/, "Email inválido"],
    },
    password: {
        type: String,
        required: [true, "La contraseña es obligatoria"],
        minlength: 6,
        maxlength: 12,
        select: false, //No envia la contraseña a la base de datos, queda guardado en local storage
    },
}, {
    versionKey: false, timestamps: true,
});

// El metodo valida la contraseña para encriptarla y validar el manejo de usuarios
userSchema.pre("save", async function() {
  // Si no se modifica el password, no hace nada
    if (!this.isModified("password")) return;

  // Encripta la contraseña
    this.password = await bcrypt.hash(this.password, 10);

});

// Agrega el metodo para "comparar" la contraseña en el login
userSchema.methods.comparePassword = async function(password) {
    return await bcrypt.compare(password, this.password);
};

export default mongoose.model("User", userSchema);