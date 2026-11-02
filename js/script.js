/**
 * ====================================================================
 * SCRIPT.JS - Logika Interaksi UI, Validasi Form, & Manipulasi DOM
 * Proyek UTS Pemrograman Web 1 - Toko Buku Online Universitas Terbuka
 * ====================================================================
 * Sesuai Indikator Penilaian 3: "JavaScript untuk manipulasi DOM, validasi
 * form, manipulasi data tabel, dan interaksi UI seperti pop-up, modal box,
 * dan alert box".
 */

// ====================================================================
// 1. UTILITAS GLOBAL & NOTIFIKASI (TOAST & MODAL)
// ====================================================================

/**
 * Menampilkan notifikasi Toast Pop-up dinamis di pojok kanan atas
 * @param {string} title - Judul notifikasi
 * @param {string} message - Pesan notifikasi
 * @param {'success'|'danger'|'warning'|'info'} type - Tipe notifikasi
 * @param {number} duration - Durasi tampil dalam milidetik (default 3500)
 */
function showToast(title, message, type = 'info', duration = 3500) {
    let container = document.getElementById('toastContainer');
    if (!container) {
        container = document.createElement('div');
        container.id = 'toastContainer';
        container.className = 'toast-container';
        document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;

    const iconMap = {
        success: '✓',
        danger: '✕',
        warning: '⚠',
        info: 'ℹ'
    };

    toast.innerHTML = `
        <div class="toast-icon">${iconMap[type] || 'ℹ'}</div>
        <div class="toast-content">
            <div class="toast-title">${title}</div>
            <div class="toast-message">${message}</div>
        </div>
        <button type="button" class="toast-close" aria-label="Tutup">&times;</button>
    `;

    // Tombol close manual
    toast.querySelector('.toast-close').addEventListener('click', () => {
        toast.remove();
    });

    container.appendChild(toast);

    // Auto remove setelah duration
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(100%)';
        setTimeout(() => toast.remove(), 300);
    }, duration);
}

/**
 * Membuka Modal Box berdasarkan ID
 * @param {string} modalId 
 */
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Kunci scroll background
    }
}

/**
 * Menutup Modal Box berdasarkan ID
 * @param {string} modalId 
 */
function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = ''; // Pulihkan scroll
    }
}

// Inisialisasi event listener untuk semua modal (klik backdrop atau tombol close)
document.addEventListener('DOMContentLoaded', () => {
    // Tombol penutup modal dengan data-close-modal
    document.querySelectorAll('[data-close-modal]').forEach(button => {
        button.addEventListener('click', (e) => {
            const targetId = button.getAttribute('data-close-modal');
            if (targetId) {
                closeModal(targetId);
            } else {
                const parentModal = button.closest('.modal-overlay');
                if (parentModal) parentModal.classList.remove('active');
            }
        });
    });

    // Menutup modal jika klik pada latar belakang overlay
    document.querySelectorAll('.modal-overlay').forEach(overlay => {
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                overlay.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    });

    // Menutup modal dengan tombol Escape keyboard
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            document.querySelectorAll('.modal-overlay.active').forEach(m => {
                m.classList.remove('active');
            });
            document.body.style.overflow = '';
        }
    });

    // Inisialisasi status user di header
    updateHeaderUserPill();
});

/**
 * Mengelola Session Pengguna yang Login
 */
function getCurrentUser() {
    const userStr = sessionStorage.getItem('currentUser') || localStorage.getItem('currentUser');
    if (userStr) {
        try {
            return JSON.parse(userStr);
        } catch (e) {
            return null;
        }
    }
    return null;
}

function setCurrentUser(user) {
    sessionStorage.setItem('currentUser', JSON.stringify(user));
    localStorage.setItem('currentUser', JSON.stringify(user));
}

function logoutUser() {
    sessionStorage.removeItem('currentUser');
    localStorage.removeItem('currentUser');
    showToast('Logout Berhasil', 'Anda telah keluar dari sistem.', 'info');
    setTimeout(() => {
        window.location.href = 'index.html';
    }, 800);
}

function updateHeaderUserPill() {
    const userContainer = document.getElementById('headerUserPill');
    if (!userContainer) return;

    const user = getCurrentUser();
    if (user) {
        userContainer.innerHTML = `
            <div class="user-pill">
                <span class="user-avatar">${user.nama.charAt(0).toUpperCase()}</span>
                <span>${user.nama} <small style="color:var(--accent-gold); font-weight:bold;">(${user.role})</small></span>
            </div>
            <button class="btn btn-outline btn-sm" onclick="logoutUser()" title="Keluar">
                🚪 Keluar
            </button>
        `;
    } else {
        userContainer.innerHTML = `
            <a href="index.html" class="btn btn-primary btn-sm">
                🔐 Masuk
            </a>
        `;
    }
}

/**
 * Format angka ke format mata uang Rupiah
 * @param {number|string} angka 
 * @returns {string} Contoh: "Rp 180.000"
 */
