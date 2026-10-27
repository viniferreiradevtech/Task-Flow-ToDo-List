
from flask import Flask, render_template, request, redirect, url_for
import sqlite3

app = Flask(__name__)
DATABASE = "tarefas.db"


def conectar_banco():
    conexao = sqlite3.connect(DATABASE)
    conexao.row_factory = sqlite3.Row
    return conexao


def criar_tabela():
    with conectar_banco() as db:
        db.execute("""
            CREATE TABLE IF NOT EXISTS tarefas (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                descricao TEXT NOT NULL,
                concluida INTEGER NOT NULL DEFAULT 0,
                categoria TEXT NOT NULL DEFAULT 'Outros',
                prazo TEXT
            )
        """)

        # Atualiza bancos criados pela versão anterior
        colunas = {
            coluna["name"]
            for coluna in db.execute(
                "PRAGMA table_info(tarefas)"
            ).fetchall()
        }

        if "categoria" not in colunas:
            db.execute("""
                ALTER TABLE tarefas
                ADD COLUMN categoria TEXT NOT NULL DEFAULT 'Outros'
            """)

        if "prazo" not in colunas:
            db.execute("ALTER TABLE tarefas ADD COLUMN prazo TEXT")


@app.route("/")
def inicio():
    with conectar_banco() as db:
        tarefas = db.execute(
            "SELECT * FROM tarefas ORDER BY id DESC"
        ).fetchall()

    return render_template("index.html", tarefas=tarefas)


@app.route("/adicionar", methods=["POST"])
def adicionar():
    descricao = request.form.get("descricao", "").strip()
    categoria = request.form.get("categoria", "Outros")
    prazo = request.form.get("prazo", "").strip() or None

    categorias_validas = [
        "Trabalho", "Estudos", "Pessoal", "Outros"
    ]

    if categoria not in categorias_validas:
        categoria = "Outros"

    if descricao and len(descricao) <= 200:
        with conectar_banco() as db:
            db.execute("""
                INSERT INTO tarefas (descricao, categoria, prazo)
                VALUES (?, ?, ?)
            """, (descricao, categoria, prazo))

    return redirect(url_for("inicio"))


@app.route("/concluir/<int:id>", methods=["POST"])
def concluir(id):
    with conectar_banco() as db:
        db.execute("""
            UPDATE tarefas
            SET concluida = CASE
                WHEN concluida = 0 THEN 1 ELSE 0
            END
            WHERE id = ?
        """, (id,))

    return redirect(url_for("inicio"))


@app.route("/editar/<int:id>", methods=["POST"])
def editar(id):
    descricao = request.form.get("descricao", "").strip()
    categoria = request.form.get("categoria", "Outros")
    prazo = request.form.get("prazo", "").strip() or None

    categorias_validas = [
        "Trabalho", "Estudos", "Pessoal", "Outros"
    ]

    if categoria not in categorias_validas:
        categoria = "Outros"

    if descricao and len(descricao) <= 200:
        with conectar_banco() as db:
            db.execute("""
                UPDATE tarefas
                SET descricao = ?, categoria = ?, prazo = ?
                WHERE id = ?
            """, (descricao, categoria, prazo, id))

    return redirect(url_for("inicio"))


@app.route("/excluir/<int:id>", methods=["POST"])
def excluir(id):
    with conectar_banco() as db:
        db.execute("DELETE FROM tarefas WHERE id = ?", (id,))

    return redirect(url_for("inicio"))


if __name__ == "__main__":
    criar_tabela()
    app.run(debug=True)
