import { createContext, useContext, useReducer, type Dispatch } from 'react';

// defining the type of the provider
type props = {
  children: React.ReactNode;
};

// defining the type of the state
type State = {
  sendAmmount: string;
  receiveAmmount: string;
};

// defining the type of the action
type Action =
  | { type: 'SET_SEND_AMMOUNT'; payload: string }
  | { type: 'SET_RECEIVE_AMMOUNT'; payload: string };

// defining the type of the context
type AppDataContextType = {
  state: State;
  dispatch: Dispatch<Action>;
};

// creating the context
const AppDataContext = createContext<AppDataContextType | null>(null);

// creating the provider
export function AppDataProvider({ children }: props) {
  const initialState: State = {
    sendAmmount: '0',
    receiveAmmount: '0',
  };

  function appDataReducer(state: State, action: Action) {
    switch (action.payload) {
      case 'SET_SEND_AMMOUNT':
        return { ...state, sendAmmount: action.payload };
      case 'SET_RECEIVE_AMMOUNT':
        return { ...state, receiveAmmount: action.payload };
      default:
        throw new Error('Unknown action type');
    }
  }

  const [state, dispatch] = useReducer(appDataReducer, initialState);

  <AppDataContext.Provider value={{ state, dispatch }}>
    {children}
  </AppDataContext.Provider>;
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
