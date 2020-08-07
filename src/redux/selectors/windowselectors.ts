import { ActionTypes, ApplicationStore, SidebarIconData, WindowData, SelectorReturn } from '../../types';

export const getWindows = (store: ApplicationStore): Map<string, WindowData> =>
    store.componentReducers.windows;

export const getWindowSidebarIcons = (store: ApplicationStore, windowId: string):
SelectorReturn<ActionTypes.GET_SIDEBAR_ICONS, SidebarIconData[]> =>
{
    const icons: SidebarIconData[] = [];

    store.componentReducers.windows[windowId].panelIDs.forEach((panelID: string) =>
        icons.push(store.componentReducers.panels[panelID].icon));

    return { type: ActionTypes.GET_SIDEBAR_ICONS, payload: icons };
};

export const getWindowExpandedState = (store: ApplicationStore, id: string):
SelectorReturn<ActionTypes.GET_WINDOW_EXPANDED, boolean> =>
    ({ type: ActionTypes.GET_WINDOW_EXPANDED, payload: store.componentReducers.windows[id].expanded });
