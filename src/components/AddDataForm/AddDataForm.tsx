import { createLora } from "@/graphql/mutations";
import { ILora } from "@/types";
import "@aws-amplify/ui-react-geo/styles.css";
import { API } from "aws-amplify";
import { FC } from "react";
import styles from "./AddDataForm.module.css";
import { GraphQLResult } from "@aws-amplify/api";

async function handleCreatePost(
  event: React.FormEvent<HTMLFormElement>
): Promise<ILora | undefined> {
  event.preventDefault();

  const form = new FormData(event.target as HTMLFormElement);

  try {
    const { data } = (await API.graphql({
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
    })) as GraphQLResult<{ createLora: ILora }>;

    return data?.createLora;
    // window.location.href = `/posts/${data.createPost.id}`;
  } catch ({ errors }: any) {
    console.log(errors);
    console.error(...errors);
    throw new Error(errors[0].message);
  }
}

interface IAddDataForm {
  setOptimisticLora: (fn: (prev: ILora[]) => ILora[]) => void;
}

const AddDataForm: FC<IAddDataForm> = ({ setOptimisticLora }) => {
  return (
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
      </form>
    </div>
  );
};

export default AddDataForm;
