import { ApplicationStore, ComponentPair, PanelData, WindowData } from '.';

export enum ActionTypes
    {
    // Component actions
    ADD_COMPONENT = 'ADD_COMPONENT',
    REMOVE_COMPONENT = 'REMOVE_COMPONENT',
    UPDATE_COMPONENT = 'UPDATE_COMPONENT',

    // Panel Actions
    ADD_PANEL = 'ADD_PANEL',
    SET_ACTIVE_PANEL = 'SET_ACTIVE_PANEL',
    CLEAR_PANEL = 'CLEAR_PANEL',
    REMOVE_PANEL = 'REMOVE_PANEL',

    // Window actions
    ADD_WINDOW = 'ADD_WINDOW',
    REMOVE_WINDOW = 'REMOVE_WINDOW',
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
| RemoveComponentAction
| AddPanelAction
| ClearPanelAction
| SetActivePanelAction
| RemovePanelAction
| ExpandWindowAction
| AddWindowAction
| SetStoreAction;

export interface AddComponentAction
{
    type: ActionTypes.ADD_COMPONENT;
    payload: {
        componentData: ComponentPair;
        parentID?: string;
    };
}

export interface UpdateComponentAction
{
    type: ActionTypes.UPDATE_COMPONENT;
    payload: {
        componentData: ComponentPair;
    };
}

export interface RemoveComponentAction
{
    type: ActionTypes.REMOVE_COMPONENT;
    payload: {
        id: string;
        parentID: string;
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

export interface ClearPanelAction
{
    type: ActionTypes.CLEAR_PANEL;
    payload: {
        id: string;
        destroyChildren: boolean;
    };
}
export interface SetActivePanelAction
{
    type: ActionTypes.SET_ACTIVE_PANEL;
    payload: {
        id: string;
    };
}
export interface RemovePanelAction
{
    type: ActionTypes.REMOVE_PANEL;
    payload: {
        id: string;
        parentID: string;
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
