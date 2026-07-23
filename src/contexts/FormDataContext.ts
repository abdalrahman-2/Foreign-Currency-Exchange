import { createContext, useContext, type Dispatch } from 'react';

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
export const FormDataContext = createContext<FormDataContextType | null>(null);

// creating the hook
export function useFormDataContext() {
  const formDataContext = useContext(FormDataContext);

  if (!formDataContext) {
    throw new Error(
      'useFormDataContext must be used inside FormDataContextProvider',
    );
  }

  return formDataContext;
}
