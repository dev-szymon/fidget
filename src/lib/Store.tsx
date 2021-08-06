import { makeAutoObservable } from 'mobx';
import { getMonthAndYear } from './dates';
import { createContext, FC, useContext } from 'react';

function createMonthStore() {
  const { month, year } = getMonthAndYear(Date.now());
  const store = makeAutoObservable({
    month,
    year,
    nextMonth() {
      store.month = store.month === 11 ? 0 : store.month + 1;
      store.year = store.month === 11 ? store.year + 1 : store.year;
    },
    prevMonth() {
      store.month = store.month === 0 ? 11 : store.month - 1;
      store.year = store.month === 0 ? store.year - 1 : store.year;
    },
  });
  return store;
}

const StoreContext = createContext(createMonthStore());

type Store = ReturnType<typeof createMonthStore>;

const StoreProvider: FC<{ store: Store }> = ({ children, store }) => {
  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  );
};

const useStore = () => useContext(StoreContext);

export { StoreProvider, useStore, createMonthStore };
