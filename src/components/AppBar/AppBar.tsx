import { Flex, Heading, Text } from "@aws-amplify/ui-react";
import { FC } from "react";
import styles from "./AppBar.module.css";

export const AppBar: FC = () => {
  return (
    <Heading className={styles.appbar} level={3}>
      <Flex justifyContent="space-between">
        <Text>tiny-asset-tracker-amplify</Text>
        <Text>tiny-asset-tracker-amplify</Text>
      </Flex>
    </Heading>
  );
};
