// pages/index.js
import { Authenticator } from "@aws-amplify/ui-react";
import { Amplify, API, Auth, withSSRContext } from "aws-amplify";
import Head from "next/head";
import awsExports from "@/aws-exports";
import { createLora } from '@/graphql/mutations';
import { listLoras } from "@/graphql/queries";
import styles from "../styles/Home.module.css";
import { FC } from "react";

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

async function handleCreatePost(event: any) {
  event.preventDefault();

  const form = new FormData(event.target);

  try {
    const { data }: any = await API.graphql({
      authMode: 'AMAZON_COGNITO_USER_POOLS',
      query: createLora,
      variables: {
        input: {
          time: form.get('time'),
          lat: form.get('lat'),
          long: '1',
          temp: '12'
        }
      }
    });

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
}

interface IHomeProps {
  loras: ILora[];
}

const Home: FC<IHomeProps> = ({ loras }) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Amplify + Next.js</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Amplify + Next.js</h1>

        <p className={styles.description}>
          <code className={styles.code}>{loras.length}</code>
          lora messages
        </p>

        <div className={styles.grid}>
          {loras.map((lora) => (
            <a className={styles.card} href={`/posts/${lora.id}`} key={lora.id}>
              <h3>{lora.time}</h3>
              <p>{lora.lat}</p>
            </a>
          ))}

          <div className={styles.card}>
            <h3 className={styles.title}>New Post</h3>

            <Authenticator>
              <form onSubmit={handleCreatePost}>
                <fieldset>
                  <legend>Time</legend>
                  <input
                    defaultValue={`Today, ${new Date().toLocaleTimeString()}`}
                    name="time"
                  />
                </fieldset>

                <fieldset>
                  <legend>Lat</legend>
                  <input
                    // defaultValue="I built an Amplify project with Next.js!"
                    name="lat"
                  />
                </fieldset>

                <button>Send Lora Status update</button>
                <button type="button" onClick={() => Auth.signOut()}>
                  Sign out
                </button>
              </form>
            </Authenticator>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
