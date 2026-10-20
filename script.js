// ===== STORAGE KEYS =====
const STORAGE_KEY = 'catatan-harian';
const THEME_KEY = 'brankas_theme';
const PIN_KEY = 'brankas_pin';
const CATEGORIES_KEY = 'brankas_categories';
const DRAFT_KEY = 'brankas_draft';

const DEFAULT_CATEGORIES = ['Umum', 'Pekerjaan', 'Pribadi', 'Ide', 'Penting'];

function getCatatan() {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
}

function simpanSemuaCatatan(data) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

function getCategories() {
    return JSON.parse(localStorage.getItem(CATEGORIES_KEY) || JSON.stringify(DEFAULT_CATEGORIES));
}

function saveCategories(cats) {
    localStorage.setItem(CATEGORIES_KEY, JSON.stringify(cats));
    renderCategoryOptions();
}

function getMasterPin() {
    return localStorage.getItem(PIN_KEY);
}

function setMasterPin(pin) {
    localStorage.setItem(PIN_KEY, pin);
}

// ===== ELEMENTS =====
const sidebar = document.getElementById('sidebar');
const btnMenu = document.getElementById('btn-menu');
const pageTitle = document.getElementById('page-title');
const navItems = document.querySelectorAll('.nav-item');
const pages = document.querySelectorAll('.page');

const inputTanggal = document.getElementById('tanggal');
const inputJudul = document.getElementById('judul');
const isiEditor = document.getElementById('isi-editor');
const inputKategori = document.getElementById('kategori');
const inputCari = document.getElementById('cari');
const btnSimpan = document.getElementById('btn-simpan');
const btnBatalForm = document.getElementById('btn-batal-form');
const btnTulisCepat = document.getElementById('btn-tulis-cepat');

const daftarCatatan = document.getElementById('daftar-catatan');
const daftarArsip = document.getElementById('daftar-arsip');
const daftarSampah = document.getElementById('daftar-sampah');
const badgeSampah = document.getElementById('badge-sampah');
const infoCatatan = document.getElementById('info-catatan');
const infoArsip = document.getElementById('info-arsip');
const infoSampah = document.getElementById('info-sampah');
const totalCatatanEl = document.getElementById('total-catatan');
const bulanIniEl = document.getElementById('bulan-ini');

// Quick Tools & Theme
const btnToggleTheme = document.getElementById('btn-toggle-theme');
const iconThemeMoon = document.getElementById('icon-theme-moon');
const iconThemeSun = document.getElementById('icon-theme-sun');
const textThemeLabel = document.getElementById('text-theme-label');
const btnOpenBackupModal = document.getElementById('btn-open-backup-modal');

// Select All & Bulk Action Elements (Semua Catatan)
const checkSemua = document.getElementById('check-semua');
const checkAllContainerSemua = document.getElementById('check-all-container-semua');
const dividerSemua = document.getElementById('divider-semua');
const bulkActionsSemua = document.getElementById('bulk-actions-semua');
const selectedBadgeSemua = document.getElementById('selected-badge-semua');
const btnBulkDeleteSemua = document.getElementById('btn-bulk-delete-semua');
const btnBulkArchiveSemua = document.getElementById('btn-bulk-archive-semua');
const btnBulkPinSemua = document.getElementById('btn-bulk-pin-semua');
const btnToggleBulkSemua = document.getElementById('btn-toggle-bulk-semua');
const bulkButtonsGroupSemua = document.getElementById('bulk-buttons-group-semua');

// Select All & Bulk Action Elements (Arsip)
const checkSemuaArsip = document.getElementById('check-semua-arsip');
const checkAllContainerArsip = document.getElementById('check-all-container-arsip');
const dividerArsip = document.getElementById('divider-arsip');
const bulkActionsArsip = document.getElementById('bulk-actions-arsip');
const selectedBadgeArsip = document.getElementById('selected-badge-arsip');
const btnBulkDeleteArsip = document.getElementById('btn-bulk-delete-arsip');
const btnBulkRestoreArsip = document.getElementById('btn-bulk-restore-arsip');
const btnToggleBulkArsip = document.getElementById('btn-toggle-bulk-arsip');
const bulkButtonsGroupArsip = document.getElementById('bulk-buttons-group-arsip');

// Select All & Bulk Action Elements (Sampah)
const checkSemuaSampah = document.getElementById('check-semua-sampah');
const checkAllContainerSampah = document.getElementById('check-all-container-sampah');
const dividerSampah = document.getElementById('divider-sampah');
const bulkActionsSampah = document.getElementById('bulk-actions-sampah');
const selectedBadgeSampah = document.getElementById('selected-badge-sampah');
const btnBulkDeleteSampah = document.getElementById('btn-bulk-delete-sampah');
const btnBulkRestoreSampah = document.getElementById('btn-bulk-restore-sampah');
const btnToggleBulkSampah = document.getElementById('btn-toggle-bulk-sampah');
const bulkButtonsGroupSampah = document.getElementById('bulk-buttons-group-sampah');
const btnKosongkanSampah = document.getElementById('btn-kosongkan-sampah');

// Rich Text Editor Toolbar Elements
const richToolbar = document.getElementById('rich-toolbar');
const toolHeading = document.getElementById('tool-heading');
const btnTextColor = document.getElementById('btn-text-color');
const colorDropdown = document.getElementById('color-dropdown');
const colorPreviewBar = document.getElementById('color-preview-bar');
const nativeColorInput = document.getElementById('native-color-input');
const btnInsertChecklist = document.getElementById('btn-insert-checklist');
const autoSaveIndicator = document.getElementById('auto-save-indicator');
const autoSaveText = document.getElementById('auto-save-text');

// Form Extra Options
const btnTambahKategoriModal = document.getElementById('btn-tambah-kategori-modal');
const kunciCatatanCheckbox = document.getElementById('kunci-catatan-checkbox');

// Modals
const modalHapus = document.getElementById('modal-hapus');
const btnBatal = document.getElementById('btn-batal');
const btnKonfirmasiHapus = document.getElementById('btn-konfirmasi-hapus');
const modalHapusTitle = modalHapus.querySelector('h3');
const modalHapusDesc = modalHapus.querySelector('p');

const modalArsip = document.getElementById('modal-arsip');
const btnBatalArsip = document.getElementById('btn-batal-arsip');
const btnKonfirmasiArsip = document.getElementById('btn-konfirmasi-arsip');
const arsipModalTitle = document.getElementById('arsip-modal-title');
const arsipModalDesc = document.getElementById('arsip-modal-desc');

// Modal Detail / Baca Catatan
const modalDetail = document.getElementById('modal-detail');
const detailKategori = document.getElementById('detail-kategori');
const detailTanggal = document.getElementById('detail-tanggal');
const detailJudul = document.getElementById('detail-judul');
const detailIsi = document.getElementById('detail-isi');
const detailStats = document.getElementById('detail-stats');
const detailDiubah = document.getElementById('detail-diubah');
const btnCloseDetail = document.getElementById('btn-close-detail');
const btnDetailEdit = document.getElementById('btn-detail-edit');
const btnDetailTutup = document.getElementById('btn-detail-tutup');
const btnDetailPin = document.getElementById('btn-detail-pin');
const detailPinText = document.getElementById('detail-pin-text');
const detailPinIcon = document.getElementById('detail-pin-icon');
const btnDetailExport = document.getElementById('btn-detail-export');
const exportDropdownMenu = document.getElementById('export-dropdown-menu');
const btnExportPdf = document.getElementById('btn-export-pdf');
const btnExportTxt = document.getElementById('btn-export-txt');
const btnExportCopy = document.getElementById('btn-export-copy');
const btnDetailLockToggle = document.getElementById('btn-detail-lock-toggle');
const detailLockIcon = document.getElementById('detail-lock-icon');

// Modal PIN
const modalPin = document.getElementById('modal-pin');
const modalPinTitle = document.getElementById('modal-pin-title');
const modalPinDesc = document.getElementById('modal-pin-desc');
const pinInputsRow = document.getElementById('pin-inputs-row');
const pinDigits = document.querySelectorAll('.pin-digit');
const pinErrorMsg = document.getElementById('pin-error-msg');
const btnBatalPin = document.getElementById('btn-batal-pin');
const btnKonfirmasiPin = document.getElementById('btn-konfirmasi-pin');
const btnPinClear = document.getElementById('btn-pin-clear');
const btnPinBackspace = document.getElementById('btn-pin-backspace');

// Modal Kategori Baru
const modalKategoriBaru = document.getElementById('modal-kategori-baru');
const inputKategoriBaru = document.getElementById('input-kategori-baru');
const btnBatalKategoriBaru = document.getElementById('btn-batal-kategori-baru');
const btnSimpanKategoriBaru = document.getElementById('btn-simpan-kategori-baru');

// Modal Backup & Restore
const modalBackupRestore = document.getElementById('modal-backup-restore');
const btnTutupBackupModal = document.getElementById('btn-tutup-backup-modal');
const btnEksekusiBackup = document.getElementById('btn-eksekusi-backup');
const fileRestoreInput = document.getElementById('file-restore-input');
const btnPilihFileRestore = document.getElementById('btn-pilih-file-restore');
const restoreConfirmPanel = document.getElementById('restore-confirm-panel');
const restoreFileName = document.getElementById('restore-file-name');
const restoreNotesCount = document.getElementById('restore-notes-count');
const btnBatalRestore = document.getElementById('btn-batal-restore');
const btnTerapkanRestore = document.getElementById('btn-terapkan-restore');

// Category Filter Chips Elements
const categoryChipsSemua = document.getElementById('category-chips-semua');
const categoryChipsArsip = document.getElementById('category-chips-arsip');

// Editor Rich Toolbar Image Elements
const btnInsertImage = document.getElementById('btn-insert-image');
const imageFileInput = document.getElementById('image-file-input');

// PIN Security Modal Elements
const btnGantiPin = document.getElementById('btn-ganti-pin');
const modalGantiPin = document.getElementById('modal-ganti-pin');
const gantiPinTitle = document.getElementById('ganti-pin-title');
const gantiPinDesc = document.getElementById('ganti-pin-desc');
const groupOldPin = document.getElementById('group-old-pin');
const inputOldPin = document.getElementById('input-old-pin');
const inputNewPin = document.getElementById('input-new-pin');
const inputConfirmPin = document.getElementById('input-confirm-pin');
const pinGantiError = document.getElementById('pin-ganti-error');
const btnBatalGantiPin = document.getElementById('btn-batal-ganti-pin');
const btnSimpanGantiPin = document.getElementById('btn-simpan-ganti-pin');

// Shortcuts Modal Elements
const btnShortcutsModal = document.getElementById('btn-shortcuts-modal');
const modalShortcuts = document.getElementById('modal-shortcuts');
const btnTutupShortcuts = document.getElementById('btn-tutup-shortcuts');

// PWA Install Button
const btnInstallApp = document.getElementById('btn-install-app');

// Storage Meter Elements
const storageMeterContainer = document.getElementById('storage-meter-container');
const storageMeterBar = document.getElementById('storage-meter-bar');
const storageMeterText = document.getElementById('storage-meter-text');

// Toast Notification
const toastNotif = document.getElementById('toast-notif');
const toastMsg = document.getElementById('toast-msg');

// State
let editId = null;
let deleteId = null;
let viewingNoteId = null;
let isBulkDelete = false;
let isBulkArchive = false;
let isBulkRestore = false;
let isPermanentDelete = false;
let arsipId = null;
let arsipAction = 'arsip'; // 'arsip' atau 'unarsip'
let activePage = 'semua';
const selectedIds = new Set();
let pendingRestoreData = null;

// Category Filter State
let activeCategoryFilterSemua = 'semua';
let activeCategoryFilterArsip = 'semua';

// PIN State
let currentPin = '';
let currentPinMode = 'unlock'; // 'setup' | 'unlock' | 'change'
let pendingPinCallback = null;

// Auto-Save Timer
let autoSaveTimer = null;

// ===== SIDEBAR OVERLAY =====
const overlay = document.createElement('div');
overlay.className = 'sidebar-overlay';
document.body.appendChild(overlay);

// ===== INIT =====
function init() {
    autoPurgeTrash();
    initTheme();
    renderCategoryOptions();
    inputTanggal.value = todayStr();
    renderCategoryChips('semua');
    renderCategoryChips('arsip');
    renderCatatan();
    renderArsip();
    renderSampah();
    updateStats();
    updateSelectionUI();
    initPWA();
    initShortcuts();
    initImageFeatures();
    initSecurityPinSettings();
}

// ===== NAVIGATION =====
navItems.forEach(item => {
    item.addEventListener('click', (e) => {
        e.preventDefault();
        const page = item.dataset.page;
        switchPage(page);
        closeSidebar();
    });
});

function switchPage(name) {
    activePage = name;
    clearSelection();

    navItems.forEach(n => n.classList.toggle('active', n.dataset.page === name));
    pages.forEach(p => p.classList.toggle('active', p.id === `page-${name}`));

    const titles = { semua: 'Semua Catatan', tambah: 'Tulis Baru', arsip: 'Arsip', sampah: 'Tong Sampah' };
    pageTitle.textContent = titles[name] || '';

    if (name === 'tambah') {
        if (editId === null) {
            resetForm();
            loadDraftIfExists();
        }
    } else if (name === 'sampah') {
        renderSampah();
    }

    updateSelectionUI();
}

