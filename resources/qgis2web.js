// ===============================
// MAP INIT
// ===============================
var map = new ol.Map({
    target: 'map',
    renderer: 'canvas',
    layers: layersList,
    view: new ol.View({
        center: ol.proj.fromLonLat([112.593, -7.944]),
        zoom: 5,
        maxZoom: 28,
        minZoom: 1,
        constrainResolution: true
    })
});


// ===============================
// INITIAL VIEW + LOCK AREA
// ===============================
var originalExtent = [12532820.213883, -883954.666332, 12533068.452202, -883823.764645];
var offsetY = 90;

var extent = [
    originalExtent[0],
    originalExtent[1] - offsetY,
    originalExtent[2],
    originalExtent[3] - offsetY
];

setTimeout(function () {

    var view = map.getView();

    view.fit(extent, {
        size: map.getSize(),
        maxZoom: 14.5,
        padding: [5, 20, 40, 20]
    });

    var zoomNow = view.getZoom();
    view.setZoom(zoomNow + 0.4);

    view.setProperties({
        extent: extent,
        constrainOnlyCenter: true
    });

    var currentZoom = view.getZoom();
    view.setMinZoom(currentZoom);
    view.setMaxZoom(20);

}, 300);


// ===============================
// CONTAINERS
// ===============================
function createContainer(id){
    var el = document.createElement('div');
    el.id = id;
    return new ol.control.Control({ element: el });
}

map.addControl(createContainer('top-left-container'));
map.addControl(createContainer('bottom-left-container'));
map.addControl(createContainer('top-right-container'));
map.addControl(createContainer('bottom-right-container'));


// ===============================
// POPUP
// ===============================
var container = document.getElementById('popup');
var content = document.getElementById('popup-content');
var closer = document.getElementById('popup-closer');

closer.onclick = function () {
    container.style.display = 'none';
    closer.blur();
    return false;
};

var overlayPopup = new ol.Overlay({
    element: container,
    autoPan: true
});
map.addOverlay(overlayPopup);


// ===============================
// 🔥 ANALISIS SPASIAL USAHA FINAL
// ===============================
function analisisUsaha(feature, layer) {

    var radius = 400; // meter
    var center = feature.getGeometry().getCoordinates();

    var usahaSekitar = [];

    layer.getSource().forEachFeature(function(f) {

        var coord = f.getGeometry().getCoordinates();

        var distance = ol.sphere.getDistance(
            ol.proj.toLonLat(center),
            ol.proj.toLonLat(coord)
        );

        if (distance <= radius && f !== feature) {
            usahaSekitar.push(f);
        }
    });

    // HITUNG KATEGORI
    var count = {
        Kuliner: 0,
        Retail: 0,
        Otomotif: 0,
        Kesehatan: 0,
        Jasa: 0,
        Elektronik: 0,
        Fashion: 0
    };

    usahaSekitar.forEach(f => {
        var kategori = f.get('jenis');
        if (count[kategori] !== undefined) {
            count[kategori]++;
        }
    });

    var total = usahaSekitar.length;

    // KATEGORI DOMINAN
    var sortedDesc = Object.entries(count).sort((a,b) => b[1] - a[1]);
    var kategoriDominan = sortedDesc[0][0];
    var jumlahDominan = sortedDesc[0][1];

    // ZONA
    var zona = "";
    if (jumlahDominan >= 5) zona = "RED";
    else if (total >= 6) zona = "YELLOW";
    else zona = "GREEN";

    // REKOMENDASI
    var sortedAsc = Object.entries(count).sort((a,b) => a[1] - b[1]);

    var rekomendasi = sortedAsc
        .filter(item => item[0] !== kategoriDominan)
        .map(item => item[0])
        .slice(0,3);

    // ALASAN
    var alasan = "";

    if (zona === "GREEN") {
        alasan = "Usaha sekitar masih sedikit, peluang pasar luas.";
    } else if (zona === "YELLOW") {
        alasan = "Komposisi usaha cukup beragam, kompetisi sedang.";
    } else {
        alasan = "Kategori " + kategoriDominan + " mendominasi, kompetisi tinggi.";
    }

    alasan += " Dominasi: " + kategoriDominan + " (" + jumlahDominan + " usaha).";
    alasan += " Peluang terbaik: " + rekomendasi.join(", ") + ".";

    return {
        zona: zona,
        dominan: kategoriDominan,
        rekomendasi: rekomendasi,
        alasan: alasan,
        total: total
    };
}


// ===============================
// 🔥 HOVER POPUP + ANALISIS
// ===============================
map.on('pointermove', function(evt) {

    var feature = map.forEachFeatureAtPixel(evt.pixel, function(f) {
        return f;
    });

    if (feature) {

        var nama = feature.get('nama') || '-';
        var jenis = feature.get('jenis') || '-';
        var alamat = feature.get('alamat') || '-';

        var analisis = analisisUsaha(feature, lyr_LokasiBisnisMulyoAgung_5);

        var warnaZona = {
            GREEN: "#16a34a",
            YELLOW: "#eab308",
            RED: "#dc2626"
        };

        content.innerHTML = `
            <div style="font-size:13px; line-height:1.5; min-width:250px;">
                
                <b style="font-size:15px;">${nama}</b><br>
                <span><b>Jenis:</b> ${jenis}</span><br>
                <span><b>Alamat:</b> ${alamat}</span><br><br>

                <span style="font-weight:bold; color:${warnaZona[analisis.zona]}">
                    Zona: ${analisis.zona}
                </span><br>

                <span><b>Kategori Dominan:</b> ${analisis.dominan}</span><br>

                <span><b>Total Usaha Sekitar:</b> ${analisis.total}</span><br>

                <span><b>Rekomendasi:</b> ${analisis.rekomendasi.join(", ")}</span><br>

                <div style="margin-top:6px; font-size:12px; color:#555;">
                    ${analisis.alasan}
                </div>
            </div>
        `;

        container.style.display = 'block';
        overlayPopup.setPosition(evt.coordinate);

    } else {
        container.style.display = 'none';
    }
});


// ===============================
// LEGEND
// ===============================
var layerSwitcher = new ol.control.LayerSwitcher({
    activationMode: 'click',
    startActive: true,
    tipLabel: "Legenda"
});
map.addControl(layerSwitcher);


// ===============================
// ATTRIBUTION
// ===============================
var bottomAttribution = new ol.control.Attribution({
    collapsible: false,
    collapsed: false
});
map.addControl(bottomAttribution);


// ===============================
// FINAL UI POSITION + CLEAN
// ===============================
setTimeout(function () {

    var zoom = document.querySelector('.ol-zoom');
    if (zoom) {
        zoom.style.position = "absolute";
        zoom.style.top = "10px";
        zoom.style.left = "10px";
        zoom.style.zIndex = "1000";
    }

    var legend = document.querySelector('.layer-switcher');
    if (legend) {
        legend.style.position = "absolute";
        legend.style.top = "10px";
        legend.style.right = "10px";
        legend.style.zIndex = "1000";
    }

}, 500);