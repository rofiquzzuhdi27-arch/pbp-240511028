
let todos = JSON.parse(localStorage.getItem("todos")) || [];

const form = document.getElementById("form-todo");
const input = document.getElementById("input-todo");
const list = document.getElementById("list-todo");
const stats = document.getElementById("stats");

// Menyimpan data ke localStorage
function simpan() {
    localStorage.setItem("todos", JSON.stringify(todos));
}

// Menampilkan daftar tugas
function render() {
    list.innerHTML = "";

    if (todos.length === 0) {
        list.innerHTML = "<li>Belum ada tugas.</li>";
    }

    todos.forEach((todo) => {
        const li = document.createElement("li");

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = todo.selesai;
        checkbox.dataset.id = todo.id;

        const span = document.createElement("span");
        span.textContent = todo.teks;

        if (todo.selesai) {
            span.classList.add("selesai");
        }

        const tombolHapus = document.createElement("button");
        tombolHapus.textContent = "Hapus";
        tombolHapus.classList.add("hapus");
        tombolHapus.dataset.id = todo.id;

        li.append(checkbox, span, tombolHapus);
        list.appendChild(li);
    });

    const belumSelesai = todos.filter(
        (todo) => !todo.selesai
    ).length;

    stats.textContent = `${belumSelesai} tugas belum selesai`;
}

// Menambahkan tugas
function tambahTodo(teks) {
    todos.push({
        id: Date.now(),
        teks: teks.trim(),
        selesai: false
    });

    simpan();
    render();
}

// Menghapus tugas
function hapusTodo(id) {
    todos = todos.filter((todo) => todo.id !== id);

    simpan();
    render();
}

// Mengubah status tugas
function toggleSelesai(id) {
    const todo = todos.find((todo) => todo.id === id);

    if (todo) {
        todo.selesai = !todo.selesai;
    }

    simpan();
    render();
}

// Event form tambah tugas
form.addEventListener("submit", function (event) {
    event.preventDefault();

    const teks = input.value.trim();

    if (teks !== "") {
        tambahTodo(teks);
        input.value = "";
    }
});

// Event checkbox
list.addEventListener("change", function (event) {
    if (event.target.type === "checkbox") {
        toggleSelesai(Number(event.target.dataset.id));
    }
});

// Event tombol hapus
list.addEventListener("click", function (event) {
    if (event.target.classList.contains("hapus")) {
        hapusTodo(Number(event.target.dataset.id));
    }
});

// Menampilkan data saat halaman dibuka
render();
