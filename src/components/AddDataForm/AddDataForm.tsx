import { createLora } from "@/graphql/mutations";
import { ILora } from "@/types";
import "@aws-amplify/ui-react-geo/styles.css";
import { API } from "aws-amplify";
import { FC } from "react";
import { Observable } from "zen-observable-ts";
import styles from "./AddDataForm.module.css";

async function handleCreatePost(
  event: React.FormEvent<HTMLFormElement>
): Promise<ILora | undefined> {
  event.preventDefault();

  const form = new FormData(event.target as HTMLFormElement);

  try {
    const response = await API.graphql<{ createLora: ILora }>({
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

    if (response instanceof Observable<object>) {
      return;
    }

    return response.data?.createLora;
    // window.location.href = `/posts/${data.createPost.id}`;
  } catch (err: unknown) {
    const typedErr = err as { errors?: { message?: string }[] };
    if (typedErr.errors?.[0].message) {
      console.error(...typedErr.errors);
      throw new Error(typedErr.errors[0].message);
    }
    console.log(typedErr);
  }
}

interface IAddDataForm {
  setOptimisticLora: (fn: (prev: ILora[]) => ILora[]) => void;
}

const getTimestamp = (): string =>
  new Date().toISOString().slice(0, 19).replace(/[-:]/g, "").replace("T", "_");

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
          <input defaultValue={`${getTimestamp()}`} name="time" />
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
            ).value = `${getTimestamp()}`;
            (
              document.querySelector("[name=lat]")! as HTMLInputElement
            ).value = `${51 + Math.random() * 2}`;
            (
              document.querySelector("[name=long]")! as HTMLInputElement
            ).value = `${4 + Math.random() * 2}`;
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
