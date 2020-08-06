import { ComponentPair, WindowData } from '.';

export interface ApplicationStore
{
    componentReducers: ReduxStore;
}

export interface ReduxStore
{
    windows: Map<string, WindowData>;
    components: Map<string, ComponentPair>;
}
