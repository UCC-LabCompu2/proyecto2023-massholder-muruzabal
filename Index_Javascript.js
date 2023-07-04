/**
 * Valida que esten ingresados todos los datos en el formulario de contacto
 * @method ContactoValidacion
 * @return 
 */
ContactoValidacion = () => {
    let llave, inputs;
    llave = 1;
    inputs = document.getElementsByClassName('FormularioContacto');
    for (let i = 0; i < inputs.length; i++) {
        if (inputs[i].value === "") {
            llave = null;
        }
    }
    if (llave === null) {
        alert("Complete todos los campos, por favor");
    } else {
        GuardarLocalStorage();
        document.getElementById('EnviadoContacto').style.display = "block";
    }

}

/**
 * Carga el contenido de el footer una vez agregado al resto de paginas
 * @method CargarLocalStorage
 * @return 
 */

CargarLocalStorage = () => {
    let Nombre, Email, Telefono;
    document.getElementById('Nota').value = "";
    Nombre = localStorage.getItem("NombreLS");
    Email = localStorage.getItem("EmailLS");
    Telefono = localStorage.getItem("TelefonoLS");
    document.getElementById("Nombre").value = Nombre;
    document.getElementById("Email").value = Email;
    document.getElementById("Telefono").value = Telefono;
}

/**
 * Guarda el contenido del footer
 * @method GuardarLocalStorage
 * @return 
 */

GuardarLocalStorage = () => {

    let Nombre, Email, Telefono;
    Nombre = document.getElementById('Nombre').value;
    Email = document.getElementById('Email').value;
    Telefono = document.getElementById('Telefono').value;
    localStorage.setItem("NombreLS", Nombre);
    localStorage.setItem("EmailLS", Email);
    localStorage.setItem("TelefonoLS", Telefono);
    document.getElementById('Nombre').value = "";
    document.getElementById('Email').value = "";
    document.getElementById('Telefono').value = "";
    document.getElementById('Nota').value = "";

}

//mostrar_ocultar
/**
 * Muestra y oculta un la opcion de elegir comida directo del menu
 * @method Fmuestra
 * @param {string} valor valor asignado a cada boton para poder distinguirlos
 * @return 
 */
Fmuestra = (valor) => {
    let Nombre, Email, Telefono, direccion, llave, total;
    total = localStorage.getItem("TotalDeliveryLS");
    if (valor === 'BotonDelivery') {
        Nombre = document.getElementById("NameDelivery").value;
        Email = document.getElementById("EmailDelivery").value;
        Telefono = document.getElementById("PhoneDelivery").value;
        direccion = document.getElementById("DirectionDelivery").value;
        localStorage.setItem("NameDeliveryLS", Nombre);
        localStorage.setItem("EmailDeliveryLS", Email);
        localStorage.setItem("PhoneDeliveryLS", Telefono);
        localStorage.setItem("DirectionDeliveryLS", direccion);
        llave = '1';
        localStorage.setItem("LlaveLS", llave);
        document.getElementById("NameDelivery").value = "";
        document.getElementById("EmailDelivery").value = "";
        document.getElementById("PhoneDelivery").value = "";
        document.getElementById("DirectionDelivery").value = "";
        console.log(localStorage.getItem("NameDeliveryLS"));
        window.open("../paginas/Carta.html", "_self");
    } else if (valor === 'BotonMenu') {
        if (total === '0') {
            alert("Seleccione alguna comida, por favor");
        } else if (localStorage.getItem("TotalDeliveryLS") != 0) {
            llave = null;
            localStorage.setItem("LlaveLS", llave);
            window.open("../paginas/Delivery.html", "_self");
        }
    }
}

//DeliveryOnload
/**
 * Funcion que sirve como intermediario entre la carta y el delivery
 * @method DeliveryOnload
 * @return 
 */
DeliveryOnload = () => {
    let Nombre, Email, Telefono, direccion, total;
    document.getElementById("EnvioDelivery").value = "";
    total = localStorage.getItem("TotalDeliveryLS");
    Nombre = localStorage.getItem("NameDeliveryLS");
    Email = localStorage.getItem("EmailDeliveryLS");
    Telefono = localStorage.getItem("PhoneDeliveryLS");
    direccion = localStorage.getItem("DirectionDeliveryLS");
    document.getElementById("NameDelivery").value = Nombre;
    document.getElementById("EmailDelivery").value = Email;
    document.getElementById("PhoneDelivery").value = Telefono;
    document.getElementById("DirectionDelivery").value = direccion;
    if (total != '0') {
        document.getElementById("muestraTotal").innerHTML = "Total a pagar: $" + total;
    }
    console.log(localStorage.getItem("TotalDeliveryLS"));

}

