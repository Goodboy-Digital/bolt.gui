import React, { Component } from 'react';
import { WindowContainer, WindowContainerData } from './panels/WindowContainer';

import { render } from 'react-dom';
import styled from 'styled-components';

export interface BoltProps
{
    stage?: any; // this will be the reference object for the game if needed
    windowData?: WindowContainerData[];
}

export interface BoltState
{
    expandedX: boolean;
    expandedY: boolean;
    activeTab: number;
}

const BoltContainer = styled.div``;

export class BoltGUI extends Component<BoltProps, BoltState>
{
    private windows: WindowContainerData[] = [];

    constructor(props: BoltProps)
    {
        super(props);
        this.state = {
            expandedX: true,
            expandedY: true,
            activeTab: 0,
        };

        this.windows = props.windowData || [];
    }

    // public componentWillMount()
    // {
    // }

    // public componentWillUnmount()
    // {

    // }

    public render(): JSX.Element
    {
        return (
            <BoltContainer>
                {
                    this.windows.map((window, index) =>
                        (
                            <WindowContainer
                                key={index}
                                defaultContainerPosition={window.defaultContainerPosition}
                                defaultContainerHeight={window.defaultContainerHeight}
                                defaultContainerWidth={window.defaultContainerWidth}
                                expandedX={this.state.expandedX}
                                expandedY={this.state.expandedY}
                                expandYCallBack={this.toggleExpandedY.bind(this)}
                                setActiveTabCallBack={this.setActiveTab.bind(this)}
                                panelData={window.panelData}
                                activeTabIndex={this.state.activeTab}
                            />
                        ))
                }
            </BoltContainer>
        );
    }

    public toggleExpandedX(): void
    {
        this.setState({ expandedX: !this.state.expandedX });
    }

    public toggleExpandedY(): void
    {
        this.setState({ expandedY: !this.state.expandedY });
    }

    public setActiveTab(newState: number): void
    {
        this.setState({ activeTab: newState });
    }

    // STATIC MEMBERS --------------------------------------------------

    public static init(): void // (editor: Editor) - this is where we would pass in the game
    {
        let element = document.getElementById('editor-holder');

        if (!element)
        {
            element = document.createElement('div');
            element.id = 'editor-holder';
            document.body.appendChild(element);
        }
        render(<BoltGUI/>, element);
    }
}
