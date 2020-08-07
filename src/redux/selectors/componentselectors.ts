import { ActionTypes, ApplicationStore, ComponentPair, SelectorReturn } from '../../types';

export const getComponentsByIds = (store: ApplicationStore, componentIds: string[]):
SelectorReturn<ActionTypes.GET_COMPONENTS_BY_IDS, ComponentPair[]> =>
{
    const components: ComponentPair[] = [];

    componentIds.forEach((id: string) => components.push(store.componentReducers.components[id]));

    return { type: ActionTypes.GET_COMPONENTS_BY_IDS, payload: components };
};
