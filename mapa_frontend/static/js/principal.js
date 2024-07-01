// Evento que se dispara al cargar la página web
document.addEventListener("DOMContentLoaded", iniciar)

// Función que se invoca con el disparo de "DOMContentLoaded"
function iniciar() {

    // Objeto del mapa Leaflet
    var mapa = L.map('mapaid').setView([9.5, -84], 8);

    // Capa base de Carto Positron
    positron = L.tileLayer(
        "https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png",
        {
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
          subdomains: "abcd",
          maxZoom: 20,
        }
    ).addTo(mapa);

    // Capa base de Carto Darkmatter
    darkmatter = L.tileLayer(
        'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', 
        {
          attribution: 
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
          subdomains: 'abcd',
          maxZoom: 20
        }
    );    

    // Capa base de OSM
    osm = L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution:
        '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    });
  
    // Capa base de ESRI
    esriworld = L.tileLayer(
        "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
        {
        attribution:
            "Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community",
        }
    );

    // Objeto de capas base
    var mapasbase = {
      "Carto Positron": positron,
      "Carto DarkMatter": darkmatter,
      "OpenStreetMap": osm,
      "ESRI WorldImagery": esriworld
    };

    // Control de capas
    control_capas = L.control
    .layers(mapasbase, null, { collapsed: false })
    .addTo(mapa);

    // Función asíncrona que realiza una solicitud HTTP (tipo GET) 
    // a una URL especificada, procesa la respuesta JSON y luego
    // ejecuta una función pasada como argumento con los datos JSON obtenidos.
    const fetchGetRequest = async(url, func) => {
        try {
            const response = await fetch(url)
            const json = await response.json()
            return func(json)
        } catch (error) {
            console.log(error.message)
        }    
    }

    // Función que agrega los datos GeoJSON al mapa
    const agregarObservacionesAlMapa = (json) => {
        // console.log(json)

        // Capa de observaciones
        var observaciones = L.geoJSON(json, {});

        // Capa de calor (heatmap)
        coordenadas = json.features.map((feat) =>
            feat.geometry.coordinates.reverse()
        );
        var observaciones_calor = L.heatLayer(coordenadas, {});

        // Capa de observaciones agrupadas
        var observaciones_agrupadas = L.markerClusterGroup({
            spiderfyOnMaxZoom: true,
        });
        observaciones_agrupadas.addLayer(observaciones);

        // Se añaden las capas al mapa
        observaciones_calor.addTo(mapa);        
        observaciones_agrupadas.addTo(mapa);
        observaciones.addTo(mapa);
        
        // Se añaden las capas al control de capas
        control_capas.addOverlay(
            observaciones_calor,
            "Capa de calor"
        );
        control_capas.addOverlay(
            observaciones_agrupadas,
            "Observaciones agrupadas"
        );
        control_capas.addOverlay(
            observaciones, 
            "Observaciones"
        );
    }

    // Llamado a fetchGetRequest()
    fetchGetRequest('/api/v1/observaciones', agregarObservacionesAlMapa)
}