function formatRupiah(angka) {
    if (typeof angka === 'string') {
        angka = parseInt(angka.replace(/[^0-9]/g, '')) || 0;
    }
    return 'Rp ' + angka.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

function parseRupiah(str) {
    if (typeof str === 'number') return str;
    return parseInt(str.replace(/[^0-9]/g, '')) || 0;
}


// ====================================================================
// 2. HALAMAN LOGIN (index.html / login.html)
// ====================================================================

function initLoginPage() {
    const loginForm = document.getElementById('loginForm');
    if (!loginForm) return;

    loginForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const emailInput = document.getElementById('loginEmail');
        const passwordInput = document.getElementById('loginPassword');
        const alertBox = document.getElementById('loginAlertBox');

        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();

        // Validasi Kelengkapan Input
        if (!email || !password) {
            showToast('Form Tidak Lengkap', 'Silakan masukkan email dan password.', 'warning');
            if (alertBox) {
                alertBox.className = 'alert-box alert-warning';
                alertBox.style.display = 'flex';
                alertBox.textContent = 'Email dan password tidak boleh kosong.';
            }
            return;
        }

        // Ambil daftar pengguna dari data.js (atau localStorage)
        const daftarPengguna = getPenggunaList();
        const matchedUser = daftarPengguna.find(u => u.email.toLowerCase() === email.toLowerCase() && u.password === password);

        if (matchedUser) {
            // Berhasil login
            setCurrentUser(matchedUser);

            if (alertBox) {
                alertBox.className = 'alert-box alert-success';
                alertBox.style.display = 'flex';
                alertBox.textContent = `Selamat datang, ${matchedUser.nama}! Mengalihkan ke dashboard...`;
            }

            showToast('Login Berhasil!', `Selamat datang, ${matchedUser.nama}`, 'success');

            setTimeout(() => {
                window.location.href = 'dashboard.html';
            }, 1000);

        } else {
            // Gagal login - Sesuai kriteria soal:
            // "Jika salah atau tidak sesuai, munculkan pop-up/alert yang berisi bahwa 'email/password yang anda masukkan salah'"
            const pesanError = "email/password yang anda masukkan salah";

            // 1. Tampilkan Pop-up / Toast Alert
            showToast('Gagal Masuk', pesanError, 'danger', 4000);

            // 2. Tampilkan Alert Box di halaman login
            if (alertBox) {
                alertBox.className = 'alert-box alert-danger';
                alertBox.style.display = 'flex';
                alertBox.textContent = pesanError;
            }

            // Beri visual error pada input
            emailInput.classList.add('is-invalid');
            passwordInput.classList.add('is-invalid');
        }
    });

    // Form Lupa Password
    const lupaPasswordForm = document.getElementById('lupaPasswordForm');
    if (lupaPasswordForm) {
        lupaPasswordForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const email = document.getElementById('resetEmail').value.trim();
            const daftar = getPenggunaList();
            const user = daftar.find(u => u.email.toLowerCase() === email.toLowerCase());

            if (user) {
                showToast('Reset Terkirim', `Password untuk ${user.nama} adalah: "${user.password}" (Simulasi Email)`, 'success', 6000);
                closeModal('modalLupaPassword');
                lupaPasswordForm.reset();
            } else {
                showToast('Email Tidak Terdaftar', 'Email tidak ditemukan di sistem database dummy.', 'danger');
            }
        });
    }

    // Form Pendaftaran Pengguna Baru
    const daftarForm = document.getElementById('daftarForm');
    if (daftarForm) {
        daftarForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const nama = document.getElementById('regNama').value.trim();
            const email = document.getElementById('regEmail').value.trim();
            const password = document.getElementById('regPassword').value;
            const konfirmasi = document.getElementById('regKonfirmasiPassword').value;
            const role = document.getElementById('regRole') ? document.getElementById('regRole').value : 'User';

            if (!nama || !email || !password || !konfirmasi) {
                showToast('Form Belum Lengkap', 'Semua kolom wajib diisi.', 'warning');
                return;
            }

            if (password !== konfirmasi) {
                showToast('Password Tidak Cocok', 'Konfirmasi password harus sama dengan password.', 'danger');
                return;
            }

            const daftar = getPenggunaList();
            if (daftar.some(u => u.email.toLowerCase() === email.toLowerCase())) {
                showToast('Email Sudah Ada', 'Email ini sudah terdaftar. Silakan login atau gunakan email lain.', 'warning');
                return;
            }

            // Tambahkan user baru ke dataPengguna
            const newUser = {
                id: daftar.length + 1,
                nama: nama,
                email: email,
                password: password,
                role: role
            };

            daftar.push(newUser);
            localStorage.setItem('dataPengguna', JSON.stringify(daftar));

            showToast('Registrasi Berhasil!', `Akun ${nama} berhasil dibuat. Silakan login.`, 'success', 4000);
            closeModal('modalDaftar');
            daftarForm.reset();

            // Isi otomatis form login untuk kenyamanan
            document.getElementById('loginEmail').value = email;
            document.getElementById('loginPassword').value = password;
        });
    }
}

/**
 * Fungsi bantu 1-klik untuk dosen/penguji mencoba akun demo
 */
function fillDemoAccount(email, password) {
    const emailInput = document.getElementById('loginEmail');
    const passInput = document.getElementById('loginPassword');
    if (emailInput && passInput) {
        emailInput.value = email;
        passInput.value = password;
        emailInput.classList.remove('is-invalid');
        passInput.classList.remove('is-invalid');
        showToast('Akun Terpilih', `Memilih akun: ${email}`, 'info', 2000);
    }
}


// ====================================================================
// 3. HALAMAN DASHBOARD (dashboard.html)
// ====================================================================

function initDashboardPage() {
    // 1. Tampilkan Greeting Berdasarkan Local Time (Pagi / Siang / Sore / Malam)
    updateLocalGreeting();

    // 2. Tampilkan Statistik Ringkasan
    renderDashboardStats();

    // 3. Tampilkan Riwayat Transaksi Terkini
    renderDashboardHistory();
}

/**
 * Menghitung dan menampilkan ucapan salam berdasarkan waktu lokal (pagi/siang/sore/malam)
 */
function updateLocalGreeting() {
    const greetingEl = document.getElementById('dashboardGreeting');
    const clockEl = document.getElementById('dashboardLiveClock');
    const now = new Date();
    const jam = now.getHours();

    let ucapan = "Selamat Pagi";
    let icon = "🌅";

    if (jam >= 4 && jam < 11) {
        ucapan = "Selamat Pagi";
        icon = "🌅";
    } else if (jam >= 11 && jam < 15) {
        ucapan = "Selamat Siang";
        icon = "☀️";
    } else if (jam >= 15 && jam < 18) {
        ucapan = "Selamat Sore";
        icon = "🌇";
    } else {
        ucapan = "Selamat Malam";
        icon = "🌙";
    }

    const user = getCurrentUser();
    const namaUser = user ? user.nama : "Mahasiswa/Civitas UT";

    if (greetingEl) {
        greetingEl.innerHTML = `<span>${icon} ${ucapan}, <strong>${namaUser}</strong>!</span>`;
    }

    if (clockEl) {
        const opsiTanggal = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        const tanggalStr = now.toLocaleDateString('id-ID', opsiTanggal);
        const waktuStr = now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
        clockEl.textContent = `📅 ${tanggalStr} • ⏰ ${waktuStr} WIB`;
    }
}

