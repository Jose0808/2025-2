// ======================
//   EJERCICIOS JS
// ======================

function esPalindromo(cadena) {
    let limpia = cadena.toLowerCase().replace(/[\W_]/g, "");
    let invertida = limpia.split("").reverse().join("");
    return limpia === invertida;
}

function ejercicio1() {
    const texto = document.getElementById("palindromoInput").value;
    const resultado = esPalindromo(texto)
        ? "Es un palíndromo"
        : "No es un palíndromo";
    document.getElementById("resultado1").innerText = resultado;
}

function ejercicio2() {
    const n1 = parseFloat(document.getElementById("num1").value);
    const n2 = parseFloat(document.getElementById("num2").value);

    let mensaje = "";
    if (n1 > n2) mensaje = n1 + " es mayor";
    else if (n2 > n1) mensaje = n2 + " es mayor";
    else mensaje = "Son iguales";

    document.getElementById("resultado2").innerText = mensaje;
}

function ejercicio3() {
    const frase = document.getElementById("frase1").value.toLowerCase();
    const vocales = ["a", "e", "i", "o", "u"];
    let encontradas = [];

    for (let letra of frase) {
        if (vocales.includes(letra) && !encontradas.includes(letra)) {
            encontradas.push(letra);
        }
    }

    document.getElementById("resultado3").innerText =
        "Vocales encontradas: " + encontradas.join(", ");
}

function ejercicio4() {
    const frase = document.getElementById("frase2").value.toLowerCase();
    const contador = { a: 0, e: 0, i: 0, o: 0, u: 0 };

    for (let letra of frase) {
        if (contador.hasOwnProperty(letra)) {
            contador[letra]++;
        }
    }

    document.getElementById("resultado4").innerText =
        `a:${contador.a}, e:${contador.e}, i:${contador.i}, o:${contador.o}, u:${contador.u}`;
}


// ======================
//   AJAX
// ======================

window.onload = function () {
    document.getElementById("urlInput").value = "https://rickandmortyapi.com/api/character";
    actualizarEstado(0);
};

function realizarPeticion() {
    actualizarEstado(1);
    const url = document.getElementById("urlInput").value;
    const xhr = new XMLHttpRequest();

    xhr.open("GET", url, true);

    xhr.onreadystatechange = function () {
        actualizarEstado(xhr.readyState);

        if (xhr.readyState === 4) {
            document.getElementById("contenidos").innerText = xhr.responseText;
            mostrarCabeceras(xhr);
            mostrarCodigo(xhr);
        }
    };

    xhr.send();
}

function actualizarEstado(estado) {
    debugger;
    const estados = {
        0: "No iniciada",
        1: "Cargando...",
        2: "Cabeceras recibidas",
        3: "Descargando información...",
        4: "Completada"
    };
    document.getElementById("estado").innerText = estados[estado];
}

function mostrarCabeceras(xhr) {
    document.getElementById("cabeceras").innerText =
        xhr.getAllResponseHeaders();
}

function mostrarCodigo(xhr) {
    document.getElementById("codigo").innerText =
        xhr.status + " - " + xhr.statusText;
}

// =====================================
//     AJAX MODERNO — RICK & MORTY API
// =====================================

function cargarPersonajes() {
    const xhr = new XMLHttpRequest();
    const url = "https://rickandmortyapi.com/api/character";

    xhr.open("GET", url, true);

    xhr.onreadystatechange = function () {

        // Mientras carga
        if (xhr.readyState < 4) {
            document.getElementById("personajes").innerHTML =
                "<p style='text-align:center;'>Cargando personajes...</p>";
        }

        // Cuando termina
        if (xhr.readyState === 4 && xhr.status === 200) {
            const data = JSON.parse(xhr.responseText);
            mostrarPersonajes(data.results);
        }
    };

    xhr.send();
}

function mostrarPersonajes(lista) {
    const container = document.getElementById("personajes");
    container.innerHTML = ""; // limpiar

    lista.forEach(personaje => {
        const card = `
        <div class="card">
            <img src="${personaje.image}" alt="${personaje.name}">
            <div class="card-body">
                <h4>${personaje.name}</h4>
                <p><strong>Especie:</strong> ${personaje.species}</p>
                <p><strong>Género:</strong> ${personaje.gender}</p>
                <p><strong>Estatus:</strong> ${personaje.status}</p>
            </div>
        </div>
        `;
        container.innerHTML += card;
    });
}

