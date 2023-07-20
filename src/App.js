import { Feature, Map as OlMap, View } from "ol"; //뷰 관리
import { Point } from "ol/geom";
import { Tile as TileLayer } from "ol/layer"; //지도타일
import VectorLayer from "ol/layer/Vector";
import "ol/ol.css"; //스타일
import { fromLonLat, toLonLat } from "ol/proj";

import Grid from "@toast-ui/react-grid";
import { OSM } from "ol/source"; //지도정보
import VectorSource from "ol/source/Vector";
import { Icon, Style } from "ol/style";
import React, { useEffect, useState } from "react";

function App() {
  const [mapObject, setMapObject] = useState({});
  let [coordiArr, setCoordiArr] = useState([
    { lat: "126.52", log: "37.4713" },
  ]);

  const columns = [
    { name: "lat", header: "위도" },
    { name: "log", header: "경도" },
  ];

  const MyGrid = () => (
    <Grid
      data={coordiArr}
      columns={columns}
      scrollX={false}
      scrollY={false}
    />
  );

  useEffect(() => {
    const map = new OlMap({
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],
      target: "map",

      view: new View({
        center: fromLonLat([126.752, 37.4713]),
        zoom: 7,
        minZoom: 3,
        maxZoom: 17,
      }),
    });

    const handleClick = (event) => {
      console.log(event.coordinate);
      const coordinate4326 = toLonLat(event.coordinate);
      console.log(coordinate4326);
      const { coordinate } = event;

      const newdata = {
        lat: coordinate4326[0].toString(),
        log: coordinate4326[1].toString(),
      };

      console.log("객체 ");
      console.log(coordiArr);
      

      const vectorLayer = new VectorLayer({
        source: new VectorSource(),
      });

      map.addLayer(vectorLayer);

      const markerFeature = new Feature({
        geometry: new Point(coordinate),
      });

      const markerStyle = new Style({
        image: new Icon({
          src: "https://cdn-icons-png.flaticon.com/512/870/870056.png", // 마커 아이콘 이미지 경로
          anchor: [0.5, 0.5], // 마커 아이콘의 앵커 지점 설정
          scale: 0.1,
        }),
      });

      markerFeature.setStyle(markerStyle);
      vectorLayer.getSource().addFeature(markerFeature);

      // setCoordiArr([...coordiArr, newdata]);
      setCoordiArr((prevCoordiArr) => [...prevCoordiArr, newdata]);
    };

    map.on("click", handleClick);
    setMapObject({ map });

    return () => {
      map.setTarget(null);
      setMapObject(null);
    };
  }, []);

  return (
    <div>
      <div style={{ height: "75vh", width: "80vw" }}>
        <div id="map" style={{ height: "100%" }}></div>
      </div>
      <div style={{ height: "25vh", width: "80vw", backgroundColor: "gray" }}>
        {/* <div style={{ backgroundColor: "beige", height: "10%"}} /> */}
        <MyGrid />
      </div>
    </div>
  );
}

export default App;