/**
 * Menampilkan ringkasan data statistik di dashboard
 */
function renderDashboardStats() {
    const katalog = getKatalogList();
    const tracking = getTrackingData();
    const history = getHistoryList();

    const totalBukuEl = document.getElementById('statTotalBuku');
    const totalStokEl = document.getElementById('statTotalStok');
    const totalPengirimanEl = document.getElementById('statTotalPengiriman');
    const totalTransaksiEl = document.getElementById('statTotalTransaksi');

    if (totalBukuEl) totalBukuEl.textContent = katalog.length;
    
    if (totalStokEl) {
        const totalUnit = katalog.reduce((acc, item) => acc + (parseInt(item.stok) || 0), 0);
        totalStokEl.textContent = totalUnit.toLocaleString('id-ID');
    }

    if (totalPengirimanEl) {
        const aktif = Object.values(tracking).filter(t => t.status !== 'Selesai Antar').length;
        totalPengirimanEl.textContent = aktif;
    }

    if (totalTransaksiEl) {
        totalTransaksiEl.textContent = history.length;
    }
}

/**
 * Menampilkan tabel riwayat transaksi pada dashboard
 */
function renderDashboardHistory() {
    const tableBody = document.getElementById('dashboardHistoryTableBody');
    if (!tableBody) return;

    const history = getHistoryList();

    if (history.length === 0) {
        tableBody.innerHTML = `<tr><td colspan="6" style="text-align:center; color:var(--text-muted); padding:2rem;">Belum ada riwayat transaksi.</td></tr>`;
        return;
    }

    tableBody.innerHTML = '';
    history.forEach((tx, idx) => {
        const tr = document.createElement('tr');
        
        let statusBadge = '<span class="badge badge-info">Proses</span>';
        if (tx.status === 'Selesai Antar' || tx.status === 'Selesai') {
            statusBadge = '<span class="badge badge-success">Selesai Antar</span>';
        } else if (tx.status === 'Dalam Perjalanan') {
            statusBadge = '<span class="badge badge-warning">Dalam Perjalanan</span>';
        }

        tr.innerHTML = `
            <td><strong>#${idx + 1}</strong></td>
            <td><code style="font-weight:bold; color:var(--primary);">${tx.nomorDO}</code></td>
            <td>${tx.tanggal}</td>
            <td>${tx.nama}</td>
            <td><strong>${tx.total}</strong></td>
            <td>${statusBadge}</td>
            <td>
                <a href="tracking.html?do=${tx.nomorDO}" class="btn btn-outline-primary btn-sm">
                    🔍 Lacak DO
                </a>
            </td>
        `;
        tableBody.appendChild(tr);
    });
}


// ====================================================================
// 3. HALAMAN INFORMASI STOK / KATALOG (stok.html)
// ====================================================================

function initStokPage() {
    renderStokTable();
    initTambahStokForm();
    initStokFilter();
}

/**
 * Menampilkan secara dinamis daftar buku ke dalam DOM tabel dan grid kartu
 */
function renderStokTable(filterKeyword = '') {
    const tableBody = document.getElementById('stokTableBody');
    const gridContainer = document.getElementById('stokGridContainer');
    const totalCountEl = document.getElementById('stokTotalCount');

    const katalog = getKatalogList();
    
    // Filter pencarian
    const filtered = katalog.filter(item => {
        const keyword = filterKeyword.toLowerCase();
        return item.namaBarang.toLowerCase().includes(keyword) ||
               item.kodeBarang.toLowerCase().includes(keyword) ||
               item.jenisBarang.toLowerCase().includes(keyword);
    });

    if (totalCountEl) totalCountEl.textContent = `${filtered.length} Judul Buku`;

    // 1. Render Baris Tabel Menggunakan DOM
    if (tableBody) {
        tableBody.innerHTML = '';

        if (filtered.length === 0) {
            tableBody.innerHTML = `
                <tr>
                    <td colspan="8" style="text-align:center; padding:2rem; color:var(--text-muted);">
                        Tidak ada buku yang cocok dengan pencarian "<strong>${filterKeyword}</strong>".
                    </td>
                </tr>
            `;
        } else {
            filtered.forEach((buku, index) => {
                const tr = document.createElement('tr');

                // Status ketersediaan stok
                let badgeStok = `<span class="badge badge-success">Tersedia (${buku.stok})</span>`;
                if (buku.stok <= 0) {
                    badgeStok = `<span class="badge badge-danger">Habis</span>`;
                } else if (buku.stok < 200) {
                    badgeStok = `<span class="badge badge-warning">Terbatas (${buku.stok})</span>`;
                }

                // Gunakan gambar cover atau fallback
                const coverPath = buku.cover || 'img/pengantar_komunikasi.jpg';

                tr.innerHTML = `
                    <td>${index + 1}</td>
                    <td>
                        <img src="${coverPath}" alt="${buku.namaBarang}" class="table-thumb" onerror="this.src='assets/logo.png'">
                    </td>
                    <td><code style="font-weight:700; color:var(--primary);">${buku.kodeBarang}</code></td>
                    <td>
                        <strong>${buku.namaBarang}</strong>
                        <div style="font-size:0.75rem; color:var(--text-muted);">${buku.jenisBarang}</div>
                    </td>
                    <td>Edisi ${buku.edisi}</td>
                    <td>${badgeStok}</td>
                    <td><strong>${buku.harga}</strong></td>
                    <td>
                        <div style="display:flex; gap:0.4rem;">
                            <button class="btn btn-outline-primary btn-sm" onclick="quickOrderBook('${buku.kodeBarang}')" title="Pesan Buku Ini">
                                🛒 Pesan
                            </button>
                            <button class="btn btn-outline btn-sm" onclick="editStokModal('${buku.kodeBarang}')" title="Ubah Jumlah Stok">
                                ✏️ Edit
                            </button>
                            <button class="btn btn-danger btn-sm" onclick="hapusBarisStok('${buku.kodeBarang}', this)" title="Hapus Buku">
                                🗑️
                            </button>
                        </div>
                    </td>
                `;

                tableBody.appendChild(tr);
            });
        }
    }

    // 2. Render Tampilan Grid Kartu Buku (Kreativitas UI)
    if (gridContainer) {
        gridContainer.innerHTML = '';
        filtered.forEach(buku => {
            const card = document.createElement('article');
            card.className = 'book-card';
            const coverPath = buku.cover || 'img/pengantar_komunikasi.jpg';

            card.innerHTML = `
                <div class="book-cover-wrap">
                    <img src="${coverPath}" alt="${buku.namaBarang}" class="book-cover-img" onerror="this.src='assets/logo.png'">
                </div>
                <div class="book-info">
                    <span class="book-code">${buku.kodeBarang} • EDISI ${buku.edisi}</span>
                    <h3 class="book-title">${buku.namaBarang}</h3>
                    <div class="book-meta">Kategori: ${buku.jenisBarang}</div>
                    <div style="margin-bottom:0.75rem;">
                        <span class="badge ${buku.stok > 200 ? 'badge-success' : 'badge-warning'}">Stok: ${buku.stok}</span>
                    </div>
                    <div class="book-price-row">
                        <span class="book-price">${buku.harga}</span>
                        <button class="btn btn-primary btn-sm" onclick="quickOrderBook('${buku.kodeBarang}')">
                            + Pesan
                        </button>
                    </div>
                </div>
            `;
            gridContainer.appendChild(card);
        });
    }
}

