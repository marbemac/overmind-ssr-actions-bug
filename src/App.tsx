import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Home } from './Home';

import './App.css';
import { useOvermind } from './overmind';

const App = () => {
  const { actions } = useOvermind();

  // THIS WILL ERROR ON THE SERVER
  // React.useEffect(() => {
  //   // @ts-ignore
  //   if (!process.browser) {
  //     actions.setComponentMessage('component effect!')
  //   }
  // }, [actions.setComponentMessage]);

  return (
    <Switch>
      <Route exact={true} path="/" component={Home} />
    </Switch>
  )
}

export default App;
