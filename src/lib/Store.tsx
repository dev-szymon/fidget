import { makeAutoObservable } from "mobx";
import { generateDateString, getMonthAndYear } from "./utils";
import { createContext, FC, useContext } from "react";
import { Service } from "../models/Service";

interface Store {
  selectedDay?: number;
  month: number;
  service?: Service;
  year: number;
  nextMonth: () => void;
  prevMonth: () => void;
  selectDay: (dateInMS: number) => void;
  selectService: (service: Service) => void;
  selectedDayString: string | undefined;
}

function createMonthStore() {
  const { month, year } = getMonthAndYear(Date.now());
  const store = makeAutoObservable<Store>({
    selectedDay: undefined,
    get selectedDayString() {
      if (!this.selectedDay) return undefined;

      return generateDateString(new Date(this.selectedDay));
    },
    service: undefined,
    month,
    year,
    nextMonth() {
      store.year = store.month === 11 ? store.year + 1 : store.year;
      store.month = store.month === 11 ? 0 : store.month + 1;
    },
    prevMonth() {
      store.year = store.month === 0 ? store.year - 1 : store.year;
      store.month = store.month === 0 ? 11 : store.month - 1;
    },
    selectDay(dateInMS) {
      const { month, year } = getMonthAndYear(dateInMS);
      const isCurrentMonth = month === store.month && year === store.year;

      store.selectedDay = dateInMS;

      if (!isCurrentMonth) {
        store.month = month;
        store.year = year;
      }
    },
    selectService(service) {
      store.service = service;
    },
  });
  return store;
}

const StoreContext = createContext(createMonthStore());

const StoreProvider: FC<{ store: Store }> = ({ children, store }) => {
  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  );
};

const useStore = () => useContext(StoreContext);

export { StoreProvider, useStore, createMonthStore };
