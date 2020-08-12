import { ComponentPair, AddComponentAction, UpdateComponentAction, RemoveComponentAction, ActionTypes } from '../../types';

export const addComponent = (componentData: ComponentPair, panelID: string): AddComponentAction => ({
    type: ActionTypes.ADD_COMPONENT,
    payload: {
        componentData,
        panelID,
    },
});

export const updateComponent = (componentData: ComponentPair): UpdateComponentAction => ({
    type: ActionTypes.UPDATE_COMPONENT,
    payload: {
        componentData,
    },
});

export const removeComponent = (id: string, parentID: string): RemoveComponentAction => ({
    type: ActionTypes.REMOVE_COMPONENT,
    payload: {
        id,
        parentID,
    },
});
