import {
  Button,
  Flex,
  Heading,
  Text,
  useAuthenticator,
} from "@aws-amplify/ui-react";
import { FC } from "react";
import styles from "./AppBar.module.css";

export const AppBar: FC = () => {
  const { user, signOut } = useAuthenticator((context) => [context.user]);
  const username = user?.username;

  return (
    <Heading className={styles.appbar} level={3}>
      <Flex justifyContent="space-between" alignItems="center" gap="2rem">
        <Text flex={1}>tiny-asset-tracker-amplify</Text>
        {username ? (
          <>
            <Heading level={5}>{username}</Heading>
            <Button
              type="button"
              variation="warning"
              onClick={async () => signOut()}
            >
              Sign out
            </Button>
          </>
        ) : (
          ""
        )}
      </Flex>
    </Heading>
  );
};
