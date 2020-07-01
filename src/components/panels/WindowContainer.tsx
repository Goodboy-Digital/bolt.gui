import { ContentPanel, PanelData } from './ContentPanel';
import React, { FunctionComponent } from 'react';

import { PanelIconComponent } from './PanelIconComponent';
import { XY } from '../../utils';
import goodboyLogo from '../../assets/goodboy-logo.png';
import styled from 'styled-components';

export interface WindowContainerData
{
    /** container default position */
    defaultContainerPosition?: { x: string , y: string };
    /** container height, defaults to '300px' */
    defaultContainerHeight?: string;
    /** container width, defaults to 'auto' */
    defaultContainerWidth?: string;
    /** Custom tab button height, defaults to '100px' */
    tabButtonHeight?: string;
    /** Custom tab button width, defaults to '100px' */
    tabButtonWidth?: string;
    /** toggles expansion of content */
    panelWidth?: string;
    /** toggles expansion of content */
    expandedX: boolean;
    /** toggles expansion vertically */
    expandedY: boolean;
    /** callback for */
    expandYCallBack: Function;
    /** callback for setting the active tab */
    setActiveTabCallBack: Function;
    /** Array of tab information used to construct UI */
    panelData: PanelData[];
    /** Index of current active tab in tab data array */
    activeTabIndex: number;
}

interface ContainerProps
{
    position?: XY;
    expandedX: boolean;
    expandedY: boolean;
    height: string;
    width: string;
}

interface TabColumnProps
{
    showScroll: boolean;
    width?: string;
}

const Container = styled.div<ContainerProps>`
    position: fixed;
    left: ${(props: ContainerProps): string => (props.position ? props.position.x : '50px')};
    top: ${(props: ContainerProps): string => (props.position ? props.position.y : '50px')};
    width: ${(props: ContainerProps): string => (props.expandedX ? props.width : '48px')};
    height: ${(props: ContainerProps): string => (props.expandedY ? props.height : '48px')};
    transition: width 0.25s, height 0.25s;
    padding: 0;
    background: #3F51B5;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
    z-index: 100;
    border-radius: 5px;
    display: flex;
`;

const TabColumn = styled.div<TabColumnProps>`
    border: 0;
    margin: 0;
    height: 100%;
    width: ${(props: TabColumnProps): string => (props.width ? props.width : '48px')};
    overflow: hidden;
`

const ItemsContainer = styled.div`
    border: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    overflow-y: scroll;
    ::-webkit-scrollbar {display:none;}
`

export const WindowContainer: FunctionComponent<WindowContainerData> = (props: WindowContainerData) =>
    (
        <Container
            height={props.defaultContainerHeight ? props.defaultContainerHeight : '272px'}
            width={props.defaultContainerWidth ? props.defaultContainerWidth : 'auto'}
            expandedX={props.expandedX}
            expandedY={props.expandedY}
            position={props.defaultContainerPosition}
        >
            <TabColumn showScroll={props.expandedY} width={props.tabButtonWidth}>
                <PanelIconComponent
                    id={'Bolt'}
                    imgSrc={goodboyLogo}
                    imgAlt={'Bolt GUI'}
                    clickCallback={() => props.expandYCallBack()}
                    tabButtonHeight={props.tabButtonHeight}
                    tabButtonWidth={props.tabButtonWidth}
                    active={props.expandedY}
                />
                <ItemsContainer>
                {
                    props.panelData.map((panel, index) => {
                        return (
                            <PanelIconComponent
                                id={panel.id ? panel.id : panel.title.slice(0, 1)}
                                idColour={panel.idColour}
                                tabColour={panel.tabColour}
                                tabButtonHeight={props.tabButtonHeight}
                                tabButtonWidth={props.tabButtonWidth}
                                imgSrc={panel.tabImg}
                                imgAlt={panel.imgAlt}
                                clickCallback={() => props.setActiveTabCallBack(index)}
                                active={index === props.activeTabIndex}
                                key={index}
                            />
                        )
                    })
                }
                </ItemsContainer>
            </TabColumn>
            <ContentPanel
                panelWidth={props.expandedY ? props.panelWidth : '0'}
                panelData={props.panelData[props.activeTabIndex]}
            ></ContentPanel>
        </Container>
    );