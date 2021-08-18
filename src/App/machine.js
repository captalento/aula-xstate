import { createMachine, assign } from "xstate";

const context = { email: "", name: "Agibank" };

export const appMachine = createMachine({
  id: "appMachine",
  initial: "show-login",
  context,
  states: {
    "show-login": {
      on: {
        "go-to-forgot": "show-forgot",
        logar: {
          target: "show-home",
        },
      },
    },
    "show-home": {},
    "show-forgot": {
      on: {
        "go-to-info": {
          target: "show-info",
          actions: assign({
            email: (_context, event) => {
              return event.email;
            },
          }),
        },
      },
    },
    "show-info": {
      on: {
        "go-to-login": "show-login",
      },
    },
  },
});
