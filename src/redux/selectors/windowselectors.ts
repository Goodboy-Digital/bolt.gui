import { ActionTypes, ApplicationStore, ComponentPair, SidebarIconData, PanelData,  WindowData } from './../../types';

export const getWindows = (store: ApplicationStore): Map<string, WindowData> =>
    store.componentReducers.windows;

export const getWindowSidebarIcons = (store: ApplicationStore, windowId: string): {
    type: ActionTypes.GET_SIDEBAR_ICONS;
    payload: SidebarIconData[];
} =>
{
    const icons: SidebarIconData[] = [];

    store.componentReducers.windows[windowId].panelData.forEach((panel: PanelData) => icons.push(panel.icon));

    return { type: ActionTypes.GET_SIDEBAR_ICONS, payload: icons };
};

export const getWindowExpandedState = (store: ApplicationStore, id: string): {
    type: ActionTypes.GET_WINDOW_EXPANDED;
    payload: boolean;
} =>
    ({ type: ActionTypes.GET_WINDOW_EXPANDED, payload: store.componentReducers.windows[id].expanded });

export const getComponentsByIds = (store: ApplicationStore, componentIds: string[]): {
    type: ActionTypes.GET_COMPONENTS_BY_IDS;
    payload: ComponentPair[];
} =>
{
    const components: ComponentPair[] = [];

    componentIds.forEach((id: string) => components.push(store.componentReducers.components[id]));

    return { type: ActionTypes.GET_COMPONENTS_BY_IDS, payload: components };
};
