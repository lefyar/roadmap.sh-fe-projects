export default function getUserLocation(): Promise<string | null> {
  return new Promise((resolve, reject) => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          try {
            const locationResponse = await fetch(
              `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
            );
            const locationData = await locationResponse.json();
            const city =
              locationData.address.city ||
              locationData.address.town ||
              locationData.address.village;
            resolve(city);
          } catch {
            reject("Failed to fetch location data");
          }
        },
        (geoError) => {
          reject(`${geoError.message}, please enter manually`);
        }
      );
    } else {
      reject("Geolocation is not available in this browser");
    }
  });
}
