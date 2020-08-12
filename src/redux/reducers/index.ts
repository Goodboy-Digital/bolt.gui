import { combineReducers } from 'redux';
import { ReduxStore, ActionTypes, Actions } from '../../types';
import { addComponentReducer, updateComponentReducer, removeComponentReducer } from './componentReducers';
import { addPanelReducer } from './panelReducers';
import { addWindowReducer, windowToggleExpandReducer } from './windowReducers';
import { setStoreReducer } from './storeReducers';

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
        case ActionTypes.UPDATE_COMPONENT: return updateComponentReducer(store, action);
        case ActionTypes.REMOVE_COMPONENT: return removeComponentReducer(store, action);
        case ActionTypes.ADD_PANEL: return addPanelReducer(store, action);
        case ActionTypes.ADD_WINDOW: return addWindowReducer(store, action);
        case ActionTypes.WINDOW_TOGGLE_EXPAND: return windowToggleExpandReducer(store, action);
        case ActionTypes.SET_STORE: return setStoreReducer(store, action);
        default:
            return store;
    }
};

export default combineReducers({ componentReducers });
