# 🎙️ NASKAH LENGKAP PRESENTASI VIDEO UTS PEMROGRAMAN WEB 1
**Judul Proyek:** Aplikasi Web Toko Buku Online Universitas Terbuka (Front-End)  
**Mata Kuliah:** Pemrograman Web 1  
**Target Durasi:** 10 – 14 Menit (Maksimal 15 Menit)  
**Platform:** Video YouTube (Pengumpulan Tugas UTS)

---

## 💡 PANDUAN REKAMAN CEPAT UNTUK ANDA
1. **Peralatan yang digunakan:** Gunakan software perekam layar seperti **OBS Studio**, **Camtasia**, atau fitur bawaan Windows (**Windows Key + G** / Snipping Tool Screen Record).
2. **Kondisi Tampilan:** Siapkan browser (Google Chrome / Edge) dengan tab: `index.html`, serta buka **VS Code** untuk menunjukkan struktur kodingan saat menjelaskan CSS dan JavaScript.
3. **Tips Intonasi:**
   - Bagian **[AKSI LAYAR]** = Apa yang harus Anda klik / tunjukkan di layar.
   - Bagian **"..."** = Kata-kata yang Anda ucapkan (bicara dengan santai, percaya diri, dan artikulasi jelas).

---

## ⏱️ RUNDOWN WAKTU & SISTEMATIKA VIDEO

| Menit | Bagian Presentasi | Fokus Penjelasan |
| :---: | :--- | :--- |
| **00:00 - 01:30** | **Bagian 1: Pembukaan & Identitas** | Salam, perkenalan diri, NIM, mata kuliah, pengenalan tema toko buku online |
| **01:30 - 03:30** | **Bagian 2: Sistematika & Struktur File** | Menunjukkan struktur folder modular dan penjelasan data array JSON pada `data.js` |
| **03:30 - 05:00** | **Bagian 3: Pembuktian 3 Jenis CSS** | Menunjukkan implementasi External, Internal, dan Inline CSS pada kode |
| **05:00 - 07:00** | **Bagian 4: Demo Halaman Login** | Form validation, feedback alert box/toast saat salah, Modal Lupa Password & Daftar |
| **07:00 - 08:30** | **Bagian 5: Demo Dashboard Menu** | Logika greeting waktu lokal (pagi/siang/sore), live clock, 4 tombol navigasi |
| **08:30 - 10:30** | **Bagian 6: Demo Informasi Stok/Katalog** | Render data dinamis, manipulasi DOM tambah stok baru, filter cari, switch galeri |
| **10:30 - 12:30** | **Bagian 7: Demo Halaman Pemesanan** | Ubah data pesanan (+/-), tambah buku, form pemesan & ekspedisi, generate nomor DO |
| **12:30 - 14:00** | **Bagian 8: Demo Tracking Pengiriman** | Pelacakan DO, simulasi progress bar visual, detail paket, dan timeline riwayat |
| **14:00 - 15:00** | **Bagian 9: Kesimpulan & Penutup** | Ringkasan pencapaian 3 indikator dan salam penutup |

---

# 📜 NASKAH KATA DEMI KATA (SPOKEN SCRIPT)

---

### 🎬 BAGIAN 1: PEMBUKAAN & IDENTITAS DIRI (00:00 – 01:30)

**[AKSI LAYAR]:**  
*Tampilkan layar browser pada halaman `index.html` dengan kamera webcam Anda di pojok (opsional), atau tampilkan slide pembuka/cover.*

**🎙️ NARASI / APA YANG DIUCAPKAN:**
> *"Assalamu’alaikum Warahmatullahi Wabarakatuh,*  
> *Selamat pagi/siang/sore kepada Bapak/Ibu Dosen Pengampu Mata Kuliah Pemrograman Web 1, serta rekan-rekan sekalian.*
>
> *Perkenalkan, nama saya **[Sebutkan Nama Anda Lengkap]**, dengan NIM **[Sebutkan NIM Anda]**, dari Program Studi **[Sebutkan Program Studi Anda]**.*
>
> *Pada kesempatan kali ini, saya akan mempresentasikan hasil pengerjaan proyek Ujian Tengah Semester (UTS) Pemrograman Web 1, yaitu pembuatan aplikasi front-end sederhana untuk **Pemesanan Buku pada Toko Buku Online Universitas Terbuka**.*
>
> *Aplikasi ini dibangun menggunakan tiga pilar utama web front-end, yaitu **HTML5 Semantik**, **CSS3** dengan penerapan External, Internal, dan Inline CSS, serta **Vanilla JavaScript** untuk manipulasi Document Object Model (DOM), validasi formulir, interaksi UI pop-up, alert box, dan modal dialog.*
>
> *Sesuai dengan ketentuan tugas, aplikasi ini tidak mengambil data dari database server, melainkan berfokus penuh pada front-end dengan memanfaatkan variabel data terpisah berupa array JSON pada file `data.js`."*