btnTulisCepat.addEventListener('click', () => switchPage('tambah'));

// ===== SIDEBAR TOGGLE =====
function isMobile() {
    return window.innerWidth <= 768;
}

btnMenu.addEventListener('click', () => {
    if (isMobile()) {
        sidebar.classList.toggle('open');
        overlay.classList.toggle('active');
    } else {
        sidebar.classList.toggle('collapsed');
    }
});

overlay.addEventListener('click', closeSidebar);

function closeSidebar() {
    sidebar.classList.remove('open');
    overlay.classList.remove('active');
}

// ===== SIMPAN / UPDATE =====
btnSimpan.addEventListener('click', () => {
    const tanggal = inputTanggal.value;
    const judul = inputJudul.value.trim();
    const isi = isiEditor ? isiEditor.innerHTML.trim() : '';
    const plainText = isiEditor ? isiEditor.innerText.trim() : '';
    const kategori = inputKategori.value;
    const isLocked = kunciCatatanCheckbox ? kunciCatatanCheckbox.checked : false;

    if (!tanggal || !judul || !plainText) {
        const field = !tanggal ? inputTanggal : !judul ? inputJudul : isiEditor;
        if (field) {
            field.focus();
            field.style.borderColor = '#dc2626';
            setTimeout(() => field.style.borderColor = '', 1500);
        }
        return;
    }

    // Jika user mengunci catatan tetapi belum memiliki PIN Brankas
    if (isLocked && !getMasterPin()) {
        requestPin('setup', () => {
            commitSaveCatatan(tanggal, judul, isi, kategori, isLocked);
        }, 'Buat PIN Brankas', 'Catatan ini diatur untuk dikunci. Buat 4-digit PIN untuk mengamankannya.');
        return;
    }

    commitSaveCatatan(tanggal, judul, isi, kategori, isLocked);
});

function commitSaveCatatan(tanggal, judul, isi, kategori, isLocked) {
    const catatan = getCatatan();

    if (editId !== null) {
        const idx = catatan.findIndex(c => c.id === editId);
        if (idx !== -1) {
            catatan[idx].tanggal = tanggal;
            catatan[idx].judul = judul;
            catatan[idx].isi = isi;
            catatan[idx].kategori = kategori;
            catatan[idx].terkunci = isLocked;
            catatan[idx].diubah = new Date().toISOString();
        }
        editId = null;
        btnSimpan.textContent = 'Simpan Catatan';
        showToast('Catatan berhasil diperbarui');
    } else {
        catatan.unshift({
            id: Date.now(),
            tanggal,
            judul,
            isi,
            kategori,
            arsip: false,
            pinned: false,
            sampah: false,
            terkunci: isLocked,
            dibuat: new Date().toISOString(),
            diubah: null
        });
        showToast(isLocked ? 'Catatan rahasia berhasil disimpan 🔒' : 'Catatan berhasil disimpan');
    }

    simpanSemuaCatatan(catatan);
    clearDraft();
    resetForm();
    renderCatatan();
    renderArsip();
    renderSampah();
    updateStats();
    switchPage('semua');
}

btnBatalForm.addEventListener('click', () => {
    editId = null;
    btnSimpan.textContent = 'Simpan Catatan';
    clearDraft();
    resetForm();
    switchPage('semua');
});

// ===== BADGE KATEGORI GENERATOR =====
function getKategoriBadgeHTML(kategori) {
    const catName = kategori || 'Umum';
    const lower = catName.toLowerCase();
    const standardColors = ['umum', 'pekerjaan', 'pribadi', 'ide', 'penting'];
    if (standardColors.includes(lower)) {
        return `<span class="catatan-kategori ${lower}">${escapeHtml(catName)}</span>`;
    }
    // Dynamic color for custom categories
    const hash = catName.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const hues = [
        { bg: '#f3e8ff', text: '#7e22ce' }, // Purple
        { bg: '#cffafe', text: '#0e7490' }, // Cyan
        { bg: '#d1fae5', text: '#047857' }, // Emerald
        { bg: '#ffe4e6', text: '#be123c' }, // Rose
        { bg: '#ffedd5', text: '#c2410c' }, // Orange
        { bg: '#e0e7ff', text: '#4338ca' }  // Indigo
    ];
    const color = hues[hash % hues.length];
    return `<span class="catatan-kategori" style="background: ${color.bg}; color: ${color.text}; border: 1px solid transparent;">${escapeHtml(catName)}</span>`;
}

// ===== CATEGORY FILTER CHIPS =====
function renderCategoryChips(pageType = 'semua') {
    const isSemua = pageType === 'semua';
    const container = isSemua ? categoryChipsSemua : categoryChipsArsip;
    if (!container) return;

    const allCatatan = getCatatan();
    const relevantCatatan = isSemua
        ? allCatatan.filter(c => !c.arsip && !c.sampah)
        : allCatatan.filter(c => !!c.arsip && !c.sampah);

    const categories = getCategories();
    const activeFilter = isSemua ? activeCategoryFilterSemua : activeCategoryFilterArsip;

    // Hitung catatan per kategori
    const counts = {};
    categories.forEach(cat => { counts[cat] = 0; });
    relevantCatatan.forEach(c => {
        const k = c.kategori || 'Umum';
        counts[k] = (counts[k] || 0) + 1;
    });

    let html = `
        <button type="button" class="category-chip ${activeFilter === 'semua' ? 'active' : ''}" data-cat="semua">
            Semua
            <span class="category-chip-count">${relevantCatatan.length}</span>
        </button>
    `;

    categories.forEach(cat => {
        const count = counts[cat] || 0;
        html += `
            <button type="button" class="category-chip ${activeFilter === cat ? 'active' : ''}" data-cat="${escapeHtml(cat)}">
                ${escapeHtml(cat)}
                <span class="category-chip-count">${count}</span>
            </button>
        `;
    });

    container.innerHTML = html;

    container.querySelectorAll('.category-chip').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const cat = btn.dataset.cat;
            if (isSemua) {
                activeCategoryFilterSemua = cat;
                renderCategoryChips('semua');
                renderCatatan(inputCari ? inputCari.value.trim() : '');
            } else {
                activeCategoryFilterArsip = cat;
                renderCategoryChips('arsip');
                renderArsip(inputCari ? inputCari.value.trim() : '');
            }
        });
    });
}

// ===== RENDER CATATAN =====
function renderCatatan(keyword = '') {
    let catatan = getCatatan().filter(c => !c.arsip && !c.sampah);

    // Filter berdasarkan kategori chip aktif
    if (activeCategoryFilterSemua !== 'semua') {
        catatan = catatan.filter(c => (c.kategori || 'Umum') === activeCategoryFilterSemua);
    }

    if (keyword) {
        const q = keyword.toLowerCase();
        catatan = catatan.filter(c =>
            c.judul.toLowerCase().includes(q) ||
            stripHtml(c.isi).toLowerCase().includes(q) ||
            (c.kategori || '').toLowerCase().includes(q)
        );
    }

    catatan.sort((a, b) => {
        const pinA = !!a.pinned;
        const pinB = !!b.pinned;
        if (pinA !== pinB) {
            return pinB ? 1 : -1;
        }
        return new Date(b.tanggal) - new Date(a.tanggal);
    });

    const total = getCatatan().filter(c => !c.arsip && !c.sampah).length;
    if (infoCatatan) {
        if (keyword || activeCategoryFilterSemua !== 'semua') {
            const filterLabel = activeCategoryFilterSemua !== 'semua' ? `kategori ${activeCategoryFilterSemua}` : '';
            const searchLabel = keyword ? `kata kunci "${keyword}"` : '';
            const combined = [filterLabel, searchLabel].filter(Boolean).join(' & ');
            infoCatatan.textContent = `${catatan.length} hasil ditemukan (${combined})`;
        } else {
            infoCatatan.textContent = `${total} catatan tersimpan`;
        }
    }

    if (catatan.length === 0) {
        daftarCatatan.innerHTML = `
            <div class="empty-state">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" class="empty-icon">
                    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
                    <polyline points="14,2 14,8 20,8"/>
                    <line x1="16" y1="13" x2="8" y2="13"/>
                    <line x1="16" y1="17" x2="8" y2="17"/>
                </svg>
                <h3>${keyword || activeCategoryFilterSemua !== 'semua' ? 'Tidak ditemukan' : 'Belum ada catatan'}</h3>
                <p>${keyword || activeCategoryFilterSemua !== 'semua' ? 'Coba pilih kategori lain atau reset pencarian' : 'Mulai tulis catatan pertamamu'}</p>
            </div>`;
    } else {
        daftarCatatan.innerHTML = catatan.map(c => cardHTML(c, 'semua')).join('');
    }

    updateSelectionUI();
}

// ===== RENDER ARSIP =====
function renderArsip(keyword = '') {
    let arsip = getCatatan().filter(c => !!c.arsip && !c.sampah);

    // Filter berdasarkan kategori chip aktif
    if (activeCategoryFilterArsip !== 'semua') {
        arsip = arsip.filter(c => (c.kategori || 'Umum') === activeCategoryFilterArsip);
    }

    if (keyword) {
        const q = keyword.toLowerCase();
        arsip = arsip.filter(c =>
            c.judul.toLowerCase().includes(q) ||
            stripHtml(c.isi).toLowerCase().includes(q) ||
            (c.kategori || '').toLowerCase().includes(q)
        );
    }

    arsip.sort((a, b) => {
        const pinA = !!a.pinned;
        const pinB = !!b.pinned;
        if (pinA !== pinB) {
            return pinB ? 1 : -1;
        }
        return new Date(b.tanggal) - new Date(a.tanggal);
    });

    const totalArsip = getCatatan().filter(c => !!c.arsip && !c.sampah).length;
    if (infoArsip) {
        if (keyword || activeCategoryFilterArsip !== 'semua') {
            infoArsip.textContent = `${arsip.length} arsip ditemukan`;
        } else {
            infoArsip.textContent = `${totalArsip} catatan diarsipkan`;
        }
    }

    if (arsip.length === 0) {
        daftarArsip.innerHTML = `
            <div class="empty-state">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" class="empty-icon">
                    <path d="M21 8v13H3V8M1 3h22v5H1zM10 12h4"/>
                </svg>
                <h3>Arsip kosong</h3>
                <p>${keyword || activeCategoryFilterArsip !== 'semua' ? 'Tidak ada arsip yang cocok dengan filter' : 'Catatan yang diarsipkan akan muncul di sini'}</p>
            </div>`;
    } else {
        daftarArsip.innerHTML = arsip.map(c => cardHTML(c, 'arsip')).join('');
    }

    updateSelectionUI();
}

// ===== RENDER SAMPAH (TRASH) =====
function renderSampah() {
    if (!daftarSampah) return;
    let sampah = getCatatan().filter(c => !!c.sampah);
    sampah.sort((a, b) => new Date(b.tanggalSampah || b.tanggal) - new Date(a.tanggalSampah || a.tanggal));

    if (infoSampah) {
        infoSampah.textContent = `${sampah.length} catatan di sampah`;
    }

    if (sampah.length === 0) {
        daftarSampah.innerHTML = `
            <div class="empty-state">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" class="empty-icon">
                    <polyline points="3,6 5,6 21,6" />
                    <path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" />
                </svg>
                <h3>Sampah kosong</h3>
                <p>Catatan yang dihapus akan tersimpan sementara di sini</p>
            </div>`;
    } else {
        daftarSampah.innerHTML = sampah.map(c => cardHTML(c, 'sampah')).join('');
    }

    updateSelectionUI();
}

