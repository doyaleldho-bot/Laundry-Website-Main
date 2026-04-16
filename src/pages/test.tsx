import { useEffect } from "react";

export default function Map() {
  useEffect(() => {
    const script = document.createElement("script");

    script.src = `https://maps.googleapis.com/maps/api/js?key=${
      import.meta.env.VITE_GOOGLE_MAPS_KEY
    }&libraries=places`;

    script.async = true;

    script.onload = () => {
      const map = new window.google.maps.Map(
        document.getElementById("map")!,
        {
          center: { lat: 9.9312, lng: 76.2673 }, // Kochi
          zoom: 12,
        }
      );
    };

    document.head.appendChild(script);
  }, []);

  return <div id="map" style={{ height: "400px", width: "100%" }} />;
}