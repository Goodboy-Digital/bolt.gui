import React, { Component } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { addWindow, addPanel, addComponent, getWindows, toggleWindowExpanded, setStore } from '../redux';
import { ApplicationStore, WindowData, PanelData, ComponentPair } from '../types';
import styled from 'styled-components';
import WindowComponent from './panels/WindowComponent';
import { ButtonInputComponent } from '../components';

const mapStateToProps = (store: ApplicationStore) =>
{
    const windows = getWindows(store);

    return { windows, store };
};
const mapDispatch = { addWindow, addPanel, setStore, addComponent, toggleWindowExpanded };
const connector = connect(mapStateToProps, mapDispatch);

type ReduxProps = ConnectedProps<typeof connector>;

export interface BoltProps extends ReduxProps
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

    public componentDidMount()
    {
        this.addWindow({
            id: 'window1',
            expanded: true,
            position: { x: '40px', y: '40px' },
            sidebarSize: { height: '250px', width: '50px' },
            panelSize: { height: '250px', width: '250px' },
            showSidebar: true,
            activePanelIndex: 0,
            panelIDs: [],
        });

        this.addPanel({
            id: 'panel1',
            title: 'Test Panel',
            icon: {
                text: 'Te',
                active: true,
                size: { height: '40px', width: '40px' },
            },
            childIDs: [],
            isActive: true,
        }, 'window1');

        this.addWindow({
            id: 'window2',
            expanded: true,
            position: { x: '400px', y: '40px' },
            sidebarSize: { height: '250px', width: '50px' },
            panelSize: { height: '250px', width: '250px' },
            showSidebar: true,
            sidebarShowLogo: false,
            activePanelIndex: 0,
            panelIDs: [],
        });

        this.addPanel({
            id: 'panel2',
            title: 'Test Panel',
            icon: {
                text: 'Te',
                active: true,
                size: { height: '40px', width: '40px' },
            },
            childIDs: [],
            isActive: true,
        }, 'window2');

        this.addPanel({
            id: 'panel3',
            title: 'Another Test Panel',
            icon: {
                text: 'p2',
                active: false,
                size: { height: '40px', width: '40px' },
            },
            childIDs: [],
            isActive: false,
        }, 'window2');

        this.addComponent({
            id: 'button1',
            component: ButtonInputComponent,
            inputData: {
                buttonText: 'click me',
                callOnClick: (e: any) => { console.log(e); },
            },
        }, 'panel1');
    }

    // public componentWillMount()
    // {
    // }

    // public componentWillUnmount()
    // {

    // }

    public render(): JSX.Element
    {
        console.log(this.props);

        // const windows = Array.from(this.props.windows);
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

    public addComponent(componentData: ComponentPair, panelID: string): void
    {
        this.props.addComponent(componentData, panelID);
    }

    public addPanel(panelData: PanelData, windowID: string): void
    {
        this.props.addPanel(panelData, windowID);
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
