const ubicacion = {
  latitud: null,
  longitud: null,
  ciudad: null,
  pais: null,
};

function mensajeDeError(error) {
  switch (error.code) {
    case error.PERMISSION_DENIED:
      return "Permiso de ubicación denegado.";
    case error.POSITION_UNAVAILABLE:
      return "No se pudo determinar la ubicación.";
    case error.TIMEOUT:
      return "La ubicación tardó demasiado en responder.";
    default:
      return "Error desconocido al obtener la ubicación.";
  }
}

async function obtenerPaisYCiudad(lat, lon) {
  try {
    const respuesta = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&zoom=10`, {
      headers: {
        'Accept-Language': 'es' 
      }
    });
    const datos = await respuesta.json();
    if (datos && datos.address) {
      ubicacion.ciudad = datos.address.city || datos.address.town || datos.address.village || datos.address.county || "";
      ubicacion.pais = datos.address.country || "";
      return {
        ciudad: ubicacion.ciudad,
        pais: ubicacion.pais
      };
    }
  } catch (e) {
    console.error("No se pudo obtener la localidad", e);
  }
  return null;
}

function pedirUbicacion(alExito, alError) {
  if (!("geolocation" in navigator)) {
    alError("Este navegador no soporta geolocalización.");
    return;
  }

  navigator.geolocation.getCurrentPosition(
    async (posicion) => {
      ubicacion.latitud = posicion.coords.latitude;
      ubicacion.longitud = posicion.coords.longitude;
      
      await obtenerPaisYCiudad(ubicacion.latitud, ubicacion.longitud);
      
      alExito(ubicacion);
    },
    (error) => {
      alError(mensajeDeError(error));
    },
    { timeout: 10000, maximumAge: 600000 }
  );
}