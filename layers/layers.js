var wms_layers = [];


        var lyr_OpenStreetMap_0 = new ol.layer.Tile({
            'title': 'OpenStreetMap',
            'opacity': 1.000000,
            
            
            source: new ol.source.XYZ({
            attributions: ' ',
                url: 'https://tile.openstreetmap.org/{z}/{x}/{y}.png'
            })
        });
var format_AreaDesaMulyoAgung_1 = new ol.format.GeoJSON();
var features_AreaDesaMulyoAgung_1 = format_AreaDesaMulyoAgung_1.readFeatures(json_AreaDesaMulyoAgung_1, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_AreaDesaMulyoAgung_1 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_AreaDesaMulyoAgung_1.addFeatures(features_AreaDesaMulyoAgung_1);
var lyr_AreaDesaMulyoAgung_1 = new ol.layer.Vector({
                declutter: false,
                source:jsonSource_AreaDesaMulyoAgung_1, 
                style: style_AreaDesaMulyoAgung_1,
                popuplayertitle: 'Area Desa MulyoAgung',
                interactive: true,
                title: '<img src="styles/legend/AreaDesaMulyoAgung_1.png" /> Area Desa MulyoAgung'
            });
var format_JalanUtama_2 = new ol.format.GeoJSON();
var features_JalanUtama_2 = format_JalanUtama_2.readFeatures(json_JalanUtama_2, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_JalanUtama_2 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_JalanUtama_2.addFeatures(features_JalanUtama_2);
var lyr_JalanUtama_2 = new ol.layer.Vector({
                declutter: false,
                source:jsonSource_JalanUtama_2, 
                style: style_JalanUtama_2,
                popuplayertitle: 'Jalan Utama',
                interactive: true,
                title: '<img src="styles/legend/JalanUtama_2.png" /> Jalan Utama'
            });
var format_LokasiTempatIbadah_3 = new ol.format.GeoJSON();
var features_LokasiTempatIbadah_3 = format_LokasiTempatIbadah_3.readFeatures(json_LokasiTempatIbadah_3, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_LokasiTempatIbadah_3 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_LokasiTempatIbadah_3.addFeatures(features_LokasiTempatIbadah_3);
var lyr_LokasiTempatIbadah_3 = new ol.layer.Vector({
                declutter: false,
                source:jsonSource_LokasiTempatIbadah_3, 
                style: style_LokasiTempatIbadah_3,
                popuplayertitle: 'Lokasi Tempat Ibadah',
                interactive: true,
                title: '<img src="styles/legend/LokasiTempatIbadah_3.png" /> Lokasi Tempat Ibadah'
            });
var format_LokasiSekolah_4 = new ol.format.GeoJSON();
var features_LokasiSekolah_4 = format_LokasiSekolah_4.readFeatures(json_LokasiSekolah_4, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_LokasiSekolah_4 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_LokasiSekolah_4.addFeatures(features_LokasiSekolah_4);
var lyr_LokasiSekolah_4 = new ol.layer.Vector({
                declutter: false,
                source:jsonSource_LokasiSekolah_4, 
                style: style_LokasiSekolah_4,
                popuplayertitle: 'Lokasi Sekolah',
                interactive: true,
                title: '<img src="styles/legend/LokasiSekolah_4.png" /> Lokasi Sekolah'
            });


var format_AreaUtara_6 = new ol.format.GeoJSON();
var features_AreaUtara_6 = format_AreaUtara_6.readFeatures(json_AreaUtara_6,
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_AreaUtara_6 = new ol.source.Vector({ attributions: ' ' });
jsonSource_AreaUtara_6.addFeatures(features_AreaUtara_6);
var lyr_AreaUtara_6 = new ol.layer.Vector({
                declutter: false,
                source: jsonSource_AreaUtara_6,
                style: style_AreaUtara_6,
                popuplayertitle: 'Area Utara',
                interactive: true,
                title: '<svg width="16" height="16" style="display:inline-block;vertical-align:middle;margin-right:4px;border-radius:3px;" xmlns="http://www.w3.org/2000/svg"><rect width="16" height="16" fill="rgba(59,130,246,0.25)" stroke="#2563eb" stroke-width="2"/></svg> Area Utara'
            });

var format_AreaTimur_8 = new ol.format.GeoJSON();
var features_AreaTimur_8 = format_AreaTimur_8.readFeatures(json_AreaTimur_8,
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_AreaTimur_8 = new ol.source.Vector({ attributions: ' ' });
jsonSource_AreaTimur_8.addFeatures(features_AreaTimur_8);
var lyr_AreaTimur_8 = new ol.layer.Vector({
                declutter: false,
                source: jsonSource_AreaTimur_8,
                style: style_AreaTimur_8,
                popuplayertitle: 'Area Timur',
                interactive: true,
                title: '<svg width="16" height="16" style="display:inline-block;vertical-align:middle;margin-right:4px;border-radius:3px;" xmlns="http://www.w3.org/2000/svg"><rect width="16" height="16" fill="rgba(16,185,129,0.25)" stroke="#059669" stroke-width="2"/></svg> Area Timur'
            });

var format_AreaBarat_9 = new ol.format.GeoJSON();
var features_AreaBarat_9 = format_AreaBarat_9.readFeatures(json_AreaBarat_9,
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_AreaBarat_9 = new ol.source.Vector({ attributions: ' ' });
jsonSource_AreaBarat_9.addFeatures(features_AreaBarat_9);
var lyr_AreaBarat_9 = new ol.layer.Vector({
                declutter: false,
                source: jsonSource_AreaBarat_9,
                style: style_AreaBarat_9,
                popuplayertitle: 'Area Barat',
                interactive: true,
                title: '<svg width="16" height="16" style="display:inline-block;vertical-align:middle;margin-right:4px;border-radius:3px;" xmlns="http://www.w3.org/2000/svg"><rect width="16" height="16" fill="rgba(245,158,11,0.25)" stroke="#d97706" stroke-width="2"/></svg> Area Barat'
            });

var format_AreaSelatan_7 = new ol.format.GeoJSON();
var features_AreaSelatan_7 = format_AreaSelatan_7.readFeatures(json_AreaSelatan_7,
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_AreaSelatan_7 = new ol.source.Vector({ attributions: ' ' });
jsonSource_AreaSelatan_7.addFeatures(features_AreaSelatan_7);
var lyr_AreaSelatan_7 = new ol.layer.Vector({
                declutter: false,
                source: jsonSource_AreaSelatan_7,
                style: style_AreaSelatan_7,
                popuplayertitle: 'Area Selatan',
                interactive: true,
                title: '<svg width="16" height="16" style="display:inline-block;vertical-align:middle;margin-right:4px;border-radius:3px;" xmlns="http://www.w3.org/2000/svg"><rect width="16" height="16" fill="rgba(239,68,68,0.25)" stroke="#dc2626" stroke-width="2"/></svg> Area Selatan'
            });

var format_LokasiBisnisMulyoAgung_5 = new ol.format.GeoJSON();
var features_LokasiBisnisMulyoAgung_5 = format_LokasiBisnisMulyoAgung_5.readFeatures(json_LokasiBisnisMulyoAgung_5, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_LokasiBisnisMulyoAgung_5 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_LokasiBisnisMulyoAgung_5.addFeatures(features_LokasiBisnisMulyoAgung_5);
var lyr_LokasiBisnisMulyoAgung_5 = new ol.layer.Vector({
                declutter: false,
                source:jsonSource_LokasiBisnisMulyoAgung_5, 
                style: style_LokasiBisnisMulyoAgung_5,
                popuplayertitle: 'Lokasi Bisnis MulyoAgung',
                interactive: true,
                title: '<img src="styles/legend/LokasiBisnisMulyoAgung_5.png" /> Lokasi Bisnis MulyoAgung'
            });

            
lyr_OpenStreetMap_0.setVisible(true);lyr_AreaDesaMulyoAgung_1.setVisible(true);lyr_JalanUtama_2.setVisible(true);lyr_LokasiTempatIbadah_3.setVisible(true);lyr_LokasiSekolah_4.setVisible(true);lyr_AreaUtara_6.setVisible(true);
lyr_AreaTimur_8.setVisible(true);
lyr_AreaBarat_9.setVisible(true);
lyr_AreaSelatan_7.setVisible(true);
lyr_LokasiBisnisMulyoAgung_5.setVisible(true);
var layersList = [lyr_OpenStreetMap_0,lyr_AreaDesaMulyoAgung_1,lyr_JalanUtama_2,lyr_LokasiTempatIbadah_3,lyr_LokasiSekolah_4,lyr_AreaUtara_6,lyr_AreaTimur_8,lyr_AreaBarat_9,lyr_AreaSelatan_7,lyr_LokasiBisnisMulyoAgung_5];
lyr_AreaDesaMulyoAgung_1.set('fieldAliases', {'id': 'id', 'Name': 'Name', 'Luas_meter': 'Luas_meter', });
lyr_JalanUtama_2.set('fieldAliases', {'id': 'id', 'Nama': 'Nama', });
lyr_LokasiTempatIbadah_3.set('fieldAliases', {'id': 'id', 'nama': 'nama', 'alamat': 'alamat', });
lyr_LokasiSekolah_4.set('fieldAliases', {'id': 'id', 'nama': 'nama', 'alamat': 'alamat', });
lyr_LokasiBisnisMulyoAgung_5.set('fieldAliases', {'id': 'id', 'nama': 'nama', 'kategori': 'kategori', 'jam_buka': 'jam_buka', 'alamat': 'alamat', });
lyr_AreaDesaMulyoAgung_1.set('fieldImages', {'id': 'TextEdit', 'Name': 'TextEdit', 'Luas_meter': 'TextEdit', });
lyr_JalanUtama_2.set('fieldImages', {'id': '', 'Nama': '', });
lyr_LokasiTempatIbadah_3.set('fieldImages', {'id': 'TextEdit', 'nama': 'TextEdit', 'alamat': 'TextEdit', });
lyr_LokasiSekolah_4.set('fieldImages', {'id': '', 'nama': '', 'alamat': '', });
lyr_LokasiBisnisMulyoAgung_5.set('fieldImages', {'id': '', 'nama': '', 'kategori': '', 'jam_buka': '', 'alamat': '', });
lyr_AreaDesaMulyoAgung_1.set('fieldLabels', {'id': 'no label', 'Name': 'inline label - always visible', 'Luas_meter': 'inline label - always visible', });
lyr_JalanUtama_2.set('fieldLabels', {'id': 'no label', 'Nama': 'inline label - always visible', });
lyr_LokasiTempatIbadah_3.set('fieldLabels', {'id': 'no label', 'nama': 'inline label - always visible', 'alamat': 'inline label - always visible', });
lyr_LokasiSekolah_4.set('fieldLabels', {'id': 'no label', 'nama': 'inline label - always visible', 'alamat': 'inline label - always visible', });
lyr_LokasiBisnisMulyoAgung_5.set('fieldLabels', {'id': 'no label', 'nama': 'inline label - always visible', 'kategori': 'inline label - always visible', 'jam_buka': 'inline label - always visible', 'alamat': 'inline label - always visible', });
lyr_LokasiBisnisMulyoAgung_5.on('precompose', function(evt) {
    evt.context.globalCompositeOperation = 'normal';
});