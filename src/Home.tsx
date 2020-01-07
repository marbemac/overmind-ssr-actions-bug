import './Home.css';

import React from 'react';

import { useOvermind } from './overmind';
import logo from './react.svg';

export const Home = () => {
  const { state } = useOvermind();

  return (
    <div className="Home">
      <div className="Home-header">
        <img src={logo} className="Home-logo" alt="logo" />
        <h2>Overmind SSR Actions</h2>
      </div>

      <ul>
        <li>Server Message: {state.serverMessage || 'not set :( check terminal for error'}</li>
        <li>Component Message: {state.componentMessage || 'not set :( check terminal for error'}</li>
        <li>On Initialize Message: {state.onInitializeMessage || 'not set :( check terminal for error'}</li>
      </ul>
    </div>
  )
}
