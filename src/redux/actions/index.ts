import { WindowData, AddWindowAction, ActionTypes, ExpandWindowAction } from '../../types';

export const addWindow = (windowData: WindowData): AddWindowAction => ({
    type: ActionTypes.ADD_WINDOW,
    payload: {
        windowData,
    },
});

export const toggleWindowExpanded = (id: string): ExpandWindowAction => ({
    type: ActionTypes.WINDOW_TOGGLE_EXPAND,
    payload: {
        id,
    },
});

