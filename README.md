# Proyek UTS Pemrograman Web 

Aplikasi web toko buku online berbasis front-end murni (HTML5, CSS3, dan Vanilla JavaScript) yang dirancang khusus untuk memenuhi seluruh indikator penilaian dan spesifikasi tugas **Ujian Tengah Semester (UTS) Pemrograman Web 1**.

---
- Nama           : M.Ridwan Al Mahri
- NIM            : 312510157
- Kelas          : I251B
- Mata Kuliah    : Pemograman Web
## 📁 Struktur Folder Proyek
Sesuai dengan ketentuan struktur direktori yang diminta pada lembar soal tugas UTS:

```text
tugas-uts-web1/
|-- index.html              # Halaman Login utama
|-- login.html              # Alias / pengalih ke index.html
|-- dashboard.html          # Menu Dashboard utama dengan Greeting Waktu Lokal
|-- stok.html               # Informasi Stok & Katalog Buku (Manipulasi DOM)
|-- tracking.html           # Pelacakan Pengiriman (Simulasi Progress Bar & Timeline)
|-- checkout.html           # Halaman Pemesanan & Pembayaran (Keranjang Dinamis)
|-- css/
|   |-- style.css           # Lembar Gaya Eksternal (External CSS)
|-- js/
|   |-- script.js           # Logika DOM, Interaksi UI, & Validasi Form
|   |-- data.js             # Data Dummy Array JSON (Pengguna, Katalog, Tracking)
|-- assets/
|   |-- logo.png            # Logo resmi UT BookStore
|   |-- logo.svg            # Logo vektor scalable UT BookStore
|-- img/
    |-- kepemimpinan.jpg
    |-- manajemen_keuangan.jpg
    |-- mikrobiologi.jpg
    |-- paud_perkembangan.jpeg
    |-- paud_perkembangan.jpg
    |-- pengantar_komunikasi.jpg
```

---

## 🎯 Pemenuhan Indikator Penilaian Dosen

### 1. Struktur HTML yang Semantik dan Valid
- Menggunakan elemen HTML5 semantik: `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<aside>`, `<footer>`, `<figure>`, `<fieldset>`, `<legend>`, `<form>`, dan `<table>`.
- Struktur form rapi dengan atribut aksesibilitas (`aria-label`, `aria-modal`, `role="dialog"`, atribut `required`, tipe input `email`, `tel`, `password`, dan `number`).

### 2. Pengelolaan Gaya Antar Muka Menggunakan CSS (Inline, Internal, External)
Proyek ini mengintegrasikan ketiga jenis penulisan CSS secara lengkap:
- **External CSS (`css/style.css`)**: Mengatur tema warna (CSS Variables), reset global, tata letak grid & flexbox, komponen tombol, kartu, tabel bergaris, modal box, dan pop-up toast.
- **Internal CSS (`<style>` di `<head>`)**: Terdapat pada setiap halaman untuk memberikan gaya unik per halaman, seperti gradien banner, animasi `@keyframes`, dan penyesuaian khusus.
- **Inline CSS (`style="..."`)**: Diterapkan pada elemen dinamis, seperti lebar visual progress bar (`style="width: 75%"`), badge warna status, dan aksen khusus, dengan komentar penanda untuk memudahkan pemeriksaan dosen.

### 3. JavaScript DOM, Validasi Form, & Interaksi UI
- **Manipulasi DOM**:
  - Render tabel katalog buku secara dinamis dari `dataKatalogBuku` pada `data.js`.
  - Penambahan baris stok buku baru ke dalam tabel DOM secara real-time tanpa reload.
  - Perubahan kuantitas (+ / -), penambahan buku dari modal, dan penghapusan item pada tabel pemesanan `checkout.html`.
  - Perhitungan otomatis subtotal, ongkir berdasarkan paket ekspedisi, diskon belanja, dan total bayar.
- **Validasi Form & Alert Feedback**:
  - Pada login: Jika email atau password salah, muncul notifikasi pop-up alert: *"email/password yang anda masukkan salah"*.
  - Validasi form pendaftaran, tambah stok, dan kelengkapan checkout sebelum pemrosesan.
