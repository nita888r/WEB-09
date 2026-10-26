# Kedai Kopi Senja

Halaman pemesanan mandiri untuk Kedai Kopi Senja (React + Vite + Tailwind CSS v3).

## Menjalankan
```bash
npm install
npm run dev
```

## Struktur state
- `App.jsx`: `kategoriAktif` dan `pesanan` (satu sumber data; total item & harga dihitung dari `pesanan`).
- `MenuCard.jsx`: `detailTerbuka` (per kartu).
- `FormPesan.jsx`: `nama`, `meja`, `daftarError`, `terkirim`.