// ===== CARD HTML =====
function cardHTML(c, pageType = 'semua') {
    const d = new Date(c.tanggal + 'T00:00:00');
    const day = d.getDate();
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];
    const month = monthNames[d.getMonth()];
    const year = d.getFullYear();
    const isSelected = selectedIds.has(c.id);
    const isPinned = !c.sampah && !!c.pinned;
    const isLocked = !!c.terkunci;
    const isSampah = pageType === 'sampah' || !!c.sampah;
    const isArsip = pageType === 'arsip';

    const pinBadge = isPinned ? `
        <span class="catatan-pin-badge" title="Disematkan di atas">
            <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M16 12V4h1V2H7v2h1v8l-2 2v2h5.2v6l.8.8.8-.8v-6H18v-2l-2-2z"/>
            </svg>
            <span class="pin-badge-text">Disematkan</span>
        </span>` : '';

    const lockBadge = isLocked ? `
        <span class="catatan-lock-badge" title="Terkunci dengan PIN">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
            </svg>
            <span class="lock-badge-text">Terkunci</span>
        </span>` : '';

    let editedTag = '';
    if (isSampah) {
        const daysInTrash = c.tanggalSampah ? Math.floor((Date.now() - new Date(c.tanggalSampah).getTime()) / (1000 * 60 * 60 * 24)) : 0;
        const remainingDays = Math.max(0, 30 - daysInTrash);
        const isUrgent = remainingDays <= 3;
        editedTag = `
            <span class="trash-countdown-badge ${isUrgent ? 'urgent' : ''}" title="Dihapus permanen otomatis dalam ${remainingDays} hari">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="10"/>
                    <polyline points="12 6 12 12 16 14"/>
                </svg>
                <span class="trash-badge-prefix">Tersisa </span>${remainingDays} hr
            </span>`;
    } else if (c.diubah) {
        editedTag = `<span class="catatan-edited-tag" title="Pernah diubah">• diedit</span>`;
    }

    const pinBtn = isSampah ? '' : `
        <button class="btn-icon pin-btn ${isPinned ? 'pinned' : ''}" 
                title="${isPinned ? 'Lepas Sematan' : 'Sematkan ke Atas'}" 
                onclick="event.stopPropagation(); togglePinCatatan(${c.id})">
            <svg viewBox="0 0 24 24" fill="${isPinned ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="1.8">
                <path d="M16 12V4h1V2H7v2h1v8l-2 2v2h5.2v6l.8.8.8-.8v-6H18v-2l-2-2z"/>
            </svg>
        </button>`;

    const lockBtn = isSampah ? '' : `
        <button class="btn-icon" title="${isLocked ? 'Buka Kunci PIN' : 'Kunci dengan PIN'}" onclick="event.stopPropagation(); toggleLockCatatan(${c.id})">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                <path d="${isLocked ? 'M7 11V7a5 5 0 0 1 10 0v4' : 'M7 11V7a5 5 0 0 1 9.9-1'}"/>
            </svg>
        </button>`;

    const archiveBtn = isSampah ? '' : (isArsip
        ? `<button class="btn-icon unarchive" title="Keluarkan dari Arsip" onclick="event.stopPropagation(); showArsipModal(${c.id}, 'unarsip')">
               <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 8v13H3V8M1 3h22v5H1zM10 12h4"/></svg>
           </button>`
        : `<button class="btn-icon archive" title="Arsipkan" onclick="event.stopPropagation(); showArsipModal(${c.id}, 'arsip')">
               <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 8v13H3V8M1 3h22v5H1zM10 12h4"/></svg>
           </button>`);

    const viewBtn = `
        <button class="btn-icon view" title="Baca Catatan" onclick="event.stopPropagation(); openCatatanFromCard(${c.id})">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                <circle cx="12" cy="12" r="3"/>
            </svg>
        </button>`;

    const editBtn = (isArsip || isSampah) ? '' : `
        <button class="btn-icon" title="Edit" onclick="event.stopPropagation(); editCatatanFromCard(${c.id})">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/>
                <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/>
            </svg>
        </button>`;

    const trashActionsDesktop = isSampah ? `
        <button class="btn-icon restore" title="Pulihkan Catatan" onclick="event.stopPropagation(); pulihkanCatatan(${c.id})">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/>
                <path d="M3 3v5h5"/>
            </svg>
        </button>
        <button class="btn-icon delete" title="Hapus Permanen" onclick="event.stopPropagation(); konfirmasiHapusPermanen(${c.id})">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="3,6 5,6 21,6"/>
                <path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/>
            </svg>
        </button>` : `
        ${lockBtn}
        ${pinBtn}
        ${viewBtn}
        ${editBtn}
        ${archiveBtn}
        <button class="btn-icon delete" title="Pindahkan ke Sampah" onclick="event.stopPropagation(); pindahkanKeSampah(${c.id})">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="3,6 5,6 21,6"/>
                <path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/>
            </svg>
        </button>`;

    const mobileDropdownHTML = isSampah ? `
        <div class="catatan-mobile-menu-wrapper" onclick="event.stopPropagation()">
            <button class="btn-icon btn-mobile-more" id="btn-mobile-more-${c.id}" title="Menu Catatan" onclick="event.stopPropagation(); toggleMobileCardMenu(event, ${c.id})">
                <svg viewBox="0 0 24 24" fill="currentColor">
                    <circle cx="12" cy="5" r="2.2"/>
                    <circle cx="12" cy="12" r="2.2"/>
                    <circle cx="12" cy="19" r="2.2"/>
                </svg>
            </button>
            <div class="catatan-mobile-dropdown" id="mobile-menu-${c.id}">
                <button class="mobile-dropdown-item" onclick="event.stopPropagation(); handleMobileAction(${c.id}, 'restore')">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/>
                        <path d="M3 3v5h5"/>
                    </svg>
                    <span>Pulihkan Catatan</span>
                </button>
                <div class="mobile-dropdown-divider"></div>
                <button class="mobile-dropdown-item danger" onclick="event.stopPropagation(); handleMobileAction(${c.id}, 'hapus-permanen')">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polyline points="3,6 5,6 21,6"/>
                        <path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/>
                    </svg>
                    <span>Hapus Permanen</span>
                </button>
            </div>
        </div>` : `
        <div class="catatan-mobile-menu-wrapper" onclick="event.stopPropagation()">
            <button class="btn-icon btn-mobile-more" id="btn-mobile-more-${c.id}" title="Menu Catatan" onclick="event.stopPropagation(); toggleMobileCardMenu(event, ${c.id})">
                <svg viewBox="0 0 24 24" fill="currentColor">
                    <circle cx="12" cy="5" r="2.2"/>
                    <circle cx="12" cy="12" r="2.2"/>
                    <circle cx="12" cy="19" r="2.2"/>
                </svg>
            </button>
            <div class="catatan-mobile-dropdown" id="mobile-menu-${c.id}">
                <button class="mobile-dropdown-item" onclick="event.stopPropagation(); handleMobileAction(${c.id}, 'toggle-lock')">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                        <path d="${isLocked ? 'M7 11V7a5 5 0 0 1 10 0v4' : 'M7 11V7a5 5 0 0 1 9.9-1'}"/>
                    </svg>
                    <span>${isLocked ? 'Buka Kunci PIN' : 'Kunci Catatan (PIN)'}</span>
                </button>
                <button class="mobile-dropdown-item ${isPinned ? 'is-pinned-action' : ''}" onclick="event.stopPropagation(); handleMobileAction(${c.id}, 'pin')">
                    <svg viewBox="0 0 24 24" fill="${isPinned ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2">
                        <path d="M16 12V4h1V2H7v2h1v8l-2 2v2h5.2v6l.8.8.8-.8v-6H18v-2l-2-2z"/>
                    </svg>
                    <span>${isPinned ? 'Lepas Sematan' : 'Sematkan ke Atas'}</span>
                </button>
                ${!isArsip ? `
                <button class="mobile-dropdown-item" onclick="event.stopPropagation(); handleMobileAction(${c.id}, 'edit')">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/>
                        <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/>
                    </svg>
                    <span>Edit Catatan</span>
                </button>` : ''}
                <button class="mobile-dropdown-item" onclick="event.stopPropagation(); handleMobileAction(${c.id}, '${isArsip ? 'unarsip' : 'arsip'}')">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M21 8v13H3V8M1 3h22v5H1zM10 12h4"/>
                    </svg>
                    <span>${isArsip ? 'Keluarkan dari Arsip' : 'Arsipkan Catatan'}</span>
                </button>
                <div class="mobile-dropdown-divider"></div>
                <button class="mobile-dropdown-item danger" onclick="event.stopPropagation(); handleMobileAction(${c.id}, 'hapus')">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polyline points="3,6 5,6 21,6"/>
                        <path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/>
                    </svg>
                    <span>Pindahkan ke Sampah</span>
                </button>
            </div>
        </div>`;

    const hasImage = /<img\b/i.test(c.isi || '');
    const plainText = stripHtml(c.isi || '').trim();
    let previewText = '';

    if (isLocked) {
        previewText = `<span style="font-style: italic; color: var(--text-dim);">•••••••••••••••••••••••• (Catatan Rahasia Terkunci - Masukkan PIN)</span>`;
    } else if (hasImage) {
        previewText = plainText 
            ? `📷 [Gambar] ${escapeHtml(plainText)}`
            : `📷 [Gambar Terlampir]`;
    } else {
        previewText = plainText 
            ? escapeHtml(plainText) 
            : `<span style="font-style: italic; color: var(--text-dim);">(Catatan Kosong)</span>`;
    }

    const noteTitleText = (c.judul && c.judul.trim()) ? escapeHtml(c.judul.trim()) : '';
    const titleHtml = noteTitleText 
        ? `<span class="catatan-title">${noteTitleText}</span>` 
        : `<span class="catatan-title" style="font-style: italic; color: var(--text-dim); font-weight: normal;">(Tanpa Judul)</span>`;

    return `
        <div class="catatan-card ${isSelected ? 'selected' : ''} ${isPinned ? 'is-pinned' : ''} ${isLocked ? 'is-locked' : ''}" data-id="${c.id}" onclick="handleCardClick(event, ${c.id})" title="${isLocked ? 'Catatan terkunci (Klik untuk memasukkan PIN)' : 'Klik untuk membaca catatan'}">
            <label class="custom-checkbox-container card-checkbox" onclick="event.stopPropagation()" title="Pilih catatan ini">
                <input type="checkbox" class="catatan-item-check" data-id="${c.id}" ${isSelected ? 'checked' : ''} onchange="toggleItemSelect(${c.id})">
                <span class="checkmark"></span>
            </label>
            <div class="catatan-date-col">
                <div class="catatan-day">${day}</div>
                <div class="catatan-month">${month} ${year}</div>
            </div>
            <div class="catatan-body">
                <div class="catatan-top-row">
                    ${titleHtml}
                    ${getKategoriBadgeHTML(c.kategori)}
                    ${lockBadge}
                    ${editedTag}
                    ${pinBadge}
                </div>
                <div class="catatan-preview">${previewText}</div>
            </div>
            <div class="catatan-actions-col">
                ${trashActionsDesktop}
            </div>
            ${mobileDropdownHTML}
        </div>`;
}

// ===== SELECTION & SELECT ALL LOGIC =====
function getVisibleNoteIds() {
    let list = daftarCatatan;
    if (activePage === 'arsip') list = daftarArsip;
    else if (activePage === 'sampah') list = daftarSampah;
    if (!list) return [];
    const cards = list.querySelectorAll('.catatan-card');
    return Array.from(cards).map(card => Number(card.dataset.id));
}

function openCatatanFromCard(id) {
    const c = getCatatan().find(item => item.id === id);
    if (!c) return;

    if (c.terkunci) {
        requestPin('unlock', () => bacaCatatan(id, true), 'Buka Catatan Rahasia', 'Masukkan 4-digit PIN untuk membaca catatan ini.');
    } else {
        bacaCatatan(id);
    }
}

function editCatatanFromCard(id) {
    const c = getCatatan().find(item => item.id === id);
    if (!c) return;

    if (c.terkunci) {
        requestPin('unlock', () => editCatatan(id, true), 'Buka Catatan Rahasia', 'Masukkan PIN untuk mengedit catatan rahasia ini.');
    } else {
        editCatatan(id);
    }
}

function handleCardClick(event, id) {
    // Jangan buka baca jika user klik tombol, checkbox, dropdown, atau link
    if (
        event.target.closest('button') ||
        event.target.closest('input') ||
        event.target.closest('a') ||
        event.target.closest('.card-checkbox') ||
        event.target.closest('.catatan-mobile-menu-wrapper')
    ) return;

    openCatatanFromCard(id);
}

function toggleItemSelect(id) {
    if (selectedIds.has(id)) {
        selectedIds.delete(id);
    } else {
        selectedIds.add(id);
    }
    updateSelectionUI();
}

function toggleSelectAll(page, isChecked) {
    const visibleIds = getVisibleNoteIds();
    if (isChecked) {
        visibleIds.forEach(id => selectedIds.add(id));
    } else {
        visibleIds.forEach(id => selectedIds.delete(id));
    }
    updateSelectionUI();
}

if (checkSemua) {
    checkSemua.addEventListener('change', () => toggleSelectAll('semua', checkSemua.checked));
}

if (checkSemuaArsip) {
    checkSemuaArsip.addEventListener('change', () => toggleSelectAll('arsip', checkSemuaArsip.checked));
}

if (checkSemuaSampah) {
    checkSemuaSampah.addEventListener('change', () => toggleSelectAll('sampah', checkSemuaSampah.checked));
}

function clearSelection() {
    selectedIds.clear();
    if (checkSemua) {
        checkSemua.checked = false;
        checkSemua.indeterminate = false;
    }
    if (checkSemuaArsip) {
        checkSemuaArsip.checked = false;
        checkSemuaArsip.indeterminate = false;
    }
    if (checkSemuaSampah) {
        checkSemuaSampah.checked = false;
        checkSemuaSampah.indeterminate = false;
    }
    if (infoCatatan) infoCatatan.style.display = 'inline-flex';
    if (infoArsip) infoArsip.style.display = 'inline-flex';
    if (infoSampah) infoSampah.style.display = 'inline-flex';
    if (bulkActionsSemua) bulkActionsSemua.classList.remove('active');
    if (bulkActionsArsip) bulkActionsArsip.classList.remove('active');
    if (bulkActionsSampah) bulkActionsSampah.classList.remove('active');
    if (bulkButtonsGroupSemua) bulkButtonsGroupSemua.classList.remove('open');
    if (btnToggleBulkSemua) btnToggleBulkSemua.classList.remove('open');
    if (bulkButtonsGroupArsip) bulkButtonsGroupArsip.classList.remove('open');
    if (btnToggleBulkArsip) btnToggleBulkArsip.classList.remove('open');
    if (bulkButtonsGroupSampah) bulkButtonsGroupSampah.classList.remove('open');
    if (btnToggleBulkSampah) btnToggleBulkSampah.classList.remove('open');
    document.querySelectorAll('.catatan-card').forEach(card => card.classList.remove('selected'));
    document.querySelectorAll('.catatan-item-check').forEach(input => input.checked = false);
}

