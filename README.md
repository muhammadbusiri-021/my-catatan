# Catatan Harian — Penjelasan Kode

Dokumentasi lengkap untuk memahami setiap bagian kode pada proyek **Web Catatan Harian**.

Proyek ini terdiri dari 3 file:

| File | Fungsi |
|------|--------|
| `index.html` | Struktur halaman (kerangka) |
| `style.css` | Tampilan visual (warna, ukuran, posisi) |
| `script.js` | Logika dan interaksi (simpan, hapus, edit, dll) |

---

## Daftar Isi

- [1. HTML — Struktur Halaman](#1-html--struktur-halaman)
  - [1.1 Head](#11-head)
  - [1.2 Layout Dashboard](#12-layout-dashboard)
  - [1.3 Sidebar](#13-sidebar)
  - [1.4 Main Content & Topbar](#14-main-content--topbar)
  - [1.5 Halaman (Pages)](#15-halaman-pages)
  - [1.6 Modal](#16-modal)
- [2. CSS — Tampilan Visual](#2-css--tampilan-visual)
  - [2.1 Reset & Base](#21-reset--base)
  - [2.2 Flexbox Layout](#22-flexbox-layout)
  - [2.3 Sidebar Styling](#23-sidebar-styling)
  - [2.4 Catatan Card (Row Style)](#24-catatan-card-row-style)
  - [2.5 Responsive Design](#25-responsive-design)
  - [2.6 Transisi & Animasi](#26-transisi--animasi)
- [3. JavaScript — Logika Aplikasi](#3-javascript--logika-aplikasi)
  - [3.1 localStorage (Penyimpanan Data)](#31-localstorage-penyimpanan-data)
  - [3.2 Navigasi Halaman](#32-navigasi-halaman)
  - [3.3 CRUD (Create, Read, Update, Delete)](#33-crud-create-read-update-delete)
  - [3.4 Fitur Arsip](#34-fitur-arsip)
  - [3.5 Pencarian / Filter](#35-pencarian--filter)
  - [3.6 Render / Menampilkan Data](#36-render--menampilkan-data)
  - [3.7 Modal (Dialog Konfirmasi)](#37-modal-dialog-konfirmasi)
  - [3.8 Helper Functions](#38-helper-functions)
  - [3.9 Multi-Select & Aksi Massal (Bulk Actions)](#39-multi-select--aksi-massal-bulk-actions)
  - [3.10 Rich Text Editor & Zero Layout Shift](#310-rich-text-editor--zero-layout-shift)
  - [3.11 Fitur Sematkan Catatan (Note Pinning)](#311-fitur-sematkan-catatan-note-pinning)
  - [3.12 Perbaikan Overflow & Scrolling (Flexbox Viewport Bug)](#312-perbaikan-overflow--scrolling-flexbox-viewport-bug)
  - [3.13 Menu Dropdown Aksi Massal Mobile & Konsistensi Tinggi Kartu](#313-menu-dropdown-aksi-massal-mobile--konsistensi-tinggi-kartu)
  - [3.14 Menu Aksi Kartu Dropdown Mobile & Restrukturisasi Footer Modal Baca](#314-menu-aksi-kartu-dropdown-mobile--restrukturisasi-footer-modal-baca)
  - [3.15 Cadangan & Pemulihan Data (Backup & Restore JSON)](#315-cadangan--pemulihan-data-backup--restore-json)
  - [3.16 Tong Sampah (Trash / Recycle Bin) & Pemulihan Permanen](#316-tong-sampah-trash--recycle-bin--pemulihan-permanen)
  - [3.17 Kunci Catatan Rahasia (PIN 4-Digit Angka - Brankas Lock)](#317-kunci-catatan-rahasia-pin-4-digit-angka---brankas-lock)
  - [3.18 Ekspor Catatan (Cetak / PDF, Teks .txt, Salin Clipboard)](#318-ekspor-catatan-cetak--pdf-teks-txt-salin-clipboard)
  - [3.19 Mode Gelap (Dark Mode Toggle) dengan Persistensi](#319-mode-gelap-dark-mode-toggle-dengan-persistensi)
  - [3.20 Simpan Otomatis Draf (Auto-Save Draft) pada Workspace Tulis](#320-simpan-otomatis-draf-auto-save-draft-pada-workspace-tulis)
  - [3.21 Kategori Kustom / Tagar Mandiri dengan Palet Warna Dinamis](#321-kategori-kustom--tagar-mandiri-dengan-palet-warna-dinamis)
  - [3.22 Format Checklist Interaktif (To-Do List) pada Editor dan Modal Baca](#322-format-checklist-interaktif-to-do-list-pada-editor-dan-modal-baca)
  - [3.23 Bilah Chip Filter Kategori & Hitungan Real-time](#323-bilah-chip-filter-kategori--hitungan-real-time)
  - [3.24 Pengaturan & Perubahan PIN Keamanan Brankas](#324-pengaturan--perubahan-pin-keamanan-brankas)
  - [3.25 Pintasan Keyboard Cepat (Global Shortcuts & Cheatsheet)](#325-pintasan-keyboard-cepat-global-shortcuts--cheatsheet)
  - [3.26 Progressive Web App (PWA) — Instalasi & Dukungan 100% Offline](#326-progressive-web-app-pwa--instalasi--dukungan-100-offline)
  - [3.27 Dukungan Sisip / Tempel Gambar Ringan (Client-side Resizing)](#327-dukungan-sisip--tempel-gambar-ringan-client-side-resizing)
  - [3.28 Pembersihan Otomatis Sampah 30 Hari & Indikator Kapasitas Penyimpanan](#328-pembersihan-otomatis-sampah-30-hari--indikator-kapasitas-penyimpanan)
- [4. Konsep Penting yang Digunakan](#konsep-penting-yang-digunakan)

## 1. HTML — Struktur Halaman

### 1.1 Head

```html
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<link rel="stylesheet" href="style.css">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap">
```

**Penjelasan:**

- `charset="UTF-8"` — Agar bisa menampilkan karakter Indonesia (huruf, angka, simbol)
- `viewport` — Membuat halaman responsif di layar HP. Tanpa ini, halaman akan terlihat kecil di HP
- `link stylesheet` — Menghubungkan file CSS untuk tampilan
- Google Fonts `Inter` — Menggunakan font modern yang bersih dan mudah dibaca

---

### 1.2 Layout Dashboard

```html
<div class="dashboard">
    <aside class="sidebar">...</aside>
    <main class="main-content">...</main>
</div>
```

**Penjelasan:**

Ini adalah kerangka utama dashboard. Menggunakan **2 kolom**:

```
+------------------+------------------------------------+
|                  |                                    |
|    SIDEBAR       |         MAIN CONTENT               |
|    (aside)       |         (main)                     |
|                  |                                    |
|  - Menu          |  - Topbar (judul + search)         |
|  - Statistik     |  - Konten halaman                  |
|                  |                                    |
+------------------+------------------------------------+
```

- `<aside>` — Tag HTML semantik untuk konten sampingan (sidebar)
- `<main>` — Tag HTML semantik untuk konten utama

---

### 1.3 Sidebar

```html
<aside class="sidebar" id="sidebar">
    <!-- Brand / Logo -->
    <div class="sidebar-brand">
        <div class="brand-icon">C</div>
        <span class="brand-text">Catatan</span>
    </div>

    <!-- Menu Navigasi -->
    <nav class="sidebar-nav">
        <a href="#" class="nav-item active" data-page="semua">
            <svg class="nav-icon">...</svg>
            <span>Semua Catatan</span>
        </a>
        ...
    </nav>

    <!-- Statistik di bagian bawah -->
    <div class="sidebar-footer">
        <div class="stats-card">
            <span class="stats-label">Total Catatan</span>
            <span class="stats-value" id="total-catatan">0</span>
        </div>
    </div>
</aside>
```

**Penjelasan:**

- `data-page="semua"` — **Data attribute** kustom. Digunakan oleh JavaScript untuk tahu halaman mana yang harus ditampilkan saat menu diklik. Ini cara modern untuk menyimpan data di elemen HTML.
- `<svg>` — Ikon vektor yang ringan (tidak perlu download gambar). Setiap ikon digambar dengan koordinat path.
- `<nav>` — Tag semantik untuk navigasi
- `id="total-catatan"` — ID unik agar JavaScript bisa mengubah isinya secara dinamis

---

### 1.4 Main Content & Topbar

```html
<main class="main-content">
    <header class="topbar">
        <button class="btn-menu" id="btn-menu">...</button>
        <h2 class="page-title" id="page-title">Semua Catatan</h2>
        <div class="topbar-actions">
            <div class="search-wrapper">
                <svg class="search-icon">...</svg>
                <input type="text" id="cari" placeholder="Cari catatan...">
            </div>
        </div>
    </header>
    ...
</main>
```

**Penjelasan:**

- `btn-menu` — Tombol hamburger menu, hanya muncul di layar kecil (HP) untuk membuka sidebar
- `page-title` — Judul halaman yang berubah-ubah sesuai menu yang aktif
- `search-wrapper` — Membungkus ikon search + input menjadi satu kesatuan visual

---

### 1.5 Halaman (Pages)

Aplikasi ini punya **3 halaman** yang ditampilkan bergantian (Single Page Application sederhana):

```html
<section class="page active" id="page-semua">...</section>   <!-- Daftar catatan -->
<section class="page" id="page-tambah">...</section>          <!-- Form tulis -->
<section class="page" id="page-arsip">...</section>           <!-- Daftar arsip -->
```

**Penjelasan:**

- Semua halaman ada di satu file HTML
- Hanya halaman dengan class `active` yang terlihat
- JavaScript menambah/hapus class `active` untuk berpindah halaman
- Ini disebut **SPA (Single Page Application)** sederhana — halaman tidak pernah reload
- **Tata Letak 2 Kolom (Workspace Penulisan)**: Pada halaman `page-tambah`, tampilan memanfaatkan seluruh lebar layar dengan membagi area menjadi 2 kolom:
  1. *Kolom Utama (Kiri)*: Kanvas penulisan judul dan isi catatan yang lapang dilengkapi penghitung kata realtime.
  2. *Panel Samping (Kanan)*: Kartu pengaturan tanggal, kategori, estimasi waktu baca, tips menulis, dan tombol Simpan/Batal. Dengan layout ini, tidak ada lagi ruang kosong canggung di sebelah kanan.

---

### 1.6 Modal

```html
<div class="modal-overlay" id="modal-hapus">
    <div class="modal">
        <h3>Hapus Catatan</h3>
        <p>Catatan yang dihapus tidak bisa dikembalikan. Lanjutkan?</p>
        <div class="modal-actions">
            <button class="btn-secondary" id="btn-batal">Batal</button>
            <button class="btn-danger" id="btn-konfirmasi-hapus">Hapus</button>
        </div>
    </div>
</div>
```

**Penjelasan:**

- `modal-overlay` — Layer transparan gelap yang menutupi seluruh layar
- `modal` — Kotak dialog di tengah layar
- Modal ini **tersembunyi** secara default (`display: none`)
- Ditampilkan dengan menambah class `active` via JavaScript

---

## 2. CSS — Tampilan Visual

### 2.1 Reset & Base

```css
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}
```

**Penjelasan:**

- `*` — Selector universal, memilih SEMUA elemen
- `margin: 0; padding: 0` — Menghapus jarak bawaan browser. Setiap browser punya jarak default yang berbeda, ini menyamakannya
- `box-sizing: border-box` — **Sangat penting!** Membuat `width` dan `height` sudah termasuk padding dan border. Tanpa ini, elemen bisa lebih besar dari yang kita tentukan

**Contoh perbedaan:**

```
Tanpa border-box:  width: 100px + padding: 10px = total 120px (membingungkan!)
Dengan border-box: width: 100px + padding: 10px = total tetap 100px (mudah dihitung)
```

---

### 2.2 Flexbox Layout

```css
.dashboard {
    display: flex;
    height: 100vh;
}

.main-content {
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow: hidden;
}
```

**Penjelasan:**

- `display: flex` — Mengaktifkan **Flexbox**, sistem layout modern CSS. Anak-anaknya akan berjajar secara horizontal (default)
- `height: 100vh` — `vh` = viewport height. `100vh` artinya setinggi layar penuh
- `flex: 1` — Mengisi **sisa ruang** yang tersedia. Sidebar punya lebar tetap (260px), main-content mengambil sisanya
- `flex-direction: column` — Mengubah arah flex dari horizontal ke **vertikal** (atas ke bawah)
- `overflow: hidden` — Menyembunyikan konten yang meluber keluar

**Ilustrasi Flexbox:**

```
display: flex (default = horizontal)
+--------+------------------------+
| Sidebar|     Main Content       |
| 260px  |      flex: 1           |
|        |  (sisa ruang = auto)   |
+--------+------------------------+

flex-direction: column (vertikal)
+-----------------------------+
|          Topbar             |
+-----------------------------+
|                             |
|     Page Content            |
|     (flex: 1, scroll)       |
|                             |
+-----------------------------+
```

---

### 2.3 Sidebar Styling & Mini-Sidebar (Icon-Only Mode)

```css
.sidebar {
    width: 260px;
    background: #ffffff;
    border-right: 1px solid #e8e8ef;
    display: flex;
    flex-direction: column;
    flex-shrink: 0;
    transition: width 0.28s cubic-bezier(0.4, 0, 0.2, 1);
    overflow: hidden;
    white-space: nowrap;
}

/* Mode Mini-Sidebar (Saat Dilipat) */
.sidebar.collapsed {
    width: 68px; /* Menyisakan kolom ikon ramping */
}

/* Teks memudar halus tanpa efek sentakan (Zero Glitch) */
.sidebar.collapsed .brand-text,
.sidebar.collapsed .nav-item span {
    opacity: 0;
    transform: translateX(-8px);
    pointer-events: none;
}

.sidebar.collapsed .sidebar-footer {
    opacity: 0;
    transform: translateY(8px);
    pointer-events: none;
}

/* Posisi Ikon Terkunci Presisi (Zero-Shift Anchor) */
.nav-icon {
    width: 18px;
    height: 18px;
    min-width: 18px;
    margin-left: 13px; /* (44px slot - 18px icon) / 2 = 13px */
    margin-right: 13px;
    flex-shrink: 0;
}
```

**Penjelasan Teknik "Zero-Shift & Butter-Smooth":**

- **Kenapa sebelumnya terasa "ganjel"?**: Sebelumnya teks menu langsung dimatikan dengan `display: none;` saat tombol diklik, dan posisi ikon dipaksa berpindah ke tengah (`justify-content: center`). Akibatnya teks hilang mendadak dan ikon menyentak/melompat di tengah animasi.
- **Solusi Zero-Shift**: Ukuran ikon dibuat proporsional (`18px`) dan dipasang margin tetap `13px` kiri dan kanan. Baik saat sidebar selebar `260px` maupun `68px`, **titik koordinat ikon tidak bergeser satu piksel pun**.
- **Smooth Fade**: Teks tidak dihilangkan mendadak, melainkan memudar secara halus (`opacity: 0` dan sedikit bergeser `translateX(-8px)`) mengikuti kurva animasi `cubic-bezier`.
- **Proporsional & Ramping**: Ikon logo maupun ikon navigasi berada pada sumbu vertikal yang sama (`34px` dari tepi kiri), sehingga terlihat rapi dan tidak kebesaran.

```css
.nav-item.active {
    background: #1a1a2e;
    color: #ffffff;
}
```

- Menu yang aktif diberi warna gelap (dark navy) dan teks/ikon putih
- Ini memberikan **visual feedback** — user tahu menu mana yang sedang dibuka baik dalam mode lebar maupun mode mini-sidebar.

---

### 2.4 Catatan Card (Row Style)

```css
.catatan-card {
    display: flex;
    align-items: center; /* Sejajar di tengah secara vertikal */
    gap: 16px;
    padding: 16px 20px;
    background: #ffffff;
}

.card-checkbox {
    margin: 0;
    align-self: center; /* Checkbox berada persis di tengah baris */
}

.catatan-actions-col {
    opacity: 0;
    transition: opacity 0.15s;
    align-self: center;
}

.catatan-card:hover .catatan-actions-col {
    opacity: 1;
}
```

**Penjelasan:**

- Card menggunakan **flex horizontal** — checkbox di paling kiri, tanggal, konten teks di tengah, tombol aksi di kanan.
- `align-items: center` — Semua elemen sejajar persis di **tengah secara vertikal** (checkbox, blok tanggal angka + bulan, dan tombol aksi sejajar rapi di satu garis horizontal tengah).
- `gap: 16px` — Jarak antar elemen flex yang seragam.
- Tombol aksi (edit, hapus, arsip) **tersembunyi** (`opacity: 0`) dan **muncul saat hover** (`opacity: 1`).
- `transition: opacity 0.15s` — Perubahan opacity terjadi dalam 0.15 detik (smooth).

```css
.catatan-preview {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
}
```

- **Line clamp** — Membatasi teks hanya 2 baris, sisanya disembunyikan dengan "..."
- Berguna untuk preview teks panjang agar card tetap rapi

---

### 2.5 Responsive Design

```css
@media (max-width: 768px) {
    .sidebar {
        position: fixed;
        transform: translateX(-100%);
    }

    .sidebar.open {
        transform: translateX(0);
    }

    .btn-menu {
        display: block;
    }
}
```

**Penjelasan:**

- `@media (max-width: 768px)` — **Media query**. CSS di dalamnya hanya berlaku jika lebar layar **kurang dari 768px** (tablet/HP)
- `position: fixed` — Sidebar jadi mengambang di atas konten
- `transform: translateX(-100%)` — Sidebar **digeser ke kiri** sebesar lebarnya (tersembunyi)
- `transform: translateX(0)` — Sidebar kembali ke posisi normal (terlihat)
- `btn-menu` ditampilkan (`display: block`) hanya di layar kecil

**Alur di HP:**

```
Default:     Sidebar tersembunyi (di luar layar kiri)
Klik Menu:   JavaScript tambah class "open" → sidebar muncul
Klik Luar:   JavaScript hapus class "open" → sidebar tersembunyi lagi
```

---

### 2.6 Transisi & Animasi

```css
.sidebar {
    transition: transform 0.3s ease;
}

.nav-item {
    transition: all 0.15s ease;
}

.btn-primary:hover {
    background: #16213e;
}
```

**Penjelasan:**

- `transition` — Membuat perubahan properti CSS terjadi **secara halus** (tidak instan)
- `0.3s` — Durasi transisi (0.3 detik)
- `ease` — Kurva kecepatan: mulai pelan → cepat → pelan lagi (terasa natural)
- Variasi lain: `linear` (konstan), `ease-in` (mulai pelan), `ease-out` (akhir pelan)

---

## 3. JavaScript — Logika Aplikasi

### 3.1 localStorage (Penyimpanan Data)

```javascript
const STORAGE_KEY = 'catatan-harian';

function getCatatan() {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
}

function simpanSemuaCatatan(data) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}
```

**Penjelasan:**

- `localStorage` — Penyimpanan di browser. Data **tetap ada** meskipun browser ditutup
- `localStorage` hanya bisa menyimpan **string** (teks), bukan objek/array
- `JSON.stringify()` — Mengubah objek/array JavaScript menjadi string JSON untuk disimpan
- `JSON.parse()` — Mengubah string JSON kembali menjadi objek/array JavaScript
- `|| '[]'` — Jika belum ada data (null), gunakan array kosong sebagai default

**Alur data:**

```
Simpan:  Array → JSON.stringify() → String → localStorage
Ambil:   localStorage → String → JSON.parse() → Array
```

**Contoh:**

```javascript
// Data asli (array of objects)
[{id: 1, judul: "Hari Pertama", isi: "Belajar coding"}]

// Setelah JSON.stringify() — menjadi string
'[{"id":1,"judul":"Hari Pertama","isi":"Belajar coding"}]'

// Disimpan ke localStorage sebagai string
// Saat diambil, JSON.parse() mengubahnya kembali ke array
```

---

### 3.2 Navigasi Halaman

```javascript
navItems.forEach(item => {
    item.addEventListener('click', (e) => {
        e.preventDefault();
        const page = item.dataset.page;
        switchPage(page);
    });
});

function switchPage(name) {
    // Ubah menu yang aktif
    navItems.forEach(n => n.classList.toggle('active', n.dataset.page === name));

    // Ubah halaman yang terlihat
    pages.forEach(p => p.classList.toggle('active', p.id === `page-${name}`));

    // Ubah judul di topbar
    const titles = { semua: 'Semua Catatan', tambah: 'Tulis Baru', arsip: 'Arsip' };
    pageTitle.textContent = titles[name] || '';
}
```

**Penjelasan:**

- `forEach` — Menjalankan fungsi untuk **setiap** elemen dalam array/NodeList
- `addEventListener('click', ...)` — Mendengarkan event klik pada elemen
- `e.preventDefault()` — Mencegah perilaku default link `<a>` (berpindah halaman)
- `item.dataset.page` — Mengambil nilai dari `data-page="semua"` di HTML
- `classList.toggle('active', kondisi)` — Jika kondisi `true`, tambah class. Jika `false`, hapus class

**Alur navigasi:**

```
User klik "Arsip"
  → addEventListener menangkap klik
  → e.preventDefault() mencegah reload
  → dataset.page mengambil nilai "arsip"
  → switchPage('arsip')
    → Semua nav-item: hapus class "active"
    → Nav "arsip": tambah class "active"
    → Semua page: hapus class "active"
    → page-arsip: tambah class "active"
    → Judul topbar berubah ke "Arsip"
```

---

### 3.3 CRUD (Create, Read, Update, Delete)

#### CREATE — Membuat Catatan Baru

```javascript
btnSimpan.addEventListener('click', () => {
    const tanggal = inputTanggal.value;
    const judul = inputJudul.value.trim();
    const isi = isiEditor ? isiEditor.innerHTML.trim() : '';
    const plainText = isiEditor ? isiEditor.innerText.trim() : '';
    const kategori = inputKategori.value;

    // Validasi: pastikan semua field terisi
    if (!tanggal || !judul || !plainText) {
        const field = !tanggal ? inputTanggal : !judul ? inputJudul : isiEditor;
        field.focus();
        field.style.borderColor = '#dc2626';
        setTimeout(() => field.style.borderColor = '', 1500);
        return;  // Hentikan eksekusi, jangan simpan
    }

    const catatan = getCatatan();

    // Buat objek catatan baru
    catatan.unshift({
        id: Date.now(),          // ID unik dari timestamp
        tanggal,                 // Shorthand: sama dengan tanggal: tanggal
        judul,
        isi,
        kategori,
        arsip: false,
        dibuat: new Date().toISOString(),
        diubah: null
    });

    simpanSemuaCatatan(catatan);
});
```

**Penjelasan:**

- `.trim()` — Menghapus spasi di awal dan akhir teks. Mencegah user menyimpan catatan kosong (hanya spasi)
- `!judul` — Jika judul kosong (""), hasilnya `true` (string kosong = falsy di JavaScript)
- `field.focus()` — Memindahkan kursor ke field yang bermasalah
- `setTimeout(() => ..., 1500)` — Menjalankan fungsi setelah 1500ms (1.5 detik). Digunakan untuk menghapus warna merah setelah beberapa saat
- `return` — Menghentikan fungsi di sini. Kode di bawahnya tidak akan dijalankan
- `Date.now()` — Menghasilkan angka unik (milliseconds sejak 1 Januari 1970). Contoh: `1729345678901`
- `catatan.unshift(...)` — Menambahkan item di **awal** array (bukan di akhir seperti `push`)

#### READ — Membaca Data

```javascript
const catatan = getCatatan();  // Ambil semua data dari localStorage
```

#### UPDATE — Mengubah Catatan

```javascript
if (editId !== null) {
    const idx = catatan.findIndex(c => c.id === editId);
    if (idx !== -1) {
        catatan[idx].tanggal = tanggal;
        catatan[idx].judul = judul;
        catatan[idx].isi = isi;
        catatan[idx].kategori = kategori;
        catatan[idx].diubah = new Date().toISOString();
    }
    editId = null;
    btnSimpan.textContent = 'Simpan Catatan';
}
```

**Penjelasan:**

- `editId` — Variabel global yang menyimpan ID catatan yang sedang diedit. `null` artinya tidak sedang edit
- `findIndex()` — Mencari **posisi index** item di array berdasarkan kondisi. Return `-1` jika tidak ditemukan
- `catatan[idx].judul = judul` — Mengubah properti pada posisi yang ditemukan
- Setelah update, `editId` dikembalikan ke `null` dan teks tombol dikembalikan

#### DELETE — Menghapus Catatan

```javascript
function hapusCatatan(id) {
    deleteId = id;                          // Simpan ID yang mau dihapus
    modalHapus.classList.add('active');      // Tampilkan modal konfirmasi
}

btnKonfirmasiHapus.addEventListener('click', () => {
    let catatan = getCatatan().filter(c => c.id !== deleteId);
    simpanSemuaCatatan(catatan);
    // ...render ulang
});
```

**Penjelasan:**

- Hapus tidak langsung dilakukan — user harus **konfirmasi** dulu lewat modal
- `filter()` — Membuat array **baru** yang hanya berisi item yang memenuhi kondisi
- `c.id !== deleteId` — Simpan semua catatan **kecuali** yang ID-nya sama dengan `deleteId`

**Contoh filter:**

```javascript
const catatan = [{id: 1}, {id: 2}, {id: 3}];
const deleteId = 2;

catatan.filter(c => c.id !== deleteId);
// Hasil: [{id: 1}, {id: 3}]  — id 2 terhapus
```

---

### 3.4 Fitur Arsip

```javascript
function showArsipModal(id, action) {
    arsipId = id;
    arsipAction = action;  // 'arsip' atau 'unarsip'
    // Ubah teks modal sesuai aksi
    modalArsip.classList.add('active');
}

btnKonfirmasiArsip.addEventListener('click', () => {
    let catatan = getCatatan();
    const idx = catatan.findIndex(c => c.id === arsipId);
    if (idx !== -1) {
        catatan[idx].arsip = arsipAction === 'arsip';  // true atau false
    }
    simpanSemuaCatatan(catatan);
});
```

**Penjelasan:**

- Arsip tidak menghapus data, hanya mengubah properti `arsip` menjadi `true`
- `arsipAction === 'arsip'` — Menghasilkan boolean: `true` jika arsip, `false` jika unarsip
- Catatan dengan `arsip: true` ditampilkan di halaman Arsip, bukan di halaman utama
- User bisa **mengeluarkan** catatan dari arsip (unarsip) kapan saja

---

### 3.5 Pencarian / Filter

```javascript
inputCari.addEventListener('input', (e) => {
    renderCatatan(e.target.value.trim());
});

function renderCatatan(keyword = '') {
    let catatan = getCatatan().filter(c => !c.arsip);  // Ambil yang bukan arsip

    if (keyword) {
        const q = keyword.toLowerCase();
        catatan = catatan.filter(c =>
            c.judul.toLowerCase().includes(q) ||
            c.isi.toLowerCase().includes(q) ||
            c.kategori.toLowerCase().includes(q)
        );
    }
    // ...render hasil
}
```

**Penjelasan:**

- `addEventListener('input', ...)` — Event `input` menyala **setiap kali** isi field berubah (ketik, hapus, paste)
- `e.target.value` — Mengambil nilai teks yang sedang diketik
- `keyword = ''` — **Default parameter**. Jika tidak diberi argumen, keyword = string kosong
- `.toLowerCase()` — Mengubah ke huruf kecil agar pencarian **tidak case-sensitive**
  - "BELAJAR".toLowerCase() → "belajar"
- `.includes(q)` — Mengecek apakah string mengandung substring `q`
- `||` — Operator OR. Catatan cocok jika keyword ditemukan di judul **ATAU** isi **ATAU** kategori

---

### 3.6 Render / Menampilkan Data

```javascript
function cardHTML(c, isArsip) {
    const d = new Date(c.tanggal + 'T00:00:00');
    const day = d.getDate();
    const monthNames = ['Jan', 'Feb', 'Mar', ...];
    const month = monthNames[d.getMonth()];
    const kategoriClass = c.kategori ? c.kategori.toLowerCase() : '';

    return `
        <div class="catatan-card">
            <div class="catatan-date-col">
                <div class="catatan-day">${day}</div>
                <div class="catatan-month">${month} ${year}</div>
            </div>
            ...
        </div>`;
}
```

**Penjelasan:**

- **Template Literals** (backtick `` ` ``) — Cara modern menulis string di JavaScript
  - Bisa **multi-line** (banyak baris)
  - Bisa menyisipkan variabel/ekspresi dengan `${...}`
- `new Date(c.tanggal + 'T00:00:00')` — Membuat objek tanggal. `T00:00:00` ditambahkan agar timezone konsisten
- `d.getDate()` — Mengambil tanggal (1-31)
- `d.getMonth()` — Mengambil bulan (0-11, **mulai dari 0!**). Januari = 0, Desember = 11
- `monthNames[d.getMonth()]` — Mengambil nama bulan dari array berdasarkan index

```javascript
daftarCatatan.innerHTML = catatan.map(c => cardHTML(c, false)).join('');
```

- `.map()` — Mengubah setiap item array menjadi sesuatu yang baru (dalam hal ini: string HTML)
- `.join('')` — Menggabungkan semua string dalam array menjadi satu string
- `innerHTML` — Mengganti isi HTML elemen dengan string baru

**Contoh alur:**

```javascript
catatan = [{judul: "A"}, {judul: "B"}]

catatan.map(c => cardHTML(c))
// Hasil: ["<div>...A...</div>", "<div>...B...</div>"]

.join('')
// Hasil: "<div>...A...</div><div>...B...</div>"

daftarCatatan.innerHTML = hasil
// HTML di dalam elemen diganti dengan card-card baru
```

---

### 3.7 Modal (Dialog Konfirmasi & Mode Baca Catatan)

Aplikasi memiliki modal untuk konfirmasi aksi (hapus & arsip) serta **Modal Baca Catatan (Reader Modal)**:

```javascript
// Membuka modal baca catatan secara penuh
function bacaCatatan(id) {
    const catatan = getCatatan();
    const c = catatan.find(item => item.id === id);
    if (!c) return;

    viewingNoteId = id;
    detailJudul.textContent = c.judul;
    detailIsi.textContent = c.isi; // Menampilkan seluruh isi catatan
    detailTanggal.textContent = formatTanggal(c.tanggal);
    detailKategori.textContent = c.kategori || 'Umum';
    modalDetail.classList.add('active');
}

// Tutup modal saat klik di luar kotak dialog
modalHapus.addEventListener('click', (e) => {
    if (e.target === modalHapus) closeModal(modalHapus);
});
modalDetail.addEventListener('click', (e) => {
    if (e.target === modalDetail) closeModal(modalDetail);
});

// Tutup modal saat tekan Escape
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeModal(modalHapus);
        closeModal(modalArsip);
        closeModal(modalDetail);
    }
});

function closeModal(modal) {
    if (modal) modal.classList.remove('active');
    deleteId = null;
    arsipId = null;
    viewingNoteId = null;
}
```

**Penjelasan:**

- `e.target` — Elemen yang **benar-benar diklik**. Jika user klik area gelap (overlay), `e.target` = overlay. Jika klik kotak dialog, `e.target` = modal
- `e.target === modalHapus` — Hanya tutup jika yang diklik adalah **overlay** (area luar), bukan kotak dialog
- `e.key === 'Escape'` — Mendeteksi tombol keyboard Escape
- `classList.remove('active')` — Menghapus class `active` → CSS `display: none` → modal menghilang

---

### 3.8 Helper Functions

```javascript
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}
```

**Penjelasan:**

Fungsi keamanan untuk mencegah **XSS (Cross-Site Scripting)**. Jika user menulis kode HTML/JavaScript di catatan, kode tersebut tidak akan dieksekusi.

```javascript
// Tanpa escapeHtml:
judul = "<script>alert('hack')</script>"
// → Script akan dijalankan! Berbahaya!

// Dengan escapeHtml:
judul = "<script>alert('hack')</script>"
// → Menjadi: "&lt;script&gt;alert('hack')&lt;/script&gt;"
// → Ditampilkan sebagai teks biasa, tidak dieksekusi
```

**Cara kerjanya:**

1. Buat elemen `<div>` sementara (tidak ditampilkan)
2. Set `.textContent` — browser otomatis meng-escape karakter berbahaya
3. Ambil `.innerHTML` — hasilnya sudah aman

```javascript
function todayStr() {
    return new Date().toISOString().split('T')[0];
}
```

- `new Date()` — Tanggal dan waktu sekarang
- `.toISOString()` — Format ISO: `"2026-10-19T15:30:00.000Z"`
- `.split('T')[0]` — Pisah di huruf "T", ambil bagian pertama: `"2026-10-19"`
- Hasilnya cocok untuk `<input type="date">`

---

### 3.9 Multi-Select & Aksi Massal (Bulk Actions)

Fitur ini memungkinkan pengguna memilih banyak catatan sekaligus untuk dihapus atau diarsipkan dalam satu klik.

#### A. Menggunakan Struktur Data `Set()`
```javascript
const selectedIds = new Set();
```
- **Mengapa `Set` bukan `Array`?**
  - Pada `Set`, semua item dijamin unik (tidak ada ID ganda).
  - Mengecek apakah suatu ID terpilih (`selectedIds.has(id)`) membutuhkan waktu **O(1)** yang sangat cepat dibandingkan `array.includes()` yang berwaktu O(n).
  - Menambah (`.add(id)`) dan menghapus (`.delete(id)`) item sangat sederhana.

#### B. Sinkronisasi Otomatis "Pilih Semua"
```javascript
const allSelected = hasNotes && selectedVisibleCount === visibleIds.length;
checkSemua.checked = allSelected;
```
- Tombol **"Pilih Semua"** hanya akan aktif (tercentang) jika **seluruh** catatan pada daftar memang sedang dipilih.
- Jika pengguna hanya memilih 1 atau sebagian catatan, tombol "Pilih Semua" tetap dalam keadaan **tidak tercentang** (bersih), sementara toolbar aksi massal menampilkan jumlah catatan yang dipilih (misal: `"1 dipilih"`).
- Hal ini mencegah kebingungan pengguna agar tidak mengira tombol "Pilih Semua" ikut terpilih secara otomatis saat hanya menandai satu catatan.

#### C. Hapus Massal Sekaligus
```javascript
catatan = catatan.filter(c => !selectedIds.has(c.id));
simpanSemuaCatatan(catatan);
clearSelection();
```
- Menggunakan `.filter()` dengan negasi `!selectedIds.has(c.id)` langsung menyaring dan membuang semua catatan yang ID-nya ada dalam daftar terpilih secara bersih.

---

### 3.10 Rich Text Editor & Zero Layout Shift

#### A. Editor Teks Kaya (`contenteditable`)
Menggantikan `<textarea>` biasa dengan elemen `contenteditable="true"` yang dilengkapi toolbar pemformatan modern:
- **Tingkat Besarnya Huruf**: Dropdown untuk mengubah blok teks menjadi Normal (`<p>`), Judul Besar (`<h2>`), atau Subjudul (`<h3>`) menggunakan `document.execCommand('formatBlock')`.
- **Gaya Teks**: Tebal (`bold`), Miring (`italic`), dan Garis Bawah (`underline`).
- **Perataan Teks (Alignment)**: Rata Kiri (`justifyLeft`), Rata Tengah (`justifyCenter`), Rata Kanan (`justifyRight`), dan Rata Kiri-Kanan (`justifyFull`).
- **Daftar (List)**: Daftar Poin Bulat (`insertUnorderedList`) dan Daftar Angka/Nomor (`insertOrderedList`).
- **Warna Teks**: Palet warna preset (Hitam, Merah Penting, Biru, Hijau, Oranye, Ungu, Abu-abu) serta pemilih warna kustom native (`input[type="color"]`) via `document.execCommand('foreColor')`.
- **Hapus Format**: Tombol `removeFormat` untuk mengembalikan teks terpilih ke tampilan normal.
- **Pencegahan Kehilangan Fokus**: Setiap tombol toolbar menangani event `mousedown` dengan `e.preventDefault()` agar seleksi teks pengguna di area editor tidak hilang saat tombol diklik.

#### B. Sanitasi HTML & Keamanan XSS
Agar kode HTML yang disimpan aman dan tidak bisa disusupi script berbahaya:
- `sanitizeHtml(dirty)` menyaring tag hanya pada daftar tag yang diizinkan (`p`, `b`, `i`, `u`, `h1`-`h6`, `ul`, `ol`, `li`, `span`) dan membersihkan atribut berbahaya (hanya mempertahankan `style` warna dan dekorasi teks yang aman).
- `stripHtml(html)` digunakan pada pratinjau kartu catatan dan pencarian agar menampilkan teks murni tanpa tag HTML mentah.

#### C. Arsitektur Zero Layout Shift (Desktop & Mobile)
Untuk mengatasi masalah tata letak yang bergeser atau meloncat saat "Pilih Semua" diklik:
- **Pada Desktop (`> 768px`)**:
  - `.content-header` dikunci dengan `min-height: 44px; display: flex; align-items: center;`.
  - Teks informasi/subtitle (`info-catatan` & `info-arsip`) disembunyikan dan digantikan langsung oleh toolbar aksi massal (`bulk-actions`) di posisi yang sama persis saat ada item terpilih (`count > 0`).
  - Hasilnya, tinggi kontainer header tidak berubah sama sekali dan kartu di bawahnya tidak bergeser satu milimeter pun.
- **Pada Mobile (`<= 768px`)**:
  - Header dikunci menjadi satu baris horizontal rapi tanpa teks subtitle berlebih yang berisiko terlipat (*wrap*).
  - Menu aksi massal (*Hapus*, *Arsipkan*, *Keluarkan*) dialihkan menjadi **Floating Bottom Action Bar** yang melayang mulus dari bawah layar (seperti pada aplikasi WhatsApp, iOS Notes, atau Gmail).
  - Header atas tidak melonjak turun, kartu catatan tetap stabil di posisinya, dan tombol aksi berada tepat di area jangkauan jempol pengguna (*thumb zone*).

---

### 3.11 Fitur Sematkan Catatan (Note Pinning)

Fitur sematkan memungkinkan pengguna menandai catatan penting agar **selalu berada di urutan paling atas** daftar, meskipun catatan tersebut sudah dibuat lama dan ada catatan baru setelahnya.

#### A. Logika Pengurutan Multi-Kriteria (Sort by Pin & Date)
```javascript
catatan.sort((a, b) => {
    const pinA = !!a.pinned;
    const pinB = !!b.pinned;
    if (pinA !== pinB) {
        return pinB ? 1 : -1; // Catatan yang di-pin selalu di posisi teratas
    }
    return new Date(b.tanggal) - new Date(a.tanggal); // Jika sama, urutkan tanggal terbaru
});
```
- Bila catatan A disematkan dan B tidak, catatan A otomatis naik ke paling atas.
- Bila ada beberapa catatan yang sama-sama disematkan, sesama catatan tersemat tetap diurutkan rapi berdasarkan tanggal terbaru.
- Catatan yang tidak disematkan akan tersusun rapi di bawah semua catatan tersemat.

#### B. Indikator Visual yang Jelas
- **Garis Aksen Emas/Amber**: Kartu yang tersemat memiliki garis aksen tepi kiri `border-left: 3px solid #f59e0b` dengan warna latar lembut `#fffdf7`.
- **Badge Status "Disematkan"**: Di samping judul catatan, terdapat lencana khusus `[📌 DISEMATKAN]` dengan warna amber bernuansa modern.
- **Ikon Pin Interaktif**: Tombol ikon pin pada baris aksi berubah menjadi berwarna emas padat saat aktif.

#### C. Fleksibilitas Penggunaan Pin & Label Dinamis
Pengguna dapat menyematkan atau melepas sematan catatan melalui 3 cara dengan label kontekstual:
1. **Tombol Cepat pada Kartu**: Klik ikon pushpin langsung di baris kartu catatan (tooltip dinamis: *"Sematkan ke Atas"* jika belum disematkan, *"Lepas Sematan"* jika sudah disematkan).
2. **Modal Baca/Detail**: Di dalam modal pembaca lengkap terdapat tombol dinamis yang otomatis menyesuaikan status (*"Sematkan"* atau *"Lepas Sematan"*).
3. **Aksi Massal (Bulk Pin / Unpin)**: Saat memilih catatan, tombol aksi di bilah atas maupun dropdown mobile secara pintar membaca status catatan terpilih. Jika seluruh catatan yang dipilih sudah disematkan, tombol otomatis berganti label menjadi **"Lepas Sematan"**; jika belum disematkan, tombol berlabel **"Sematkan"**.

---

### 3.12 Perbaikan Overflow & Scrolling (Flexbox Viewport Bug)

Sebelumnya, ketika jumlah catatan melebihi tinggi layar, catatan paling bawah terpotong di tepi layar dan halaman tidak dapat digulir (*scroll*) ke bawah.

#### A. Penyebab Teknis (CSS Flexbox Spec)
- Pada CSS Flexbox, elemen anak kontainer (*flex items*) memiliki nilai bawaan `min-height: auto`.
- Akibatnya, elemen kontainer utama (`.main-content`) dan halaman (`.page`) menolak menyusut (*shrink*) dan justru mengembang melebihi tinggi layar (`100vh`).
- Karena elemen `body` memiliki `overflow: hidden`, konten yang meregang melebihi batas layar langsung terpotong (*clipped*) tanpa memicu scrollbar sama sekali.

#### B. Solusi Arsitektur
1. **Membatasi Kontainer Utama**:
   ```css
   .main-content {
       flex: 1;
       display: flex;
       flex-direction: column;
       min-height: 0;
       min-width: 0;
       height: 100vh;
       overflow: hidden;
   }
   ```
   Menetapkan `min-height: 0` dan `height: 100vh` memaksa kontainer untuk patuh pada batasan viewport.

2. **Scroll Khusus Area Halaman**:
   ```css
   .page {
       display: none;
       flex-direction: column;
       flex: 1;
       min-height: 0;
       height: calc(100vh - 64px);
       overflow-y: auto;
       overflow-x: hidden;
       padding: 24px 28px 90px 28px;
       -webkit-overflow-scrolling: touch;
   }
   ```
   - `height: calc(100vh - 64px)` mengunci tinggi area konten tepat di bawah topbar (64px).
   - `overflow-y: auto` mengaktifkan scrollbar vertikal halus kapan pun kartu catatan melebihi tinggi area baca.
   - `padding-bottom: 90px` serta `margin-bottom: 32px` pada daftar kartu memastikan kartu paling bawah selalu memiliki ruang bernapas luas dan tidak pernah tertutup tepi layar atau tombol melayang.

---

### 3.13 Menu Dropdown Aksi Massal Mobile & Konsistensi Tinggi Kartu

Revisi desain khusus untuk mengoptimalkan tampilan mobile dan keseragaman visual:

#### A. Menu Dropdown Vertikal pada Floating Bar Mobile
- **Akar Masalah**: Menempatkan 3-4 tombol aksi teks secara horizontal pada floating action bar membuat bilah melebar melebihi layar HP (360px) sehingga lencana counter di sebelah kiri terpotong tepi layar.
- **Solusi Menu Dropdown**:
  - Pada layar mobile, bilah bawah hanya menampilkan lencana pilihan (`1 dipilih`) dan tombol trigger `[Pilih Aksi ▾]`.
  - Saat tombol ditekan, menu dropdown muncul melayang ke atas dengan opsi-opsi yang bersejajar vertikal ke bawah (*full-width items*):
    - 📌 Sematkan Catatan
    - 📦 Arsipkan Catatan
    - 🗑️ Hapus Catatan
  - Menyediakan target sentuh yang luas, nyaman diakses jempol (*thumb zone*), dan dijamin 100% tidak pernah meluber ke luar layar.

#### B. Keseragaman Tinggi Kartu Catatan (Konsistensi Desktop & Mobile)
- **Akar Masalah**: Sebelumnya, catatan yang disematkan atau pernah diedit tampak lebih tinggi daripada catatan biasa karena label *"Diubah"* muncul di baris ketiga terpisah, sementara badge sematan membuat baris pertama terlipat (*wrap*).
- **Solusi Desain 2 Baris yang Konsisten & Sejajar Lurus**:
  1. **Baris 1 (`catatan-top-row`)**: Disusun berurutan: Judul (`flex: 1`) $\rightarrow$ Kategori (`[UMUM]`) $\rightarrow$ Penanda `• diedit` $\rightarrow$ Lencana `[📌 DISEMATKAN]`.
     - Karena kategori dan penanda diedit selalu diletakkan sebelum lencana sematan, posisi label kategori `[UMUM]` selalu sejajar lurus konsisten di seluruh catatan.
     - Penanda `• diedit` terletak persis di sebelah kiri lencana sematan saat catatan disematkan.
     - Seluruh elemen baris atas dikunci dengan `flex-wrap: nowrap; min-height: 22px;`.
  2. **Baris 2 (`catatan-preview`)**: Teks isi catatan yang terpotong rapi dalam 1 baris (`white-space: nowrap; text-overflow: ellipsis;`).
  3. **Aksen Tepi**: Kartu memiliki `border-left: 3px solid transparent` secara default sehingga saat disematkan menjadi `border-left-color: #f59e0b`, dimensi kartu tidak bergeser satu piksel pun.
  4. **Hasil**: Semua kartu (baik yang disematkan, biasa, diedit, maupun baru) memiliki **tinggi yang presisi dan identik (72px pada desktop dan 64px pada mobile)**.

---

### 3.14 Menu Aksi Kartu Dropdown Mobile & Restrukturisasi Footer Modal Baca

Pembaruan ergonomi dan kerapian visual khusus di layar mobile:

#### A. Menu Dropdown Tiga Titik (`[ ⋮ ]`) pada Kartu Catatan Mobile
- **Akar Masalah**: Pada tampilan mobile (<768px), 4-5 tombol aksi berjejer horizontal di sebelah kanan (`[📌] [✏️] [📦] [🗑]`) memakan lebar ~120px sehingga menabrak judul catatan, kategori badge, dan status diedit/sematan di sebelah kiri.
- **Solusi**:
  - **Di Desktop (>768px)**: Tetap mempertahankan deretan tombol aksi cepat pada saat kartu di-*hover* seperti semula.
  - **Di Mobile (≤768px)**: Baris tombol aksi inline disembunyikan total (`display: none !important`), digantikan dengan satu tombol ikon tiga titik vertikal (`.btn-mobile-more`) berukuran 32px yang hemat ruang.
  - Mengembalikan ruang horizontal sebesar ~90px kembali ke judul dan lencana catatan sehingga teks judul tidak terpotong sempit dan tidak saling bertabrakan.
  - Saat tombol tiga titik ditekan:
    - Muncul menu dropdown kartu bertumpuk vertikal dengan opsi lengkap:
      1. 📌 **Sematkan ke Atas** / **Lepas Sematan** (dengan indikator status aktif)
      2. ✏️ **Edit Catatan** (hanya muncul pada catatan non-arsip)
      3. 📦 **Arsipkan Catatan** / 📤 **Keluarkan dari Arsip**
      4. 🗑️ **Hapus Catatan** (warna merah penanda bahaya)
    - Dropdown secara pintar mendeteksi ruang layar: jika ruang di bawah kurang dari 210px, dropdown otomatis membuka ke atas (`open-up`).
    - Kartu yang sedang membuka menu diberi elevasi `z-index: 60`, dan seluruh menu otomatis tertutup jika pengguna mengetuk di luar menu atau menekan tombol `Esc`.

#### B. Restrukturisasi Footer Modal Detail / Reader di Layar Mobile
- **Akar Masalah**: Pada layar mobile sempit, footer modal pembaca catatan mencoba menempatkan statistik kata/karakter di sebelah kiri dan 3 tombol (`[📌 Lepas Sematan] [✏️ Edit] [Tutup]`) di sebelah kanan pada satu baris. Akibatnya teks tombol "Lepas Sematan" terlipat vertikal menjadi 3 baris jelek dan statistik kata terhimpit.
- **Solusi**:
  - Di layar mobile (≤768px), footer disusun ulang secara vertikal bersih dengan Grid Layout:
    1. **Baris Atas (Statistik Penuh)**: Menampilkan jumlah kata & karakter serta keterangan waktu diubah secara melebar penuh tanpa terhimpit.
    2. **Baris Tengah (2 Tombol Sejajar 50%-50%)**:
       - Kolom Kiri: `[📌 Lepas Sematan]` / `[📌 Sematkan]` (lebar 50%, teks `white-space: nowrap`, tidak akan pernah terlipat).
       - Kolom Kanan: `[✏️ Edit]` (lebar 50%).
    3. **Baris Bawah (Tombol Utama Lebar Penuh)**:
       - `[Tutup]` dengan tinggi 40px dan warna primer gelap penuh membentang di bawah, memberikan tombol aksi penutup yang sangat mudah dan nyaman dijangkau jempol pengguna mobile.
  - Tampilan desktop tetap mempertahankan susunan orisinal satu baris horisontal yang elegan.

---

### 3.15 Cadangan & Pemulihan Data (Backup & Restore JSON)

Fitur keamanan data untuk mencegah kehilangan catatan akibat pembersihan cache browser:

- **Cadangkan (Export JSON)**:
  - Menyusun seluruh data catatan aktif, arsip, sampah, kategori kustom, dan metadata versi aplikasi ke dalam format JSON terstruktur:
    ```json
    {
      "app": "Brankas Catatan",
      "version": "2.0",
      "exportedAt": "2026-10-20T...",
      "totalNotes": 12,
      "notes": [...],
      "categories": [...]
    }
    ```
  - Otomatis membuat `Blob` dan mengunduh berkas dengan nama aman `brankas-backup-YYYY-MM-DD.json`.
- **Pemulihan (Restore JSON)**:
  - Membaca file `.json` lokal pengguna dengan `FileReader`.
  - Memvalidasi keabsahan struktur data sebelum disetujui.
  - Memberikan 2 opsi pemulihan:
    1. **Gabungkan (Merge)**: Menggabungkan catatan cadangan ke dalam catatan yang ada tanpa menimpa catatan berbeda (berdasarkan ID).
    2. **Ganti Semua (Overwrite)**: Menggantikan seluruh data browser secara bersih dengan isi file cadangan.
  - Re-render seketika pada semua tampilan tanpa perlu memuat ulang halaman.

---

### 3.16 Tong Sampah (Trash / Recycle Bin) & Pemulihan Permanen

Sistem perlindungan dua tahap dari penghapusan tidak disengaja:

- **Pemisahan Status Data**:
  - Catatan aktif: `!c.arsip && !c.sampah`
  - Catatan arsip: `c.arsip && !c.sampah`
  - Catatan sampah: `!!c.sampah`
- **Alur Kerja Tong Sampah**:
  1. Menghapus catatan dari daftar utama atau arsip akan memindahkannya ke Tong Sampah (`c.sampah = true; c.tanggalSampah = ...;`).
  2. Pin otomatis dilepas saat masuk ke sampah.
  3. Lencana counter di sidebar (`#badge-sampah`) otomatis menampilkan jumlah sampah aktif.
  4. Di halaman Tong Sampah (`#page-sampah`), pengguna dapat:
     - **Pulihkan**: Mengembalikan catatan ke daftar utama.
     - **Hapus Permanen**: Menghapus selamanya dari penyimpanan.
     - **Kosongkan Sampah**: Menghapus seluruh isi tempat sampah sekaligus dengan satu klik konfirmasi.
     - **Aksi Massal Sampah**: Memilih beberapa catatan sekaligus untuk dipulihkan atau dimusnahkan secara permanen.

---

### 3.17 Kunci Catatan Rahasia (PIN 4-Digit Angka - Brankas Lock)

Sistem proteksi privasi tingkat tinggi untuk catatan sensitif/pribadi:

- **Master PIN 4-Digit**:
  - Disimpan dengan aman di `localStorage` dengan kunci `brankas_pin`.
  - Jika belum memiliki PIN, saat pertama kali mengunci catatan sistem akan memandu pembuatan PIN 4-angka baru.
- **Keypad Virtual Touch & Keyboard Responsif**:
  - Modal PIN (`#modal-pin`) dilengkapi dengan 4 kotak digit otomatis maju (*auto-advance*).
  - Dilengkapi keypad angka virtual 0-9, Hapus (Clear), dan Backspace (`⌫`), sangat ergonomis untuk pengguna smartphone atau layar sentuh.
  - Mendukung input keyboard fisik: pengetikan angka 0-9, tombol `Backspace`, dan `Enter`.
  - Dilengkapi animasi getar (*shake feedback*) dan pesan kesalahan jika PIN yang dimasukkan keliru.
- **Penyembunyian Isi pada Kartu (Zero Leakage)**:
  - Catatan yang berstatus `terkunci: true` tidak membocorkan teks preview di kartu dashboard (`•••••••••••••••••••••••• (Catatan Rahasia Terkunci - Masukkan PIN)`).
  - Membuka modal baca atau masuk ke mode edit wajib melewati verifikasi PIN terlebih dahulu.
  - Tersedia tombol cepat penguncian langsung dari header kartu maupun dari dalam modal baca (`#btn-detail-lock-toggle`).

---

### 3.18 Ekspor Catatan (Cetak / PDF, Teks .txt, Salin Clipboard)

Memudahkan pemindahan data dan pembagian catatan ke aplikasi lain:

- **Menu Ekspor Dropdown di Modal Detail**:
  - Ikon ekspor di samping judul modal menampilkan menu popover dengan 3 opsi:
    1. **Cetak / Simpan PDF (`window.print()`)**:
       - Menggunakan aturan `@media print` khusus yang mengisolasi tampilan modal catatan menjadi lembar dokumen bersih tanpa sidebar, tombol, atau navigasi web.
    2. **Unduh File Teks (.txt)**:
       - Mengunduh dokumen teks murni berformat kop rapi berisi judul, kategori, tanggal, dan isi catatan.
    3. **Salin Teks ke Clipboard**:
       - Menggunakan `navigator.clipboard.writeText` dengan fallback `execCommand('copy')` untuk menyalin judul dan isi bersih ke clipboard perangkat.

---

### 3.19 Mode Gelap (Dark Mode Toggle) dengan Persistensi

Mendukung kenyamanan mata dan penghematan daya baterai:

- **Desain Warna Berimbang**:
  - Memanfaatkan variabel CSS (`:root` dan `body.dark-theme`) dengan kontras rasio tinggi:
    - Latar utama: `#0b0f19` / `#0f172a`
    - Kartu dan modal: `#1e293b`
    - Garis tepi: `#334155`
    - Teks: `#f8fafc` dan `#94a3b8`
- **Deteksi Preferensi Sistem & Persistensi**:
  - Otomatis mendeteksi preferensi sistem (`prefers-color-scheme: dark`) saat pertama kali dibuka.
  - Pilihan pengguna disimpan ke `localStorage` (`brankas_theme`), sehingga tema tidak pernah berkedip saat berpindah halaman atau membuka kembali browser.
  - Tombol beralih tema diletakkan di sidebar footer dengan animasi transisi ikon matahari/bulan yang halus.

---

### 3.20 Simpan Otomatis Draf (Auto-Save Draft) pada Workspace Tulis

Mencegah kehilangan ketikan yang belum sempat ditekan tombol simpannya:

- **Penyimpanan Draf Latar Belakang**:
  - Memantau perubahan pada judul, konten editor, tanggal, kategori, dan status kunci dengan debouncing 600ms.
  - Tersimpan di `localStorage` (`brankas_draft`).
- **Indikator Status Visual**:
  - Status bar editor menampilkan lencana hijau centang *"Draf tersimpan"* saat ketikan diamankan.
  - Saat pengguna membuka menu "Tulis Baru", draf otomatis dimuat ulang dan menampilkan status *"Draf dipulihkan"*.
- **Pembersihan Bersih**:
  - Begitu tombol "Simpan Catatan" atau "Batal" ditekan, draf otomatis dibersihkan agar formulir kembali segar untuk catatan berikutnya.

---

### 3.21 Kategori Kustom / Tagar Mandiri dengan Palet Warna Dinamis

Fleksibilitas tak terbatas dalam pengelompokan catatan:

- **Manajemen Kategori Mandiri**:
  - Disimpan persisten di `brankas_categories`.
  - Tombol `+ Kategori Baru` membuka modal pembuatan kategori baru (`#modal-kategori-baru`) dengan validasi anti-duplikat.
- **Palet Warna Dinamis (Hash Algorithm)**:
  - Selain 5 kategori bawaan (`Umum`, `Pekerjaan`, `Pribadi`, `Ide`, `Penting`), kategori buatan pengguna mendapatkan kode warna estetis otomatis berdasarkan algoritma hash nama kategori:
    - *Emerald*, *Cyan*, *Rose*, *Purple*, *Orange*, dan *Indigo*.
  - Warna konsisten di seluruh tampilan desktop, mobile, maupun kartu arsip.

---

### 3.22 Format Checklist Interaktif (To-Do List) pada Editor dan Modal Baca

Mengubah catatan menjadi daftar tugas fungsional:

- **Di Editor Tulis (`#rich-toolbar`)**:
  - Tombol checklist (`#btn-insert-checklist`) memasukkan template item to-do interaktif:
    ```html
    <div class="todo-item">
      <input type="checkbox" class="todo-check">
      <span class="todo-text">Tugas baru...</span>
    </div>
    ```
  - Menekan tombol `Enter` pada baris to-do otomatis membuat baris to-do baru di bawahnya. Menekan `Enter` pada baris kosong otomatis mengakhiri mode to-do dan kembali ke paragraf biasa.
- **Interaktif Langsung di Modal Baca**:
  - Saat membaca catatan di `#modal-detail`, pengguna dapat mencentang atau membatalkan centang checkbox secara langsung tanpa harus masuk ke mode edit!
  - Teks to-do langsung tercoret (*line-through*) dengan aksen warna redup, dan status centang langsung disimpan ke `localStorage` seketika disertai notifikasi toast konfirmasi.

---

### 3.23 Bilah Chip Filter Kategori & Hitungan Real-time

Bilah navigasi cepat berbasis chip horizontal (`.category-chips-bar`) dihadirkan tepat di bawah bilah pencarian pada halaman **Semua Catatan** dan **Arsip**.

- **Navigasi 1-Klik**: Menampilkan chip **Semua** beserta seluruh kategori yang terdaftar (Umum, Pekerjaan, Pribadi, Ide, Penting, maupun kategori kustom buatan pengguna).
- **Badge Counter Dinamis**: Setiap chip dilengkapi badge jumlah catatan yang aktif dalam kategori tersebut, dihitung secara real-time.
- **Komposisi Pencarian Fleksibel**: Pengguna dapat memfilter berdasarkan kategori sambil mengetik kata kunci pencarian sekaligus tanpa kehilangan konteks.
- **Pengalaman Sentuh Mobile**: Baris chip mendukung scroll horizontal mandiri dengan `overflow-x: auto` dan scrollbar tersembunyi, menjaga tata letak tetap rapi pada layar smartphone.

---

### 3.24 Pengaturan & Perubahan PIN Keamanan Brankas

Sistem manajemen keamanan PIN terpusat melalui tombol **Keamanan PIN** di sidebar dan `#modal-ganti-pin`:

- **Alur Cerdas (Setup vs Ganti)**: Jika belum pernah membuat PIN, pengguna langsung diarahkan untuk membuat PIN baru. Jika PIN sudah aktif, sistem mewajibkan verifikasi PIN lama terlebih dahulu demi mencegah perubahan tanpa izin.
- **Validasi Ketat**: Memeriksa bahwa PIN terdiri dari 4 hingga 8 digit angka murni (`/^\d+$/`) serta memastikan input PIN baru dan konfirmasi ulang identik.
- **Pesan Kesalahan Inline**: Dilengkapi indikator error merah informatif jika PIN lama salah atau input konfirmasi tidak cocok.

---

### 3.25 Pintasan Keyboard Cepat (Global Shortcuts & Cheatsheet)

Mendukung alur kerja produktivitas profesional bagi pengguna desktop tanpa perlu menggerakkan mouse:

| Pintasan | Aksi |
|----------|------|
| `Ctrl + S` | Simpan catatan yang sedang ditulis / diedit seketika |
| `Ctrl + N` | Buka form catatan baru (*New Note*) dari halaman mana saja |
| `Ctrl + K` atau `Ctrl + /` | Pindah ke halaman catatan dan langsung memfokuskan kursor ke bilah pencarian |
| `Ctrl + D` | Beralih instan antara Mode Gelap (*Dark*) dan Mode Terang (*Light*) |
| `Ctrl + V` | Tempel gambar langsung dari clipboard ke dalam area editor catatan |
| `Esc` | Menutup dialog modal aktif, dropdown warna, dropdown menu kartu, atau sidebar mobile |
| `Ctrl + ?` | Membuka modal cheatsheet bantuan pintasan tombol (`#modal-shortcuts`) |

---

### 3.26 Progressive Web App (PWA) — Instalasi & Dukungan 100% Offline

Aplikasi Brankas kini dapat dipasang langsung ke layar utama (*homescreen*) smartphone maupun desktop layaknya aplikasi native:

- **Web App Manifest (`manifest.json`)**: Mengonfigurasi nama aplikasi, tema warna statusbar (`#0f141c`), mode tampilan `standalone` bebas bilah browser, dan ikon aplikasi beresolusi tinggi berbasis vektor SVG.
- **Service Worker Mandiri (`sw.js`)**: Mengadopsi strategi *cache-first* dengan *stale-while-revalidate*. Seluruh aset statis (`index.html`, `style.css`, `script.js`, `manifest.json`) di-cache di perangkat sehingga aplikasi dapat dibuka dan digunakan 100% saat tidak ada sinyal internet.
- **Tombol Pasang Otomatis**: Menangkap event browser `beforeinstallprompt` dan memunculkan tombol **Install Aplikasi** di panel cepat sidebar.

---

### 3.27 Dukungan Sisip / Tempel Gambar Ringan (Client-side Resizing)

Pengguna dapat menyisipkan foto atau tangkapan layar langsung ke dalam catatan melalui tombol toolbar atau menempelkan dari clipboard (`Ctrl + V`):

- **Kompresi Otomatis pada Canvas**: Untuk mencegah penyimpanan `localStorage` cepat penuh, gambar beresolusi tinggi otomatis diperkecil ukurannya di sisi peramban menggunakan HTML5 `<canvas>` menjadi dimensi proporsional maksimal 800px dan dikonversi ke JPEG berbobot sangat ringan (~30–60 KB).
- **Sanitasi HTML Aman**: Mesin pembersih `sanitizeHtml()` telah diperluas untuk mengizinkan tag `<img>` yang aman dengan kelas `.editor-embedded-img` tanpa risiko celah keamanan skrip.
- **Tampilan Visual Menawan**: Gambar dilengkapi sudut membulat (*rounded corners*), bayangan halus, batas lembut, dan pembatas responsif 100% lebar layar.

---

### 3.28 Pembersihan Otomatis Sampah 30 Hari & Indikator Kapasitas Penyimpanan

- **Siklus Hidup Tong Sampah 30 Hari**: Setiap kali catatan dibuang, sistem mencatat `tanggalSampah`. Saat aplikasi dibuka, pembersih latar belakang otomatis memusnahkan catatan yang telah berada di sampah lebih dari 30 hari.
- **Badge Hitung Mundur Sisa Hari**: Kartu catatan di halaman Sampah menampilkan label sisa waktu (`Tersisa X hari`). Jika sisa waktu $\le 3$ hari, warna badge otomatis beralih menjadi merah peringatan darurat.
- **Meteran Kapasitas Browser (LocalStorage)**: Di dalam modal cadangan data (`#modal-backup-restore`), tersedia visual progress bar yang menghitung total byte yang terpakai dibandingkan kuota 5 MB peramban, lengkap dengan indikator persentase dan peringatan kapasitas jika mendekati penuh.

---

## 4. Konsep Penting yang Digunakan

| Konsep | Penjelasan |
|--------|-----------|
| **Client-Side Canvas Downscaling** | Teknik kompresi dan downsampling gambar beresolusi tinggi menjadi JPEG ringan untuk menjaga efisiensi LocalStorage |
| **Progressive Web App & Service Worker** | Mekanisme caching aset lokal dan web manifest untuk kapabilitas offline penuh dan instalasi homescreen |
| **Category Chips & Multi-faceted Filter** | Penyaringan data bersusun menggabungkan filter kategori aktif dengan query pencarian teks live |
| **Storage Usage Estimation** | Penghitungan total alokasi memori UTF-16 di LocalStorage untuk meteran visual kapasitas browser |
| **Lifecycle Trash Purging** | Pemusnahan otomatis berbasis timestamp terhadap data sampah yang melampaui masa retensi 30 hari |
| **Global Keyboard Shortcuts Event Bus** | Penanganan kombinasi tombol pintas universal (`Ctrl+S`, `Ctrl+N`, `Ctrl+K`, dll) untuk navigasi cepat |
| **Interactive Checklists in Modal** | Penanganan event delegasi pada DOM reader untuk memperbarui status to-do secara live ke localStorage |
| **Numeric Keypad & Touch UX** | Desain keypad sentuh virtual dengan penanganan input multi-event (keyboard fisik & sentuhan layar) |
| **Zero Data Leakage Masking** | Penyembunyian preview isi catatan terkunci pada dashboard sebelum otentikasi PIN berhasil |
| **Two-Stage Deletion (Trash)** | Pola pemulihan sampah sebelum pemusnahan data secara permanen |
| **Color Hashing Algorithm** | Algoritma penentuan warna kategori baru berbasis karakter string tanpa konfigurasi manual |
| **Print Stylesheet Isolation** | `@media print` untuk menghasilkan lembaran cetak PDF murni dari modal baca |
| **Debounced Auto-Save** | Teknik penundaan eksekusi penyimpanan draf untuk menjaga performa rendering browser |
| **Mobile Dropdown Pattern** | Mengubah tombol aksi horizontal menjadi menu bertumpuk vertikal untuk mencegah overflow di layar kecil |
| **Strict Height Consistency** | Penguncian tinggi baris dan inline tagging agar seluruh kartu seragam tanpa lonjakan tinggi (72px/64px) |
| **Flexbox & Viewport Constraint** | Pengaturan `min-height: 0` dan scrollbar mandiri agar konten panjang tidak terpotong |
| **Multi-Criteria Sorting** | Pengurutan ganda (status pin prioritas utama, dilanjutkan tanggal terbaru) |
| **contenteditable & execCommand** | Pembuatan Rich Text Editor WYSIWYG murni tanpa pustaka eksternal |
| **HTML Sanitization** | Pembersihan tag dan atribut DOM untuk mencegah XSS saat merender teks kaya |
| **Cumulative Layout Shift (CLS) Prevention** | Mengunci tinggi header dan floating bottom bar agar layout tidak bergeser |
| **Set Data Structure** | Koleksi data unik untuk melacak ID catatan terpilih secara efisien |
| **Bulk Operations** | Operasi massal (hapus, arsip, dan pin banyak item sekaligus) |
| **localStorage** | Penyimpanan data di browser yang persisten |
| **JSON** | Format data teks untuk menyimpan objek/array sebagai string |
| **DOM Manipulation** | Mengubah elemen HTML melalui JavaScript |
| **Event Listener** | Mendengarkan dan merespons aksi user (klik, ketik, dll) |
| **Template Literals** | String multi-line dengan interpolasi variabel |
| **Array Methods** | `map`, `filter`, `findIndex`, `forEach`, `sort` untuk mengolah data |
| **Media Query** | CSS yang responsif berdasarkan ukuran layar |
| **SPA Pattern** | Navigasi antar halaman tanpa reload |
| **XSS Prevention** | Mencegah injeksi kode berbahaya |

