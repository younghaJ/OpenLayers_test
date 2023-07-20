import React, { useEffect, useRef } from "react";

import { Map as OlMap, View } from "ol";
import { defaults as defaultControls } from "ol/control";
import { fromLonLat, get as getProjection } from "ol/proj";
import { Tile as TileLayer, Vector as VectorLayer } from "ol/layer";
import { XYZ, Vector as VectorSource } from "ol/source";
import "ol/ol.css";

export default function MapTest() {
  // OlMap 타겟 지정을 위해 사용 (id를 지정 대신)
  const mapContent = useRef(null);
  
  // 추후 객체를 추가하기 위한 레이어(점, 선, 도형)
  const initVectorLayer = new VectorLayer({
    source: new VectorSource(),
  });

  useEffect(() => {
    const map = new Map({
      layers: [
        new TileLayer({
          source: new XYZ({ url: "http://xdworld.vworld.kr:8080/2d/Base/202002/{z}/{x}/{y}.png" }),
        }),
      ],
      view: new View({
        center: [31,23],
        zoom: 10,
      }),
    });


  }, []);



  return (
    <div className="gis-map-wrap">
      <h1>안 된다....</h1>
      <div ref={mapContent}></div>
    </div>
  );
}