import { PanelData, WindowData } from '.';

export enum ActionTypes
    {
    // Component actions
    ADD_COMPONENT = 'ADD_COMPONENT',
    DELETE_COMPONENT = 'DELETE_COMPONENT',

    // Panel Actions
    ADD_PANEL = 'ADD_PANEL',
    REMOVE_PANEL = 'REMOVE_PANEL',

    // Window actions
    ADD_WINDOW = 'ADD_WINDOW',
    DELETE_WINDOW = 'DELETE_WINDOW',
    WINDOW_TOGGLE_EXPAND = 'WINDOW_TOGGLE_EXPAND',

    // SELECTORS
    GET_WINDOW_EXPANDED = 'GET_WINDOW_EXPANDED',
    GET_SIDEBAR_ICONS = 'GET_SIDEBAR_ICONS',
    GET_COMPONENTS_BY_IDS = 'GET_COMPONENTS_BY_IDS',
    GET_PANELS_BY_IDS = 'GET_PANELS_BY_IDS',
}

export interface AddPanelAction
{
    type: ActionTypes.ADD_PANEL;
    payload: {
        panelData: PanelData;
        windowID: string;
    };
}
export interface ExpandWindowAction
{
    type: ActionTypes.WINDOW_TOGGLE_EXPAND;
    payload: {
        id: string;
    };
}

export interface AddWindowAction
{
    type: ActionTypes.ADD_WINDOW;
    payload: {
        windowData: WindowData;
    };
}

export type Actions = AddPanelAction | ExpandWindowAction | AddWindowAction;
