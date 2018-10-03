import * as React from 'react';
import { Err } from './Err';
import { Spinner } from './Spinner';
import { ItemState, AppState } from './types';
import { MapStateToProps, connect } from 'react-redux';
import { AnyAction } from 'redux';
// import { fetchDescription } from './store';
import { ThunkDispatch } from 'redux-thunk';
import { fetchDescription } from './redux';
// import { connect, MapStateToProps, DispatchProp } from 'react-redux';
// import { AnyAction } from 'redux';

type ItemState = typeof ItemState.T;

type State = {
  index: number;
};

// type MyThunkAction = ThunkAction<void, AppState, void, AllActions>;
type Props = ReduxProps & {
  dispatch: ThunkDispatch<AppState, void, AnyAction>;
};

class StepperComponent extends React.Component<Props, State> {
  state: State = { index: 0 };

  componentDidMount() {
    this.props.dispatch(fetchDescription(this.state.index));
  }

  componentDidUpdate() {
    const { index } = this.state;
    const item = this.props.appState[index];

    if (item === undefined) {
      this.props.dispatch(fetchDescription(index));
    }
  }

  render() {
    const { index } = this.state;

    const item = this.props.appState[index];

    return (
      <div>
        <h3> {index}</h3>

        {item === undefined ? (
          <h4>Not Defined</h4>
        ) : (
          ItemState.match(item, {
            Fetched: desc => <h4> {desc.text}</h4>,
            Fetching: () => <Spinner />,
            Err: str => <Err errText={str} />
          })
        )}

        <button
          onClick={() => {
            this.setState(_ => ({ index: index + 1 }));
          }}
        >
          next
        </button>
      </div>
    );
  }
}

type ReduxProps = {
  appState: AppState;
};

type OwnProps = {};

const mapStateToProps: MapStateToProps<ReduxProps, OwnProps, AppState> = (
  appState,
  _
) => ({ appState });

/// shallow oldProps === newProps
export const Stepper = connect(mapStateToProps)(StepperComponent);
