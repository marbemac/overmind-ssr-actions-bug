import { IConfig } from 'overmind';
import { createHook } from 'overmind-react';

import * as actions from './actions';
import { state } from './state';
import { onInitialize } from './onInitialize';

export const config = { state, actions, onInitialize };

declare module 'overmind' {
  interface Config extends IConfig<typeof config> {}
}

export const useOvermind = createHook<typeof config>();
