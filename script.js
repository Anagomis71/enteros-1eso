let solucion;
let puntos = 0;
let aciertos = 0;
let errores = 0;

function numeroAleatorio() {
    return Math.floor(Math.random() * 21) - 10;
}

function generarEjercicio() {
    const modoElem = document.getElementById('actividad');
    const modo = modoElem ? modoElem.value : 'dos';
    const mixtoElem = document.getElementById('mixto');
    const mixto = mixtoElem ? mixtoElem.checked : false;

    if (modo === 'dos') {
        let a = numeroAleatorio();
        let b = numeroAleatorio();
        const tipo = Math.floor(Math.random() * 3);

        if (tipo === 0) {
            solucion = a + b;
            document.getElementById('ejercicio').innerHTML = `${a} + (${b}) = ?`;
        } else if (tipo === 1) {
            solucion = a - b;
            document.getElementById('ejercicio').innerHTML = `${a} - (${b}) = ?`;
        } else {
            a = Math.floor(Math.random() * 11) - 5;
            b = Math.floor(Math.random() * 11) - 5;
            solucion = a * b;
            document.getElementById('ejercicio').innerHTML = `(${a}) × (${b}) = ?`;
        }

    } else {
        // Modo: tres números
        let a = numeroAleatorio();
        let b = numeroAleatorio();
        let c = numeroAleatorio();
        const tipo = Math.floor(Math.random() * 3);

        if (tipo === 0) {
            solucion = a + b + c;
            document.getElementById('ejercicio').innerHTML = `${a} + (${b}) + (${c}) = ?`;
        } else if (tipo === 1) {
            solucion = a - b - c;
            document.getElementById('ejercicio').innerHTML = `${a} - (${b}) - (${c}) = ?`;
        } else {
            if (mixto) {
                const variante = Math.floor(Math.random() * 4);
                switch (variante) {
                    case 0:
                        solucion = a + b - c;
                        document.getElementById('ejercicio').innerHTML = `${a} + (${b}) - (${c}) = ?`;
                        break;
                    case 1:
                        solucion = a - b + c;
                        document.getElementById('ejercicio').innerHTML = `${a} - (${b}) + (${c}) = ?`;
                        break;
                    case 2:
                        solucion = (a + b) * c;
                        document.getElementById('ejercicio').innerHTML = `(${a} + ${b}) × (${c}) = ?`;
                        break;
                    case 3:
                        solucion = a * b + c;
                        document.getElementById('ejercicio').innerHTML = `(${a}) × (${b}) + (${c}) = ?`;
                        break;
                }
            } else {
                solucion = a * b * c;
                document.getElementById('ejercicio').innerHTML = `(${a}) × (${b}) × (${c}) = ?`;
            }
        }
    }
}

function comprobar() {
    let respuesta = Number(document.getElementById('respuesta').value);
    let resultado = document.getElementById('resultado');

    if (respuesta === solucion) {
        aciertos++;
        puntos += 2;
        resultado.innerHTML = '✅ ¡Correcto!';
        resultado.classList.add('correcto');
    } else {
        errores++;
        resultado.innerHTML = `❌ Incorrecto. La respuesta era ${solucion}`;
        resultado.classList.remove('correcto');
    }

    document.getElementById('aciertos').textContent = aciertos;
    document.getElementById('errores').textContent = errores;
    document.getElementById('puntos').textContent = puntos;
    document.getElementById('barra').value = Math.min(puntos, 30);

    mostrarInsignia();
    document.getElementById('respuesta').value = '';
    generarEjercicio();
}

function mostrarInsignia() {
    let texto = '';

    if (puntos >= 30) {
        texto = '👑 Maestro de los Enteros';
    } else if (puntos >= 20) {
        texto = '🥇 Experto en Enteros';
    } else if (puntos >= 10) {
        texto = '⭐ Explorador Matemático';
    }

    document.getElementById('insignia').innerHTML = texto;
}

// Regenerar ejercicio al cambiar la actividad
const modoElem = document.getElementById('actividad');
if (modoElem) {
    modoElem.addEventListener('change', function () {
        // resetear la respuesta visible y estilo
        const resultado = document.getElementById('resultado');
        if (resultado) {
            resultado.innerHTML = '';
            resultado.classList.remove('correcto');
        }
        generarEjercicio();
    });
}

// Regenerar cuando se cambia el checkbox mixto
const mixtoElem2 = document.getElementById('mixto');
if (mixtoElem2) {
    mixtoElem2.addEventListener('change', function () {
        const resultado = document.getElementById('resultado');
        if (resultado) {
            resultado.innerHTML = '';
            resultado.classList.remove('correcto');
        }
        generarEjercicio();
    });
}

// Reiniciar marcador
function reiniciarMarcador() {
    puntos = 0;
    aciertos = 0;
    errores = 0;

    document.getElementById('aciertos').textContent = aciertos;
    document.getElementById('errores').textContent = errores;
    document.getElementById('puntos').textContent = puntos;
    document.getElementById('barra').value = 0;
    document.getElementById('insignia').innerHTML = '';

    const resultado = document.getElementById('resultado');
    if (resultado) {
        resultado.innerHTML = '';
        resultado.classList.remove('correcto');
    }
    generarEjercicio();
}

const botonReset = document.getElementById('reset');
if (botonReset) botonReset.addEventListener('click', reiniciarMarcador);

generarEjercicio();