/**
 * Fitur Tambah Baris Stok Baru Menggunakan Javascript DOM (Sesuai Kriteria Soal 3)
 */
function initTambahStokForm() {
    const form = document.getElementById('formTambahStok');
    if (!form) return;

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        // 1. Ambil Nilai Input
        const kode = document.getElementById('inputKodeBarang').value.trim().toUpperCase();
        const nama = document.getElementById('inputNamaBarang').value.trim();
        const jenis = document.getElementById('inputJenisBarang').value;
        const edisi = document.getElementById('inputEdisi').value.trim();
        const stok = parseInt(document.getElementById('inputStok').value.trim(), 10);
        let harga = document.getElementById('inputHarga').value.trim();
        const cover = document.getElementById('inputCover').value;

        // 2. Validasi Form
        if (!kode || !nama || !jenis || !edisi || isNaN(stok) || !harga) {
            showToast('Validasi Gagal', 'Semua kolom bertanda bintang (*) harus diisi dengan benar.', 'danger');
            return;
        }

        if (stok < 0) {
            showToast('Stok Tidak Valid', 'Jumlah stok tidak boleh bernilai negatif.', 'warning');
            return;
        }

        // Pastikan format harga rapi
        if (!harga.startsWith('Rp')) {
            harga = formatRupiah(harga);
        }

        // Cek duplikasi kode barang
        const katalog = getKatalogList();
        const exists = katalog.some(b => b.kodeBarang === kode);
        if (exists) {
            showToast('Kode Barang Sudah Digunakan', `Buku dengan kode ${kode} sudah terdaftar di sistem.`, 'warning');
            return;
        }

        // 3. Buat Objek Buku Baru
        const bukuBaru = {
            kodeBarang: kode,
            namaBarang: nama,
            jenisBarang: jenis,
            edisi: edisi,
            stok: stok,
            harga: harga,
            cover: cover || "img/pengantar_komunikasi.jpg"
        };

        // 4. Tambahkan ke Penyimpanan (LocalStorage)
        katalog.unshift(bukuBaru); // Tambahkan di baris paling atas
        localStorage.setItem('dataKatalogBuku', JSON.stringify(katalog));

        // 5. Update DOM Tabel secara langsung (tanpa reload halaman)
        renderStokTable();

        // 6. Tampilkan Notifikasi Sukses
        showToast('Berhasil Ditambahkan!', `Buku "${nama}" (${kode}) telah ditambahkan ke tabel katalog.`, 'success', 4000);

        // Tutup modal dan reset form
        closeModal('modalTambahStok');
        form.reset();
    });
}

/**
 * Filter pencarian buku real-time menggunakan DOM
 */
function initStokFilter() {
    const searchInput = document.getElementById('stokSearchInput');
    if (!searchInput) return;

    searchInput.addEventListener('input', (e) => {
        renderStokTable(e.target.value.trim());
    });
}

/**
 * Menghapus baris stok dari DOM dan LocalStorage
 */
function hapusBarisStok(kodeBarang, btnElement) {
    if (confirm(`Apakah Anda yakin ingin menghapus buku dengan kode [${kodeBarang}]?`)) {
        let katalog = getKatalogList();
        katalog = katalog.filter(b => b.kodeBarang !== kodeBarang);
        localStorage.setItem('dataKatalogBuku', JSON.stringify(katalog));

        // Hapus elemen baris dari tabel DOM secara visual
        const row = btnElement.closest('tr');
        if (row) {
            row.style.transition = 'opacity 0.3s ease';
            row.style.opacity = '0';
            setTimeout(() => {
                renderStokTable(document.getElementById('stokSearchInput') ? document.getElementById('stokSearchInput').value : '');
            }, 300);
        }

        showToast('Buku Dihapus', `Buku ${kodeBarang} berhasil dihapus dari tabel.`, 'info');
    }
}

/**
 * Edit stok cepat melalui dialog prompt / form modal
 */
function editStokModal(kodeBarang) {
    const katalog = getKatalogList();
    const buku = katalog.find(b => b.kodeBarang === kodeBarang);
    if (!buku) return;

    const jumlahBaru = prompt(`Ubah jumlah stok untuk "${buku.namaBarang}":`, buku.stok);
    if (jumlahBaru !== null) {
        const val = parseInt(jumlahBaru, 10);
        if (!isNaN(val) && val >= 0) {
            buku.stok = val;
            localStorage.setItem('dataKatalogBuku', JSON.stringify(katalog));
            renderStokTable();
            showToast('Stok Diperbarui', `Stok ${buku.namaBarang} sekarang: ${val}`, 'success');
        } else {
            showToast('Gagal', 'Jumlah stok harus berupa angka positif.', 'danger');
        }
    }
}

