import { createContext, useContext, useReducer, type Dispatch } from 'react';
import { getFavorites, getLogs, setItems } from '../utils/helpers';

// defining the type of the provider
type props = {
  children: React.ReactNode;
};

// defining the type of the state
type State = {
  sendAmmount: string;
  receiveAmmount: string;
  favorites: Record<string, boolean>;
  logs: Record<
    number,
    { pair: string; sendAmmount: string; receiveAmmount: string }
  >;
};

// defining the type of the action
type Action =
  | { type: 'SET_SEND_AMMOUNT'; payload: string }
  | { type: 'SET_RECEIVE_AMMOUNT'; payload: string }
  | { type: 'SET_FAVORITES'; payload: Record<string, boolean> }
  | {
      type: 'SET_LOGS';
      payload: Record<
        number,
        { pair: string; sendAmmount: string; receiveAmmount: string }
      >;
    };

// defining the type of the context
type AppDataContextType = {
  appState: State;
  appDispatch: Dispatch<Action>;
};

// creating the context
const AppDataContext = createContext<AppDataContextType | null>(null);

// creating the provider
export function AppDataProvider({ children }: props) {
  const initialState: State = {
    sendAmmount: '',
    receiveAmmount: '',
    favorites: getFavorites(),
    logs: getLogs(),
  };

  function appDataReducer(state: State, action: Action) {
    switch (action.type) {
      case 'SET_SEND_AMMOUNT':
        return { ...state, sendAmmount: action.payload };
      case 'SET_RECEIVE_AMMOUNT':
        return { ...state, receiveAmmount: action.payload };
      case 'SET_FAVORITES':
        setItems('favoritePairs', action.payload);
        return { ...state, favorites: action.payload };
      case 'SET_LOGS':
        setItems('logs', action.payload);
        return { ...state, logs: action.payload };
      default:
        throw new Error('Unknown action type');
    }
  }

  const [appState, appDispatch] = useReducer(appDataReducer, initialState);

  return (
    <AppDataContext.Provider value={{ appState, appDispatch }}>
      {children}
    </AppDataContext.Provider>
  );
}

// creating the hook
export function useAppData() {
  const appDataContext = useContext(AppDataContext);

  if (!appDataContext) {
    throw new Error(
      'useAppDataContext must be used inside AppDataContextProvider',
    );
  }

  return appDataContext;
}
