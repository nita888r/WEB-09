const data = [
    {nama: "Afif", nilai: [80, 85, 90]},
    {nama: "Delon", nilai: [60, 60, 60]},
    {nama: "Nita", nilai: [90, 90, 90]},
    {nama: "Adda", nilai: [75, 75, 75]},
    {nama: "Talis", nilai: [45, 45, 45]}
];

let inputNama = prompt("Masukkan Nama Anda (Asisten Lab):");

let checkNama = false;
let ketError = "";
let namaBenar = "";

if (inputNama === null || inputNama.trim() === "") {
    ketError = "Anda tidak memasukkan nama Asisten Lab";
} else {
    checkNama = true;
    namaBenar = inputNama.trim();
}

if (checkNama === false) {
    document.write(`
        <div class="max-w-3xl mx-auto mt-13 bg-white p-8 rounded-xl shadow-md border border-gray-200 ">
            <h1 class="text-3xl font-extrabold text-black mb-3"> Sistem Laporan Praktikum</h1>
            <p class="text-black text-base mb-6"> Evaluasi kelulusan berbasis JavaScript murni </p>

            <hr class="border-gray-400 mb-6">

            <div class="bg-red-100 border-l-4 border-red-600 p-4 rounded-lg">
                <p class="text-red-700 font-bold text-lg">AKSES DITOLAK.</p>
                <p class="text-red-700 text-base">${ketError} </p>
            </div>
        </div>
    `);
} else {
    let hasil = [];
    let kotak = "";

    for (let i = 0; i < data.length; i++) {
        let mhs = data[i];

        let total = 0;
        for (let j = 0; j < mhs.nilai.length; j++) {
            total += mhs.nilai[j];
        }
        
        let rata = total/mhs.nilai.length;

        let status = "";
        let warnaStatus = "";

        if (rata >= 75) {
            status = "Lulus";
            warnaStatus = "bg-green-100 text-green-700 border-l-4 border-green-600";
        } else {
            status = "Tidak Lulus";
            warnaStatus = "bg-red-100 text-red-700 border-l-4 border-red-600";
        }

        hasil.push ({
            nama: mhs.nama,
            rata: rata,
            status: status
        });

        kotak += `
            <div class="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex justify-between items-center">
                <div>
                    <h3 class="text-lg font-bold text-gray-800">${mhs.nama}</h3>
                    <p class="text-gray-500 text-sm">Rata-rata: ${rata}</p>
                </div>
                <div>
                    <span class="${warnaStatus} text-xs font-semibold px-3 py-2 rounded-full">
                        ${status}
                    </span>
                </div>
            </div>
        `;
    } 

    document.write(`
        <div class="max-w-3xl mx-auto mt-13 bg-white p-8 rounded-xl shadow-md border border-gray-200 ">
            <h1 class="text-3xl font-extrabold text-black mb-3"> Sistem Laporan Praktikum</h1>
            <p class="text-black text-base mb-6"> Evaluasi kelulusan berbasis JavaScript murni </p>

            <hr class="border-gray-400 mb-6">

            <div class="bg-blue-100 border-l-4 border-blue-600 p-4 rounded-lg my-5">
                <p class="text-blue-700 font-bold text-lg">Selamat Datang <span class="uppercase"> ${inputNama} </span></p>
                <p class="text-blue-700 text-base">Berikut adalah laporan hasil praktikum </p>
            </div>

            <div class="flex flex-col gap-5 my-6"> ${kotak} </div>
        </div>
    `);

    console.log("Hasil Evaluasi:");
    console.log(hasil);
}