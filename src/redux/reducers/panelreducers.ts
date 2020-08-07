import { ReduxStore, AddPanelAction } from '../../types';

export function addPanelReducer(store: ReduxStore, action: AddPanelAction): ReduxStore
{
    const panel = action.payload.panelData;
    const windowID = action.payload.windowID;

    return {
        ...store,
        panels: {
            ...store.panels,
            [panel.id]: {
                ...panel,
            },
        },
        windows: {
            ...store.windows,
            [windowID]: {
                ...store.windows[windowID],
                panelIDs: [
                    ...store.windows[windowID].panelIDs,
                    panel.id,
                ],
            },
        },
    };
}
