const ubicacion = {
  latitud: null,
  longitud: null,
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

function pedirUbicacion(alExito, alError) {
  if (!("geolocation" in navigator)) {
    alError("Este navegador no soporta geolocalización.");
    return;
  }

  navigator.geolocation.getCurrentPosition(
    (posicion) => {
      ubicacion.latitud = posicion.coords.latitude;
      ubicacion.longitud = posicion.coords.longitude;
      alExito(ubicacion);
    },
    (error) => {
      alError(mensajeDeError(error));
    },
    { timeout: 10000, maximumAge: 600000 }
  );
}