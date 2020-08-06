import { ReduxStore, ActionTypes, Actions } from '../../types';

const initialState: ReduxStore = {
    windows: new Map(),
    components: new Map(),
};

export default (state = initialState, action: Actions): ReduxStore =>
{
    switch (action.type)
    {
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
