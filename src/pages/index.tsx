import { Authenticator } from "@aws-amplify/ui-react";
import { Amplify, API, Auth, withSSRContext } from "aws-amplify";
import Head from "next/head";
import awsExports from "@/aws-exports";
import { createLora } from "@/graphql/mutations";
import { listLoras } from "@/graphql/queries";
import styles from "../styles/Home.module.css";
import { FC, useEffect, useState } from "react";
import { MapView } from "@aws-amplify/ui-react-geo";
import Map, {
  Marker,
  Popup,
  NavigationControl,
  FullscreenControl,
  ScaleControl,
  GeolocateControl,
} from "react-map-gl";
import "@aws-amplify/ui-react-geo/styles.css";

Amplify.configure({ ...awsExports, ssr: true });

export async function getServerSideProps({ req }: any) {
  const SSR = withSSRContext({ req });

  try {
    // const response = await SSR.API.get("lora", "/lora");
    // console.log(response.data);
    // API.get('')
    // SSR.API.
    const response = await SSR.API.graphql({
      query: listLoras,
      authMode: "API_KEY",
    });
    return {
      props: {
        loras: response.data.listLoras.items,
      },
    };
  } catch (err) {
    console.log("err!");
    console.log(err);
    return {
      props: {},
    };
  }
}

// TODO split into small components

async function handleCreatePost(event: any) {
  event.preventDefault();

  const form = new FormData(event.target);

  try {
    const { data }: any = await API.graphql({
      authMode: "AMAZON_COGNITO_USER_POOLS",
      query: createLora,
      variables: {
        input: {
          time: form.get("time"),
          lat: form.get("lat"),
          long: form.get("long"),
          temp: form.get("temp"),
        },
      },
    });

    // console.log(data.createLora);
    return data.createLora;
    // window.location.href = `/posts/${data.createPost.id}`;
  } catch ({ errors }: any) {
    console.log(errors);
    console.error(...errors);
    throw new Error(errors[0].message);
  }
}

interface ILora {
  id: string;
  time: string;
  lat: string;
  long: string;
  temp: string;
}

interface IHomeProps {
  loras: ILora[];
}

const Home: FC<IHomeProps> = ({ loras }) => {
  const [optimisticLora, setOptimisticLora] = useState<ILora[]>([]);
  const [username, setUsername] = useState<string | undefined>();

  const totalLoraItems = [...loras, ...optimisticLora];

  // TODO update this value after logging in
  useEffect(() => {
    const run = async () => {
      const x = await Auth.currentAuthenticatedUser();

      setUsername(x.username);
    };
    run();
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>tiny-asset-tracker-amplify</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>tiny-asset-tracker-amplify</h1>

        {/* {!username && (
          <p className={styles.description}>
            <code className={styles.code}>{totalLoraItems.length} </code>
            lora messages
          </p>
        )} */}

        <Authenticator>
          <div className={styles.grid}>
            <div>
              <MapView
                style={{
                  width: "calc(70vw - 3rem)",
                  height: "calc(100vh - 200px)",
                  marginBottom: "1rem",
                }}
                // initialViewState={{
                //   latitude: 37.8,
                //   longitude: -122.4,
                //   zoom: 14,
                // }}
                initialViewState={
                  totalLoraItems && totalLoraItems.length > 0
                    ? {
                        latitude: parseInt(totalLoraItems[0].lat, 10),
                        longitude: parseInt(totalLoraItems[0].long, 10),
                        zoom: 8,
                      }
                    : undefined
                }
                // mapStyle="mapbox://styles/mapbox/dark-v9"
                // mapStyle="mapbox://styles/mapbox/dark-v11"
              >
                <GeolocateControl position="top-left" />
                <FullscreenControl position="top-left" />
                <NavigationControl position="top-left" />
                <ScaleControl />
                {totalLoraItems.map((lora) => (
                  <Marker
                    key={lora.id}
                    latitude={parseInt(lora.lat, 10)}
                    longitude={parseInt(lora.long, 10)}
                  />
                ))}
              </MapView>
            </div>

            <div>
              <div className={styles.card}>
                <p className={styles.description}>
                  <code className={styles.code}>{totalLoraItems.length} </code>
                  lora messages
                </p>

                <table>
                  <thead>
                    <tr>
                      <th>time</th>
                      <th>lat</th>
                      <th>long</th>
                      <th>temp</th>
                    </tr>
                  </thead>
                  <tbody>
                    {totalLoraItems.map((lora) => (
                      <tr key={lora.id} className={styles.li}>
                        <td>{lora.time}</td>
                        <td>{lora.lat}</td>
                        <td>{lora.long}</td>
                        <td>{lora.temp}</td>
                        {/* <a href={`/posts/${lora.id}`}>
                    <h3></h3>
                    <p>{lora.lat}</p>
                  </a> */}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className={styles.card}>
                <h3 className={styles.title}>Add mock lora data</h3>

                <form
                  onSubmit={async (ev) => {
                    const result = await handleCreatePost(ev);
                    if (result?.id) {
                      setOptimisticLora((opt) => [...opt, result]);
                    }
                  }}
                >
                  <div className={styles.fieldset}>
                    <legend>Time</legend>
                    <input
                      defaultValue={`${new Date().toLocaleTimeString()}`}
                      name="time"
                    />
                  </div>

                  <div className={styles.fieldset}>
                    <legend>Lat</legend>
                    <input
                      // defaultValue="I built an Amplify project with Next.js!"
                      name="lat"
                    />
                  </div>

                  <div className={styles.fieldset}>
                    <legend>Long</legend>
                    <input name="long" />
                  </div>

                  <div className={styles.fieldset}>
                    <legend>Temperature</legend>
                    <input name="temp" />
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      (
                        document.querySelector(
                          "[name=time]"
                        )! as HTMLInputElement
                      ).value = `${new Date().toLocaleTimeString()}`;
                      (
                        document.querySelector(
                          "[name=lat]"
                        )! as HTMLInputElement
                      ).value = `${54 + Math.random()}`;
                      (
                        document.querySelector(
                          "[name=long]"
                        )! as HTMLInputElement
                      ).value = `${8 + Math.random()}`;
                      (
                        document.querySelector(
                          "[name=temp]"
                        )! as HTMLInputElement
                      ).value = `${Math.floor(Math.random() * 100)}`;
                    }}
                  >
                    r
                  </button>
                  <button>Send Lora Status update</button>
                </form>
              </div>
            </div>
          </div>

          {/* TODO use import { Button } from '@aws-amplify/ui-react'; */}
          <button type="button" onClick={() => Auth.signOut()}>
            Sign out
          </button>
        </Authenticator>
      </main>
    </div>
  );
};

export default Home;

// import { Amplify } from 'aws-amplify';
// import { MapView } from '@aws-amplify/ui-react-geo';

// import '@aws-amplify/ui-react-geo/styles.css';

// import awsExports from '@/aws-exports';

// Amplify.configure(awsExports);

// export default function BasicMap() {
//   return <MapView />;
// }
