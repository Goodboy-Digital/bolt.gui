import { ReduxStore, ActionTypes, Actions } from '../../types';

const initialState: ReduxStore = {
    components: new Map(),
    panels: new Map(),
    windows: new Map(),
};

export default (state = initialState, action: Actions): ReduxStore =>
{
    switch (action.type)
    {
        case ActionTypes.ADD_PANEL: {
            const panel = action.payload.panelData;
            const windowID = action.payload.windowID;

            return {
                ...state,
                panels: {
                    ...state.panels,
                    [panel.id]: {
                        ...panel,
                    },
                },
                windows: {
                    ...state.windows,
                    [windowID]: {
                        ...state.windows[windowID],
                        panelIDs: [
                            ...state.windows[windowID].panelIDs,
                            panel.id,
                        ],
                    },
                },
            };
        }
        case ActionTypes.ADD_WINDOW: {
            const window = action.payload.windowData;

            return {
                ...state,
                windows: {
                    ...state.windows,
                    [window.id]: {
                        ...window,
                    },
                },
            };
        }
        case ActionTypes.WINDOW_TOGGLE_EXPAND: {
            const id = action.payload.id;

            return {
                ...state,
                windows: {
                    ...state.windows,
                    [id]: {
                        ...state.windows[id],
                        expanded: !state.windows[id].expanded,
                    },
                },
            };
        }
        default:
            return state;
    }
};
