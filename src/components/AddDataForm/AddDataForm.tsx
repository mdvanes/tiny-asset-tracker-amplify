import { createLora } from "@/graphql/mutations";
import { ILora } from "@/types";
import {
  Button,
  Card,
  Flex,
  Heading,
  TextField,
  View,
  useTheme,
} from "@aws-amplify/ui-react";
import { API } from "aws-amplify";
import { FC } from "react";
import { Observable } from "zen-observable-ts";

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
  const { tokens } = useTheme();

  return (
    <View paddingBottom={tokens.space.medium}>
      <Card variation="outlined" backgroundColor="#304050">
        <Heading level={4}>Add mock lora data</Heading>

        <form
          onSubmit={async (ev) => {
            const result = await handleCreatePost(ev);
            if (result?.id) {
              setOptimisticLora((opt) => [...opt, result]);
            }
          }}
        >
          <Flex direction="column" gap="1rem">
            <TextField
              label="Time"
              defaultValue={`${getTimestamp()}`}
              name="time"
            />

            <TextField label="Latitude" name="lat" />

            <TextField label="Longitude" name="long" />

            <TextField label="Temperature" name="temp" />
          </Flex>

          <Flex direction="row" gap="1.5rem" marginTop="1rem">
            <Button
              type="button"
              variation="link"
              className="button"
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
              randomize
            </Button>
            <Button type="submit" variation="primary">
              Send Lora Status update
            </Button>
          </Flex>
        </form>
      </Card>
    </View>
  );
};

export default AddDataForm;
