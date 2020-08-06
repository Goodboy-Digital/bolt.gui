import React, { Component } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { addWindow, getWindows, toggleWindowExpanded } from '../redux';
import { ApplicationStore, WindowData } from '../types';
import styled from 'styled-components';
import WindowComponent from './panels/WindowComponent';

const mapStateToProps = (store: ApplicationStore) =>
{
    const windows = getWindows(store);

    return { windows };
};
const mapDispatch = { addWindow, toggleWindowExpanded };
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
            panelData: [{
                id: 'panel1',
                title: 'Test Panel',
                icon: {
                    text: 'Te',
                    active: true,
                    size: { height: '40px', width: '40px' },
                },
                childIDs: [],
                isActive: true,
            }],
        });

        this.addWindow({
            id: 'window2',
            expanded: true,
            position: { x: '400px', y: '40px' },
            sidebarSize: { height: '250px', width: '50px' },
            panelSize: { height: '250px', width: '250px' },
            showSidebar: true,
            activePanelIndex: 0,
            panelData: [{
                id: 'panel1',
                title: 'Test Panel',
                icon: {
                    text: 'Te',
                    active: true,
                    size: { height: '40px', width: '40px' },
                },
                childIDs: [],
                isActive: true,
            }],
        });
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

    public addWindow(windowData: WindowData): void
    {
        this.props.addWindow(windowData);
    }

    public toggleExpanded(id: string): void
    {
        this.props.toggleWindowExpanded(id);
    }

    // public setActivePanel(newState: number): void
    // {
    //     this.setState({ activePanel: newState });
    // }
}

export default connector(BoltGUI);
