import awsExports from "@/aws-exports";
import AddDataForm from "@/components/AddDataForm/AddDataForm";
import LoraMap from "@/components/LoraMap/LoraMap";
import { listLoras } from "@/graphql/queries";
import { ILora } from "@/types";
import { GraphQLResult } from "@aws-amplify/api";
import { Authenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react-geo/styles.css";
import { Amplify, Auth, withSSRContext } from "aws-amplify";
import { GetServerSideProps } from "next";
import Head from "next/head";
import { FC, useEffect, useState } from "react";
import styles from "../styles/Home.module.css";

Amplify.configure({ ...awsExports, ssr: true });

interface IHomeProps {
  loras?: ILora[];
}

export const getServerSideProps: GetServerSideProps<IHomeProps> = async (
  context
) => {
  const { req } = context;
  const SSR = withSSRContext({ req });

  try {
    const response: GraphQLResult<{ listLoras: { items: ILora[] } }> =
      await SSR.API.graphql({
        query: listLoras,
        authMode: "API_KEY",
      });
    return {
      props: {
        loras: response.data?.listLoras.items,
      },
    };
  } catch (err) {
    console.error("err!", err);
    return {
      props: {},
    };
  }
};

const Home: FC<IHomeProps> = ({ loras = [] }) => {
  const [optimisticLora, setOptimisticLora] = useState<ILora[]>([]);
  const [username, setUsername] = useState<string | undefined>();

  const totalLoraItems = [...loras, ...optimisticLora];
  totalLoraItems.sort(({ time }, { time: otherTime }) => {
    if (time < otherTime) {
      return -1;
    }
    if (otherTime < time) {
      return 1;
    }
    return 0;
  });

  // TODO update this value after logging in, and show username at the top of the app
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
            <LoraMap loras={totalLoraItems} />
            {/* <div>
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
                {totalLoraItems.map((lora) => (
                  <Marker
                    key={lora.id}
                    // TODO should be number in graphql schema
                    latitude={parseFloat(lora.lat)}
                    longitude={parseFloat(lora.long)}
                  />
                ))}
              </MapView>
            </div> */}

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

              <AddDataForm setOptimisticLora={setOptimisticLora} />
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
