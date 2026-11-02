/**
 * ====================================================================
 * DATA.JS - Basis Data Dummy Berbasis Objek / Array JSON
 * Proyek UTS Pemrograman Web 1 - Toko Buku Online Universitas Terbuka
 * ====================================================================
 */

// 1. Data Pengguna (Sesuai Spesifikasi Soal)
var dataPengguna = [
    {
        id: 1,
        nama: "Rina Wulandari",
        email: "rina@gmail.com",
        password: "rina123",
        role: "User",
    },
    {
        id: 2,
        nama: "Agus Pranoto",
        email: "agus@gmail.com",
        password: "agus123",
        role: "User",
    },
    {
        id: 3,
        nama: "Siti Marlina",
        email: "siti@gmail.com",
        password: "siti123",
        role: "Admin",
    }
];

// 2. Data Katalog Buku (Sesuai Spesifikasi Soal)
var dataKatalogBuku = [
    {
        kodeBarang: "ASIP4301",
        namaBarang: "Pengantar Ilmu Komunikasi",
        jenisBarang: "Buku Ajar",
        edisi: "2",
        stok: 548,
        harga: "Rp 180.000",
        cover: "img/pengantar_komunikasi.jpg"
    },
    {
        kodeBarang: "EKMA4002",
        namaBarang: "Manajemen Keuangan",
        jenisBarang: "Buku Ajar",
        edisi: "3",
        stok: 392,
        harga: "Rp 220.000",
        cover: "img/manajemen_keuangan.jpg"
    },
    {
        kodeBarang: "EKMA4310",
        namaBarang: "Kepemimpinan",
        jenisBarang: "Buku Ajar",
        edisi: "1",
        stok: 278,
        harga: "Rp 150.000",
        cover: "img/kepemimpinan.jpg"
    },
    {
        kodeBarang: "BIOL4211",
        namaBarang: "Mikrobiologi Dasar",
        jenisBarang: "Buku Ajar",
        edisi: "2",
        stok: 165,
        harga: "Rp 200.000",
        cover: "img/mikrobiologi.jpg"
    },
    {
        kodeBarang: "PAUD4401",
        namaBarang: "Perkembangan Anak Usia Dini",
        jenisBarang: "Buku Ajar",
        edisi: "4",
        stok: 204,
        harga: "Rp 250.000",
        cover: "img/paud_perkembangan.jpeg"
    }
];

// 3. Data Tracking Pengiriman (Sesuai Spesifikasi Soal)
var dataTracking = {
    "20230012": {
        nomorDO: "20230012",
        nama: "Rina Wulandari",
        status: "Dalam Perjalanan",
        ekspedisi: "JNE",
        tanggalKirim: "2025-08-25",
        paket: "0JKT01",
        total: "Rp 180.000",
        perjalanan: [
            {
                waktu: "2025-08-25 10:12:20",
                keterangan: "Penerimaan di Loket: TANGERANG SELATAN. Pengirim: Universitas Terbuka"
            },
            {
                waktu: "2025-08-25 14:07:56",
                keterangan: "Tiba di Hub: TANGERANG SELATAN"
            },
            {
                waktu: "2025-08-25 16:30:00",
                keterangan: "Diteruskan ke Kantor Jakarta Selatan"
            }
        ]
    },
    "20230013": {
        nomorDO: "20230013",
        nama: "Agus Pranoto",
        status: "Dikirim",
        ekspedisi: "Pos Indonesia",
        tanggalKirim: "2025-08-25",
        paket: "0UPBJJBDG",
        total: "Rp 220.000",
        perjalanan: [
            {
                waktu: "2025-08-25 10:12:20",
                keterangan: "Penerimaan di Loket: TANGERANG SELATAN. Pengirim: Universitas Terbuka"
            },
            {
                waktu: "2025-08-25 14:07:56",
                keterangan: "Tiba di Hub: TANGERANG SELATAN"
            },      
            {
                waktu: "2025-08-25 16:30:10",
                keterangan: "Diteruskan ke Kantor Kota Bandung"
            },
            {
                waktu: "2025-08-26 12:15:33",
                keterangan: "Tiba di Hub: Kota BANDUNG"
            },
            {
                waktu: "2025-08-26 15:06:12",
                keterangan: "Proses antar ke Cimahi"
            },
            {
                waktu: "2025-08-26 20:00:00",
                keterangan: "Selesai Antar. Penerima: Agus Pranoto"
            }
        ]
    }
};

// 4. Data Dummy Pemesanan Awal (Keranjang Belanja) untuk checkout.html
var dataPemesananAwal = [
    {
        kodeBarang: "ASIP4301",
        namaBarang: "Pengantar Ilmu Komunikasi",
        hargaSatuan: 180000,
        jumlah: 1,
        cover: "img/pengantar_komunikasi.jpg"
    },
    {
        kodeBarang: "EKMA4002",
        namaBarang: "Manajemen Keuangan",
        hargaSatuan: 220000,
        jumlah: 1,
        cover: "img/manajemen_keuangan.jpg"
    }
];

// 5. Data Dummy History Transaksi untuk dashboard.html
var dataHistoryTransaksiAwal = [
    {
        nomorDO: "20230012",
        tanggal: "2025-08-25",
        nama: "Rina Wulandari",
        total: "Rp 180.000",
        status: "Dalam Perjalanan",
        ekspedisi: "JNE",
        items: ["Pengantar Ilmu Komunikasi (1x)"]
    },
    {
        nomorDO: "20230013",
        tanggal: "2025-08-25",
        nama: "Agus Pranoto",
        total: "Rp 220.000",
        status: "Selesai Antar",
        ekspedisi: "Pos Indonesia",
        items: ["Manajemen Keuangan (1x)"]
    }
];

/**
 * Helper Fungsi Inisialisasi Sinkronisasi LocalStorage
 * Memastikan data tetap tersimpan saat pengguna menambah stok atau melakukan pemesanan
 */
(function inisialisasiDataStorage() {
    if (!localStorage.getItem("dataPengguna")) {
        localStorage.setItem("dataPengguna", JSON.stringify(dataPengguna));
    }
    if (!localStorage.getItem("dataKatalogBuku")) {
        localStorage.setItem("dataKatalogBuku", JSON.stringify(dataKatalogBuku));
    }
    if (!localStorage.getItem("dataTracking")) {
        localStorage.setItem("dataTracking", JSON.stringify(dataTracking));
    }
    if (!localStorage.getItem("dataPemesanan")) {
        localStorage.setItem("dataPemesanan", JSON.stringify(dataPemesananAwal));
    }
    if (!localStorage.getItem("dataHistoryTransaksi")) {
        localStorage.setItem("dataHistoryTransaksi", JSON.stringify(dataHistoryTransaksiAwal));
    }
})();

// Fungsi Helper untuk Mendapatkan Data Terkini dari LocalStorage
function getPenggunaList() {
    return JSON.parse(localStorage.getItem("dataPengguna")) || dataPengguna;
}

function getKatalogList() {
    return JSON.parse(localStorage.getItem("dataKatalogBuku")) || dataKatalogBuku;
}

function getTrackingData() {
    return JSON.parse(localStorage.getItem("dataTracking")) || dataTracking;
}

function getPemesananList() {
    return JSON.parse(localStorage.getItem("dataPemesanan")) || dataPemesananAwal;
}

function getHistoryList() {
    return JSON.parse(localStorage.getItem("dataHistoryTransaksi")) || dataHistoryTransaksiAwal;
}
