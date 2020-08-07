import { ReduxStore, AddWindowAction, ExpandWindowAction } from '../../types';

export function addWindowReducer(store: ReduxStore, action: AddWindowAction): ReduxStore
{
    const window = action.payload.windowData;

    return {
        ...store,
        windows: {
            ...store.windows,
            [window.id]: {
                ...window,
            },
        },
    };
}

export function windowToggleExpandReducer(store: ReduxStore, action: ExpandWindowAction): ReduxStore
{
    const id = action.payload.id;

    return {
        ...store,
        windows: {
            ...store.windows,
            [id]: {
                ...store.windows[id],
                expanded: !store.windows[id].expanded,
            },
        },
    };
}
