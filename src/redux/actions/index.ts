import { PanelData, WindowData, AddWindowAction, AddPanelAction, ActionTypes, ExpandWindowAction } from '../../types';

export const addPanel = (panelData: PanelData, windowID: string): AddPanelAction => ({
    type: ActionTypes.ADD_PANEL,
    payload: {
        panelData,
        windowID,
    },
});

export const addWindow = (windowData: WindowData): AddWindowAction => ({
    type: ActionTypes.ADD_WINDOW,
    payload: {
        windowData,
    },
});

export const toggleWindowExpanded = (id: string): ExpandWindowAction => ({
    type: ActionTypes.WINDOW_TOGGLE_EXPAND,
    payload: {
        id,
    },
});