//CartaOnload
/**
 * Funcion que sirve como intermediario entre la carta y el delivery
 * @method CartaOnload
 * @return 
 */
CartaOnload = () => {
    const inputs = document.querySelectorAll('table.tablamenu input');
    console.log(localStorage.getItem("LlaveLS"));
    let total = 0;
    localStorage.setItem("TotalDeliveryLS", total);
    if (localStorage.getItem("LlaveLS") === null) {
        inputs.forEach(input => {
            input.style.display = "none";
        });
        document.getElementById('BotonMenu').style.display = "none";
        document.getElementById('muestraTotal').style.display = "none";
    } else if (localStorage.getItem("LlaveLS") === '1') {
        inputs.forEach(input => {
            input.style.display = "block";
        });
        document.getElementById('BotonMenu').style.display = "block";
        document.getElementById('muestraTotal').style.display = "block";
    }
}

//Chequeo de datos
/**
 * Funcion que dependiendo del id que se le pase, hará una operación u otra
 * @method ChequeoValores 
 * @param {string} id  id de los elementos en el html
 * @param {number} valor  valor ingresado
 * @param {string} tipo tipo de variable que se requiere
 * @return 
 */
ChequeoValores = (id, valor, tipo) => {
    if (tipo === 'numero') {
        if (isNaN(valor)) {
            alert("Introducir un número, por favor");
            document.getElementById(id).value = "";
        }
    }
}


//AnimacionDepreparacion
/**
 * Funcion que muestra una pelotita rebotando dentro del canvas
 * @method animacion
 */

animacion = () => {

    const RADIUS = 3;
    const WIDTH = 50;
    const HEIGHT = 50;
    const SPEED = 1;

    const coord = { x: WIDTH / 2, y: HEIGHT / 2 };
    const delta = {
        x: Math.random() * SPEED * 2 - SPEED,
        y: Math.random() * SPEED * 2 - SPEED
    };

    const cnv = document.getElementById('canvas');
    const ctx = cnv.getContext('2d');

    tick = () => {
        const newx = coord.x + delta.x;
        const newy = coord.y + delta.y;

        if (newx > WIDTH - RADIUS || newx < RADIUS)
            delta.x = -delta.x;

        if (newy > HEIGHT - RADIUS || newy < RADIUS)
            delta.y = -delta.y;

        coord.x = newx;
        coord.y = newy;

        requestAnimationFrame(draw);
        setTimeout(tick, 10);
    }

    draw = () => {
        ctx.fillStyle = "white";
        ctx.clearRect(0, 0, WIDTH, HEIGHT);
        ctx.beginPath();
        ctx.arc(coord.x, coord.y, RADIUS, 0, Math.PI * 2, true);
        ctx.fill();
    }
    tick();
}

//AnimacionDepreparacion
/**
 * Funcion que habilita a la pagina para mostrar la animacion
 * @method CargaAnim
 */
CargaAnim = () => {
    let llave, inputs, total;
    total = localStorage.getItem("TotalDeliveryLS");
    inputs = document.getElementsByClassName('FormularioDelivery');
    for (let i = 0; i < inputs.length; i++) {
        if (inputs[i].value === "" || total === '0' || total === null) {
            llave = null;
        }
    }
    if (llave === null) {
        alert("Complete todos los campos, por favor");
    } else {
        document.getElementsByClassName('can')[0].style.display = "block";
    }


}

//Calculo de precios
/**
 * Funcion que calcula el precio total de los productos seleccionados
 * @method PreciosMenu
 */
PreciosMenu = () => {
    let total = 0, num;
    const checks = document.getElementsByClassName('MenuEspecial');
    for (let i = 0; i < checks.length; i++) {
        if (checks[i].checked) {
            num = Number(checks[i].value);
            total += num;
        }
    }
    document.getElementById('sumatotal').innerHTML = '$ ' + total;
    localStorage.setItem("TotalDeliveryLS", total);
}

//Guarda datos de reserva
/**
 * Funcion que valida la reserva y guarda los datos en el local storage para despues enviarlos a la base de datos
 * @method PreciosMenu
 */
