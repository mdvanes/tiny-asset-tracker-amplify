import { Button, Flex, Heading, Text } from "@aws-amplify/ui-react";
import { Auth } from "aws-amplify";
import { FC, useEffect, useState } from "react";
import styles from "./AppBar.module.css";

export const AppBar: FC = () => {
  const [username, setUsername] = useState<string | undefined>();

  useEffect(() => {
    const run = async () => {
      const currentAuthenticatedUser = await Auth.currentAuthenticatedUser();

      setUsername(currentAuthenticatedUser.username);
    };
    run();
  }, []);

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
              onClick={() => Auth.signOut()}
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