function updateSelectionUI() {
    const visibleIds = getVisibleNoteIds();
    const hasNotes = visibleIds.length > 0;
    const selectedVisibleCount = visibleIds.filter(id => selectedIds.has(id)).length;
    const count = selectedIds.size;

    // Sinkronisasi status card & checkbox di layar
    document.querySelectorAll('.catatan-card').forEach(card => {
        const id = Number(card.dataset.id);
        const isChecked = selectedIds.has(id);
        card.classList.toggle('selected', isChecked);
        const checkInput = card.querySelector('.catatan-item-check');
        if (checkInput) checkInput.checked = isChecked;
    });

    if (activePage === 'semua') {
        if (checkAllContainerSemua) checkAllContainerSemua.style.display = hasNotes ? 'inline-flex' : 'none';
        if (dividerSemua) dividerSemua.style.display = hasNotes ? 'inline-block' : 'none';

        if (count > 0) {
            bulkActionsSemua.classList.add('active');
            selectedBadgeSemua.textContent = `${count} dipilih`;
            if (infoCatatan) infoCatatan.style.display = 'none';

            // Sinkronisasi teks tombol sematkan vs lepas sematan
            if (btnBulkPinSemua) {
                const allNotes = getCatatan();
                const selectedNotes = allNotes.filter(c => selectedIds.has(c.id));
                const allPinned = selectedNotes.length > 0 && selectedNotes.every(c => !!c.pinned);
                const pinTextEl = btnBulkPinSemua.querySelector('span');
                const pinSvg = btnBulkPinSemua.querySelector('svg');

                if (allPinned) {
                    if (pinTextEl) pinTextEl.textContent = 'Lepas Sematan';
                    btnBulkPinSemua.title = 'Lepas sematan catatan terpilih';
                    if (pinSvg) pinSvg.setAttribute('fill', 'currentColor');
                } else {
                    if (pinTextEl) pinTextEl.textContent = 'Sematkan';
                    btnBulkPinSemua.title = 'Sematkan catatan terpilih';
                    if (pinSvg) pinSvg.setAttribute('fill', 'none');
                }
            }
        } else {
            bulkActionsSemua.classList.remove('active');
            if (infoCatatan) infoCatatan.style.display = 'inline-flex';
        }

        if (checkSemua) {
            checkSemua.checked = hasNotes && selectedVisibleCount === visibleIds.length;
            checkSemua.indeterminate = false;
        }
    } else if (activePage === 'arsip') {
        if (checkAllContainerArsip) checkAllContainerArsip.style.display = hasNotes ? 'inline-flex' : 'none';
        if (dividerArsip) dividerArsip.style.display = hasNotes ? 'inline-block' : 'none';

        if (count > 0) {
            bulkActionsArsip.classList.add('active');
            selectedBadgeArsip.textContent = `${count} dipilih`;
            if (infoArsip) infoArsip.style.display = 'none';
        } else {
            bulkActionsArsip.classList.remove('active');
            if (infoArsip) infoArsip.style.display = 'inline-flex';
        }

        if (checkSemuaArsip) {
            checkSemuaArsip.checked = hasNotes && selectedVisibleCount === visibleIds.length;
            checkSemuaArsip.indeterminate = false;
        }
    } else if (activePage === 'sampah') {
        if (checkAllContainerSampah) checkAllContainerSampah.style.display = hasNotes ? 'inline-flex' : 'none';
        if (dividerSampah) dividerSampah.style.display = hasNotes ? 'inline-block' : 'none';

        if (count > 0) {
            bulkActionsSampah.classList.add('active');
            selectedBadgeSampah.textContent = `${count} dipilih`;
            if (infoSampah) infoSampah.style.display = 'none';
        } else {
            bulkActionsSampah.classList.remove('active');
            if (infoSampah) infoSampah.style.display = 'inline-flex';
        }

        if (checkSemuaSampah) {
            checkSemuaSampah.checked = hasNotes && selectedVisibleCount === visibleIds.length;
            checkSemuaSampah.indeterminate = false;
        }
    }
}

// ===== BULK ACTIONS EVENT LISTENERS =====
if (btnBulkDeleteSemua) {
    btnBulkDeleteSemua.addEventListener('click', triggerBulkMoveToTrash);
}

if (btnBulkDeleteArsip) {
    btnBulkDeleteArsip.addEventListener('click', triggerBulkMoveToTrash);
}

function triggerBulkMoveToTrash() {
    if (selectedIds.size === 0) return;
    deleteId = null;
    isBulkDelete = true;
    isPermanentDelete = false;
    modalHapusTitle.textContent = `Pindahkan ${selectedIds.size} Catatan ke Sampah?`;
    modalHapusDesc.textContent = `${selectedIds.size} catatan yang dipilih akan dipindahkan ke Tong Sampah. Anda masih bisa memulihkannya nanti.`;
    btnKonfirmasiHapus.textContent = 'Pindahkan ke Sampah';
    modalHapus.classList.add('active');
}

if (btnBulkDeleteSampah) {
    btnBulkDeleteSampah.addEventListener('click', () => {
        if (selectedIds.size === 0) return;
        deleteId = null;
        isBulkDelete = true;
        isPermanentDelete = true;
        modalHapusTitle.textContent = `Hapus Permanen ${selectedIds.size} Catatan?`;
        modalHapusDesc.textContent = `${selectedIds.size} catatan terpilih akan dihapus selamanya dari sistem. Tindakan ini tidak dapat dibatalkan.`;
        btnKonfirmasiHapus.textContent = 'Hapus Permanen';
        modalHapus.classList.add('active');
    });
}

if (btnBulkRestoreSampah) {
    btnBulkRestoreSampah.addEventListener('click', () => {
        if (selectedIds.size === 0) return;
        const catatan = getCatatan();
        let count = 0;
        catatan.forEach(c => {
            if (selectedIds.has(c.id) && c.sampah) {
                c.sampah = false;
                delete c.tanggalSampah;
                count++;
            }
        });
        simpanSemuaCatatan(catatan);
        clearSelection();
        renderCatatan(inputCari.value.trim());
        renderArsip();
        renderSampah();
        updateStats();
        showToast(`${count} catatan berhasil dipulihkan`);
    });
}

if (btnKosongkanSampah) {
    btnKosongkanSampah.addEventListener('click', () => {
        const totalSampah = getCatatan().filter(c => !!c.sampah).length;
        if (totalSampah === 0) {
            showToast('Tong sampah sudah kosong');
            return;
        }
        deleteId = null;
        isBulkDelete = false;
        isPermanentDelete = 'empty-all';
        modalHapusTitle.textContent = 'Kosongkan Tong Sampah?';
        modalHapusDesc.textContent = `Semua ${totalSampah} catatan di dalam tong sampah akan dihapus secara permanen. Lanjutkan?`;
        btnKonfirmasiHapus.textContent = 'Kosongkan Sekarang';
        modalHapus.classList.add('active');
    });
}

if (btnBulkArchiveSemua) {
    btnBulkArchiveSemua.addEventListener('click', () => {
        if (selectedIds.size === 0) return;
        isBulkArchive = true;
        arsipModalTitle.textContent = `Arsipkan ${selectedIds.size} Catatan?`;
        arsipModalDesc.textContent = `${selectedIds.size} catatan terpilih akan dipindahkan ke arsip.`;
        btnKonfirmasiArsip.textContent = 'Arsipkan';
        modalArsip.classList.add('active');
    });
}

if (btnBulkRestoreArsip) {
    btnBulkRestoreArsip.addEventListener('click', () => {
        if (selectedIds.size === 0) return;
        let catatan = getCatatan();
        let count = 0;
        catatan.forEach(c => {
            if (selectedIds.has(c.id)) {
                c.arsip = false;
                count++;
            }
        });
        simpanSemuaCatatan(catatan);
        clearSelection();
        renderCatatan(inputCari.value.trim());
        renderArsip();
        updateStats();
        showToast(`${count} catatan dikeluarkan dari arsip`);
    });
}

if (btnBulkPinSemua) {
    btnBulkPinSemua.addEventListener('click', () => {
        if (selectedIds.size === 0) return;
        const catatan = getCatatan();
        const selectedNotes = catatan.filter(c => selectedIds.has(c.id));
        const allPinned = selectedNotes.length > 0 && selectedNotes.every(c => !!c.pinned);
        const newPinnedState = !allPinned;

        catatan.forEach(c => {
            if (selectedIds.has(c.id)) {
                c.pinned = newPinnedState;
            }
        });

        simpanSemuaCatatan(catatan);
        clearSelection();
        renderCatatan(inputCari.value.trim());
        renderArsip();
        showToast(newPinnedState ? 'Catatan terpilih disematkan' : 'Sematan catatan terpilih dilepas');
    });
}

// ===== MOBILE BULK DROPDOWN TOGGLES =====
if (btnToggleBulkSemua && bulkButtonsGroupSemua) {
    btnToggleBulkSemua.addEventListener('click', (e) => {
        e.stopPropagation();
        const isOpen = bulkButtonsGroupSemua.classList.toggle('open');
        btnToggleBulkSemua.classList.toggle('open', isOpen);
    });
}

if (btnToggleBulkArsip && bulkButtonsGroupArsip) {
    btnToggleBulkArsip.addEventListener('click', (e) => {
        e.stopPropagation();
        const isOpen = bulkButtonsGroupArsip.classList.toggle('open');
        btnToggleBulkArsip.classList.toggle('open', isOpen);
    });
}

if (btnToggleBulkSampah && bulkButtonsGroupSampah) {
    btnToggleBulkSampah.addEventListener('click', (e) => {
        e.stopPropagation();
        const isOpen = bulkButtonsGroupSampah.classList.toggle('open');
        btnToggleBulkSampah.classList.toggle('open', isOpen);
    });
}

// ===== MOBILE CARD ACTION DROPDOWN =====
function toggleMobileCardMenu(event, id) {
    if (event) {
        event.stopPropagation();
        event.preventDefault();
    }
    const targetMenu = document.getElementById(`mobile-menu-${id}`);
    if (!targetMenu) return;
    const isAlreadyOpen = targetMenu.classList.contains('open');

    closeAllMobileCardMenus();

    if (!isAlreadyOpen) {
        // Deteksi apakah ruang ke bawah cukup (< 210px) agar bisa open-up
        const wrapper = targetMenu.closest('.catatan-mobile-menu-wrapper');
        if (wrapper) {
            const rect = wrapper.getBoundingClientRect();
            const spaceBelow = window.innerHeight - rect.bottom;
            if (spaceBelow < 210 && rect.top > 210) {
                targetMenu.classList.add('open-up');
            } else {
                targetMenu.classList.remove('open-up');
            }
        }

        targetMenu.classList.add('open');
        const card = targetMenu.closest('.catatan-card');
        if (card) card.classList.add('menu-open');
    }
}

function closeAllMobileCardMenus() {
    document.querySelectorAll('.catatan-mobile-dropdown.open').forEach(menu => {
        menu.classList.remove('open', 'open-up');
        const card = menu.closest('.catatan-card');
        if (card) card.classList.remove('menu-open');
    });
}

function handleMobileAction(id, action) {
    closeAllMobileCardMenus();
    if (action === 'pin') {
        togglePinCatatan(id);
    } else if (action === 'edit') {
        const c = getCatatan().find(item => item.id === id);
        if (c && c.terkunci) {
            requestPin('unlock', () => editCatatan(id, true), 'Buka Catatan Rahasia', 'Masukkan PIN untuk mengedit catatan rahasia ini.');
        } else {
            editCatatan(id);
        }
    } else if (action === 'toggle-lock') {
        toggleLockCatatan(id);
    } else if (action === 'arsip') {
        showArsipModal(id, 'arsip');
    } else if (action === 'unarsip') {
        showArsipModal(id, 'unarsip');
    } else if (action === 'hapus') {
        pindahkanKeSampah(id);
    } else if (action === 'restore') {
        pulihkanCatatan(id);
    } else if (action === 'hapus-permanen') {
        konfirmasiHapusPermanen(id);
    }
}

document.addEventListener('click', (e) => {
    if (!e.target.closest('.catatan-mobile-menu-wrapper')) {
        closeAllMobileCardMenus();
    }
    if (bulkButtonsGroupSemua && !e.target.closest('#bulk-actions-semua')) {
        bulkButtonsGroupSemua.classList.remove('open');
        if (btnToggleBulkSemua) btnToggleBulkSemua.classList.remove('open');
    }
    if (bulkButtonsGroupArsip && !e.target.closest('#bulk-actions-arsip')) {
        bulkButtonsGroupArsip.classList.remove('open');
        if (btnToggleBulkArsip) btnToggleBulkArsip.classList.remove('open');
    }
    if (bulkButtonsGroupSampah && !e.target.closest('#bulk-actions-sampah')) {
        bulkButtonsGroupSampah.classList.remove('open');
        if (btnToggleBulkSampah) btnToggleBulkSampah.classList.remove('open');
    }
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeAllMobileCardMenus();
    }
});

window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        closeAllMobileCardMenus();
    }
});

// ===== TOGGLE PIN CATATAN =====
function togglePinCatatan(id) {
    const catatan = getCatatan();
    const c = catatan.find(item => item.id === id);
    if (!c) return;
    c.pinned = !c.pinned;
    simpanSemuaCatatan(catatan);
    renderCatatan(inputCari.value.trim());
    renderArsip();
    if (viewingNoteId === id && modalDetail.classList.contains('active')) {
        updateModalDetailPinBtn(c.pinned);
    }
    showToast(c.pinned ? 'Catatan disematkan ke atas' : 'Sematan catatan dilepas');
}