---

### 🎬 BAGIAN 2: ALUR BERPIKIR & STRUKTUR FOLDER MODULAR (01:30 – 03:30)

**[AKSI LAYAR]:**  
*Buka VS Code atau File Explorer, perlihatkan struktur pohon folder `tugas-uts-web1`.*

**🎙️ NARASI / APA YANG DIUCAPKAN:**
> *"Sebelum kita masuk ke demonstrasi fitur, mari kita lihat terlebih dahulu struktur folder dan modularitas file proyek ini.*
>
> *Sesuai dengan petunjuk lembar soal UTS, struktur direktori dibuat rapi dan modular:*
> 1. *Pada direktori utama, terdapat 5 halaman HTML wajib: `index.html` sebagai halaman login, `dashboard.html`, `stok.html`, `checkout.html`, dan `tracking.html`.*
> 2. *Terdapat folder `css/` yang berisi file `style.css` untuk manajemen tata letak global.*
> 3. *Folder `js/` dipisahkan menjadi dua: `data.js` yang khusus menampung basis data dummy objek JSON, dan `script.js` yang menangani seluruh logika interaksi DOM dan validasi form.*
> 4. *Folder `img/` yang memuat gambar-gambar sampul buku ajar yang telah disediakan.*
> 5. *Serta folder `assets/` yang memuat aset logo aplikasi.*
>
> *Sekarang mari kita lihat file `js/data.js`.* **[Buka file data.js di VS Code]**
> *Di sini terdapat tiga variabel utama sesuai spesifikasi soal:*
> - *Pertama, variabel `dataPengguna` yang berisi array akun pengguna seperti Rina Wulandari, Agus Pranoto, dan Siti Marlina sebagai Admin.*
> - *Kedua, variabel `dataKatalogBuku` yang memuat daftar buku ajar UT lengkap dengan kode barang, judul, kategori, edisi, stok, harga, dan tautan gambar.*
> - *Dan ketiga, objek `dataTracking` yang berisi riwayat pelacakan pesanan berbasis Nomor Delivery Order seperti `20230012` dan `20230013`."*

---

### 🎬 BAGIAN 3: INDIKATOR 2 – PENGELOLAAN 3 JENIS CSS (03:30 – 05:00)

**[AKSI LAYAR]:**  
*Di VS Code, tunjukkan file `css/style.css`, lalu buka salah satu file HTML seperti `index.html` atau `tracking.html`.*

**🎙️ NARASI / APA YANG DIUCAPKAN:**
> *"Selanjutnya, saya ingin menunjukkan pemenuhan indikator penilaian kedua, yaitu pengelolaan gaya antarmuka menggunakan **tiga jenis CSS**: External, Internal, dan Inline.*
>
> *1. **External CSS**: Diimplementasikan pada file `css/style.css`. Di sini saya menggunakan CSS Variables untuk konsistensi palet warna bertema Universitas Terbuka, perataan layout menggunakan Flexbox dan CSS Grid, desain kartu responsif, hingga styling tabel dan modal dialog.*
>
> *2. **Internal CSS**: Diimplementasikan melalui blok tag `<style>` di bagian `<head>` pada setiap file HTML.* **[Tunjukkan tag `<style>` di index.html]**  
> *Sebagai contoh, pada `index.html`, internal CSS digunakan untuk animasi fade-in kartu login dan radial gradient background.*
>
> *3. **Inline CSS**: Diterapkan langsung pada atribut `style="..."` pada elemen HTML tertentu.* **[Tunjukkan contoh inline CSS di tracking.html pada baris progress bar]**  
> *Contoh nyatanya dapat kita lihat pada file `tracking.html`, di mana persentase lebar progress bar dan badge warna diatur secara dinamis melalui inline CSS, lengkap dengan komentar penanda agar mempermudah pemeriksaan."*

