import awsExports from "@/aws-exports";
import AddDataForm from "@/components/AddDataForm/AddDataForm";
import { AppBar } from "@/components/AppBar/AppBar";
import LoraMap from "@/components/LoraMap/LoraMap";
import LoraTable from "@/components/LoraTable/LoraTable";
import { theme } from "@/components/lora-theme";
import { listLoras } from "@/graphql/queries";
import { ILora } from "@/types";
import { GraphQLResult } from "@aws-amplify/api";
import { Authenticator, ThemeProvider } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react-geo/styles.css";
import "@aws-amplify/ui-react/styles.css";
import { Amplify, withSSRContext } from "aws-amplify";
import { GetServerSideProps } from "next";
import Head from "next/head";
import { FC, useState } from "react";
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

  return (
    <ThemeProvider colorMode="dark" theme={theme}>
      <div className={styles.container}>
        <Head>
          <title>tiny-asset-tracker-amplify</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <AppBar />

        <main className={styles.main}>
          {/* {!username && (
          <p className={styles.description}>
            <code className={styles.code}>{totalLoraItems.length} </code>
            lora messages
          </p>
        )} */}

          <Authenticator>
            <div className={styles.grid}>
              <LoraMap loras={totalLoraItems} />

              <div>
                <LoraTable loras={totalLoraItems} />

                <AddDataForm setOptimisticLora={setOptimisticLora} />
              </div>
            </div>
          </Authenticator>
        </main>
      </div>
    </ThemeProvider>
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