// ===== EDIT =====
function editCatatan(id, pinVerified = false) {
    const catatan = getCatatan();
    const c = catatan.find(item => item.id === id);
    if (!c) return;

    if (c.terkunci && !pinVerified) {
        requestPin('unlock', () => editCatatan(id, true), 'Buka Catatan Rahasia', 'Masukkan PIN untuk mengedit catatan rahasia ini.');
        return;
    }

    inputTanggal.value = c.tanggal;
    inputJudul.value = c.judul;
    if (isiEditor) isiEditor.innerHTML = sanitizeHtml(c.isi);
    renderCategoryOptions(c.kategori || 'Umum');
    if (kunciCatatanCheckbox) kunciCatatanCheckbox.checked = !!c.terkunci;

    editId = id;
    btnSimpan.textContent = 'Update Catatan';
    updateEditorStats();
    switchPage('tambah');
}

// ===== TRASH / SAMPAH FUNCTIONS =====
function pindahkanKeSampah(id) {
    const catatan = getCatatan();
    const c = catatan.find(item => item.id === id);
    if (!c) return;
    c.sampah = true;
    c.tanggalSampah = new Date().toISOString();
    c.pinned = false;
    simpanSemuaCatatan(catatan);
    selectedIds.delete(id);
    renderCatatan(inputCari.value.trim());
    renderArsip();
    renderSampah();
    updateStats();
    showToast('Catatan dipindahkan ke Tong Sampah 🗑️');
}

function pulihkanCatatan(id) {
    const catatan = getCatatan();
    const c = catatan.find(item => item.id === id);
    if (!c) return;
    c.sampah = false;
    delete c.tanggalSampah;
    simpanSemuaCatatan(catatan);
    selectedIds.delete(id);
    renderCatatan(inputCari.value.trim());
    renderArsip();
    renderSampah();
    updateStats();
    showToast('Catatan berhasil dipulihkan');
}

function konfirmasiHapusPermanen(id) {
    deleteId = id;
    isBulkDelete = false;
    isPermanentDelete = true;
    modalHapusTitle.textContent = 'Hapus Catatan Permanen?';
    modalHapusDesc.textContent = 'Catatan ini akan dihapus selamanya dari brankas dan tidak dapat dipulihkan. Lanjutkan?';
    btnKonfirmasiHapus.textContent = 'Hapus Permanen';
    modalHapus.classList.add('active');
}

// ===== HAPUS / DELETE CONFIRMATION HANDLER =====
btnKonfirmasiHapus.addEventListener('click', () => {
    let catatan = getCatatan();

    if (isPermanentDelete === 'empty-all') {
        catatan = catatan.filter(c => !c.sampah);
        simpanSemuaCatatan(catatan);
        clearSelection();
        showToast('Tong sampah telah dikosongkan 🗑️');
    } else if (isPermanentDelete) {
        // Hapus permanen
        if (isBulkDelete && selectedIds.size > 0) {
            const count = selectedIds.size;
            catatan = catatan.filter(c => !selectedIds.has(c.id));
            simpanSemuaCatatan(catatan);
            clearSelection();
            showToast(`${count} catatan dihapus permanen`);
        } else if (deleteId !== null) {
            catatan = catatan.filter(c => c.id !== deleteId);
            simpanSemuaCatatan(catatan);
            selectedIds.delete(deleteId);
            deleteId = null;
            showToast('Catatan dihapus permanen');
        }
    } else {
        // Pindahkan ke sampah
        if (isBulkDelete && selectedIds.size > 0) {
            const count = selectedIds.size;
            catatan.forEach(c => {
                if (selectedIds.has(c.id)) {
                    c.sampah = true;
                    c.tanggalSampah = new Date().toISOString();
                    c.pinned = false;
                }
            });
            simpanSemuaCatatan(catatan);
            clearSelection();
            showToast(`${count} catatan dipindahkan ke Tong Sampah`);
        } else if (deleteId !== null) {
            const idx = catatan.findIndex(c => c.id === deleteId);
            if (idx !== -1) {
                catatan[idx].sampah = true;
                catatan[idx].tanggalSampah = new Date().toISOString();
                catatan[idx].pinned = false;
            }
            selectedIds.delete(deleteId);
            deleteId = null;
            simpanSemuaCatatan(catatan);
            showToast('Catatan dipindahkan ke Tong Sampah');
        }
    }

    modalHapus.classList.remove('active');
    isBulkDelete = false;
    isPermanentDelete = false;
    renderCatatan(inputCari.value.trim());
    renderArsip();
    renderSampah();
    updateStats();
});

btnBatal.addEventListener('click', () => closeModal(modalHapus));
modalHapus.addEventListener('click', (e) => { if (e.target === modalHapus) closeModal(modalHapus); });

// ===== SINGLE & BULK ARSIP =====
function showArsipModal(id, action) {
    arsipId = id;
    arsipAction = action;
    isBulkArchive = false;

    if (action === 'arsip') {
        arsipModalTitle.textContent = 'Arsipkan Catatan';
        arsipModalDesc.textContent = 'Catatan akan dipindahkan ke arsip.';
        btnKonfirmasiArsip.textContent = 'Arsipkan';
    } else {
        arsipModalTitle.textContent = 'Keluarkan dari Arsip';
        arsipModalDesc.textContent = 'Catatan akan dikembalikan ke daftar utama.';
        btnKonfirmasiArsip.textContent = 'Keluarkan';
    }
    modalArsip.classList.add('active');
}

btnKonfirmasiArsip.addEventListener('click', () => {
    let catatan = getCatatan();

    if (isBulkArchive && selectedIds.size > 0) {
        catatan.forEach(c => {
            if (selectedIds.has(c.id)) c.arsip = true;
        });
        simpanSemuaCatatan(catatan);
        clearSelection();
        isBulkArchive = false;
        showToast('Catatan terpilih berhasil diarsipkan');
    } else if (arsipId !== null) {
        const idx = catatan.findIndex(c => c.id === arsipId);
        if (idx !== -1) {
            catatan[idx].arsip = arsipAction === 'arsip';
        }
        selectedIds.delete(arsipId);
        simpanSemuaCatatan(catatan);
        arsipId = null;
        showToast(arsipAction === 'arsip' ? 'Catatan berhasil diarsipkan' : 'Catatan dikembalikan dari arsip');
    }

    modalArsip.classList.remove('active');
    renderCatatan(inputCari.value.trim());
    renderArsip();
    renderSampah();
    updateStats();
});

btnBatalArsip.addEventListener('click', () => closeModal(modalArsip));
modalArsip.addEventListener('click', (e) => { if (e.target === modalArsip) closeModal(modalArsip); });

// ===== BACA / DETAIL CATATAN =====
function bacaCatatan(id, pinVerified = false) {
    const catatan = getCatatan();
    const c = catatan.find(item => item.id === id);
    if (!c) return;

    if (c.terkunci && !pinVerified) {
        requestPin('unlock', () => bacaCatatan(id, true), 'Buka Catatan Rahasia', 'Masukkan PIN untuk membuka catatan rahasia ini.');
        return;
    }

    viewingNoteId = id;
    detailJudul.textContent = c.judul;
    detailIsi.innerHTML = sanitizeHtml(c.isi);
    detailTanggal.textContent = formatTanggal(c.tanggal);
    detailKategori.textContent = c.kategori || 'Umum';
    detailKategori.className = 'catatan-kategori ' + (c.kategori ? c.kategori.toLowerCase() : '');

    const plainText = stripHtml(c.isi).trim();
    const words = plainText ? plainText.split(/\s+/).filter(Boolean).length : 0;
    const chars = plainText.length;
    detailStats.textContent = `${words} kata • ${chars} karakter`;

    if (c.diubah) {
        detailDiubah.textContent = '• Pernah diubah';
    } else {
        detailDiubah.textContent = '';
    }

    if (c.arsip || c.sampah) {
        if (btnDetailEdit) btnDetailEdit.style.display = 'none';
        if (btnDetailPin) btnDetailPin.style.gridColumn = '1 / -1';
    } else {
        if (btnDetailEdit) btnDetailEdit.style.display = 'inline-flex';
        if (btnDetailPin) btnDetailPin.style.gridColumn = '';
    }

    updateModalDetailPinBtn(!!c.pinned);
    updateModalDetailLockBtn(!!c.terkunci);
    closeExportDropdown();
    modalDetail.classList.add('active');
}

function updateModalDetailPinBtn(isPinned) {
    if (!btnDetailPin || !detailPinText || !detailPinIcon) return;
    if (isPinned) {
        btnDetailPin.classList.add('pinned');
        detailPinText.textContent = 'Lepas Sematan';
        detailPinIcon.setAttribute('fill', 'currentColor');
    } else {
        btnDetailPin.classList.remove('pinned');
        detailPinText.textContent = 'Sematkan';
        detailPinIcon.setAttribute('fill', 'none');
    }
}

function updateModalDetailLockBtn(isLocked) {
    if (!btnDetailLockToggle || !detailLockIcon) return;
    if (isLocked) {
        btnDetailLockToggle.title = 'Buka Kunci Catatan (Saat ini terkunci)';
        btnDetailLockToggle.classList.add('locked');
        detailLockIcon.innerHTML = `
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
            <path d="M7 11V7a5 5 0 0 1 10 0v4"/>`;
    } else {
        btnDetailLockToggle.title = 'Kunci Catatan (Brankas PIN)';
        btnDetailLockToggle.classList.remove('locked');
        detailLockIcon.innerHTML = `
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
            <path d="M7 11V7a5 5 0 0 1 9.9-1"/>`;
    }
}

if (btnDetailLockToggle) {
    btnDetailLockToggle.addEventListener('click', () => {
        if (viewingNoteId) {
            toggleLockCatatan(viewingNoteId);
        }
    });
}

if (btnDetailPin) {
    btnDetailPin.addEventListener('click', () => {
        if (viewingNoteId) {
            togglePinCatatan(viewingNoteId);
        }
    });
}

if (btnDetailTutup) {
    btnDetailTutup.addEventListener('click', () => closeModal(modalDetail));
}

if (btnCloseDetail) {
    btnCloseDetail.addEventListener('click', () => closeModal(modalDetail));
}

if (btnDetailEdit) {
    btnDetailEdit.addEventListener('click', () => {
        if (viewingNoteId) {
            const idToEdit = viewingNoteId;
            closeModal(modalDetail);
            editCatatan(idToEdit);
        }
    });
}

if (modalDetail) {
    modalDetail.addEventListener('click', (e) => {
        if (e.target === modalDetail) closeModal(modalDetail);
    });
}

// ===== INTERACTIVE CHECKLIST IN DETAIL MODAL =====
if (detailIsi) {
    detailIsi.addEventListener('change', (e) => {
        if (e.target.classList.contains('todo-check')) {
            const item = e.target.closest('.todo-item');
            if (item) {
                const textSpan = item.querySelector('.todo-text');
                if (textSpan) {
                    textSpan.classList.toggle('checked', e.target.checked);
                }
                if (e.target.checked) {
                    e.target.setAttribute('checked', 'checked');
                } else {
                    e.target.removeAttribute('checked');
                }
            }
            if (viewingNoteId) {
                const catatan = getCatatan();
                const c = catatan.find(n => n.id === viewingNoteId);
                if (c) {
                    c.isi = detailIsi.innerHTML;
                    simpanSemuaCatatan(catatan);
                    showToast(e.target.checked ? 'Item diselesaikan ✓' : 'Item belum selesai');
                }
            }
        }
    });
}

// ===== EXPORT CATATAN (PDF, TXT, CLIPBOARD) =====
if (btnDetailExport && exportDropdownMenu) {
    btnDetailExport.addEventListener('click', (e) => {
        e.stopPropagation();
        exportDropdownMenu.classList.toggle('open');
    });

    document.addEventListener('click', (e) => {
        if (!e.target.closest('.export-dropdown-wrapper')) {
            exportDropdownMenu.classList.remove('open');
        }
    });
}

function closeExportDropdown() {
    if (exportDropdownMenu) exportDropdownMenu.classList.remove('open');
}

if (btnExportPdf) {
    btnExportPdf.addEventListener('click', () => {
        closeExportDropdown();
        window.print();
    });
}

if (btnExportTxt) {
    btnExportTxt.addEventListener('click', () => {
        if (!viewingNoteId) return;
        const c = getCatatan().find(item => item.id === viewingNoteId);
        if (!c) return;
        const plain = stripHtml(c.isi);
        const txt = `========================================\n${c.judul}\nKategori: ${c.kategori || 'Umum'} | Tanggal: ${formatTanggal(c.tanggal)}\n========================================\n\n${plain}\n\n----------------------------------------\nDiekspor dari Brankas Catatan`;
        const safeName = (c.judul || 'catatan').replace(/[^a-zA-Z0-9_-]/g, '_').toLowerCase();
        downloadFile(`${safeName}.txt`, txt, 'text/plain;charset=utf-8');
        closeExportDropdown();
        showToast('Catatan diunduh sebagai .txt 📄');
    });
}

