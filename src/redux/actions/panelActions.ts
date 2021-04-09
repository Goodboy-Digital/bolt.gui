import { PanelData, AddPanelAction, ActionTypes, RemovePanelAction } from '../../types';

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
