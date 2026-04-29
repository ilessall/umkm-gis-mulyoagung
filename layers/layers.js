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

lyr_OpenStreetMap_0.setVisible(true);lyr_AreaDesaMulyoAgung_1.setVisible(true);lyr_JalanUtama_2.setVisible(true);lyr_LokasiTempatIbadah_3.setVisible(true);lyr_LokasiSekolah_4.setVisible(true);lyr_LokasiBisnisMulyoAgung_5.setVisible(true);
var layersList = [lyr_OpenStreetMap_0,lyr_AreaDesaMulyoAgung_1,lyr_JalanUtama_2,lyr_LokasiTempatIbadah_3,lyr_LokasiSekolah_4,lyr_LokasiBisnisMulyoAgung_5];
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