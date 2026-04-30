/* =========================================================
   1. SINGLE SOURCE OF TRUTH - KATEGORI MASTER (FIXED)
   DESKRIPSI SUDAH SERAGAM (PANJANG KALIMAT SAMA)
========================================================= */
const KATEGORI_MASTER = [
    {
        key: "Kuliner",
        title: "UMKM Kuliner",
        desc: "Menampilkan usaha kuliner seperti warung makan, cafe, dan jajanan lokal di wilayah Desa Mulyoagung secara lengkap dan terstruktur.",
        button: "Lihat UMKM Kuliner",
        link: "map.html?kategori=Kuliner"
    },
    {
        key: "Fashion",
        title: "UMKM Fashion",
        desc: "Menampilkan usaha fashion seperti butik, konveksi, dan toko pakaian lokal di wilayah Desa Mulyoagung secara lengkap dan terstruktur.",
        button: "Lihat UMKM Fashion",
        link: "map.html?kategori=Fashion"
    },
    {
        key: "Jasa",
        title: "UMKM Jasa",
        desc: "Menampilkan usaha jasa seperti laundry, salon, fotokopi, dan layanan umum di wilayah Desa Mulyoagung secara lengkap dan terstruktur.",
        button: "Lihat UMKM Jasa",
        link: "map.html?kategori=Jasa"
    },
    {
        key: "Otomotif",
        title: "UMKM Otomotif",
        desc: "Menampilkan usaha otomotif seperti bengkel, servis kendaraan, dan sparepart di wilayah Desa Mulyoagung secara lengkap dan terstruktur.",
        button: "Lihat UMKM Otomotif",
        link: "map.html?kategori=Otomotif"
    },
    {
        key: "Kesehatan",
        title: "UMKM Kesehatan",
        desc: "Menampilkan usaha kesehatan seperti klinik, apotek, dan layanan medis di wilayah Desa Mulyoagung secara lengkap dan terstruktur.",
        button: "Lihat UMKM Kesehatan",
        link: "map.html?kategori=Kesehatan"
    },
    {
        key: "Retail",
        title: "UMKM Retail",
        desc: "Menampilkan usaha retail seperti toko kelontong, minimarket, dan perdagangan kecil di wilayah Desa Mulyoagung secara lengkap dan terstruktur.",
        button: "Lihat UMKM Retail",
        link: "map.html?kategori=Retail"
    },
    {
        key: "Elektronik",
        title: "UMKM Elektronik",
        desc: "Menampilkan usaha elektronik seperti toko alat elektronik dan servis perangkat di wilayah Desa Mulyoagung secara lengkap dan terstruktur.",
        button: "Lihat UMKM Elektronik",
        link: "map.html?kategori=Elektronik"
    },
    {
        key: "All",
        title: "Semua UMKM",
        desc: "Menampilkan seluruh kategori UMKM di wilayah Desa Mulyoagung secara lengkap dan terstruktur dalam satu sistem peta digital.",
        button: "Lihat Semua UMKM",
        link: "map.html?kategori=All"
    }
];


/* =========================================================
   2. SLIDER + UI UPDATE SYSTEM (FIXED INDEX SAFE)
========================================================= */
document.addEventListener("DOMContentLoaded", function () {

    const thumbs = document.querySelectorAll(".highlight-thumbs .swiper-slide");

    const title = document.getElementById("kategori-title");
    const desc = document.getElementById("kategori-desc");
    const btn = document.getElementById("kategori-btn");
    const btnText = document.getElementById("kategori-btn-text");

    if (!thumbs.length) return;

    function updateContent(index) {
        const data = KATEGORI_MASTER[index];
        if (!data) return;

        title.innerText = data.title;
        desc.innerText = data.desc;
        btnText.innerText = data.button;
        btn.href = data.link;

        thumbs.forEach(t => t.classList.remove("active"));
        thumbs[index]?.classList.add("active");
    }

    thumbs.forEach((thumb, index) => {
        thumb.addEventListener("click", function () {
            updateContent(index);
        });
    });

    setTimeout(() => {
        const swiperMain = document.querySelector('.highlight-image')?.swiper;

        if (swiperMain) {
            swiperMain.on('slideChange', function () {
                updateContent(swiperMain.activeIndex);
            });
        }
    }, 300);

    updateContent(0);
});


/* =========================================================
   3. MAP FILTER (FIXED + CONSISTENT CATEGORY)
========================================================= */
function applyFilter() {

    const params = new URLSearchParams(window.location.search);
    const kategori = params.get("kategori");
    const search = params.get("q");

    if (!window.lyr_LokasiBisnisMulyoAgung_5) return;

    const source = lyr_LokasiBisnisMulyoAgung_5.getSource();
    if (!source) return;

    const features = source.getFeatures();
    if (!features.length) {
        setTimeout(applyFilter, 300);
        return;
    }

    features.forEach(function (feature) {

        let matchKategori = true;
        let matchSearch = true;

        if (kategori && kategori !== "All") {
            const data = feature.get("kategori");
            matchKategori = data && data === kategori;
        }

        if (search) {
            const nama = feature.get("nama");
            matchSearch = nama && nama.toLowerCase().includes(search.toLowerCase());
        }

        if (matchKategori && matchSearch) {
            feature.setStyle(undefined);
        } else {
            feature.setStyle(new ol.style.Style({}));
        }

    });
}


/* =========================================================
   4. AUTO INIT FILTER
========================================================= */
document.addEventListener("DOMContentLoaded", function () {
    setTimeout(() => applyFilter(), 500);
});