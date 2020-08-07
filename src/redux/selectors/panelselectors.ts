import { ActionTypes, ApplicationStore, PanelData } from './../../types';

export const getPanelsByIds = (store: ApplicationStore, panelIds: string[]):
{
    type: ActionTypes.GET_PANELS_BY_IDS;
    payload: PanelData[];
} =>
{
    const panels: PanelData[] = [];

    panelIds.forEach((id: string) => panels.push(store.componentReducers.panels[id]));

    return { type: ActionTypes.GET_PANELS_BY_IDS, payload: panels };
};