---

### 🎬 BAGIAN 4: DEMO HALAMAN 1 – LOGIN (05:00 – 07:00)

**[AKSI LAYAR]:**  
*Buka browser pada halaman `index.html`.*

**🎙️ NARASI / APA YANG DIUCAPKAN:**
> *"Sekarang mari kita uji coba halaman pertama, yaitu **Halaman Login (`index.html`)**.*
>
> *Di sini terdapat input email, password, tombol Login, serta tautan Lupa Password dan Registrasi.*
>
> *Sesuai kriteria soal: jika email atau password salah atau tidak sesuai, sistem wajib memunculkan pop-up atau alert bahwa **'email/password yang anda masukkan salah'**.*
>
> *Mari kita simulasikan login yang salah.* **[Ketik email sembarang misal: `test@salah.com`, password: `12345`, lalu klik 'Masuk Sekarang']**
>
> *Dapat kita lihat, sistem secara otomatis memunculkan **Toast Pop-up Alert** di pojok kanan atas sekaligus alert box berwarna merah dengan pesan: 'email/password yang anda masukkan salah'. Ini membuktikan validasi form dan feedback error berfungsi 100%.*
>
> *Selanjutnya, sesuai soal, terdapat tombol **Lupa Password** dan **Daftar** yang dimunculkan dalam bentuk modal box.*  
> **[Klik tombol 'Lupa Password?']**  
> *Ketika diklik, muncul modal dialog pop-up yang interaktif tanpa berpindah halaman. Kita dapat menutupnya menggunakan tombol silang, tombol batal, maupun tombol Escape pada keyboard.*
>
> **[Klik tombol 'Daftar di sini']**  
> *Begitu juga dengan tombol Daftar, sistem membuka Modal Registrasi Akun Baru yang memvalidasi kesesuaian password dan menyimpan data pendaftar baru.*
>
> *Sekarang mari kita login menggunakan akun yang valid dari `data.js`.* **[Klik quick-pill 'Rina (User)' atau ketik rina@gmail.com / rina123, lalu klik 'Masuk Sekarang']**  
> *Muncul alert sukses 'Login Berhasil', dan sistem langsung mengarahkan kita ke halaman Dashboard."*

---

### 🎬 BAGIAN 5: DEMO HALAMAN 2 – DASHBOARD MENU (07:00 – 08:30)

**[AKSI LAYAR]:**  
*Layar berpindah ke `dashboard.html`.*

**🎙️ NARASI / APA YANG DIUCAPKAN:**
> *"Kita sekarang berada di halaman kedua, yaitu **Dashboard Menu (`dashboard.html`)**.*
>
> *Sesuai kriteria soal nomor 2, halaman ini memiliki fitur utama:*
> 1. *Menampilkan ucapan **'greeting' berdasarkan waktu local time** pengguna. Karena saat ini saya merekam di waktu **[Sebutkan: pagi/siang/sore]**, sistem otomatis menampilkan ucapan **'[Selamat Siang, Rina Wulandari!]'** lengkap dengan icon dan tanggal serta jam real-time yang terus berdetik.*
> 2. *Menu utama navigasi yang terdiri dari 4 modul:*
>    - *Informasi Stok/Katalog*
>    - *Tracking Pengiriman*
>    - *Laporan Pemesanan*
>    - *Dan History Transaksi.*
>
> *Sebagai kreativitas tambahan, di bawah banner saya tambahkan kartu ringkasan statistik stok buku fisik dan pengiriman aktif, serta tabel **History Transaksi** yang menampilkan data riwayat pemesanan yang tercatat."*

---

### 🎬 BAGIAN 6: DEMO HALAMAN 3 – INFORMASI STOK & KATALOG (08:30 – 10:30)

**[AKSI LAYAR]:**  
*Klik menu 'Informasi Stok' untuk membuka `stok.html`.*

