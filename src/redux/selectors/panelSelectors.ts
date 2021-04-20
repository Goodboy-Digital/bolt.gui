import { ActionTypes, ApplicationStore, PanelData, SelectorReturn } from '../../types';

export const getPanelsByIds = (store: ApplicationStore, panelIds: string[]):
SelectorReturn<ActionTypes.GET_PANELS_BY_IDS, PanelData[]> =>
{
    const panels: PanelData[] = [];

    panelIds.forEach((id: string) => panels.push(store.componentReducers.panels[id]));

    return { type: ActionTypes.GET_PANELS_BY_IDS, payload: panels };
};
