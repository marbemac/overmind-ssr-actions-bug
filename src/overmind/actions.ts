import { Action } from "overmind";

export const setServerMessage: Action<string> = ({ state }, msg) => {
  state.serverMessage = msg;
}

export const setComponentMessage: Action<string> = ({ state }, msg) => {
  state.componentMessage = msg;
}

export const setOnInitializeMessage: Action<string> = ({ state }, msg) => {
  state.onInitializeMessage = msg;
}