- **Interaksi UI (Modal Box, Pop-up, & Alert Box)**:
  - Modal Box Lupa Password & Pendaftaran Pengguna Baru di `index.html`.
  - Modal Box Tambah Stok Baru di `stok.html`.
  - Modal Box Konfirmasi Pemesanan & Tambah Item di `checkout.html`.
  - Sistem Animated Toast Pop-up dinamis (Success, Danger, Warning, Info).

---

## 👥 Akun Demo untuk Pengujian (dari `data.js`)

| Nama Pengguna | Email | Password | Role |
| :--- | :--- | :--- | :--- |
| **Rina Wulandari** | `rina@gmail.com` | `rina123` | User / Mahasiswa |
| **Agus Pranoto** | `agus@gmail.com` | `agus123` | User / Mahasiswa |
| **Siti Marlina** | `siti@gmail.com` | `siti123` | Admin Toko |

> *Tersedia tombol pintas (1-klik) pada halaman `index.html` untuk mempermudah pengisian akun uji coba.*

---

## 🚚 Nomor Delivery Order untuk Pelacakan (`tracking.html`)

- **`20230012`**: Pemesan *Rina Wulandari* (Ekspedisi: JNE, Status: *Dalam Perjalanan*, Progress: Hub Transit Tangerang Selatan ke Jakarta Selatan).
- **`20230013`**: Pemesan *Agus Pranoto* (Ekspedisi: Pos Indonesia, Status: *Selesai Antar*, Progress: Selesai Antar ke Cimahi).
- *Nomor DO baru otomatis dibuat setiap kali Anda menyelesaikan pemesanan pada `checkout.html`.*

---

## 🎬 Panduan Pembuatan Video Penjelasan (Maksimal 15 Menit)

Berikut susunan alur bicara yang sistematis untuk presentasi video penjelasan tugas:

1. **Pembukaan (1 Menit)**:
   - Perkenalan diri (Nama, NIM, Mata Kuliah Pemrograman Web 1).
   - Pengenalan proyek: Toko Buku Online Universitas Terbuka berbasis front-end Array JSON.
2. **Struktur File & Modularitas (1.5 Menit)**:
   - Tunjukkan struktur folder proyek: `index.html`, `dashboard.html`, `stok.html`, `checkout.html`, `tracking.html`, folder `css/`, `js/`, `assets/`, dan `img/`.
   - Jelaskan pemisahan data di `data.js` dan fungsi logika di `script.js`.
3. **Penerapan 3 Jenis CSS (2 Menit)**:
   - Tunjukkan file `css/style.css` (External CSS).
   - Tunjukkan blok `<style>` di tag `<head>` (Internal CSS).
   - Tunjukkan contoh atribut `style="..."` pada elemen HTML (Inline CSS).
4. **Demonstrasi Fitur Tiap Halaman (8 Menit)**:
   - **Halaman Login (`index.html`)**: Uji coba login salah untuk menampilkan pop-up alert error, lalu buka Modal Lupa Password dan Modal Daftar. Kemudian login menggunakan akun demo.
   - **Dashboard (`dashboard.html`)**: Tunjukkan greeting waktu lokal (pagi/siang/sore), jam real-time, ringkasan statistik, dan menu navigasi.
   - **Katalog Stok (`stok.html`)**: Tunjukkan render data dari `dataKatalogBuku`, fitur pencarian, beralih tampilan tabel/grid, dan tambahkan baris stok baru menggunakan modal.
   - **Pemesanan (`checkout.html`)**: Tunjukkan manipulasi kuantitas item, penambahan buku, pengisian form pemesan, perubahan biaya ongkos kirim, dan konfirmasi pemesanan.
   - **Tracking Pengiriman (`tracking.html`)**: Masukkan nomor DO `20230012` atau `20230013`, jelaskan simulasi progress bar status dan riwayat timeline perjalanan paket.
5. **Penutup & Kesimpulan (1.5 Menit)**:
   - Rangkuman bagaimana HTML semantik, CSS, dan JavaScript DOM berkolaborasi menghasilkan aplikasi web front-end yang interaktif dan responsif.
