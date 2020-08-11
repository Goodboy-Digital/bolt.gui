import { ApplicationStore, ComponentPair, PanelData, WindowData } from '.';

export enum ActionTypes
    {
    // Component actions
    ADD_COMPONENT = 'ADD_COMPONENT',
    DELETE_COMPONENT = 'DELETE_COMPONENT',
    UPDATE_COMPONENT = 'UPDATE_COMPONENT',

    // Panel Actions
    ADD_PANEL = 'ADD_PANEL',
    REMOVE_PANEL = 'REMOVE_PANEL',

    // Window actions
    ADD_WINDOW = 'ADD_WINDOW',
    DELETE_WINDOW = 'DELETE_WINDOW',
    WINDOW_TOGGLE_EXPAND = 'WINDOW_TOGGLE_EXPAND',

    // Store actions
    SET_STORE = 'SET_STORE',

    // SELECTORS
    GET_WINDOW_EXPANDED = 'GET_WINDOW_EXPANDED',
    GET_SIDEBAR_ICONS = 'GET_SIDEBAR_ICONS',
    GET_COMPONENT_BY_ID = 'GET_COMPONENT_BY_ID',
    GET_COMPONENTS_BY_IDS = 'GET_COMPONENTS_BY_IDS',
    GET_PANELS_BY_IDS = 'GET_PANELS_BY_IDS',
}

export type Actions = AddComponentAction
| UpdateComponentAction
| AddPanelAction
| ExpandWindowAction
| AddWindowAction
| SetStoreAction;

export interface AddComponentAction
{
    type: ActionTypes.ADD_COMPONENT;
    payload: {
        componentData: ComponentPair;
        panelID: string;
    };
}

export interface UpdateComponentAction
{
    type: ActionTypes.UPDATE_COMPONENT;
    payload: {
        componentData: ComponentPair;
    };
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

export interface SetStoreAction
{
    type: ActionTypes.SET_STORE;
    payload: {
        newStore: ApplicationStore;
    };
}
