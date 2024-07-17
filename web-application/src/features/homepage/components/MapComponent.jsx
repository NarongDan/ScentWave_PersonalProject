import { useState, useEffect } from "react";
import { GoogleMap, LoadScript } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "400px",
};

const center = {
  lat: 13.661396786873429, // ละติจูดของตำแหน่งที่ต้องการ
  lng: 100.60570690269309, // ลองจิจูดของตำแหน่งที่ต้องการ
};

function MapComponent() {
  const [map, setMap] = useState(null);
  const [marker, setMarker] = useState(null);

  // สร้าง Marker เมื่อแผนที่โหลดเสร็จ
  const onLoad = (map) => {
    setMap(map);
    const marker = new window.google.maps.Marker({
      position: center,
      map: map,
      title: "My Marker",
    });
    setMarker(marker);
  };

  // ซูมเข้าไปยังตำแหน่งของ Marker เมื่อ Marker ถูกสร้าง
  useEffect(() => {
    if (map && marker) {
      map.panTo(marker.getPosition());
      map.setZoom(15); // ซูมเข้าไปใกล้มากขึ้น (ตัวอย่าง)
    }
  }, [map, marker]);

  return (
    <LoadScript googleMapsApiKey="AIzaSyCzrq9y49MWrX6m2rTuiB3MvADPlC3a9RY">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
        onLoad={onLoad}
      />
    </LoadScript>
  );
}

export default MapComponent;