**🎙️ NARASI / APA YANG DIUCAPKAN:**
> *"Sekarang kita menuju halaman ketiga, yaitu **Informasi Stok/Katalog (`stok.html`)**.*
>
> *Halaman ini memenuhi dua kriteria utama soal:*
> *Pertama, **menampilkan data katalog buku secara dinamis** yang dibaca dari variabel konstanta `dataKatalogBuku` pada `data.js`. Kita bisa melihat ada 5 buku ajar awal, mulai dari Pengantar Ilmu Komunikasi, Manajemen Keuangan, Kepemimpinan, Mikrobiologi Dasar, hingga Perkembangan Anak Usia Dini, lengkap dengan gambar sampul resminya.*
>
> *Kedua, **fitur untuk menambahkan baris stok baru menggunakan JavaScript DOM**.*  
> **[Klik tombol '➕ Tambah Stok Buku Baru']**  
> *Kita buka formulir modal tambah stok, lalu masukkan data buku baru:*  
> **[Isi data sambil sebutkan]:**  
> - *Kode Barang: `ISIP4212`*  
> - *Nama Barang: `Pengantar Ilmu Politik`*  
> - *Kategori: `Buku Ajar`*  
> - *Edisi: `1`*  
> - *Stok: `300`*  
> - *Harga: `175000`*  
> - *Lalu kita klik **'Simpan ke Tabel DOM'**.*
>
> *Perhatikan di layar: tanpa melakukan reload atau refresh halaman sama sekali, baris buku baru berhasil dimasukkan ke baris teratas tabel katalog melalui manipulasi DOM! Muncul notifikasi toast pop-up sukses, dan data stok juga tersimpan ke localStorage browser.*
>
> *Selain itu, terdapat fitur kreativitas tambahan:*  
> **[Ketik kata 'keuangan' di search bar]**  
> *Terdapat filter pencarian real-time yang memfilter baris tabel secara otomatis.*  
> **[Klik tombol 'Galeri Cover']**  
> *Serta tombol switch untuk melihat katalog dalam bentuk galeri kartu buku."*

---

### 🎬 BAGIAN 7: DEMO HALAMAN 4 – CHECKOUT & PEMESANAN (10:30 – 12:30)

**[AKSI LAYAR]:**  
*Klik menu 'Pemesanan' untuk membuka `checkout.html`.*

**🎙️ NARASI / APA YANG DIUCAPKAN:**
> *"Kita lanjut ke halaman keempat, yaitu **Halaman Pemesanan (`checkout.html`)**.*
>
> *Halaman ini memenuhi kriteria nomor 4 pada soal:*
> 1. ***Menampilkan data pemesanan yang dapat ditambah atau diubah:***  
>    *Pada tabel item pesanan, kita bisa melihat buku yang sedang dipesan.*  
>    **[Klik tombol '+' pada jumlah buku]**  
>    *Ketika tombol plus atau minus diklik, kuantitas berubah dan subtotal langsung dihitung ulang seketika oleh JavaScript DOM.*  
>    **[Klik 'Tambah Buku dari Katalog', pilih buku, lalu klik tambahkan]**  
>    *Kita juga dapat menambah varian buku lain langsung dari katalog ke keranjang belanja.*
>
> 2. ***Terdapat isian data informasi pemesan dan pembayaran:***  
>    *Di bawah tabel, terdapat formulir semantik lengkap:*
>    - *Data pemesan: Nama, WhatsApp, Email, dan Alamat Pengiriman.*
>    - *Opsi ekspedisi: seperti JNE, Pos Indonesia, SiCepat, dan jenis paket pengiriman. Jika kita memilih paket Express, biaya ongkos kirim pada kartu ringkasan di samping kanan akan otomatis menyesuaikan.*
>    - *Serta pilihan metode pembayaran mulai dari Virtual Account BCA, Mandiri, BRI, QRIS, hingga COD.*
>
> *Sekarang mari kita selesaikan pemesanan.* **[Isi data alamat dan klik 'Konfirmasi & Proses Pemesanan Sekarang']**  
> *Sistem menampilkan Modal Konfirmasi Sukses Pemesanan, dan secara cerdas membuat **Nomor Delivery Order (DO) baru** secara otomatis! Kita bisa langsung melacaknya dengan menekan tombol **'Lacak Status DO Sekarang'**."*

---

### 🎬 BAGIAN 8: DEMO HALAMAN 5 – TRACKING PENGIRIMAN (12:30 – 14:00)

**[AKSI LAYAR]:**  
*Layar berpindah ke `tracking.html`.*

