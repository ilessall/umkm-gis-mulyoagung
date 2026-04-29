document.addEventListener("DOMContentLoaded", function () {

    const kategoriData = [
        {
            title: "UMKM Kuliner",
            desc: "Menampilkan usaha kuliner seperti warung makan, cafe, dan jajanan lokal di Desa Mulyoagung.",
            button: "Lihat UMKM Kuliner",
            link: "map.html?kategori=Kuliner"
        },
        {
            title: "UMKM Fashion",
            desc: "Menampilkan usaha fashion seperti butik, konveksi, dan toko pakaian lokal.",
            button: "Lihat UMKM Fashion",
            link: "map.html?kategori=Fashion"
        },
        {
            title: "UMKM Jasa",
            desc: "Menampilkan usaha jasa seperti laundry, salon, bengkel.",
            button: "Lihat UMKM Jasa",
            link: "map.html?kategori=Jasa"
        },
        {
            title: "UMKM Pertanian",
            desc: "Menampilkan usaha pertanian dan hasil tani lokal.",
            button: "Lihat UMKM Pertanian",
            link: "map.html?kategori=Pertanian"
        },
        {
            title: "UMKM Kerajinan",
            desc: "Menampilkan usaha kerajinan tangan dan produk kreatif.",
            button: "Lihat UMKM Kerajinan",
            link: "map.html?kategori=Kerajinan"
        }
    ];

    const thumbs = document.querySelectorAll(".highlight-thumbs .swiper-slide");
    const title = document.getElementById("kategori-title");
    const desc = document.getElementById("kategori-desc");
    const btn = document.getElementById("kategori-btn");
    const btnText = document.getElementById("kategori-btn-text");

    function updateContent(index) {
        const data = kategoriData[index];
        if (!data) return;

        title.innerText = data.title;
        desc.innerText = data.desc;
        btnText.innerText = data.button;
        btn.href = data.link;

        thumbs.forEach(t => t.classList.remove("active"));
        thumbs[index]?.classList.add("active");
    }

    // klik thumbnail
    thumbs.forEach((thumb, index) => {
        thumb.addEventListener("click", function () {
            updateContent(index);
        });
    });

    // 🔥 SYNC DENGAN SWIPER
    setTimeout(() => {
        var swiperMain = document.querySelector('.highlight-image')?.swiper;

        if (swiperMain) {
            swiperMain.on('slideChange', function () {
                updateContent(swiperMain.activeIndex);
            });
        }
    }, 300);

    // init pertama
    updateContent(0);

});