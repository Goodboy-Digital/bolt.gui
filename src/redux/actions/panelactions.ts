import { PanelData, AddPanelAction, ActionTypes } from '../../types';

export const addPanel = (panelData: PanelData, windowID: string): AddPanelAction => ({
    type: ActionTypes.ADD_PANEL,
    payload: {
        panelData,
        windowID,
    },
});
