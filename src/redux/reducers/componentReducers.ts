import { ReduxStore, AddComponentAction, UpdateComponentAction,
    RemoveComponentAction, ActionTypes } from '../../types';

export function addComponentReducer(store: ReduxStore, action: AddComponentAction): ReduxStore
{
    const component = action.payload.componentData;
    const parentID = action.payload.parentID;

    let panelID: string;

    if (store.panels[parentID]) panelID = parentID;

    if (panelID)
    {
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

    let folderID: string;

    if (store.components[parentID]) folderID = parentID;

    if (folderID)
    {
        return {
            ...store,
            components: {
                ...store.components,
                [component.id]: {
                    ...component,
                },
                [folderID]: {
                    ...store.components[folderID],
                    inputData: {
                        ...store.components[folderID].inputData,
                        childIDs: [
                            ...store.components[folderID].inputData.childIDs,
                            component.id,
                        ],
                    },
                },
            },
        };
    }

    console.error(`Could not add ${component.id} - parent not found`);

    return store;
}

export function updateComponentReducer(store: ReduxStore, action: UpdateComponentAction): ReduxStore
{
    const component = action.payload.componentData;

    return {
        ...store,
        components: {
            ...store.components,
            [component.id]: {
                ...component,
            },
        },
    };
}

export function removeComponentReducer(store: ReduxStore, action: RemoveComponentAction): ReduxStore
{
    let returnVal = store;
    const { id, parentID } = action.payload;
    const { components, panels } = store;
    const compToBeRemoved = components[id];

    // recurse through components list to find component and remove children
    if (compToBeRemoved.inputData.childIDs?.length > 0)
    {
        compToBeRemoved.inputData.childIDs.forEach((child: string) =>
        {
            returnVal = removeComponentReducer(store,
                { type: ActionTypes.REMOVE_COMPONENT, payload: { id: child, parentID: id } });
        });
    }
    delete components[id];

    returnVal = { ...returnVal, components };

    if (panels[parentID])
    {
        // if parent is panel, splice id out of parents children
        const parent = panels[parentID];
        const index = parent.childIDs.indexOf(id);

        parent.childIDs.splice(index, 1);

        returnVal = {
            ...returnVal,
            panels: {
                ...panels,
                [parentID]: {
                    ...parent,
                },
            },
        };
    }
    else if (components[parentID])
    {
        // if parent is component, splice the id from the inputData children
        const parent = components[parentID];

        // early return
        if (!parent.inputData.childIDs)
        {
            console.error(`childID's not present on ${parentID}`, parent);

            return returnVal;
        }

        const index = parent.inputData.childIDs.indexOf(id);

        parent.inputData.childIDs.splice(index, 1);

        returnVal = {
            ...returnVal,
            components: {
                ...components,
                [parentID]: {
                    ...parent,
                },
            },
        };
    }

    return returnVal;
}
