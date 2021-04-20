import { ActionTypes, ApplicationStore, ComponentPair, SelectorReturn } from '../../types';

export const getComponentsByIds = (store: ApplicationStore, componentIds: string[]):
SelectorReturn<ActionTypes.GET_COMPONENTS_BY_IDS, ComponentPair[]> =>
{
    const components: ComponentPair[] = [];

    componentIds.forEach((id: string) => components.push(store.componentReducers.components[id]));

    return { type: ActionTypes.GET_COMPONENTS_BY_IDS, payload: components };
};

export const getComponentById = (store: ApplicationStore, componentId: string):
SelectorReturn<ActionTypes.GET_COMPONENT_BY_ID, ComponentPair> =>
{
    const component: ComponentPair = store.componentReducers.components[componentId];

    return { type: ActionTypes.GET_COMPONENT_BY_ID, payload: component };
};