**🎙️ NARASI / APA YANG DIUCAPKAN:**
> *"Halaman terakhir adalah **Informasi Pengiriman (`tracking.html`)** yang memenuhi kriteria soal nomor 5.*
>
> *Di sini terdapat kolom input Nomor Delivery Order dan tombol **'Cari'**.*
>
> *Mari kita uji salah satu nomor DO yang ada pada file `data.js`, misalnya nomor **`20230012`**.*  
> **[Klik tombol rekomendasi `20230012` atau ketik di input lalu klik 'Cari']**
>
> *Ketika tombol Cari ditekan, JavaScript langsung mencari data pada objek `dataTracking` dan menampilkan:*
> - *Nama Pemesan: Rina Wulandari.*
> - *Detail ekspedisi: JNE, tanggal kirim, jenis paket, dan total pembayaran.*
> - *Status Pengiriman yang disimulasikan secara visual dengan **Progress Bar Stepper bertahap** dan badge warna. Di sini statusnya 'Dalam Perjalanan', sehingga progress bar aktif hingga tahap Hub Transit.*
> - *Serta daftar riwayat **Timeline Perjalanan paket** dari loket asal Tangerang Selatan hingga perjalanan ke Jakarta Selatan.*
>
> *Sekarang mari kita coba nomor DO kedua, yaitu **`20230013`** atas nama Agus Pranoto.*  
> **[Ketik `20230013` lalu klik Cari]**  
> *Dapat kita lihat, statusnya adalah **'Selesai Antar (Terkirim)'**, progress bar menjadi penuh 100% berwarna hijau, dan riwayat timeline menampilkan paket telah berhasil diterima penerima di Cimahi.*
>
> *Jika pengguna memasukkan nomor DO yang tidak ada:* **[Ketik nomor sembarang misal: `99999999` lalu klik Cari]**  
> *Sistem memberikan feedback error state yang informatif dan ramah pengguna bahwa nomor DO tidak ditemukan."*

---

### 🎬 BAGIAN 9: KESIMPULAN & PENUTUP (14:00 – 15:00)

**[AKSI LAYAR]:**  
*Kembali ke halaman `dashboard.html` atau tampilkan slide penutup/kamera webcam.*

**🎙️ NARASI / APA YANG DIUCAPKAN:**
> *"Sebagai kesimpulan, seluruh indikator dan spesifikasi tugas UTS Pemrograman Web 1 ini telah berhasil dipenuhi dengan baik:*
> 1. *Struktur HTML telah dirancang secara valid dan semantik menggunakan standar HTML5.*
> 2. *Gaya antarmuka telah dikelola secara komprehensif menggunakan kombinasi External CSS, Internal CSS, dan Inline CSS.*
> 3. *JavaScript berhasil digunakan untuk manipulasi DOM, validasi formulir berlapis, manipulasi tabel dinamis, serta interaksi UI modern seperti modal box, alert box, dan toast pop-up.*
> 4. *Seluruh data dummy tersimpan secara terstruktur dalam format array JSON pada file `data.js`.*
>
> *Demikian presentasi penjelasan proyek aplikasi web Toko Buku Online Universitas Terbuka ini.*  
> *Saya mengucapkan terima kasih yang sebesar-besarnya kepada Bapak/Ibu Dosen atas ilmu dan bimbingan yang telah diberikan selama perkuliahan Pemrograman Web 1 ini.*  
> *Mohon maaf apabila terdapat kekurangan dalam penyampaian. Terima kasih atas perhatiannya.*
>
> *Wabillahi taufiq wal hidayah,*  
> *Wassalamu’alaikum Warahmatullahi Wabarakatuh."*

---

# 📋 CHECKLIST PERSIAPAN SEBELUM REKAMAN
- [ ] Masukkan Nama dan NIM Anda pada Bagian 1 dan Slide/Penutup.
- [ ] Buka file `c:/New folder/index.html` di browser (Chrome / Edge).
- [ ] Buka VS Code pada folder `c:/New folder/` untuk sesi kilas kode CSS & `data.js`.
- [ ] Atur mikrofon agar suara terdengar jernih tanpa kebisingan (*noise*).
- [ ] Pastikan durasi rekaman berada di kisaran **11 hingga 14 menit** (tidak melebihi batas 15 menit).
- [ ] Setelah rekaman selesai, upload video ke YouTube (setel ke mode *Public* atau *Unlisted*), lalu salin link URL video ke form pengumpulan tugas UTS: `https://forms.gle/v33d2KMpFakDV2RMA`.
