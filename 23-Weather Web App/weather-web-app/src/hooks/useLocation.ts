export default function getUserLocation(): Promise<string | null> {
  return new Promise((resolve, reject) => {
    if (!("geolocation" in navigator)) {
      reject("Geolocation is not available in this browser");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const locationResponse = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
          );
          if (!locationResponse.ok) throw new Error("reverse-geocoding failed");
          const locationData = await locationResponse.json();
          const address = locationData?.address ?? {};
          const city =
            address.city ||
            address.town ||
            address.village ||
            address.name;
          resolve(city ?? null);
        } catch {
          reject("Failed to fetch location data");
        }
      },
      (geoError) => reject(`${geoError.message}, please enter manually`),
      { timeout: 5000 }
    );
  });
}
