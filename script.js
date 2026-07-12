let solucion;
let puntos = 0;
let aciertos = 0;
let errores = 0;

function numeroAleatorio() {
    return Math.floor(Math.random() * 21) - 10;
}

function generarEjercicio() {
    let a = numeroAleatorio();
    let b = numeroAleatorio();

    const tipo = Math.floor(Math.random() * 3);

    if (tipo === 0) {
        solucion = a + b;
        document.getElementById("ejercicio").innerHTML =
            `${a} + (${b}) = ?`;
    } else if (tipo === 1) {
        solucion = a - b;
        document.getElementById("ejercicio").innerHTML =
            `${a} - (${b}) = ?`;
    } else {
        a = Math.floor(Math.random() * 11) - 5;
        b = Math.floor(Math.random() * 11) - 5;

        solucion = a * b;
        document.getElementById("ejercicio").innerHTML =
            `(${a}) × (${b}) = ?`;
    }
}

function comprobar() {
    let respuesta = Number(document.getElementById("respuesta").value);
    let resultado = document.getElementById("resultado");

    if (respuesta === solucion) {
        aciertos++;
        puntos += 2;
        resultado.innerHTML = "✅ ¡Correcto!";
        resultado.classList.add("correcto");
    } else {
        errores++;
        resultado.innerHTML = `❌ Incorrecto. La respuesta era ${solucion}`;
        resultado.classList.remove("correcto");
    }

    document.getElementById("aciertos").textContent = aciertos;
    document.getElementById("errores").textContent = errores;
    document.getElementById("puntos").textContent = puntos;
    document.getElementById("barra").value = Math.min(puntos, 30);

    mostrarInsignia();
    document.getElementById("respuesta").value = "";
    generarEjercicio();
}

function mostrarInsignia() {
    let texto = "";

    if (puntos >= 30) {
        texto = "👑 Maestro de los Enteros";
    } else if (puntos >= 20) {
        texto = "🥇 Experto en Enteros";
    } else if (puntos >= 10) {
        texto = "⭐ Explorador Matemático";
    }

    document.getElementById("insignia").innerHTML = texto;
}

generarEjercicio();