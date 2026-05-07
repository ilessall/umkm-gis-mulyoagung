// ======================================================
// GIS UMKM Mulyoagung
// FINAL CLEAN VERSION
// ======================================================


// ======================================================
// EXTENT AREA
// ======================================================
var originalExtent = [
    12532820.213883,
    -883954.666332,
    12533068.452202,
    -883823.764645
];


// ======================================================
// CENTER EXTENT
// ======================================================
var centerX =
    (originalExtent[0] + originalExtent[2]) / 2;

var centerY =
    (originalExtent[1] + originalExtent[3]) / 2;


// ======================================================
// MAP INIT
// ======================================================
var map = new ol.Map({

    target: 'map',

    renderer: 'canvas',

    layers: layersList,

    view: new ol.View({

         // CENTER PAS SEPERTI SCREENSHOT
       center: [12532944, -884350],

        // ZOOM PAS
        zoom: 15,

        // USER GAK BISA ZOOM OUT LAGI
        minZoom: 15,

        maxZoom: 22
    })
});



// ======================================================
// POPUP
// ======================================================
var container =
    document.getElementById('popup');

var content =
    document.getElementById('popup-content');

var closer =
    document.getElementById('popup-closer');


var overlayPopup = new ol.Overlay({

    element: container,

    autoPan: true,

    autoPanAnimation: {
        duration: 250
    }

});

map.addOverlay(overlayPopup);


closer.onclick = function () {

    overlayPopup.setPosition(undefined);

    return false;
};


// ======================================================
// DASHBOARD
// ======================================================
function updateDashboard() {

    if (!window.lyr_LokasiBisnisMulyoAgung_5) {

        setTimeout(updateDashboard, 1000);

        return;
    }

    var source =
        lyr_LokasiBisnisMulyoAgung_5.getSource();

    if (!source) return;

    var features =
        source.getFeatures();

    if (!features.length) return;


    // =========================================
    // COUNT
    // =========================================
    var count = {

        Kuliner: 0,
        Retail: 0,
        Otomotif: 0,
        Kesehatan: 0,
        Jasa: 0,
        Elektronik: 0,
        Fashion: 0
    };


    // =========================================
    // AREA
    // =========================================
    var area = {

        utara: {},
        selatan: {},
        timur: {},
        barat: {}
    };


    // =========================================
    // LOOP FEATURE
    // =========================================
    features.forEach(function (feature) {

        var style =
            feature.getStyle();

        // SKIP YANG DI HIDE FILTER
        if (
            style &&
            style.getImage &&
            style.getImage() === null
        ) {
            return;
        }

        var kategori =
            feature.get('kategori') ||
            feature.get('jenis');

        if (!kategori) return;

        kategori = kategori.trim();


        // COUNT KATEGORI
        if (count[kategori] !== undefined) {

            count[kategori]++;
        }


        // COORDINATE
        var coord =
            feature.getGeometry().getCoordinates();

        var x = coord[0];
        var y = coord[1];


        // =====================================
        // UTARA / SELATAN
        // =====================================
        if (y > centerY) {

            area.utara[kategori] =
                (area.utara[kategori] || 0) + 1;

        } else {

            area.selatan[kategori] =
                (area.selatan[kategori] || 0) + 1;
        }


        // =====================================
        // TIMUR / BARAT
        // =====================================
        if (x > centerX) {

            area.timur[kategori] =
                (area.timur[kategori] || 0) + 1;

        } else {

            area.barat[kategori] =
                (area.barat[kategori] || 0) + 1;
        }

    });


    // =========================================
    // UPDATE CARD
    // =========================================
    function set(id, value) {

        var el =
            document.getElementById(id);

        if (el) {

            el.innerHTML = value;
        }
    }


    // TOTAL KATEGORI
    set('count-kuliner', count.Kuliner + ' UMKM');

    set('count-retail', count.Retail + ' UMKM');

    set('count-otomotif', count.Otomotif + ' UMKM');

    set('count-kesehatan', count.Kesehatan + ' UMKM');

    set('count-jasa', count.Jasa + ' UMKM');

    set('count-elektronik', count.Elektronik + ' UMKM');

    set('count-fashion', count.Fashion + ' UMKM');


    // =========================================
    // GET DOMINAN
    // =========================================
    function getDominan(obj) {

        var dominan = "-";

        var max = 0;

        Object.keys(obj).forEach(function (k) {

            if (obj[k] > max) {

                max = obj[k];

                dominan = k;
            }

        });

        return dominan;
    }


    // DOMINASI AREA
    set(
        'utara-dominan',
        getDominan(area.utara)
    );

    set(
        'selatan-dominan',
        getDominan(area.selatan)
    );

    set(
        'timur-dominan',
        getDominan(area.timur)
    );

    set(
        'barat-dominan',
        getDominan(area.barat)
    );

}

