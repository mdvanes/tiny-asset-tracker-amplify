import awsExports from "@/aws-exports";
import AddDataForm from "@/components/AddDataForm/AddDataForm";
import { AppBar } from "@/components/AppBar/AppBar";
import LoraMap from "@/components/LoraMap/LoraMap";
import LoraTable from "@/components/LoraTable/LoraTable";
import { theme } from "@/components/lora-theme";
import { listLoras } from "@/graphql/queries";
import { ILora } from "@/types";
import { GraphQLResult } from "@aws-amplify/api";
import { Authenticator, Flex, ThemeProvider } from "@aws-amplify/ui-react";
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

const WithProviders: FC<IHomeProps> = (props) => {
  return (
    <ThemeProvider colorMode="dark" theme={theme}>
      <Authenticator.Provider>
        <Home {...props} />
      </Authenticator.Provider>
    </ThemeProvider>
  );
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

  return (
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
          <Flex justifyContent="space-between">
            <LoraMap loras={totalLoraItems} />

            <div>
              <LoraTable loras={totalLoraItems} />

              <AddDataForm setOptimisticLora={setOptimisticLora} />
            </div>
          </Flex>
        </Authenticator>
      </main>
    </div>
  );
};

export default WithProviders;
