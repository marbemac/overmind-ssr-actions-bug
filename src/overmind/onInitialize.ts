import { OnInitialize, rehydrate } from 'overmind';

export const onInitialize: OnInitialize = ({ state, actions }) => {
  // @ts-ignore
  if (!process.browser) {
    actions.setOnInitializeMessage('onInitialize!')
  }

  // @ts-ignore
  const mutations = window.__OVERMIND_MUTATIONS;

  rehydrate(state, mutations);
};
