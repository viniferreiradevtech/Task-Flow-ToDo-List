
const tasks = [...document.querySelectorAll(".task-item")];

const searchInput = document.getElementById("searchInput");
const emptyState = document.getElementById("emptyState");
const visibleCount = document.getElementById("visibleCount");

let activeFilter = "all";
let activeCategory = null;

function updateStatistics() {
    const total = tasks.length;
    const completed = tasks.filter(
        task => task.dataset.status === "done"
    ).length;

    const pending = total - completed;
    const percentage = total
        ? Math.round((completed / total) * 100)
        : 0;

    document.getElementById("totalCount").textContent = total;
    document.getElementById("doneCount").textContent = completed;
    document.getElementById("pendingCount").textContent = pending;
    document.getElementById("progressText").textContent =
        `${percentage}%`;

    document.getElementById("progressBar").style.width =
        `${percentage}%`;

    document.getElementById("progressContainer")
        .setAttribute("aria-valuenow", percentage);
}

function filterTasks() {
    const search = searchInput.value.trim().toLowerCase();
    let visible = 0;

    tasks.forEach(task => {
        const matchesStatus =
            activeFilter === "all" ||
            task.dataset.status === activeFilter;

        const matchesCategory =
            !activeCategory ||
            task.dataset.category === activeCategory;

        const matchesSearch =
            task.dataset.description.includes(search);

        const shouldShow =
            matchesStatus && matchesCategory && matchesSearch;

        task.hidden = !shouldShow;

        if (shouldShow) visible++;
    });

    visibleCount.textContent =
        `${visible} ${visible === 1 ? "tarefa" : "tarefas"}`;

    emptyState.hidden = visible > 0;
}

function setFilter(filter) {
    activeFilter = filter;
    activeCategory = null;

    document.querySelectorAll(".nav-link-custom")
        .forEach(button => button.classList.remove("active"));

    document.querySelectorAll(".filter-button")
        .forEach(button => button.classList.remove("selected"));

    document.querySelectorAll("[data-filter]").forEach(button => {
        if (button.dataset.filter === filter) {
            if (button.classList.contains("filter-button")) {
                button.classList.add("selected");
            } else {
                button.classList.add("active");
            }
        }
    });

    filterTasks();
}

document.querySelectorAll("[data-filter]").forEach(button => {
    button.addEventListener("click", () => {
        setFilter(button.dataset.filter);
    });
});

document.querySelectorAll("[data-category]").forEach(button => {
    button.addEventListener("click", () => {
        activeCategory = button.dataset.category;
        activeFilter = "all";

        document.querySelectorAll(".nav-link-custom")
            .forEach(item => item.classList.remove("active"));

        document.querySelectorAll(".filter-button")
            .forEach(item => item.classList.remove("selected"));

        button.classList.add("active");
        filterTasks();
    });
});

searchInput.addEventListener("input", filterTasks);

// Confirmação de exclusão
document.querySelectorAll(".delete-form").forEach(form => {
    form.addEventListener("submit", event => {
        const confirmed = window.confirm(
            "Deseja realmente excluir esta tarefa?"
        );

        if (!confirmed) {
            event.preventDefault();
        }
    });
});

// Edição de tarefas
const editDialog = document.getElementById("editDialog");
const editForm = document.getElementById("editForm");

document.querySelectorAll(".edit-button").forEach(button => {
    button.addEventListener("click", () => {
        editForm.action = `/editar/${button.dataset.id}`;

        document.getElementById("editDescription").value =
            button.dataset.description;

        document.getElementById("editCategory").value =
            button.dataset.category;

        document.getElementById("editDue").value =
            button.dataset.due;

        editDialog.showModal();
    });
});

function closeEditDialog() {
    editDialog.close();
}

document.getElementById("cancelEdit")
    .addEventListener("click", closeEditDialog);

document.getElementById("cancelEditSecondary")
    .addEventListener("click", closeEditDialog);

editDialog.addEventListener("click", event => {
    if (event.target === editDialog) {
        closeEditDialog();
    }
});

// Alternância de tema
const themeToggle = document.getElementById("themeToggle");
const themeIcon = themeToggle.querySelector("i");

function applyTheme(theme) {
    const isDark = theme === "dark";

    document.body.classList.toggle("dark", isDark);
    themeIcon.className = isDark ? "bi bi-sun" : "bi bi-moon";

    themeToggle.setAttribute(
        "aria-label",
        isDark ? "Ativar tema claro" : "Ativar tema escuro"
    );
}

let savedTheme = "light";

try {
    savedTheme = localStorage.getItem("taskflow-theme") || "light";
} catch (error) {
    console.warn("Não foi possível recuperar o tema salvo.");
}

applyTheme(savedTheme);

themeToggle.addEventListener("click", () => {
    const nextTheme = document.body.classList.contains("dark")
        ? "light"
        : "dark";

    applyTheme(nextTheme);

    try {
        localStorage.setItem("taskflow-theme", nextTheme);
    } catch (error) {
        console.warn("Não foi possível salvar a preferência de tema.");
    }
});

// Inicialização
updateStatistics();
filterTasks();
