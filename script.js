let correcta;

function generarEjercicio() {

    let a = Math.floor(Math.random() * 21) - 10;
    let b = Math.floor(Math.random() * 21) - 10;

    correcta = a + b;

    document.getElementById("ejercicio").innerHTML =
        `${a} + (${b}) = ?`;
}

function comprobar() {

    let respuesta =
        Number(document.getElementById("respuesta").value);

    let resultado =
        document.getElementById("resultado");

    if (respuesta === correcta) {
        resultado.innerHTML = "✅ Correcto";
    } else {
        resultado.innerHTML =
            `❌ Error. La respuesta era ${correcta}`;
    }

    document.getElementById("respuesta").value = "";

    generarEjercicio();
}

generarEjercicio();