if (btnExportCopy) {
    btnExportCopy.addEventListener('click', () => {
        if (!viewingNoteId) return;
        const c = getCatatan().find(item => item.id === viewingNoteId);
        if (!c) return;
        const plain = stripHtml(c.isi);
        const copyText = `${c.judul}\n\n${plain}`;

        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(copyText).then(() => {
                closeExportDropdown();
                showToast('Catatan disalin ke clipboard! 📋');
            }).catch(() => fallbackCopy(copyText));
        } else {
            fallbackCopy(copyText);
        }
    });
}

function fallbackCopy(text) {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed';
    ta.style.left = '-9999px';
    document.body.appendChild(ta);
    ta.select();
    try {
        document.execCommand('copy');
        closeExportDropdown();
        showToast('Catatan disalin ke clipboard! 📋');
    } catch (err) {
        showToast('Gagal menyalin teks');
    }
    document.body.removeChild(ta);
}

function downloadFile(filename, content, mimeType) {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    setTimeout(() => {
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }, 150);
}

// ===== SEARCH =====
inputCari.addEventListener('input', (e) => {
    const val = e.target.value.trim();
    if (activePage === 'arsip') {
        renderArsip(val);
    } else {
        renderCatatan(val);
    }
});

// ===== STATS =====
function updateStats() {
    const catatan = getCatatan();
    const aktif = catatan.filter(c => !c.arsip && !c.sampah);
    totalCatatanEl.textContent = aktif.length;

    const now = new Date();
    const bulanIni = aktif.filter(c => {
        const d = new Date(c.tanggal + 'T00:00:00');
        return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
    });
    bulanIniEl.textContent = bulanIni.length;

    const sampahCount = catatan.filter(c => !!c.sampah).length;
    if (badgeSampah) {
        badgeSampah.textContent = sampahCount;
        badgeSampah.style.display = sampahCount > 0 ? 'inline-flex' : 'none';
    }

    // Refresh chips & storage meter
    renderCategoryChips('semua');
    renderCategoryChips('arsip');
    updateStorageMeterUI();
}

// ===== HELPERS & LIVE EDITOR STATS =====
const charWordCount = document.getElementById('char-word-count');

function updateEditorStats() {
    if (!charWordCount || !isiEditor) return;
    const plainText = isiEditor.innerText.trim();
    const words = plainText ? plainText.split(/\s+/).filter(Boolean).length : 0;
    const charCount = isiEditor.innerText.replace(/\r?\n/g, '').length;

    charWordCount.textContent = `${words} kata • ${charCount} karakter`;
}

if (isiEditor) {
    isiEditor.addEventListener('input', () => {
        updateEditorStats();
        triggerDraftAutoSave();
    });
    isiEditor.addEventListener('keyup', syncToolbarState);
    isiEditor.addEventListener('mouseup', syncToolbarState);

    // Enter key handling for interactive checklist items in editor
    isiEditor.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            const sel = window.getSelection();
            if (sel && sel.rangeCount > 0) {
                const range = sel.getRangeAt(0);
                const currentItem = range.startContainer.nodeType === Node.ELEMENT_NODE
                    ? range.startContainer.closest('.todo-item')
                    : range.startContainer.parentElement?.closest('.todo-item');

                if (currentItem) {
                    const text = currentItem.querySelector('.todo-text')?.innerText.trim() || '';
                    if (text === '' || text === 'Tugas baru...') {
                        e.preventDefault();
                        const p = document.createElement('p');
                        p.innerHTML = '<br>';
                        currentItem.parentNode.insertBefore(p, currentItem.nextSibling);
                        currentItem.remove();
                        const newRange = document.createRange();
                        newRange.setStart(p, 0);
                        newRange.collapse(true);
                        sel.removeAllRanges();
                        sel.addRange(newRange);
                    } else {
                        e.preventDefault();
                        const newItem = document.createElement('div');
                        newItem.className = 'todo-item';
                        newItem.innerHTML = '<input type="checkbox" class="todo-check"><span class="todo-text">&nbsp;</span>';
                        currentItem.parentNode.insertBefore(newItem, currentItem.nextSibling);
                        const span = newItem.querySelector('.todo-text');
                        const newRange = document.createRange();
                        newRange.setStart(span, 0);
                        newRange.collapse(true);
                        sel.removeAllRanges();
                        sel.addRange(newRange);
                    }
                    updateEditorStats();
                    triggerDraftAutoSave();
                }
            }
        }
    });
}

function resetForm() {
    inputTanggal.value = todayStr();
    inputJudul.value = '';
    if (isiEditor) isiEditor.innerHTML = '';
    renderCategoryOptions('Umum');
    if (kunciCatatanCheckbox) kunciCatatanCheckbox.checked = false;
    if (toolHeading) toolHeading.value = 'p';
    updateEditorStats();
}

// ===== RICH TEXT FORMATTING LOGIC =====
if (richToolbar) {
    // Cegah kehilangan seleksi teks saat klik toolbar
    richToolbar.querySelectorAll('button').forEach(btn => {
        btn.addEventListener('mousedown', (e) => e.preventDefault());
    });

    // Perintah tombol formatting
    richToolbar.querySelectorAll('button[data-command]').forEach(btn => {
        btn.addEventListener('click', () => {
            const cmd = btn.dataset.command;
            if (cmd) {
                document.execCommand(cmd, false, null);
                syncToolbarState();
                updateEditorStats();
                triggerDraftAutoSave();
                if (isiEditor) isiEditor.focus();
            }
        });
    });

    // Checklist insert button
    if (btnInsertChecklist) {
        btnInsertChecklist.addEventListener('click', () => {
            insertChecklistToEditor();
        });
    }

    // Tingkat Besarnya Huruf / Heading
    if (toolHeading) {
        toolHeading.addEventListener('change', () => {
            const val = toolHeading.value;
            const tag = val === 'p' ? '<p>' : `<${val}>`;
            try {
                document.execCommand('formatBlock', false, tag);
            } catch (err) {
                document.execCommand('formatBlock', false, val);
            }
            if (isiEditor) isiEditor.focus();
            updateEditorStats();
            triggerDraftAutoSave();
        });
    }

    // Toggle dropdown warna teks
    if (btnTextColor && colorDropdown) {
        btnTextColor.addEventListener('click', (e) => {
            e.stopPropagation();
            colorDropdown.classList.toggle('active');
        });
    }

    // Warna dari swatch
    document.querySelectorAll('.color-swatch-btn[data-color]').forEach(swatch => {
        swatch.addEventListener('mousedown', (e) => e.preventDefault());
        swatch.addEventListener('click', () => {
            applyTextColor(swatch.dataset.color);
        });
    });

    // Warna kustom dari input native
    if (nativeColorInput) {
        nativeColorInput.addEventListener('input', (e) => {
            applyTextColor(e.target.value);
        });
    }

    // Tutup popup warna saat klik di luar
    document.addEventListener('click', (e) => {
        if (colorDropdown && !colorDropdown.contains(e.target) && e.target !== btnTextColor && !btnTextColor?.contains(e.target)) {
            colorDropdown.classList.remove('active');
        }
    });
}

function insertChecklistToEditor() {
    if (!isiEditor) return;
    isiEditor.focus();
    const checklistHTML = `<div class="todo-item"><input type="checkbox" class="todo-check"><span class="todo-text">Tugas baru...</span></div><div><br></div>`;
    try {
        document.execCommand('insertHTML', false, checklistHTML);
    } catch (e) {
        isiEditor.innerHTML += checklistHTML;
    }
    updateEditorStats();
    triggerDraftAutoSave();
}

function applyTextColor(color) {
    if (!color) return;
    document.execCommand('foreColor', false, color);
    if (colorPreviewBar) colorPreviewBar.style.backgroundColor = color;
    if (colorDropdown) colorDropdown.classList.remove('active');
    if (isiEditor) isiEditor.focus();
    updateEditorStats();
    triggerDraftAutoSave();
}

function syncToolbarState() {
    if (!richToolbar) return;

    ['bold', 'italic', 'underline', 'insertUnorderedList', 'insertOrderedList', 'justifyLeft', 'justifyCenter', 'justifyRight', 'justifyFull'].forEach(cmd => {
        const btn = richToolbar.querySelector(`button[data-command="${cmd}"]`);
        if (btn) {
            try {
                const active = document.queryCommandState(cmd);
                btn.classList.toggle('active', !!active);
            } catch (e) {
                btn.classList.remove('active');
            }
        }
    });

    if (toolHeading) {
        const selection = window.getSelection();
        if (selection && selection.rangeCount > 0) {
            let node = selection.anchorNode;
            if (node && node.nodeType === Node.TEXT_NODE) node = node.parentNode;
            const h2 = node?.closest('h2');
            const h3 = node?.closest('h3');
            if (h2) toolHeading.value = 'h2';
            else if (h3) toolHeading.value = 'h3';
            else toolHeading.value = 'p';
        }
    }
}

// ===== AUTO-SAVE DRAFT LOGIC =====
function triggerDraftAutoSave() {
    if (editId !== null) return;
    clearTimeout(autoSaveTimer);
    autoSaveTimer = setTimeout(saveDraft, 600);
}

function saveDraft() {
    if (editId !== null) return;
    const judul = inputJudul ? inputJudul.value.trim() : '';
    const isi = isiEditor ? isiEditor.innerHTML.trim() : '';
    const plain = isiEditor ? isiEditor.innerText.trim() : '';
    const tanggal = inputTanggal ? inputTanggal.value : '';
    const kategori = inputKategori ? inputKategori.value : 'Umum';
    const isLocked = kunciCatatanCheckbox ? kunciCatatanCheckbox.checked : false;

    if (judul || plain) {
        const draft = { judul, isi, tanggal, kategori, isLocked, savedAt: Date.now() };
        localStorage.setItem(DRAFT_KEY, JSON.stringify(draft));
        if (autoSaveIndicator && autoSaveText) {
            autoSaveIndicator.classList.add('saved');
            autoSaveText.textContent = 'Draf tersimpan';
        }
    }
}

function loadDraftIfExists() {
    if (editId !== null) return;
    const raw = localStorage.getItem(DRAFT_KEY);
    if (!raw) return;
    try {
        const draft = JSON.parse(raw);
        if (draft && (draft.judul || stripHtml(draft.isi).trim())) {
            if (draft.judul && inputJudul) inputJudul.value = draft.judul;
            if (draft.isi && isiEditor) isiEditor.innerHTML = sanitizeHtml(draft.isi);
            if (draft.tanggal && inputTanggal) inputTanggal.value = draft.tanggal;
            if (draft.kategori) renderCategoryOptions(draft.kategori);
            if (kunciCatatanCheckbox) kunciCatatanCheckbox.checked = !!draft.isLocked;
            if (autoSaveIndicator && autoSaveText) {
                autoSaveIndicator.classList.add('saved');
                autoSaveText.textContent = 'Draf dipulihkan';
            }
            updateEditorStats();
        }
    } catch (e) {}
}

function clearDraft() {
    localStorage.removeItem(DRAFT_KEY);
    if (autoSaveIndicator && autoSaveText) {
        autoSaveIndicator.classList.remove('saved');
        autoSaveText.textContent = 'Draf tersimpan';
    }
}

if (inputJudul) inputJudul.addEventListener('input', triggerDraftAutoSave);
if (inputTanggal) inputTanggal.addEventListener('change', triggerDraftAutoSave);
if (inputKategori) inputKategori.addEventListener('change', triggerDraftAutoSave);
if (kunciCatatanCheckbox) kunciCatatanCheckbox.addEventListener('change', triggerDraftAutoSave);

// ===== KATEGORI KUSTOM LOGIC =====
function renderCategoryOptions(selectedCategory) {
    if (!inputKategori) return;
    const cats = getCategories();
    inputKategori.innerHTML = cats.map(cat => `<option value="${escapeHtml(cat)}">${escapeHtml(cat)}</option>`).join('');
    if (selectedCategory && cats.includes(selectedCategory)) {
        inputKategori.value = selectedCategory;
    } else if (cats.length > 0) {
        inputKategori.value = cats[0];
    }
}

if (btnTambahKategoriModal && modalKategoriBaru) {
    btnTambahKategoriModal.addEventListener('click', () => {
        if (inputKategoriBaru) inputKategoriBaru.value = '';
        modalKategoriBaru.classList.add('active');
        if (inputKategoriBaru) setTimeout(() => inputKategoriBaru.focus(), 100);
    });
}

if (btnBatalKategoriBaru && modalKategoriBaru) {
    btnBatalKategoriBaru.addEventListener('click', () => {
        closeModal(modalKategoriBaru);
    });
}

if (btnSimpanKategoriBaru) {
    btnSimpanKategoriBaru.addEventListener('click', simpanKategoriBaru);
}

if (inputKategoriBaru) {
    inputKategoriBaru.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            simpanKategoriBaru();
        }
    });
}

function simpanKategoriBaru() {
    if (!inputKategoriBaru) return;
    const val = inputKategoriBaru.value.trim();
    if (!val || val.length < 2) {
        inputKategoriBaru.focus();
        inputKategoriBaru.style.borderColor = '#dc2626';
        setTimeout(() => inputKategoriBaru.style.borderColor = '', 1500);
        return;
    }
    const cats = getCategories();
    const exists = cats.some(c => c.toLowerCase() === val.toLowerCase());
    if (exists) {
        showToast('Kategori sudah ada');
        inputKategoriBaru.focus();
        return;
    }
    cats.push(val);
    saveCategories(cats);
    renderCategoryOptions(val);
    closeModal(modalKategoriBaru);
    showToast(`Kategori "${val}" ditambahkan 🏷️`);
}

