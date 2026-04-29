document.addEventListener("DOMContentLoaded", function () {

    const kategoriData = [
        {
            title: "UMKM Kuliner",
            desc: "Menampilkan usaha kuliner seperti warung makan, cafe, dan jajanan lokal di Desa Mulyoagung. Informasi ini membantu melihat lokasi dan peluang usaha.",
            button: "Lihat UMKM Kuliner",
            link: "map.html?kategori=kuliner"
        },
        {
            title: "UMKM Fashion",
            desc: "Menampilkan usaha fashion seperti butik, konveksi, dan toko pakaian lokal di Desa Mulyoagung. Data ini membantu melihat potensi dan persebaran usaha kreatif.",
            button: "Lihat UMKM Fashion",
            link: "map.html?kategori=fashion"
        },
        {
            title: "UMKM Jasa",
            desc: "Menampilkan usaha jasa seperti laundry, salon, bengkel, dan layanan masyarakat di Desa Mulyoagung. Informasi ini mendukung pemetaan aktivitas ekonomi lokal.",
            button: "Lihat UMKM Jasa",
            link: "map.html?kategori=jasa"
        },
        {
            title: "UMKM Pertanian",
            desc: "Menampilkan usaha pertanian seperti hasil tani, peternakan, dan produk unggulan desa Mulyoagung. Data ini menunjukkan potensi sektor agribisnis lokal.",
            button: "Lihat UMKM Pertanian",
            link: "map.html?kategori=pertanian"
        },
        {
            title: "UMKM Kerajinan",
            desc: "Menampilkan usaha kerajinan tangan, produk kreatif, dan souvenir lokal di Desa Mulyoagung. Informasi ini membantu melihat potensi ekonomi kreatif desa.",
            button: "Lihat UMKM Kerajinan",
            link: "map.html?kategori=kerajinan"
        }
    ];

    const thumbs = document.querySelectorAll(".highlight-thumbs .swiper-slide");
    const title = document.getElementById("kategori-title");
    const desc = document.getElementById("kategori-desc");
    const btn = document.getElementById("kategori-btn");
    const btnText = document.getElementById("kategori-btn-text");

    if (!thumbs.length || !title || !desc || !btn || !btnText) return;

    function updateContent(index) {
        const data = kategoriData[index];

        if (!data) return;

        title.innerText = data.title || "";
        desc.innerText = data.desc || "";
        btnText.innerText = data.button || "Lihat";
        btn.href = data.link || "#";

        // optional active class
        thumbs.forEach(t => t.classList.remove("active"));
        thumbs[index]?.classList.add("active");
    }

    // click handler
    thumbs.forEach((thumb, index) => {
        thumb.addEventListener("click", function () {
            updateContent(index);
        });
    });

    // init pertama
    updateContent(0);

});

document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".faq-question").forEach(item => {
        item.addEventListener("click", () => {
            item.parentElement.classList.toggle("active");
        });
    });
});