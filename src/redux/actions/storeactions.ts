import { ApplicationStore, SetStoreAction, ActionTypes } from './../../types';

export const setStore = (newStore: ApplicationStore): SetStoreAction => ({
    type: ActionTypes.SET_STORE,
    payload: {
        newStore,
    },
});
