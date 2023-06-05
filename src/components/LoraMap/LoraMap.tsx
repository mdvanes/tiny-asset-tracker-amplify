import { ILora } from "@/types";
import { MapView } from "@aws-amplify/ui-react-geo";
import "@aws-amplify/ui-react-geo/styles.css";
import { FC } from "react";
import {
  FullscreenControl,
  GeolocateControl,
  Marker,
  NavigationControl,
  ScaleControl,
  Layer,
  Source,
} from "react-map-gl";

interface ILoraMapProps {
  loras?: ILora[];
}

const LoraMap: FC<ILoraMapProps> = ({ loras = [] }) => {
  const dataOne: GeoJSON.Feature<GeoJSON.Geometry> = {
    type: "Feature",
    properties: {},
    geometry: {
      type: "LineString",
      coordinates: loras.map((lora) => [
        parseFloat(lora.long),
        parseFloat(lora.lat),
      ]),
    },
  };

  return (
    <div style={{ flex: 1 }}>
      <MapView
        style={{
          width: "100%",
          height: "calc(100vh - 200px)",
          marginBottom: "1rem",
        }}
        initialViewState={{
          latitude: 52.029,
          longitude: 5.076,
          zoom: 7,
        }}
        // initialViewState={
        //   totalLoraItems && totalLoraItems.length > 0
        //     ? {
        //         latitude: parseInt(totalLoraItems[0].lat, 10),
        //         longitude: parseInt(totalLoraItems[0].long, 10),
        //         zoom: 8,
        //       }
        //     : undefined
        // }
      >
        <GeolocateControl position="top-left" />
        <FullscreenControl position="top-left" />
        <NavigationControl position="top-left" />
        <ScaleControl />
        {loras.map((lora) => (
          <Marker
            key={lora.id}
            // TODO should be number in graphql schema
            latitude={parseFloat(lora.lat)}
            longitude={parseFloat(lora.long)}
          />
        ))}
        <Source id="polylineLayer" type="geojson" data={dataOne}>
          <Layer
            id="lineLayer"
            type="line"
            source="my-data"
            layout={{
              "line-join": "round",
              "line-cap": "round",
            }}
            paint={{
              "line-color": "rgba(3, 170, 238, 0.5)",
              "line-width": 5,
            }}
          />
        </Source>
      </MapView>
    </div>
  );
};

export default LoraMap;
