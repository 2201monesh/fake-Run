import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <MapContainer
        center={[28.6139, 77.209]}
        zoom={13}
        style={{ height: "100vh", width: "100%" }}
      >
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[28.6139, 77.209]}>
          <Popup>Delhi</Popup>
        </Marker>
      </MapContainer>
    </>
  );
}

export default App;
