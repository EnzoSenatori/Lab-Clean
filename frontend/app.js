const API_URL = "http://localhost:5000";

async function buscarLivros() {
    const termo = document.getElementById("buscaInput").value;

    const response = await fetch(`${API_URL}/livros?q=${termo}`);
    const data = await response.json();

    const container = document.getElementById("resultados");
    container.innerHTML = "";

    if (data.status !== 200) {
        container.innerHTML = `<p>${data.erro}</p>`;
        return;
    }

    for (const livro of data.data) {
        const div = document.createElement("div");
        div.className = "card";

        div.innerHTML = `
            <strong>${livro.titulo}</strong><br>
            Autor: ${livro.autor}<br>
            Editora: ${livro.editora}<br>
            <button onclick="detalharLivro(${livro.id})">Detalhar</button>
        `;

        container.appendChild(div);
    }
}

async function detalharLivro(id) {
    const response = await fetch(`${API_URL}/livros/${id}`);
    const data = await response.json();

    const container = document.getElementById("detalhes");
    container.innerHTML = "";

    if (data.status !== 200) {
        container.innerHTML = `<p>${data.erro}</p>`;
        return;
    }

    const livro = data.data;

    let unidadesHtml = "";

    for (const unidade in livro.unidades) {
        unidadesHtml += `
            <li>
                ${unidade} - ${livro.unidades[unidade]}
                <button onclick="mostrarFormulario(${livro.id}, '${unidade}')">
                    Reservar
                </button>
            </li>
        `;
    }

    container.innerHTML = `
        <div class="card">
            <h3>${livro.titulo}</h3>
            <p>${livro.autor}</p>
            <p>${livro.editora}</p>
            <p>${livro.disponibilidade}</p>
            <ul>${unidadesHtml}</ul>
        </div>
    `;
}

function mostrarFormulario(livroId, unidade) {
    const container = document.getElementById("reserva");

    const hoje = new Date().toISOString().split("T")[0];

    container.innerHTML = `
        <div class="card">
            <h3>Reservar</h3>
            <input type="text" id="nome" placeholder="Seu nome"><br>
            <input type="date" id="data" min="${hoje}"><br>
            <button onclick="reservar(${livroId}, '${unidade}')">
                Confirmar
            </button>
        </div>
    `;
}

async function reservar(livroId, unidade) {
    const nome = document.getElementById("nome").value;
    const data = document.getElementById("data").value;

    const response = await fetch(`${API_URL}/reservas`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            livro_id: livroId,
            unidade: unidade,
            nome_cliente: nome || null,
            data_reserva: data || null
        })
    });

    const result = await response.json();

    const container = document.getElementById("reserva");

    if (result.status !== 201) {
        container.innerHTML = `<p>${result.erro}</p>`;
        return;
    }

    const reserva = result.data;

    container.innerHTML = `
        <div class="card">
            <h3>Reserva confirmada!</h3>
            <p>ID: ${reserva.id}</p>
            <img class="qr" src="${reserva.qr_code_base64}" />
        </div>
    `;
}