setTimeout(updateDashboard, 1500);


// ======================================================
// ANALISIS USAHA
// ======================================================
function analisisUsaha(feature) {

    var radius = 300;

    var center =
        feature.getGeometry().getCoordinates();

    var total = 0;

    var kategoriCount = {};


    lyr_LokasiBisnisMulyoAgung_5
        .getSource()
        .forEachFeature(function (f) {

            if (f === feature) return;

            var coord =
                f.getGeometry().getCoordinates();

            var distance =
                ol.sphere.getDistance(

                    ol.proj.toLonLat(center),

                    ol.proj.toLonLat(coord)
                );

            if (distance <= radius) {

                total++;

                var kategori =
                    f.get('kategori') ||
                    f.get('jenis');

                kategoriCount[kategori] =
                    (kategoriCount[kategori] || 0) + 1;
            }

        });


    // DOMINAN
    var dominan = "-";

    var max = 0;

    Object.keys(kategoriCount).forEach(function (k) {

        if (kategoriCount[k] > max) {

            max = kategoriCount[k];

            dominan = k;
        }

    });


    // ZONA
    var zona = "GREEN";

    if (max >= 5) {

        zona = "RED";

    } else if (total >= 5) {

        zona = "YELLOW";
    }


    return {

        total: total,

        dominan: dominan,

        zona: zona
    };
}


// ======================================================
// CLICK POPUP
// ======================================================
map.on('singleclick', function (evt) {

    var feature =
        map.forEachFeatureAtPixel(

            evt.pixel,

            function (f) {
                return f;
            }
        );

    if (!feature) {

        overlayPopup.setPosition(undefined);

        return;
    }


    var nama =
        feature.get('nama') || '-';

    var jenis =
        feature.get('kategori') ||
        feature.get('jenis') ||
        '-';

    var alamat =
        feature.get('alamat') || '-';


    var analisis =
        analisisUsaha(feature);


    var warnaZona = {

        GREEN: "#16a34a",

        YELLOW: "#eab308",

        RED: "#dc2626"
    };


    content.innerHTML = `

    <div style="
        min-width:260px;
        line-height:1.7;
    ">

        <div style="
            font-size:16px;
            font-weight:700;
            margin-bottom:10px;
        ">
            ${nama}
        </div>

        <div>
            <b>Kategori:</b>
            ${jenis}
        </div>

        <div>
            <b>Alamat:</b>
            ${alamat}
        </div>

        <hr>

        <div style="
            background:${warnaZona[analisis.zona]};
            color:white;
            display:inline-block;
            padding:5px 12px;
            border-radius:20px;
            margin-bottom:10px;
            font-size:12px;
        ">
            Zona ${analisis.zona}
        </div>

        <div>
            <b>Dominasi:</b>
            ${analisis.dominan}
        </div>

        <div>
            <b>Total sekitar:</b>
            ${analisis.total}
        </div>

    </div>
    `;

    overlayPopup.setPosition(evt.coordinate);

});


// ======================================================
// LEGEND
// ======================================================
var layerSwitcher =
    new ol.control.LayerSwitcher({

        activationMode: 'click',

        startActive: true,

        tipLabel: 'Legend',

        collapseTipLabel: 'Close Legend',

        groupSelectStyle: 'children'
    });

map.addControl(layerSwitcher);


// ======================================================
// FORCE LEGEND OPEN
// ======================================================
setTimeout(function () {

    var legend =
        document.querySelector('.layer-switcher');

    if (legend) {

        legend.classList.add('shown');

        legend.style.display = 'block';

        legend.style.position = 'absolute';

        legend.style.top = '20px';

        legend.style.right = '20px';

        legend.style.zIndex = '9999';
    }

}, 1200);


// ======================================================
// ATTRIBUTION
// ======================================================
map.addControl(

    new ol.control.Attribution({

        collapsible: true
    })
);


// ======================================================
// POSITION ZOOM BUTTON
// ======================================================
setTimeout(function () {

    var zoom =
        document.querySelector('.ol-zoom');

    if (zoom) {

        zoom.style.top = '90px';

        zoom.style.left = '15px';
    }

}, 1000);