/**
 * Pesan langsung dari katalog: tambahkan ke dataPemesanan dan arahkan ke checkout.html
 */
function quickOrderBook(kodeBarang) {
    const katalog = getKatalogList();
    const buku = katalog.find(b => b.kodeBarang === kodeBarang);
    if (!buku) return;

    let keranjang = getPemesananList();
    const existing = keranjang.find(item => item.kodeBarang === kodeBarang);

    if (existing) {
        existing.jumlah += 1;
    } else {
        keranjang.push({
            kodeBarang: buku.kodeBarang,
            namaBarang: buku.namaBarang,
            hargaSatuan: parseRupiah(buku.harga),
            jumlah: 1,
            cover: buku.cover
        });
    }

    localStorage.setItem('dataPemesanan', JSON.stringify(keranjang));
    showToast('Masuk ke Pemesanan', `"${buku.namaBarang}" ditambahkan ke halaman pemesanan.`, 'success', 3000);

    setTimeout(() => {
        window.location.href = 'checkout.html';
    }, 600);
}

/**
 * Beralih antara Tampilan Tabel dan Tampilan Grid Kartu
 */
function toggleStokView(viewMode) {
    const tableView = document.getElementById('stokTableViewWrapper');
    const gridView = document.getElementById('stokGridViewWrapper');
    const btnTable = document.getElementById('btnViewTable');
    const btnGrid = document.getElementById('btnViewGrid');

    if (viewMode === 'grid') {
        if (tableView) tableView.style.display = 'none';
        if (gridView) gridView.style.display = 'block';
        if (btnTable) btnTable.classList.remove('active');
        if (btnGrid) btnGrid.classList.add('active');
    } else {
        if (tableView) tableView.style.display = 'block';
        if (gridView) gridView.style.display = 'none';
        if (btnTable) btnTable.classList.add('active');
        if (btnGrid) btnGrid.classList.remove('active');
    }
}


// ====================================================================
// 4. HALAMAN PEMESANAN (checkout.html)
// ====================================================================

function initCheckoutPage() {
    renderCheckoutTable();
    populateBukuSelector();
    initCheckoutForm();
    populateUserDataIfLoggedIn();
}

/**
 * Mengisi data pengguna secara otomatis jika sedang login
 */
function populateUserDataIfLoggedIn() {
    const user = getCurrentUser();
    if (!user) return;

    const inputNama = document.getElementById('pemesanNama');
    const inputEmail = document.getElementById('pemesanEmail');

    if (inputNama && !inputNama.value) inputNama.value = user.nama;
    if (inputEmail && !inputEmail.value) inputEmail.value = user.email;
}

/**
 * Menampilkan data pemesanan yang dapat ditambah/ubah (Kriteria Soal 4)
 */
