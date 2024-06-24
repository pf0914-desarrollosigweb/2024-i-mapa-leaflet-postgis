// Evento que se dispara al cargar la página web
document.addEventListener("DOMContentLoaded", iniciar)

// Función que se invoca con el disparo de "DOMContentLoaded"
function iniciar() {

    // Objeto del mapa Leaflet
    var mapa = L.map('mapaid').setView([9.5, -84], 8);

    // Capa base de Carto
    positromap = L.tileLayer(
        "https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png",
        {
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
          subdomains: "abcd",
          maxZoom: 20,
        }
    ).addTo(mapa);

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
      "Carto Positron": positromap,
      OpenStreetMap: osm,
      "ESRI WorldImagery": esriworld,
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

        // Se obtienen los datos en GeoJSON
        observaciones = L.geoJSON(json, {}).addTo(mapa);

        // Se agrgan los datos GeoJSON al mapa
        control_capas.addOverlay(observaciones, "Observaciones");      
    }

    // Llamado a fetchGetRequest()
    fetchGetRequest('/api/v1/observaciones', agregarObservacionesAlMapa)
}