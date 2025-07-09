import { atom, selector } from 'recoil';

export const authAtom = atom({
    key: 'authAtom',
    default: {
        token : localStorage.getItem('token') || null,
    }
})


export const isAuthenticatedSelector = selector({
    key: 'isAuthenticatedSelector',
    get: ({ get }) => {
        const auth = get(authAtom);
        return auth.token !== null;
    }
})