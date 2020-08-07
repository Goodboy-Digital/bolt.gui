import { ActionTypes, ApplicationStore, ComponentPair } from './../../types';

export const getComponentsByIds = (store: ApplicationStore, componentIds: string[]):
{
    type: ActionTypes.GET_COMPONENTS_BY_IDS;
    payload: ComponentPair[];
} =>
{
    const components: ComponentPair[] = [];

    componentIds.forEach((id: string) => components.push(store.componentReducers.components[id]));

    return { type: ActionTypes.GET_COMPONENTS_BY_IDS, payload: components };
};
