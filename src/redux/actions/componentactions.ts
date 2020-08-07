import { ComponentPair, AddComponentAction, ActionTypes } from './../../types';

export const addComponent = (componentData: ComponentPair, panelID: string): AddComponentAction => ({
    type: ActionTypes.ADD_COMPONENT,
    payload: {
        componentData,
        panelID,
    },
});
