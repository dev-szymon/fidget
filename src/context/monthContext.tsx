import {
  createContext,
  Dispatch,
  ReactNode,
  useContext,
  useReducer,
} from 'react';
import { getMonthAndYear } from '../lib/dates';

const { month: currentMonth, year: currentYear } = getMonthAndYear(Date.now());

const initialState: State = { month: currentMonth, year: currentYear };
type State = {
  month: number;
  year: number;
};
type Action = { type: string };

const MonthContext = createContext<{
  state: State;
  dispatch: Dispatch<Action>;
}>({
  state: initialState,
  dispatch: () => null,
});

const reducer = (state: State, { type }: Action): State => {
  const { month, year } = state;
  switch (type) {
    case 'NEXT_MONTH':
      const nextMonthValue = month === 11 ? 0 : month + 1;
      const nextYearValue = month === 11 ? year + 1 : year;
      return { month: nextMonthValue, year: nextYearValue };
    case 'PREV_MONTH':
      const prevMonthValue = month === 0 ? 11 : month - 1;
      const prevYearValue = month === 0 ? year - 1 : year;
      return { month: prevMonthValue, year: prevYearValue };
    default:
      return state;
  }
};

const ContextProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch]: [State, Dispatch<Action>] = useReducer(
    reducer,
    initialState
  );
  return (
    <MonthContext.Provider value={{ state, dispatch }}>
      {children}
    </MonthContext.Provider>
  );
};

export const useMonthContext = () => useContext(MonthContext);

export default ContextProvider;
