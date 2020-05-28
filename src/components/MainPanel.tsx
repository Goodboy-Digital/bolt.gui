import React, { FunctionComponent } from 'react';
import goodboyLogo from '../assets/goodboy-logo.png';
import styled from 'styled-components';
import { TabButtonComponent } from './TabButtonComponent';
import { ContentPanel, TabData } from './ContentPanel';

export interface MainPanelProps
{
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
    tabData: TabData[];
    /** Index of current active tab in tab data array */
    activeTabIndex: number;
}

interface ContainerProps
{
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
    left: 50px;
    top: 100px;
    width: ${(props: ContainerProps): string => (props.expandedX ? props.width : '100px')};
    height: ${(props: ContainerProps): string => (props.expandedY ? props.height : '100px')};
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
    width: ${(props: TabColumnProps): string => (props.width ? props.width : '100px')};
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

export const MainPanel: FunctionComponent<MainPanelProps> = (props: MainPanelProps) =>
    (
        <Container
            height={props.defaultContainerHeight ? props.defaultContainerHeight : '400px'}
            width={props.defaultContainerWidth ? props.defaultContainerWidth : 'auto'}
            expandedX={props.expandedX} 
            expandedY={props.expandedY} 
        >
            <TabColumn showScroll={props.expandedY} width={props.tabButtonWidth}>
                <TabButtonComponent 
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
                    props.tabData.map((tab, index) => {
                        return (
                            <TabButtonComponent
                                id={tab.id ? tab.id : tab.title.slice(0, 1)}
                                idColour={tab.idColour}
                                tabColour={tab.tabColour}
                                tabButtonHeight={props.tabButtonHeight}
                                tabButtonWidth={props.tabButtonWidth}
                                imgSrc={tab.tabImg} 
                                imgAlt={tab.imgAlt} 
                                clickCallback={() => props.setActiveTabCallBack(index)}
                                active={index === props.activeTabIndex}
                            />
                        )
                    })
                }
                </ItemsContainer>
            </TabColumn>
            <ContentPanel 
                panelWidth={props.expandedY ? props.panelWidth : '0'}
                tabData={props.tabData[props.activeTabIndex]}
            ></ContentPanel>
        </Container>
    );