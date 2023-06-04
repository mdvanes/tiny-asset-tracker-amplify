import { ILora } from "@/types";
import "@aws-amplify/ui-react-geo/styles.css";
import { FC } from "react";
import styles from "./LoraTable.module.css";

interface ILoraTableProps {
  loras?: ILora[];
}

const LoraTable: FC<ILoraTableProps> = ({ loras = [] }) => {
  return (
    <div className={styles.card}>
      <p className={styles.description}>
        <code className={styles.code}>{loras.length} </code>
        lora messages
      </p>

      <table>
        <thead>
          <tr>
            <th>time</th>
            <th>lat</th>
            <th>long</th>
            <th>temp</th>
          </tr>
        </thead>
        <tbody>
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
        </tbody>
      </table>
    </div>
  );
};

export default LoraTable;
