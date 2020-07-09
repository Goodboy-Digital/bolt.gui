import React, { Component, FunctionComponent } from 'react';

import { WindowContainerData } from './panels/WindowContainer';
import styled from 'styled-components';

export interface ViewData
{
    component: FunctionComponent<WindowContainerData>;
    props: WindowContainerData;
}
export interface BoltProps
{
    stage?: any; // this will be the reference object for the game if needed
    viewData?: ViewData[];
}

export interface BoltState
{
    expandedX: boolean;
    expandedY: boolean;
    activePanel: number;
}

const BoltContainer = styled.div``;

export class BoltGUI extends Component<BoltProps, BoltState>
{
    private views: ViewData[] = [];

    constructor(props: BoltProps)
    {
        super(props);
        this.state = {
            expandedX: true,
            expandedY: true,
            activePanel: 0,
        };

        this.views = props.viewData || [];
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
                    this.views.map((view, index) =>
                        (
                            <view.component
                                key={index}
                                defaultContainerPosition={view.props.defaultContainerPosition}
                                defaultContainerHeight={view.props.defaultContainerHeight}
                                defaultContainerWidth={view.props.defaultContainerWidth}
                                expandedX={this.state.expandedX}
                                expandedY={this.state.expandedY}
                                expandYCallBack={this.toggleExpandedY.bind(this)}
                                setActivePanelCallBack={this.setActivePanel.bind(this)}
                                panelData={view.props.panelData}
                                activePanelIndex={this.state.activePanel}
                                forceIconColumn={index === 0 || view.props.forceIconColumn}
                                forceLogoIcon={index === 0 || view.props.forceLogoIcon}
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

    public setActivePanel(newState: number): void
    {
        this.setState({ activePanel: newState });
    }
}
