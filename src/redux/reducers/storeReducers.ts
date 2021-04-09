import { ReduxStore, SetStoreAction } from '../../types';

export function setStoreReducer(store: ReduxStore, action: SetStoreAction): ReduxStore
{
    const newStore = action.payload.newStore;

    return {
        ...store,
        ...newStore,
    };
}
