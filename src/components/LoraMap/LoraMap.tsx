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
} from "react-map-gl";

interface ILoraMapProps {
  loras?: ILora[];
}

const LoraMap: FC<ILoraMapProps> = ({ loras = [] }) => {
  return (
    <div>
      <MapView
        style={{
          width: "calc(60vw - 3rem)",
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
      </MapView>
    </div>
  );
};

export default LoraMap;
