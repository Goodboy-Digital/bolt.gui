import { combineReducers } from 'redux';
import { ReduxStore, ActionTypes, Actions } from '../../types';
import { addComponentReducer } from './componentreducers';
import { addPanelReducer } from './panelreducers';
import { addWindowReducer, windowToggleExpandReducer } from './windowreducers';
import { setStoreReducer } from './storereducers';

const initialStore: ReduxStore = {
    components: new Map(),
    panels: new Map(),
    windows: new Map(),
};

const componentReducers = (store = initialStore, action: Actions): ReduxStore =>
{
    switch (action.type)
    {
        case ActionTypes.ADD_COMPONENT: return addComponentReducer(store, action);
        case ActionTypes.ADD_PANEL: return addPanelReducer(store, action);
        case ActionTypes.ADD_WINDOW: return addWindowReducer(store, action);
        case ActionTypes.WINDOW_TOGGLE_EXPAND: return windowToggleExpandReducer(store, action);
        case ActionTypes.SET_STORE: return setStoreReducer(store, action);
        default:
            return store;
    }
};

export default combineReducers({ componentReducers });
