import { createContext, useContext, useReducer, type Dispatch } from 'react';

// defining the type of the provider
type props = {
  $type: string;
  children: React.ReactNode;
};

// defining the type of the state
export type State = {
  $type: 'send' | 'receive';
  showPicker: boolean;
};

// defining the type of the action
export type Action =
  | { type: 'SET_TYPE'; payload: 'send' | 'receive' }
  | { type: 'SET_SHOWPICKER'; payload: boolean };

// defining the type of the context
type FormDataContextType = {
  state: State;
  dispatch: Dispatch<Action>;
};

// creating the context
const FormDataContext = createContext<FormDataContextType | null>(null);

export function FormDataProvider({ $type, children }: props) {
  // defining initial states
  const initialFormState1: State = {
    $type: 'send',
    showPicker: false,
  };
  const initialFormState2: State = {
    $type: 'receive',
    showPicker: false,
  };

  // defining the reducer
  function formDataReducer(state: State, action: Action): State {
    switch (action.type) {
      case 'SET_TYPE':
        return { ...state, $type: action.payload };
      case 'SET_SHOWPICKER':
        return { ...state, showPicker: action.payload };
    }
  }

  // defning the useReducers
  const [formState1, dispatch1] = useReducer(
    formDataReducer,
    initialFormState1,
  );
  const [formState2, dispatch2] = useReducer(
    formDataReducer,
    initialFormState2,
  );

  const value =
    $type === 'send'
      ? { state: formState1, dispatch: dispatch1 }
      : { state: formState2, dispatch: dispatch2 };

  return (
    <FormDataContext.Provider value={value}>
      {children}
    </FormDataContext.Provider>
  );
}

// creating the hook
export function useFormData() {
  const formDataContext = useContext(FormDataContext);

  if (!formDataContext) {
    throw new Error(
      'useFormDataContext must be used inside FormDataContextProvider',
    );
  }

  return formDataContext;
}
