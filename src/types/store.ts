import { ComponentPair, PanelData, WindowData } from '.';

export interface ApplicationStore
{
    componentReducers: ReduxStore;
}

export interface ReduxStore
{
    components: Map<string, ComponentPair>;
    panels: Map<string, PanelData>;
    windows: Map<string, WindowData>;
}
