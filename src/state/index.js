import { atom, selector } from 'recoil';
import { getData } from '../utils/getData';

export const usersListState = atom({
  key: 'usersListState',
  default: [],
});

export const usersSelector = selector({
  key: 'usersSelector',
  get: async ({ get }) => {
    const users = await getData('getusers');
    return users;
  },
  set: ({ set }, newValue) => {
    set(usersListState, newValue);
  },
});

export const consultationsState = atom({
  key: 'consultationsState',
  default: [],
});


export const consultationResponseState = atom({
  key: 'consultationResponseState',
  default: {},
});