GuardarReserva = () => {
    let llave, inputs, nombre, correo, telefono, fechaHora, tamano, nota;
    llave = 1;
    inputs = document.getElementsByClassName('FormularioReserva');
    nombre = document.getElementById('NameReservation').value;
    correo = document.getElementById('EmailReservation').value;
    telefono = document.getElementById('PhoneReservation').value;
    fechaHora = document.getElementById('Fecha').value;
    tamano = document.getElementById('Tamaño').value;
    nota = document.getElementById('Notas').value;

    for (let i = 0; i < inputs.length; i++) {
        if (inputs[i].value === "") {
            llave = null;
        }
    }
    if (llave === null) {
        alert("Complete todos los campos, por favor");
    } else {
        document.getElementById('EnviadoReserva').style.display = "block";

        localStorage.setItem("NameReservationLS", nombre);
        localStorage.setItem("EmailReservationLS", correo);
        localStorage.setItem("PhoneReservationLS", telefono);
        localStorage.setItem("FechaReservationLS", fechaHora);
        localStorage.setItem("TamañoReservationLS", tamano);
        localStorage.setItem("NotasReservationLS", nota);
    }
}

/*cancelar animation Frame*/
var x = -645;
var dx = 2;

var animationId;
let animarBrazo1 = () => {

    const canvas = document.getElementById("CanvasBrazo1");
    const ctx = canvas.getContext("2d");

    const img = new Image();
    img.src = "../Recursos/Brazo1.png";
    img.onload = function () {
        canvas.width = canvas.width;
        ctx.drawImage(img, x, 40);
        animationId = requestAnimationFrame(animarBrazo1);
    }

    x += dx;
}

let animarDesc = () => {
    let precio;
    precio = Number(localStorage.getItem("TotalDeliveryLS"));
    console.log(precio);
    document.getElementById('Animacion').style.display = "block";
    if (precio === null || precio === 0) {
        console.log('no entro');
    } else if (precio >= 1 && precio < 500) {
        setTimeout(cancelarAnimacion , 200);
        requestAnimationFrame(animarBrazo1);
        console.log(precio);
    } else if (precio >= 500 && precio < 700) {
        setTimeout(cancelarAnimacion, 800);
        requestAnimationFrame(animarBrazo1);
        console.log(precio);
    } else if (precio >= 700 && precio < 1000) {
        setTimeout(cancelarAnimacion, 1500);
        requestAnimationFrame(animarBrazo1);
        console.log(precio);
    } else if (precio >= 1000) {
        setTimeout(cancelarAnimacion, 1800);
        requestAnimationFrame(animarBrazo1);
    }
}

let cancelarAnimacion = () => {
    cancelAnimationFrame(animationId); // Cancelar la animación utilizando el ID almacenado
};

/*Segunda animacion */
var u = 210;
var du = 2;
var animationId2;
let animarBrazo2 = () => {

    const canvas = document.getElementById("CanvasBrazo2");
    const ctx = canvas.getContext("2d");

    const img2 = new Image();
    img2.src = "../Recursos/Brazo2.png";

    img2.onload = function () {
        canvas.width = canvas.width;
        ctx.drawImage(img2, u, -90);
        animationId2 = requestAnimationFrame(animarBrazo2);
    }

    u = u - du;
}

let animarDesc2 = () => {
    let precio;
    precio = Number(localStorage.getItem("TotalDeliveryLS"));
    console.log(precio);
    document.getElementById('Animacion').style.display = "block";
    if (precio === null || precio === 0) {
        console.log('no entro');
    } else if (precio >= 1 && precio < 500) {
        setTimeout(cancelarAnimacion2, 200);
        requestAnimationFrame(animarBrazo2);
        console.log(precio);
    } else if (precio >= 500 && precio < 700) {
        setTimeout(cancelarAnimacion2, 800);
        requestAnimationFrame(animarBrazo2);
        console.log(precio);
    } else if (precio >= 700 && precio < 1000) {
        setTimeout(cancelarAnimacion2, 1500);
        requestAnimationFrame(animarBrazo2);
        console.log(precio);
    } else if (precio >= 1000) {
        setTimeout(cancelarAnimacion2, 1800);
        requestAnimationFrame(animarBrazo2);
        console.log("Premio");
    document.getElementById('Premio').style.display = "block";
    }
}

let cancelarAnimacion2 = () => {
    cancelAnimationFrame(animationId2); // Cancelar la animación utilizando el ID almacenado
};