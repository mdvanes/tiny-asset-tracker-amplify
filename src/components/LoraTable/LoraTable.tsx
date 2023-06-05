import { ILora } from "@/types";
import "@aws-amplify/ui-react-geo/styles.css";
import { FC } from "react";
import styles from "./LoraTable.module.css";
import {
  Table,
  TableCell,
  TableBody,
  TableHead,
  TableRow,
  Card,
  View,
  useTheme,
} from "@aws-amplify/ui-react";

interface ILoraTableProps {
  loras?: ILora[];
}

const LoraTable: FC<ILoraTableProps> = ({ loras = [] }) => {
  const { tokens } = useTheme();

  return (
    <View paddingBottom={tokens.space.medium}>
      <Card variation="outlined">
        <p className={styles.description}>
          <code className={styles.code}>{loras.length} </code>
          lora messages
        </p>

        <Table>
          <TableHead>
            <TableRow>
              <TableCell as="th">time</TableCell>
              <TableCell as="th">lat</TableCell>
              <TableCell as="th">long</TableCell>
              <TableCell as="th">temp</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loras.map((lora) => (
              <TableRow key={lora.id}>
                <TableCell>{lora.time}</TableCell>
                <TableCell>{lora.lat}</TableCell>
                <TableCell>{lora.long}</TableCell>
                <TableCell>{lora.temp}</TableCell>
                {/* <a href={`/posts/${lora.id}`}>
                    <h3></h3>
                    <p>{lora.lat}</p>
                  </a> */}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </View>
  );
};

export default LoraTable;
