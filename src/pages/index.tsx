// pages/index.js
import { Authenticator } from "@aws-amplify/ui-react";
import { Amplify, API, Auth, withSSRContext } from "aws-amplify";
import Head from "next/head";
import awsExports from "@/aws-exports";
import { createLora } from "@/graphql/mutations";
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
      authMode: "AMAZON_COGNITO_USER_POOLS",
      query: createLora,
      variables: {
        input: {
          time: form.get("time"),
          lat: form.get("lat"),
          long: "1",
          temp: "12",
        },
      },
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
  long: string;
  temp: string;
}

interface IHomeProps {
  loras: ILora[];
}

const Home: FC<IHomeProps> = ({ loras }) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>tiny-asset-tracker-amplify</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>tiny-asset-tracker-amplify</h1>

        <div className={styles.grid}>
          <div className={styles.card}>
            <p className={styles.description}>
              <code className={styles.code}>{loras.length} </code>
              lora messages
            </p>

            <table>
              {loras.map((lora) => (
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
            </table>
          </div>

          <div className={styles.card}>
            <h3 className={styles.title}>Add mock lora data</h3>

            <Authenticator>
              <form onSubmit={handleCreatePost}>
                <div className={styles.fieldset}>
                  <legend>Time</legend>
                  <input
                    defaultValue={`Today, ${new Date().toLocaleTimeString()}`}
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
                      document.querySelector("[name=time]")! as HTMLInputElement
                    ).value = `${new Date().toLocaleTimeString()}`;
                    (
                      document.querySelector("[name=lat]")! as HTMLInputElement
                    ).value = `${54 + Math.random()}`;
                    (
                      document.querySelector("[name=long]")! as HTMLInputElement
                    ).value = `${8 + Math.random()}`;
                    (
                      document.querySelector("[name=temp]")! as HTMLInputElement
                    ).value = `${Math.floor(Math.random() * 100)}`;
                  }}
                >
                  r
                </button>
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
