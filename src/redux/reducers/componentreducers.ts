import { ReduxStore, AddComponentAction } from '../../types';

export function addComponentReducer(store: ReduxStore, action: AddComponentAction): ReduxStore
{
    const component = action.payload.componentData;
    const panelID = action.payload.panelID;

    return {
        ...store,
        components: {
            ...store.components,
            [component.id]: {
                ...component,
            },
        },
        panels: {
            ...store.panels,
            [panelID]: {
                ...store.panels[panelID],
                childIDs: [
                    ...store.panels[panelID].childIDs,
                    component.id,
                ],
            },
        },
    };
}
