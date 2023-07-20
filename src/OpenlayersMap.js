import { View } from "ol";
import TileLayer from "ol/layer/Tile";
import { fromLonLat, get as getProjection } from 'ol/proj'; //위경도
import { OSM } from "ol/source";
import React, { useEffect, useState } from "react";

function OpenlayersMap() {
  const [mapObject, setMapObject] = useState({});

  useEffect(() => {
    const map = new OpenlayersMap({
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],
      target: "map",

      view: new View({
        center: fromLonLat([126.752, 37.4713], getProjection("EPSG:3857")),
        zoom: 7,
      }),
    });
    setMapObject({ map });
    return () => {
      map.setTarget(null);
      setMapObject(null);
    };
  }, []);
  return <div id="map" style={{ height: "100%" }}></div>;
};

export default OpenlayersMap;