function renderCheckoutTable() {
    const tbody = document.getElementById('checkoutTableBody');
    if (!tbody) return;

    const pesanan = getPemesananList();
    tbody.innerHTML = '';

    if (pesanan.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="6" style="text-align:center; padding:2rem; color:var(--text-muted);">
                    Keranjang pemesanan masih kosong. Silakan tambah buku di bawah atau dari katalog.
                </td>
            </tr>
        `;
        updateCheckoutSummary(0);
        return;
    }

    let subtotal = 0;

    pesanan.forEach((item, index) => {
        const itemTotal = item.hargaSatuan * item.jumlah;
        subtotal += itemTotal;

        const tr = document.createElement('tr');
        const coverPath = item.cover || 'img/pengantar_komunikasi.jpg';

        tr.innerHTML = `
            <td>${index + 1}</td>
            <td>
                <div style="display:flex; align-items:center; gap:0.75rem;">
                    <img src="${coverPath}" alt="${item.namaBarang}" class="table-thumb" style="width:36px; height:48px;" onerror="this.src='assets/logo.png'">
                    <div>
                        <strong>${item.namaBarang}</strong>
                        <div style="font-size:0.75rem; color:var(--text-muted);">${item.kodeBarang}</div>
                    </div>
                </div>
            </td>
            <td>${formatRupiah(item.hargaSatuan)}</td>
            <td>
                <div style="display:flex; align-items:center; gap:0.3rem;">
                    <button type="button" class="btn btn-outline btn-sm" onclick="ubahJumlahPesanan(${index}, -1)" style="padding:0.2rem 0.6rem;">-</button>
                    <span style="font-weight:bold; min-width:26px; text-align:center;">${item.jumlah}</span>
                    <button type="button" class="btn btn-outline btn-sm" onclick="ubahJumlahPesanan(${index}, 1)" style="padding:0.2rem 0.6rem;">+</button>
                </div>
            </td>
            <td><strong>${formatRupiah(itemTotal)}</strong></td>
            <td>
                <button type="button" class="btn btn-danger btn-sm" onclick="hapusItemPesanan(${index})" title="Hapus Item">
                    🗑️
                </button>
            </td>
        `;
        tbody.appendChild(tr);
    });

    updateCheckoutSummary(subtotal);
}

/**
 * Mengubah jumlah pemesanan (+ atau -)
 */
function ubahJumlahPesanan(index, delta) {
    const pesanan = getPemesananList();
    if (!pesanan[index]) return;

    pesanan[index].jumlah += delta;

    if (pesanan[index].jumlah <= 0) {
        pesanan.splice(index, 1);
        showToast('Item Dihapus', 'Buku telah dihapus dari pemesanan.', 'info');
    }

    localStorage.setItem('dataPemesanan', JSON.stringify(pesanan));
    renderCheckoutTable();
}

/**
 * Menghapus satu item dari daftar pemesanan
 */
function hapusItemPesanan(index) {
    const pesanan = getPemesananList();
    if (!pesanan[index]) return;

    const nama = pesanan[index].namaBarang;
    pesanan.splice(index, 1);
    localStorage.setItem('dataPemesanan', JSON.stringify(pesanan));
    renderCheckoutTable();
    showToast('Item Dihapus', `"${nama}" dihapus dari pemesanan.`, 'info');
}

/**
 * Mengisi dropdown pilihan buku di modal / form tambah item
 */
function populateBukuSelector() {
    const selector = document.getElementById('selectTambahBuku');
    if (!selector) return;

    const katalog = getKatalogList();
    selector.innerHTML = '<option value="">-- Pilih Buku dari Katalog --</option>';

    katalog.forEach(b => {
        const opt = document.createElement('option');
        opt.value = b.kodeBarang;
        opt.textContent = `${b.kodeBarang} - ${b.namaBarang} (${b.harga})`;
        selector.appendChild(opt);
    });
}

/**
 * Menambahkan buku yang dipilih ke dalam daftar pemesanan
 */
function tambahBukuKePesanan() {
    const selector = document.getElementById('selectTambahBuku');
    const qtyInput = document.getElementById('inputTambahQty');

    if (!selector || !qtyInput) return;

    const kode = selector.value;
    const qty = parseInt(qtyInput.value, 10) || 1;

    if (!kode) {
        showToast('Pilih Buku', 'Silakan pilih buku yang ingin ditambahkan.', 'warning');
        return;
    }

    const katalog = getKatalogList();
    const buku = katalog.find(b => b.kodeBarang === kode);
    if (!buku) return;

    const pesanan = getPemesananList();
    const existing = pesanan.find(p => p.kodeBarang === kode);

    if (existing) {
        existing.jumlah += qty;
    } else {
        pesanan.push({
            kodeBarang: buku.kodeBarang,
            namaBarang: buku.namaBarang,
            hargaSatuan: parseRupiah(buku.harga),
            jumlah: qty,
            cover: buku.cover
        });
    }

    localStorage.setItem('dataPemesanan', JSON.stringify(pesanan));
    renderCheckoutTable();
    closeModal('modalTambahBukuPesanan');
    showToast('Buku Ditambahkan', `"${buku.namaBarang}" berhasil ditambahkan ke pemesanan.`, 'success');
}

/**
 * Menghitung otomatis Subtotal, Ongkir, Diskon, dan Total Pembayaran
 */
function updateCheckoutSummary(subtotal) {
    const elSubtotal = document.getElementById('summarySubtotal');
    const elOngkir = document.getElementById('summaryOngkir');
    const elDiskon = document.getElementById('summaryDiskon');
    const elTotal = document.getElementById('summaryTotal');

    // Ambil opsi ongkir dari ekspedisi dan paket
    const paketSelect = document.getElementById('pilihanPaket');
    let tarifOngkir = 18000; // default reguler

    if (paketSelect) {
        const val = paketSelect.value;
        if (val === 'EXPRESS') tarifOngkir = 28000;
        else if (val === 'KARGO') tarifOngkir = 35000;
        else tarifOngkir = 18000;
    }

    if (subtotal === 0) tarifOngkir = 0;

    // Diskon jika subtotal > 300.000
    let diskon = 0;
    if (subtotal >= 300000) {
        diskon = 20000;
    }

    const totalBayar = Math.max(0, subtotal + tarifOngkir - diskon);

    if (elSubtotal) elSubtotal.textContent = formatRupiah(subtotal);
    if (elOngkir) elOngkir.textContent = formatRupiah(tarifOngkir);
    if (elDiskon) elDiskon.textContent = `- ${formatRupiah(diskon)}`;
    if (elTotal) elTotal.textContent = formatRupiah(totalBayar);
}

/**
 * Validasi form dan proses konfirmasi pemesanan
 */
function initCheckoutForm() {
    const form = document.getElementById('formCheckout');
    if (!form) return;

    // Listener perubahan paket pengiriman untuk update ongkir
    const paketSelect = document.getElementById('pilihanPaket');
    if (paketSelect) {
        paketSelect.addEventListener('change', () => {
            const pesanan = getPemesananList();
            const subtotal = pesanan.reduce((sum, item) => sum + (item.hargaSatuan * item.jumlah), 0);
            updateCheckoutSummary(subtotal);
        });
    }

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        const pesanan = getPemesananList();
        if (pesanan.length === 0) {
            showToast('Pemesanan Kosong', 'Anda belum menambahkan buku ke dalam pemesanan.', 'danger');
            return;
        }

        // Ambil data pemesan
        const nama = document.getElementById('pemesanNama').value.trim();
        const telepon = document.getElementById('pemesanTelepon').value.trim();
        const email = document.getElementById('pemesanEmail').value.trim();
        const alamat = document.getElementById('pemesanAlamat').value.trim();
        const kota = document.getElementById('pemesanKota').value.trim();
        const ekspedisi = document.getElementById('pilihanEkspedisi').value;
        const paket = document.getElementById('pilihanPaket').value;
        const pembayaran = document.getElementById('pilihanPembayaran').value;

        // Validasi
        if (!nama || !telepon || !email || !alamat || !kota || !ekspedisi || !paket || !pembayaran) {
            showToast('Form Belum Lengkap', 'Silakan lengkapi semua data informasi pemesan dan pembayaran.', 'warning');
            return;
        }

        // Hitung total akhir
        const subtotal = pesanan.reduce((sum, item) => sum + (item.hargaSatuan * item.jumlah), 0);
        let ongkir = (paket === 'EXPRESS') ? 28000 : (paket === 'KARGO' ? 35000 : 18000);
        let diskon = (subtotal >= 300000) ? 20000 : 0;
        const grandTotal = subtotal + ongkir - diskon;

        // Generate Nomor Delivery Order Baru (misal 20230014, dst)
        const tracking = getTrackingData();
        const existingKeys = Object.keys(tracking);
        const lastNumber = existingKeys.length > 0 ? Math.max(...existingKeys.map(k => parseInt(k, 10) || 20230013)) : 20230013;
        const newNomorDO = (lastNumber + 1).toString();

        const today = new Date().toISOString().split('T')[0];
        const nowTimeStr = new Date().toLocaleTimeString('id-ID');

        // Simpan ke dataTracking
        tracking[newNomorDO] = {
            nomorDO: newNomorDO,
            nama: nama,
            status: "Dalam Perjalanan",
            ekspedisi: ekspedisi,
            tanggalKirim: today,
            paket: `${paket} - ${kota}`,
            total: formatRupiah(grandTotal),
            perjalanan: [
                {
                    waktu: `${today} ${nowTimeStr}`,
                    keterangan: `Pesanan Dibuat & Diproses. Ekspedisi: ${ekspedisi}. Pengirim: Universitas Terbuka`
                },
                {
                    waktu: `${today} ${nowTimeStr}`,
                    keterangan: `Penerimaan di Loket Hub: TANGERANG SELATAN`
                }
            ]
        };
        localStorage.setItem('dataTracking', JSON.stringify(tracking));

        // Simpan ke riwayat transaksi
        const history = getHistoryList();
        history.unshift({
            nomorDO: newNomorDO,
            tanggal: today,
            nama: nama,
            total: formatRupiah(grandTotal),
            status: "Dalam Perjalanan",
            ekspedisi: ekspedisi,
            items: pesanan.map(p => `${p.namaBarang} (${p.jumlah}x)`)
        });
        localStorage.setItem('dataHistoryTransaksi', JSON.stringify(history));

        // Kurangi stok buku pada katalog
        const katalog = getKatalogList();
        pesanan.forEach(item => {
            const targetBuku = katalog.find(b => b.kodeBarang === item.kodeBarang);
            if (targetBuku) {
                targetBuku.stok = Math.max(0, targetBuku.stok - item.jumlah);
            }
        });
        localStorage.setItem('dataKatalogBuku', JSON.stringify(katalog));

        // Kosongkan keranjang pemesanan
        localStorage.setItem('dataPemesanan', JSON.stringify([]));

        // Tampilkan Modal Konfirmasi Sukses Pemesanan
        renderModalKonfirmasiOrder(newNomorDO, nama, ekspedisi, formatRupiah(grandTotal), pesanan);
    });
}

function renderModalKonfirmasiOrder(nomorDO, nama, ekspedisi, total, items) {
    const modalContent = document.getElementById('modalKonfirmasiContent');
    if (!modalContent) {
        showToast('Pesanan Berhasil!', `Nomor DO Anda: ${nomorDO}`, 'success', 8000);
        return;
    }

    const itemsListHtml = items.map(it => `<li>${it.namaBarang} (<strong>${it.jumlah}x</strong>) - ${formatRupiah(it.hargaSatuan * it.jumlah)}</li>`).join('');

    modalContent.innerHTML = `
        <div style="text-align:center; margin-bottom:1.25rem;">
            <div style="font-size:3rem; color:var(--success);">🎉</div>
            <h3 style="font-size:1.4rem; font-weight:800; color:var(--text-main);">Pemesanan Berhasil Diproses!</h3>
            <p style="color:var(--text-muted); font-size:0.9rem;">Terima kasih atas pesanan Anda. Berikut adalah rincian bukti pesanan:</p>
        </div>

        <div style="background-color:var(--bg-subtle); padding:1rem 1.25rem; border-radius:var(--radius-md); border:1px solid var(--border-color); margin-bottom:1.25rem;">
            <div style="display:flex; justify-content:space-between; margin-bottom:0.5rem;">
                <span style="color:var(--text-muted); font-size:0.85rem;">Nomor Delivery Order (DO):</span>
                <strong style="color:var(--primary); font-size:1.1rem; letter-spacing:1px;">${nomorDO}</strong>
            </div>
            <div style="display:flex; justify-content:space-between; margin-bottom:0.5rem;">
                <span style="color:var(--text-muted); font-size:0.85rem;">Nama Penerima:</span>
                <strong>${nama}</strong>
            </div>
            <div style="display:flex; justify-content:space-between; margin-bottom:0.5rem;">
                <span style="color:var(--text-muted); font-size:0.85rem;">Jasa Ekspedisi:</span>
                <strong>${ekspedisi}</strong>
            </div>
            <div style="display:flex; justify-content:space-between; border-top:1px dashed var(--border-color); padding-top:0.5rem;">
                <span style="color:var(--text-muted); font-size:0.85rem;">Total Pembayaran:</span>
                <strong style="color:var(--success); font-size:1.1rem;">${total}</strong>
            </div>
        </div>

        <div>
            <h4 style="font-size:0.9rem; font-weight:700; margin-bottom:0.5rem;">Buku yang Dipesan:</h4>
            <ul style="font-size:0.85rem; color:var(--text-main); padding-left:1.2rem; line-height:1.6;">
                ${itemsListHtml}
            </ul>
        </div>
    `;

    // Tombol redirect ke tracking
    const btnLacak = document.getElementById('btnLacakPesananBaru');
    if (btnLacak) {
        btnLacak.onclick = function () {
            window.location.href = `tracking.html?do=${nomorDO}`;
        };
    }

    openModal('modalKonfirmasiOrder');
}


// ====================================================================
// 5. HALAMAN INFORMASI PENGIRIMAN / TRACKING (tracking.html)
// ====================================================================

function initTrackingPage() {
    const form = document.getElementById('formTracking');
    const inputDO = document.getElementById('inputNomorDO');

    // Cek apakah ada parameter query ?do=... di URL
    const urlParams = new URLSearchParams(window.location.search);
    const queryDO = urlParams.get('do');
    if (queryDO && inputDO) {
        inputDO.value = queryDO;
        cariPengiriman(queryDO);
    }

    if (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();
            const doValue = inputDO.value.trim();
            cariPengiriman(doValue);
        });
    }
}

/**
 * Mencari data pengiriman dan menampilkannya dengan progress bar & timeline (Kriteria Soal 5)
 */
function cariPengiriman(nomorDO) {
    const resultContainer = document.getElementById('trackingResultContainer');
    const emptyState = document.getElementById('trackingEmptyState');
    const notFoundState = document.getElementById('trackingNotFoundState');

    if (!nomorDO) {
        showToast('Nomor DO Diperlukan', 'Silakan masukkan Nomor Delivery Order untuk melacak pengiriman.', 'warning');
        return;
    }

    const allTracking = getTrackingData();
    const data = allTracking[nomorDO];

    if (!data) {
        // Tampilkan State Tidak Ditemukan
        if (resultContainer) resultContainer.style.display = 'none';
        if (emptyState) emptyState.style.display = 'none';
        if (notFoundState) {
            notFoundState.style.display = 'block';
            notFoundState.innerHTML = `
                <div class="card" style="text-align:center; padding:2.5rem; border:2px dashed var(--danger);">
                    <div style="font-size:3rem; margin-bottom:0.75rem;">📦❌</div>
                    <h3 style="color:var(--danger); font-size:1.3rem; font-weight:800; margin-bottom:0.5rem;">Nomor DO Tidak Ditemukan</h3>
                    <p style="color:var(--text-muted); font-size:0.95rem; margin-bottom:1.25rem;">
                        Nomor Delivery Order "<strong>${nomorDO}</strong>" tidak terdaftar di sistem kami.
                    </p>
                    <p style="font-size:0.85rem; color:var(--text-muted);">
                        Tip: Anda dapat mencoba nomor DO dummy bawaan: 
                        <a href="javascript:void(0)" onclick="quickSelectDO('20230012')" style="font-weight:bold; text-decoration:underline;">20230012</a> atau 
                        <a href="javascript:void(0)" onclick="quickSelectDO('20230013')" style="font-weight:bold; text-decoration:underline;">20230013</a>
                    </p>
                </div>
            `;
        }
        showToast('Tidak Ditemukan', `Nomor DO "${nomorDO}" tidak ditemukan dalam sistem.`, 'danger');
        return;
    }

    // Jika Ditemukan: Sembunyikan empty & not found
    if (emptyState) emptyState.style.display = 'none';
    if (notFoundState) notFoundState.style.display = 'none';
    if (resultContainer) resultContainer.style.display = 'block';

    // 1. Tampilkan Data Pokok Pengiriman (Sesuai Kriteria Soal 5)
    document.getElementById('trackNomorDO').textContent = data.nomorDO;
    document.getElementById('trackNama').textContent = data.nama;
    document.getElementById('trackEkspedisi').textContent = data.ekspedisi;
    document.getElementById('trackTanggal').textContent = data.tanggalKirim;
    document.getElementById('trackPaket').textContent = data.paket;
    document.getElementById('trackTotal').textContent = data.total;

    // 2. Status Badge & Progress Bar Simulasi (Kreativitas UI)
    const statusBadge = document.getElementById('trackStatusBadge');
    const progressBar = document.getElementById('trackProgressBar');
    const step1 = document.getElementById('step1');
    const step2 = document.getElementById('step2');
    const step3 = document.getElementById('step3');
    const step4 = document.getElementById('step4');

    // Reset steps
    [step1, step2, step3, step4].forEach(s => {
        if (s) {
            s.className = 'step-item';
        }
    });

    // Tentukan tahap berdasarkan status pengiriman
    let percent = '25%';
    if (data.status === 'Dalam Perjalanan') {
        percent = '65%';
        if (statusBadge) {
            statusBadge.className = 'badge badge-warning';
            statusBadge.textContent = 'Dalam Perjalanan';
        }
        if (step1) step1.classList.add('completed');
        if (step2) step2.classList.add('completed');
        if (step3) step3.classList.add('active');
    } else if (data.status === 'Selesai Antar' || data.status === 'Selesai' || data.status === 'Dikirim') {
        // Cek apakah ada riwayat selesai antar
        const isDelivered = data.perjalanan && data.perjalanan.some(p => p.keterangan.toLowerCase().includes('selesai antar'));
        if (isDelivered || data.status === 'Selesai Antar') {
            percent = '100%';
            if (statusBadge) {
                statusBadge.className = 'badge badge-success';
                statusBadge.textContent = 'Selesai Antar (Terkirim)';
            }
            if (step1) step1.classList.add('completed');
            if (step2) step2.classList.add('completed');
            if (step3) step3.classList.add('completed');
            if (step4) step4.classList.add('completed');
        } else {
            percent = '75%';
            if (statusBadge) {
                statusBadge.className = 'badge badge-info';
                statusBadge.textContent = 'Proses Antar Kurir';
            }
            if (step1) step1.classList.add('completed');
            if (step2) step2.classList.add('completed');
            if (step3) step3.classList.add('active');
        }
    } else {
        percent = '25%';
        if (statusBadge) {
            statusBadge.className = 'badge badge-info';
            statusBadge.textContent = data.status;
        }
        if (step1) step1.classList.add('active');
    }

    // Set inline CSS progress bar (Mengimplementasikan indikator CSS inline)
    if (progressBar) {
        progressBar.style.width = percent;
    }

    // 3. Render Riwayat Perjalanan (Timeline List)
    const timelineContainer = document.getElementById('trackTimeline');
    if (timelineContainer && data.perjalanan) {
        timelineContainer.innerHTML = '';
        // Urutkan perjalanan terbaru di atas
        const sortedPerjalanan = [...data.perjalanan].reverse();

        sortedPerjalanan.forEach((step, idx) => {
            const item = document.createElement('div');
            item.className = 'timeline-item';
            item.innerHTML = `
                <div class="timeline-dot"></div>
                <div class="timeline-content">
                    <div class="timeline-time">⏰ ${step.waktu} WIB</div>
                    <div class="timeline-desc">${step.keterangan}</div>
                </div>
            `;
            timelineContainer.appendChild(item);
        });
    }

    showToast('Data Ditemukan', `Menampilkan status pelacakan untuk ${data.nama}`, 'success', 2500);
}

/**
 * Memilih nomor DO cepat melalui klik tombol rekomendasi
 */
function quickSelectDO(nomorDO) {
    const input = document.getElementById('inputNomorDO');
    if (input) {
        input.value = nomorDO;
        cariPengiriman(nomorDO);
    }
}
