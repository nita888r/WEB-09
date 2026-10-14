let tugasSaatIni = [];
let IDAnggotaAktif = null;

// DOM Elements
const loadingAnggota = document.getElementById("loadingAnggota");
const errorAnggota = document.getElementById("errorAnggota");
const daftarAnggota = document.getElementById("daftarAnggota");

const judulTugas = document.getElementById("judulTugas");
const progresTugas = document.getElementById("progresTugas");
const statusTugas = document.getElementById("statusTugas");
const pesanKosong = document.getElementById("pesanKosong");
const daftarTugas = document.getElementById("daftarTugas");

const inputCari = document.getElementById("inputCari");
const formTugas = document.getElementById("formTugas");
const inputJudul = document.getElementById("inputJudul");
const btnSimpan = document.getElementById("btnSimpan");
const pesanForm = document.getElementById("pesanForm");

// Helper Tampil Pesan Form
function setPesanForm(teks, isError = true) {
  pesanForm.textContent = teks;
  pesanForm.className = `text-xs mt-1 ${isError ? "text-red-600" : "text-green-600"}`;
}

// F1. Ambil Anggota
async function ambilAnggota() {
  try {
    const res = await fetch("https://jsonplaceholder.typicode.com/users");
    if (!res.ok) throw new Error("Gagal memuat anggota!");
    const data = await res.json();
    
    loadingAnggota.textContent = "";
    data.forEach(user => {
      const btn = document.createElement("button");
      btn.textContent = user.name;
      btn.className = "w-full text-left p-2 bg-white border rounded text-sm hover:bg-blue-50";
      
      btn.addEventListener("click", () => pilihAnggota(btn, user.id, user.name));
      daftarAnggota.appendChild(btn);
    });
  } catch (err) {
    loadingAnggota.textContent = "";
    errorAnggota.textContent = err.message;
    errorAnggota.classList.remove("hidden");
  }
}

// F2. Ambil Tugas
async function pilihAnggota(btnEl, id, nama) {
  IDAnggotaAktif = id;
  
  // Highlight Tombol Aktif
  daftarAnggota.querySelectorAll("button").forEach(b => {
    b.classList.remove("bg-blue-600", "text-white");
    b.classList.add("bg-white");
  });
  btnEl.classList.remove("bg-white");
  btnEl.classList.add("bg-blue-600", "text-white");

  // Reset UI
  judulTugas.textContent = "Tugas " + nama;
  daftarTugas.textContent = "";
  inputCari.value = "";
  tugasSaatIni = [];
  progresTugas.textContent = "";
  pesanKosong.classList.add("hidden");
  formTugas.classList.remove("hidden");
  inputCari.classList.remove("hidden");
  statusTugas.textContent = "Memuat tugas...";
  statusTugas.className = "text-sm text-blue-600";

  try {
    const res = await fetch("https://jsonplaceholder.typicode.com/todos?userId=" + id);
    if (!res.ok) throw new Error("Gagal memuat tugas!");
    
    tugasSaatIni = await res.json();
    statusTugas.textContent = "";

    tugasSaatIni.forEach(tugas => daftarTugas.appendChild(buatElemenTugas(tugas)));
    perbaruiProgres();
  } catch (err) {
    statusTugas.textContent = err.message;
    statusTugas.className = "text-sm text-red-600";
  }
}

// F2 & F5. Render Item Tugas
function buatElemenTugas(tugas) {
  const li = document.createElement("li");
  li.className = "p-2 bg-white border rounded flex justify-between items-center text-sm item-tugas";

  const span = document.createElement("span");
  span.textContent = tugas.title;
  span.className = "judul-tugas flex-1";
  if (tugas.completed) span.classList.add("line-through", "text-gray-400");

  const aksi = document.createElement("div");
  aksi.className = "flex gap-1";

  // Tombol Selesai
  if (!tugas.completed) {
    const btnSelesai = document.createElement("button");
    btnSelesai.textContent = "Tandai Selesai";
    btnSelesai.className = "px-2 py-1 bg-green-600 text-white text-xs rounded";
    btnSelesai.addEventListener("click", () => {
      tugas.completed = true;
      span.classList.add("line-through", "text-gray-400");
      btnSelesai.remove();
      perbaruiProgres();
    });
    aksi.appendChild(btnSelesai);
  }

  // Tombol Hapus
  const btnHapus = document.createElement("button");
  btnHapus.textContent = "Hapus";
  btnHapus.className = "px-2 py-1 bg-red-600 text-white text-xs rounded";
  btnHapus.addEventListener("click", () => {
    tugasSaatIni = tugasSaatIni.filter(t => t !== tugas);
    li.remove();
    perbaruiProgres();
    filterPencarian();
  });

  aksi.appendChild(btnHapus);
  li.appendChild(span);
  li.appendChild(aksi);
  return li;
}

function perbaruiProgres() {
  const total = tugasSaatIni.length;
  const selesai = tugasSaatIni.filter(t => t.completed).length;
  progresTugas.textContent = `${selesai} dari ${total} tugas selesai`;
}

// F3. Pencarian
function filterPencarian() {
  const kata = inputCari.value.trim().toLowerCase();
  let adaMatch = false;

  daftarTugas.querySelectorAll(".item-tugas").forEach(li => {
    const teks = li.querySelector(".judul-tugas").textContent.toLowerCase();
    const cocok = teks.includes(kata);
    li.classList.toggle("hidden", !cocok);
  });

  pesanKosong.classList.toggle("hidden", adaMatch || daftarTugas.children.length === 0);
}
inputCari.addEventListener("input", filterPencarian);

// F4. Simulasi Simpan Ke Server
function simpanTugas(judul) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const ada = tugasSaatIni.some(t => t.title.trim().toLowerCase() === judul.trim().toLowerCase());
      if (ada) reject(new Error("Tugas sudah ada!"));
      else resolve({ title: judul, completed: false, userId: IDAnggotaAktif });
    }, 1000);
  });
}

formTugas.addEventListener("submit", async (e) => {
  e.preventDefault();
  pesanForm.classList.add("hidden");
  const judul = inputJudul.value.trim();

  if (judul.length < 5) {
    setPesanForm("Judul tugas minimal 5 karakter!");
    return;
  }

  btnSimpan.textContent = "Menyimpan...";
  try {
    const baru = await simpanTugas(judul);
    tugasSaatIni.unshift(baru);
    daftarTugas.prepend(buatElemenTugas(baru));
    
    perbaruiProgres();
    inputJudul.value = "";
    filterPencarian();
    
    setPesanForm("Tugas berhasil ditambahkan.", false);
    setTimeout(() => pesanForm.classList.add("hidden"), 3000);
  } catch (err) {
    setPesanForm(err.message);
  } finally {
    btnSimpan.textContent = "Simpan";
  }
});

ambilAnggota();