// ===== BRANKAS PIN LOCK LOGIC =====
function requestPin(mode, callback, title, desc) {
    currentPinMode = mode;
    pendingPinCallback = callback;
    currentPin = '';

    if (modalPinTitle) {
        modalPinTitle.textContent = title || (mode === 'setup' ? 'Buat PIN Brankas' : 'Masukkan PIN Brankas');
    }
    if (modalPinDesc) {
        modalPinDesc.textContent = desc || (mode === 'setup'
            ? 'Buat 4-digit PIN angka untuk mengamankan catatan rahasia.'
            : 'Masukkan 4-digit PIN untuk membuka catatan rahasia ini.');
    }
    if (btnKonfirmasiPin) {
        btnKonfirmasiPin.textContent = mode === 'setup' ? 'Simpan PIN' : 'Buka Catatan';
    }
    if (pinErrorMsg) pinErrorMsg.textContent = '';
    clearPinInputs();

    modalPin.classList.add('active');
    setTimeout(() => {
        if (pinDigits.length > 0) pinDigits[0].focus();
    }, 100);
}

function clearPinInputs() {
    currentPin = '';
    pinDigits.forEach(input => input.value = '');
    if (pinDigits.length > 0) pinDigits[0].focus();
}

function handlePinDigitInput(val) {
    if (currentPin.length < 4) {
        currentPin += val;
        syncPinBoxes();
        if (currentPin.length === 4) {
            handlePinSubmit();
        }
    }
}

function syncPinBoxes() {
    pinDigits.forEach((input, idx) => {
        input.value = currentPin[idx] || '';
    });
    const nextIdx = Math.min(currentPin.length, 3);
    if (pinDigits[nextIdx]) pinDigits[nextIdx].focus();
}

function handlePinBackspace() {
    if (currentPin.length > 0) {
        currentPin = currentPin.slice(0, -1);
        syncPinBoxes();
        if (pinErrorMsg) pinErrorMsg.textContent = '';
    }
}

function handlePinSubmit() {
    if (currentPin.length < 4) {
        if (pinErrorMsg) pinErrorMsg.textContent = 'Masukkan 4 digit PIN lengkap';
        shakePinRow();
        return;
    }

    const cb = pendingPinCallback;

    if (currentPinMode === 'setup') {
        setMasterPin(currentPin);
        pendingPinCallback = null;
        if (modalPin) modalPin.classList.remove('active');
        currentPin = '';
        clearPinInputs();
        showToast('PIN Brankas berhasil dibuat! 🔒');
        if (cb) cb();
    } else {
        const master = getMasterPin();
        if (currentPin === master) {
            pendingPinCallback = null;
            if (modalPin) modalPin.classList.remove('active');
            currentPin = '';
            clearPinInputs();
            if (cb) cb();
        } else {
            if (pinErrorMsg) pinErrorMsg.textContent = 'PIN salah! Silakan coba lagi.';
            shakePinRow();
            clearPinInputs();
        }
    }
}

function shakePinRow() {
    if (pinInputsRow) {
        pinInputsRow.classList.add('shake');
        setTimeout(() => pinInputsRow.classList.remove('shake'), 450);
    }
}

// Event listeners untuk keyboard pada pin digit
pinDigits.forEach((digitInput) => {
    digitInput.addEventListener('keydown', (e) => {
        if (e.key >= '0' && e.key <= '9') {
            e.preventDefault();
            handlePinDigitInput(e.key);
        } else if (e.key === 'Backspace') {
            e.preventDefault();
            handlePinBackspace();
        } else if (e.key === 'Enter') {
            e.preventDefault();
            handlePinSubmit();
        }
    });
});

// Event listeners untuk numeric keypad touch
document.querySelectorAll('.pin-key[data-val]').forEach(keyBtn => {
    keyBtn.addEventListener('click', (e) => {
        e.preventDefault();
        handlePinDigitInput(keyBtn.dataset.val);
    });
});

if (btnPinClear) {
    btnPinClear.addEventListener('click', (e) => {
        e.preventDefault();
        clearPinInputs();
        if (pinErrorMsg) pinErrorMsg.textContent = '';
    });
}

if (btnPinBackspace) {
    btnPinBackspace.addEventListener('click', (e) => {
        e.preventDefault();
        handlePinBackspace();
    });
}

if (btnKonfirmasiPin) {
    btnKonfirmasiPin.addEventListener('click', handlePinSubmit);
}

if (btnBatalPin) {
    btnBatalPin.addEventListener('click', () => {
        closeModal(modalPin);
        pendingPinCallback = null;
    });
}

function toggleLockCatatan(id) {
    const catatan = getCatatan();
    const c = catatan.find(item => item.id === id);
    if (!c) return;

    if (!getMasterPin()) {
        requestPin('setup', () => {
            c.terkunci = true;
            simpanSemuaCatatan(catatan);
            renderCatatan(inputCari.value.trim());
            renderArsip();
            renderSampah();
            updateStats();
            if (viewingNoteId === id) updateModalDetailLockBtn(true);
            showToast('Catatan berhasil dikunci 🔒');
        }, 'Buat PIN Brankas', 'Buat 4-digit PIN untuk mulai mengunci catatan pribadimu.');
        return;
    }

    if (c.terkunci) {
        requestPin('unlock', () => {
            c.terkunci = false;
            simpanSemuaCatatan(catatan);
            renderCatatan(inputCari.value.trim());
            renderArsip();
            renderSampah();
            updateStats();
            if (viewingNoteId === id) updateModalDetailLockBtn(false);
            showToast('Kunci catatan telah dibuka 🔓');
        }, 'Buka Kunci Catatan', 'Masukkan PIN untuk membuka kunci catatan ini.');
    } else {
        c.terkunci = true;
        simpanSemuaCatatan(catatan);
        renderCatatan(inputCari.value.trim());
        renderArsip();
        renderSampah();
        updateStats();
        if (viewingNoteId === id) updateModalDetailLockBtn(true);
        showToast('Catatan berhasil dikunci 🔒');
    }
}

// ===== CADANGAN & PEMULIHAN (BACKUP & RESTORE JSON) =====
if (btnOpenBackupModal && modalBackupRestore) {
    btnOpenBackupModal.addEventListener('click', () => {
        if (restoreConfirmPanel) restoreConfirmPanel.style.display = 'none';
        if (fileRestoreInput) fileRestoreInput.value = '';
        pendingRestoreData = null;
        updateStorageMeterUI();
        modalBackupRestore.classList.add('active');
    });
}

if (btnTutupBackupModal && modalBackupRestore) {
    btnTutupBackupModal.addEventListener('click', () => {
        closeModal(modalBackupRestore);
    });
}

if (btnEksekusiBackup) {
    btnEksekusiBackup.addEventListener('click', () => {
        const allNotes = getCatatan();
        const allCats = getCategories();
        const backupData = {
            app: 'Brankas Catatan',
            version: '2.0',
            exportedAt: new Date().toISOString(),
            totalNotes: allNotes.length,
            notes: allNotes,
            categories: allCats
        };
        const jsonStr = JSON.stringify(backupData, null, 2);
        const fileName = `brankas-backup-${todayStr()}.json`;
        downloadFile(fileName, jsonStr, 'application/json');
        showToast('File cadangan berhasil diunduh 💾');
    });
}

if (btnPilihFileRestore && fileRestoreInput) {
    btnPilihFileRestore.addEventListener('click', () => {
        fileRestoreInput.click();
    });

    fileRestoreInput.addEventListener('change', (e) => {
        const file = e.target.files && e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (event) => {
            try {
                const parsed = JSON.parse(event.target.result);
                let notes = [];
                let categories = null;

                if (Array.isArray(parsed)) {
                    notes = parsed;
                } else if (parsed && Array.isArray(parsed.notes)) {
                    notes = parsed.notes;
                    categories = parsed.categories;
                } else {
                    showToast('Format file cadangan tidak valid');
                    return;
                }

                pendingRestoreData = { notes, categories };
                if (restoreFileName) restoreFileName.textContent = file.name;
                if (restoreNotesCount) restoreNotesCount.textContent = `${notes.length} catatan ditemukan`;
                if (restoreConfirmPanel) restoreConfirmPanel.style.display = 'block';
            } catch (err) {
                showToast('Gagal membaca file JSON');
            }
        };
        reader.readAsText(file);
    });
}

if (btnBatalRestore && restoreConfirmPanel) {
    btnBatalRestore.addEventListener('click', () => {
        restoreConfirmPanel.style.display = 'none';
        if (fileRestoreInput) fileRestoreInput.value = '';
        pendingRestoreData = null;
    });
}

if (btnTerapkanRestore) {
    btnTerapkanRestore.addEventListener('click', () => {
        if (!pendingRestoreData || !pendingRestoreData.notes) return;

        const modeRadio = document.querySelector('input[name="restore-mode"]:checked');
        const mode = modeRadio ? modeRadio.value : 'merge';

        if (mode === 'overwrite') {
            simpanSemuaCatatan(pendingRestoreData.notes);
            if (pendingRestoreData.categories && Array.isArray(pendingRestoreData.categories)) {
                saveCategories(pendingRestoreData.categories);
            }
        } else {
            // Mode Merge
            const current = getCatatan();
            const noteMap = new Map();
            current.forEach(c => noteMap.set(c.id, c));
            pendingRestoreData.notes.forEach(c => noteMap.set(c.id, c));
            simpanSemuaCatatan(Array.from(noteMap.values()));

            if (pendingRestoreData.categories && Array.isArray(pendingRestoreData.categories)) {
                const merged = Array.from(new Set([...getCategories(), ...pendingRestoreData.categories]));
                saveCategories(merged);
            }
        }

        closeModal(modalBackupRestore);
        restoreConfirmPanel.style.display = 'none';
        if (fileRestoreInput) fileRestoreInput.value = '';
        pendingRestoreData = null;

        renderCatatan(inputCari.value.trim());
        renderArsip();
        renderSampah();
        updateStats();
        showToast('Data berhasil dipulihkan! 🎉');
    });
}

// ===== MODE GELAP / DARK THEME =====
function initTheme() {
    const saved = localStorage.getItem(THEME_KEY);
    if (saved) {
        applyTheme(saved);
    } else {
        const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
        applyTheme(prefersDark ? 'dark' : 'light');
    }
}

function applyTheme(theme) {
    const isDark = theme === 'dark';
    document.body.classList.toggle('dark-theme', isDark);
    if (iconThemeMoon) iconThemeMoon.style.display = isDark ? 'none' : 'block';
    if (iconThemeSun) iconThemeSun.style.display = isDark ? 'block' : 'none';
    if (textThemeLabel) textThemeLabel.textContent = isDark ? 'Mode Terang' : 'Mode Gelap';
}

function toggleTheme() {
    const isDark = document.body.classList.contains('dark-theme');
    const newTheme = isDark ? 'light' : 'dark';
    localStorage.setItem(THEME_KEY, newTheme);
    applyTheme(newTheme);
    showToast(newTheme === 'dark' ? 'Mode Gelap aktif 🌙' : 'Mode Terang aktif ☀️');
}

if (btnToggleTheme) {
    btnToggleTheme.addEventListener('click', toggleTheme);
}

// ===== FLOATING TOAST NOTIFICATION =====
let toastTimeout = null;
function showToast(msg, duration = 2400) {
    if (!toastNotif || !toastMsg) return;
    toastMsg.textContent = msg;
    toastNotif.classList.add('show');
    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => {
        toastNotif.classList.remove('show');
    }, duration);
}

// ===== GENERAL HELPERS =====
function stripHtml(html) {
    if (!html) return '';
    const tmp = document.createElement('div');
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || '';
}

function sanitizeHtml(dirty) {
    if (!dirty) return '';
    // Kompatibilitas catatan lama yang tersimpan dalam teks biasa
    if (!/<[a-z][\s\S]*>/i.test(dirty)) {
        return escapeHtml(dirty).replace(/\n/g, '<br>');
    }

    const parser = new DOMParser();
    const doc = parser.parseFromString(dirty, 'text/html');

    const allowedTags = new Set([
        'P', 'B', 'STRONG', 'I', 'EM', 'U', 'S', 'STRIKE',
        'H1', 'H2', 'H3', 'H4', 'H5', 'H6',
        'UL', 'OL', 'LI', 'BR', 'SPAN', 'DIV', 'BLOCKQUOTE', 'FONT', 'INPUT', 'IMG'
    ]);

    function clean(node) {
        const children = Array.from(node.childNodes);
        for (const child of children) {
            if (child.nodeType === Node.ELEMENT_NODE) {
                if (!allowedTags.has(child.tagName)) {
                    const text = document.createTextNode(child.textContent);
                    node.replaceChild(text, child);
                } else {
                    for (const attr of Array.from(child.attributes)) {
                        const name = attr.name.toLowerCase();
                        if (name === 'style') {
                            const safeStyles = attr.value.split(';')
                                .map(s => s.trim())
                                .filter(s => {
                                    const prop = s.split(':')[0]?.trim().toLowerCase();
                                    return ['color', 'font-size', 'text-decoration', 'font-weight', 'font-style', 'background-color', 'text-align'].includes(prop);
                                })
                                .join('; ');
                            if (safeStyles) {
                                child.setAttribute('style', safeStyles);
                            } else {
                                child.removeAttribute('style');
                            }
                        } else if (name === 'src') {
                            const val = attr.value.trim();
                            if (val.startsWith('data:image/') || val.startsWith('http://') || val.startsWith('https://') || val.startsWith('blob:')) {
                                child.setAttribute('src', val);
                            } else {
                                child.removeAttribute('src');
                            }
                        } else if (name === 'alt') {
                            child.setAttribute('alt', attr.value.substring(0, 100));
                        } else if (['class', 'type', 'checked'].includes(name)) {
                            // Biarkan class dan tipe checkbox todo atau gambar
                        } else if (name === 'color' || name === 'align') {
                            // Biarkan atribut warna font atau align jika ada
                        } else {
                            child.removeAttribute(attr.name);
                        }
                    }
                    clean(child);
                }
            }
        }
    }

    clean(doc.body);
    return doc.body.innerHTML;
}

