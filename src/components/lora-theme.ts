import { Theme } from "@aws-amplify/ui-react";

export const theme: Theme = {
  name: "lora-theme",
  tokens: {
    colors: {
      background: {
        primary: {
          value: "#304050",
        },
      },
      font: {
        primary: { value: "white" },
        secondary: { value: "#047d95" },
      },
    },
  },
  // overrides: {
  //   TextField: {
  //   }
  // }
};
