# Lab-Clean — Livraria (Clean Architecture)

## Sobre o projeto

Aplicação MVP de livraria desenvolvida em **Clean Architecture**, com:

* Backend em Flask
* Persistência em arquivos `.txt` (JSONL)
* Frontend SPA (HTML, CSS e JS puro)
* Funcionalidades:

  * Buscar livros
  * Visualizar detalhes
  * Realizar reservas com QR Code

---

## Pré-requisitos

* Python 3 instalado
* Navegador web

---

## Instalação

Na raiz do projeto:

```bash
python -m pip install -r requirements.txt
```

---

## Como rodar o backend

Na raiz do projeto:

```bash
python -m main
```

O servidor será iniciado em:

```
http://127.0.0.1:5000
```

---

## Como rodar o frontend

Abra outro terminal:

```bash
cd frontend
python -m http.server 5500
```

Acesse no navegador:

```
http://localhost:5500
```

---

## Fluxo de uso

1. Digite um termo (ex: "harry")
2. Clique em **Buscar**
3. Clique em **Ver unidades**
4. Escolha uma unidade
5. Preencha (opcionalmente) nome e data
6. Confirme a reserva
7. Visualize o QR Code

---

## Estrutura do projeto

```
app/
├── domain/
├── use_cases/
├── interface_adapters/
└── infrastructure/

frontend/
dados/
main.py
```

---

## Observações

* Os dados são salvos automaticamente em `dados/`
* O sistema cria os arquivos de seed na primeira execução
* Caso haja erro de CORS, verifique se `flask-cors` está instalado e configurado

---

## Tecnologias

* Python
* Flask
* HTML / CSS / JavaScript
* qrcode
* Pillow

---
