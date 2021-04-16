import { WindowData } from './../../types/window';
import {
    ReduxStore,
    AddPanelAction,
    RemovePanelAction,
    ActionTypes,
    ClearPanelAction,
    SetActivePanelAction,
} from '../../types';
import { removeComponentReducer } from './componentReducers';

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

export function removePanelReducer(store: ReduxStore, action: RemovePanelAction): ReduxStore
{
    let returnVal = store;
    const { id, parentID } = action.payload;
    const { windows, panels } = store;
    const toBeRemoved = panels[id];

    // remove child components
    toBeRemoved.childIDs.forEach((child: string) =>
    {
        returnVal = removeComponentReducer(store,
            { type: ActionTypes.REMOVE_COMPONENT, payload: { id: child, parentID: id } });
    });

    // delete panel
    delete panels[id];
    returnVal = { ...returnVal, panels };

    // remove from parent children
    if (windows[parentID])
    {
        const parent = windows[parentID];
        const index = parent.panelIDs.indexOf(id);

        parent.panelIDs.splice(index, 1);

        returnVal = {
            ...returnVal,
            windows: {
                ...windows,
                [parentID]: {
                    ...parent,
                },
            },
        };
    }

    return returnVal;
}

export function clearPanelReducer(store: ReduxStore, action: ClearPanelAction): ReduxStore
{
    let returnVal = store;
    const { id, destroyChildren } = action.payload;
    const { panels } = store;

    // remove child components
    destroyChildren && panels[id].childIDs.forEach((child: string) =>
    {
        returnVal = removeComponentReducer(store,
            { type: ActionTypes.REMOVE_COMPONENT, payload: { id: child, parentID: id } });
    });

    panels[id].childIDs = [];
    returnVal = { ...returnVal, panels };

    return returnVal;
}

export function setActivePanelReducer(store: ReduxStore, action: SetActivePanelAction): ReduxStore
{
    let returnVal = store;
    const { id } = action.payload;
    const { windows, panels } = store;

    let targetWindow: WindowData;

    Object.values(windows).forEach((window: WindowData) =>
    {
        if (window.panelIDs.includes(id))
        {
            targetWindow = window;

            targetWindow.panelIDs.forEach((panelId, index) =>
            {
                panels[panelId].isActive = id === panelId;
                panels[panelId].icon.active = id === panelId;

                if (id === panelId) targetWindow.activePanelIndex = index;
            });
        }
    });

    if (!targetWindow) console.error(`Could not set active panel. No panel found with id: ${id}`);

    returnVal = { ...returnVal, panels };

    return returnVal;
}
