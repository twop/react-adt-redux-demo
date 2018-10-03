import * as React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Stepper } from './Stepper';
// import { ourStore } from './store';
import { store } from './redux';

const styles: React.CSSProperties = {
  fontFamily: 'sans-serif',
  textAlign: 'center'
};

const App = () => (
  <div style={styles}>
    <Provider store={store}>
      <Stepper />
    </Provider>
  </div>
);

render(<App />, document.getElementById('root'));
