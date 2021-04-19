import React, { Component } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import {
    addWindow,
    addPanel,
    removePanel,
    addComponent,
    removeComponent,
    updateComponent,
    getWindows,
    toggleWindowExpanded,
    setStore,
} from '../redux';
import { ApplicationStore, WindowData, PanelData, ComponentPair } from '../types';
import styled from 'styled-components';
import WindowComponent from './panels/WindowComponent';
// import { ButtonInputComponent } from '../components';

const mapStateToProps = (store: ApplicationStore) =>
{
    const windows = getWindows(store);

    return { windows, store };
};
const mapDispatch = {
    addWindow,
    addPanel,
    removePanel,
    setStore,
    addComponent,
    updateComponent,
    removeComponent,
    toggleWindowExpanded,
};
const connector = connect(mapStateToProps, mapDispatch);

type BoltGUIReduxProps = ConnectedProps<typeof connector>;

export interface BoltProps extends BoltGUIReduxProps
{
    stage?: any; // this will be the reference object for the game if needed
}

const BoltContainer = styled.div``;

class BoltGUI extends Component<BoltProps>
{
    constructor(props: BoltProps)
    {
        super(props);
    }

    public render(): JSX.Element
    {
        const windows: string[] = Object.keys(this.props.windows);

        return (
            <BoltContainer>
                {
                    windows.map((key) =>
                        (<WindowComponent
                            key={key}
                            data={this.props.windows[key]}
                        />))
                }
            </BoltContainer>
        );
    }

    public addComponent(componentData: ComponentPair, parentID: string): void
    {
        this.props.addComponent(componentData, parentID);
    }

    public updateComponent(componentData: ComponentPair): void
    {
        this.props.updateComponent(componentData);
    }

    public removeComponent(id: string, parentID: string): void
    {
        this.props.removeComponent(id, parentID);
    }

    public addPanel(panelData: PanelData, windowID: string): void
    {
        this.props.addPanel(panelData, windowID);
    }

    public removePanel(id:string, parentID: string): void
    {
        this.props.removePanel(id, parentID);
    }

    public addWindow(windowData: WindowData): void
    {
        this.props.addWindow(windowData);
    }

    public toggleExpanded(id: string): void
    {
        this.props.toggleWindowExpanded(id);
    }

    public setStore(newStore: ApplicationStore): void
    {
        this.props.setStore(newStore);
    }

    public getStore(): ApplicationStore
    {
        return this.props.store;
    }

    // public setActivePanel(newState: number): void
    // {
    //     this.setState({ activePanel: newState });
    // }
}

export default connector(BoltGUI);
