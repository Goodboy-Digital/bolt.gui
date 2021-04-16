import {
    ClearPanelAction,
    SetActivePanelAction,
    PanelData, AddPanelAction,
    ActionTypes, RemovePanelAction,
} from '../../types';

export const addPanel = (panelData: PanelData, windowID: string): AddPanelAction => ({
    type: ActionTypes.ADD_PANEL,
    payload: {
        panelData,
        windowID,
    },
});

export const removePanel = (id: string, parentID: string): RemovePanelAction => ({
    type: ActionTypes.REMOVE_PANEL,
    payload: {
        id,
        parentID,
    },
});

export const setActivePanel = (id: string): SetActivePanelAction => ({
    type: ActionTypes.SET_ACTIVE_PANEL,
    payload: {
        id,
    },
});

export const clearPanel = (id: string, destroyChildren: boolean): ClearPanelAction => ({
    type: ActionTypes.CLEAR_PANEL,
    payload: {
        id,
        destroyChildren,
    },
});
