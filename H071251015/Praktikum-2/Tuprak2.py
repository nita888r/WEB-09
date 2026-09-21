# Data
Barang = ( "buku","pensil", "pulpen")
Harga = [20000, 3000, 5000]
jumlah = [2, 5, 3]

# Hitung total harga masing-masing menggunakan indexing list dan operator aritmetika
total_buku = Harga[0]*jumlah[0]
total_pensil = Harga[1]*jumlah[1]
total_pulpen = Harga[2]*jumlah[2]

# Buat sebuah list berisi total harga semua barang
total_harga = [total_buku, total_pensil, total_pulpen]

# Hitung total belanja seluruh barang dengan menjumlahkan isi list tersebut
total_belanja = (total_harga[0] + total_harga[1] + total_harga[2])

# simpan hasilnya dalam sebuah dictionary
x = { 
    "buku" : total_buku, 
    "pensil" : total_pensil, 
    "pulpen" : total_pulpen,
    "total_belanja" : total_belanja
}

print (x)

# pengecekan

cek_1 = total_buku > total_pulpen
print (cek_1)

cek_2 = total_belanja > 50000
print (cek_2)

cek_3 = (jumlah[0] + jumlah[1] + jumlah[2]) > 5
print (cek_3)