function todayStr() {
    return new Date().toISOString().split('T')[0];
}

function formatTanggal(dateStr) {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateStr + 'T00:00:00').toLocaleDateString('id-ID', options);
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function closeModal(modal) {
    if (modal) modal.classList.remove('active');
    if (modal === modalHapus) {
        deleteId = null;
        isBulkDelete = false;
        isPermanentDelete = false;
    } else if (modal === modalArsip) {
        arsipId = null;
        isBulkArchive = false;
    } else if (modal === modalDetail) {
        viewingNoteId = null;
        closeExportDropdown();
    } else if (modal === modalPin) {
        pendingPinCallback = null;
        currentPin = '';
        if (pinErrorMsg) pinErrorMsg.textContent = '';
        clearPinInputs();
    } else if (modal === modalGantiPin) {
        if (inputOldPin) inputOldPin.value = '';
        if (inputNewPin) inputNewPin.value = '';
        if (inputConfirmPin) inputConfirmPin.value = '';
        if (pinGantiError) {
            pinGantiError.textContent = '';
            pinGantiError.style.display = 'none';
        }
    }
}

// ===== PEMBERSIHAN OTOMATIS TONG SAMPAH (30 HARI) =====
function autoPurgeTrash() {
    try {
        const list = getCatatan();
        const now = Date.now();
        const thirtyDaysMs = 30 * 24 * 60 * 60 * 1000;
        const kept = list.filter(c => {
            if (!c.sampah) return true;
            if (!c.tanggalSampah) return true;
            const diff = now - new Date(c.tanggalSampah).getTime();
            return diff < thirtyDaysMs;
        });
        if (kept.length !== list.length) {
            simpanSemuaCatatan(kept);
        }
    } catch (e) {
        console.error('Error during auto-purge:', e);
    }
}

// ===== DUKUNGAN SISIP & TEMPEL GAMBAR RINGAN =====
function compressImage(file, callback) {
    if (!file || !file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
            const canvas = document.createElement('canvas');
            let width = img.width;
            let height = img.height;
            const maxDim = 800; // Resolusi seimbang: tajam & hemat storage

            if (width > height) {
                if (width > maxDim) {
                    height = Math.round((height * maxDim) / width);
                    width = maxDim;
                }
            } else {
                if (height > maxDim) {
                    width = Math.round((width * maxDim) / height);
                    height = maxDim;
                }
            }

            canvas.width = width;
            canvas.height = height;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0, width, height);

            // Kompresi ke format JPEG (0.75 quality) untuk menjaga batas penyimpanan
            const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.75);
            callback(compressedDataUrl);
        };
        img.src = e.target.result;
    };
    reader.readAsDataURL(file);
}

function insertImageToEditor(dataUrl) {
    if (!isiEditor) return;
    isiEditor.focus();
    const imgHtml = `<p><img src="${dataUrl}" class="editor-embedded-img" alt="Gambar Catatan" /></p><p><br></p>`;
    try {
        if (!document.execCommand('insertHTML', false, imgHtml)) {
            isiEditor.innerHTML += imgHtml;
        }
    } catch (e) {
        isiEditor.innerHTML += imgHtml;
    }
    triggerDraftAutoSave();
    updateEditorStats();
    showToast('Gambar berhasil disisipkan 🖼️');
}

function initImageFeatures() {
    if (btnInsertImage && imageFileInput) {
        btnInsertImage.addEventListener('click', (e) => {
            e.preventDefault();
            imageFileInput.click();
        });

        imageFileInput.addEventListener('change', (e) => {
            const file = e.target.files && e.target.files[0];
            if (file) {
                compressImage(file, (dataUrl) => {
                    insertImageToEditor(dataUrl);
                    imageFileInput.value = '';
                });
            }
        });
    }

    if (isiEditor) {
        isiEditor.addEventListener('paste', (e) => {
            const items = (e.clipboardData || e.originalEvent?.clipboardData)?.items;
            if (!items) return;

            for (let i = 0; i < items.length; i++) {
                if (items[i].type.indexOf('image') !== -1) {
                    e.preventDefault();
                    const blob = items[i].getAsFile();
                    compressImage(blob, (dataUrl) => {
                        insertImageToEditor(dataUrl);
                    });
                    break;
                }
            }
        });
    }
}

// ===== INDIKATOR PENYIMPANAN LOCALSTORAGE =====
function calculateStorageUsage() {
    let totalBytes = 0;
    try {
        for (let key in localStorage) {
            if (localStorage.hasOwnProperty(key)) {
                totalBytes += (key.length + (localStorage[key]?.length || 0)) * 2;
            }
        }
    } catch (e) {
        totalBytes = 0;
    }

    const maxBytes = 5 * 1024 * 1024; // Standar 5 MB kuota localStorage
    const percent = Math.min(100, Math.max(0, Math.round((totalBytes / maxBytes) * 100)));

    let formattedSize = '';
    if (totalBytes < 1024) {
        formattedSize = `${totalBytes} B`;
    } else if (totalBytes < 1024 * 1024) {
        formattedSize = `${(totalBytes / 1024).toFixed(1)} KB`;
    } else {
        formattedSize = `${(totalBytes / (1024 * 1024)).toFixed(2)} MB`;
    }

    return { totalBytes, maxBytes, percent, formattedSize };
}

function updateStorageMeterUI() {
    if (!storageMeterBar || !storageMeterText) return;
    const { percent, formattedSize } = calculateStorageUsage();

    storageMeterBar.style.width = `${percent}%`;
    storageMeterText.textContent = `${formattedSize} / 5 MB (${percent}%)`;

    storageMeterBar.classList.remove('warning', 'danger');
    if (percent > 85) {
        storageMeterBar.classList.add('danger');
    } else if (percent > 65) {
        storageMeterBar.classList.add('warning');
    }
}

// ===== PENGATURAN / GANTI PIN BRANKAS =====
function openGantiPinModal() {
    const existingPin = getMasterPin();
    if (inputOldPin) inputOldPin.value = '';
    if (inputNewPin) inputNewPin.value = '';
    if (inputConfirmPin) inputConfirmPin.value = '';
    if (pinGantiError) {
        pinGantiError.textContent = '';
        pinGantiError.style.display = 'none';
    }

    if (existingPin) {
        if (gantiPinTitle) gantiPinTitle.textContent = 'Ganti PIN Brankas';
        if (gantiPinDesc) gantiPinDesc.textContent = 'Masukkan PIN lama dan tentukan PIN baru untuk mengamankan catatan rahasiamu.';
        if (groupOldPin) groupOldPin.style.display = 'block';
    } else {
        if (gantiPinTitle) gantiPinTitle.textContent = 'Atur PIN Brankas';
        if (gantiPinDesc) gantiPinDesc.textContent = 'Tentukan PIN 4-8 digit angka untuk mulai mengamankan catatan rahasiamu.';
        if (groupOldPin) groupOldPin.style.display = 'none';
    }

    if (modalGantiPin) modalGantiPin.classList.add('active');
    setTimeout(() => {
        if (existingPin && inputOldPin) inputOldPin.focus();
        else if (inputNewPin) inputNewPin.focus();
    }, 150);
}

function initSecurityPinSettings() {
    if (btnGantiPin) {
        btnGantiPin.addEventListener('click', (e) => {
            e.preventDefault();
            openGantiPinModal();
        });
    }

    if (btnBatalGantiPin && modalGantiPin) {
        btnBatalGantiPin.addEventListener('click', () => {
            closeModal(modalGantiPin);
        });
    }

    if (btnSimpanGantiPin) {
        btnSimpanGantiPin.addEventListener('click', () => {
            const existingPin = getMasterPin();
            const oldVal = inputOldPin ? inputOldPin.value.trim() : '';
            const newVal = inputNewPin ? inputNewPin.value.trim() : '';
            const confirmVal = inputConfirmPin ? inputConfirmPin.value.trim() : '';

            if (existingPin) {
                if (!oldVal) {
                    if (pinGantiError) {
                        pinGantiError.textContent = 'Harap masukkan PIN lama Anda';
                        pinGantiError.style.display = 'block';
                    }
                    return;
                }
                if (oldVal !== existingPin) {
                    if (pinGantiError) {
                        pinGantiError.textContent = 'PIN lama salah!';
                        pinGantiError.style.display = 'block';
                    }
                    return;
                }
            }

            if (!newVal || newVal.length < 4) {
                if (pinGantiError) {
                    pinGantiError.textContent = 'PIN baru minimal harus 4 digit angka';
                    pinGantiError.style.display = 'block';
                }
                return;
            }

            if (!/^\d+$/.test(newVal)) {
                if (pinGantiError) {
                    pinGantiError.textContent = 'PIN hanya boleh berisi angka (0-9)';
                    pinGantiError.style.display = 'block';
                }
                return;
            }

            if (newVal !== confirmVal) {
                if (pinGantiError) {
                    pinGantiError.textContent = 'Konfirmasi PIN baru tidak cocok!';
                    pinGantiError.style.display = 'block';
                }
                return;
            }

            setMasterPin(newVal);
            closeModal(modalGantiPin);
            showToast(existingPin ? 'PIN Brankas berhasil diperbarui! 🔒' : 'PIN Brankas berhasil diatur! 🔒');
        });
    }
}

// ===== PINTASAN KEYBOARD (KEYBOARD SHORTCUTS) =====
function initShortcuts() {
    if (btnShortcutsModal && modalShortcuts) {
        btnShortcutsModal.addEventListener('click', (e) => {
            e.preventDefault();
            modalShortcuts.classList.add('active');
        });
    }

    if (btnTutupShortcuts && modalShortcuts) {
        btnTutupShortcuts.addEventListener('click', () => {
            closeModal(modalShortcuts);
        });
    }

    window.addEventListener('keydown', (e) => {
        // Esc key closes modals
        if (e.key === 'Escape') {
            closeModal(modalHapus);
            closeModal(modalArsip);
            closeModal(modalDetail);
            closeModal(modalPin);
            closeModal(modalKategoriBaru);
            closeModal(modalBackupRestore);
            closeModal(modalGantiPin);
            closeModal(modalShortcuts);
            closeAllMobileCardMenus();
            closeExportDropdown();
            closeSidebar();
            return;
        }

        const isCtrl = e.ctrlKey || e.metaKey;

        if (isCtrl && e.key.toLowerCase() === 's') {
            // Simpan catatan (Ctrl+S)
            e.preventDefault();
            if (btnSimpan) btnSimpan.click();
        } else if (isCtrl && e.key.toLowerCase() === 'n') {
            // Tulis catatan baru (Ctrl+N)
            e.preventDefault();
            if (btnTulisCepat) btnTulisCepat.click();
        } else if (isCtrl && (e.key.toLowerCase() === 'k' || e.key === '/')) {
            // Fokus pencarian (Ctrl+K atau Ctrl+/)
            e.preventDefault();
            switchPage('semua');
            if (inputCari) {
                inputCari.focus();
                inputCari.select();
            }
        } else if (isCtrl && e.key.toLowerCase() === 'd') {
            // Beralih tema gelap/terang (Ctrl+D)
            e.preventDefault();
            if (btnToggleTheme) btnToggleTheme.click();
        } else if (isCtrl && (e.key === '?' || (e.shiftKey && e.key.toLowerCase() === '/'))) {
            // Buka bantuan pintasan
            e.preventDefault();
            if (modalShortcuts) modalShortcuts.classList.add('active');
        }
    });
}

// ===== PWA PROGRESSIVE WEB APP =====
let deferredInstallPrompt = null;

function initPWA() {
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('./sw.js').catch((err) => {
                console.log('SW registration note:', err);
            });
        });
    }

    window.addEventListener('beforeinstallprompt', (e) => {
        e.preventDefault();
        deferredInstallPrompt = e;
        if (btnInstallApp) {
            btnInstallApp.style.display = 'flex';
        }
    });

    if (btnInstallApp) {
        btnInstallApp.addEventListener('click', async () => {
            if (!deferredInstallPrompt) return;
            deferredInstallPrompt.prompt();
            const { outcome } = await deferredInstallPrompt.userChoice;
            if (outcome === 'accepted') {
                btnInstallApp.style.display = 'none';
                showToast('Aplikasi Brankas berhasil dipasang! 📱');
            }
            deferredInstallPrompt = null;
        });
    }

    window.addEventListener('appinstalled', () => {
        if (btnInstallApp) btnInstallApp.style.display = 'none';
        deferredInstallPrompt = null;
        showToast('Brankas telah terpasang di perangkat Anda 📱');
    });
}

// ===== START =====
init();
