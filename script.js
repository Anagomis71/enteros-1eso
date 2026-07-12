let solucion;
let puntos = 0;
let aciertos = 0;
let errores = 0;

function numeroAleatorio() {
    return Math.floor(Math.random() * 21) - 10;
}

let selectedModo = 'dos';

function setModo(modo) {
    selectedModo = modo;
    // actualizar estado visual
    document.querySelectorAll('.actividad-box').forEach(box => {
        const m = box.getAttribute('data-modo');
        if (m === modo) {
            box.classList.add('selected');
            box.setAttribute('aria-pressed', 'true');
        } else {
            box.classList.remove('selected');
            box.setAttribute('aria-pressed', 'false');
        }
    });
}

function generarEjercicio() {
    const modo = selectedModo || 'dos';
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
        // mostrar aplausos animados
        const aplausos = document.getElementById('aplausos');
        if (aplausos) {
            aplausos.innerHTML = '';
            for (let i = 0; i < 3; i++) {
                const span = document.createElement('span');
                span.className = 'aplausos-emoji';
                span.textContent = '👏';
                // stagger delay
                span.style.animationDelay = (i * 120) + 'ms';
                aplausos.appendChild(span);
                // trigger show after append
                setTimeout(() => span.classList.add('show'), 20 + i * 120);
            }
            // limpiar después
            setTimeout(() => { aplausos.innerHTML = ''; }, 1400);
        }
    } else {
        errores++;
        resultado.innerHTML = `❌ Incorrecto. La respuesta era ${solucion}`;
        resultado.classList.remove('correcto');
    }

    document.getElementById('aciertos').textContent = aciertos;
    document.getElementById('errores').textContent = errores;
    document.getElementById('puntos').textContent = puntos;
    const puntosGrande = document.getElementById('puntos-grande');
    if (puntosGrande) puntosGrande.textContent = puntos;
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

// Selector por cajas: click y teclado
document.querySelectorAll('.actividad-box').forEach(box => {
    box.addEventListener('click', function () {
        const modo = box.getAttribute('data-modo');
        setModo(modo);
        const resultado = document.getElementById('resultado');
        if (resultado) {
            resultado.innerHTML = '';
            resultado.classList.remove('correcto');
        }
        generarEjercicio();
    });
    box.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            box.click();
        }
    });
});

// Inicializar modo visual
setModo(selectedModo);

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
    const puntosGrande2 = document.getElementById('puntos-grande');
    if (puntosGrande2) puntosGrande2.textContent = puntos;
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