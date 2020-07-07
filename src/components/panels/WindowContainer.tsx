import { ContentPanel, PanelData } from './ContentPanel';
import React, { FunctionComponent } from 'react';

import { PanelIconComponent } from './PanelIconComponent';
import { XY } from '../../utils';
import goodboyLogo from '../../assets/goodboy-logo.png';
import styled from 'styled-components';

export interface WindowContainerData
{
    /** container default position */
    defaultContainerPosition?: { x: string; y: string };
    /** container height, defaults to '300px' */
    defaultContainerHeight?: string;
    /** container width, defaults to 'auto' */
    defaultContainerWidth?: string;
    /** Custom Panel button height, defaults to '100px' */
    panelButtonHeight?: string;
    /** Custom Panel button width, defaults to '100px' */
    panelButtonWidth?: string;
    /** toggles expansion of content */
    panelWidth?: string;
    /** toggles expansion of content */
    expandedX: boolean;
    /** toggles expansion vertically */
    expandedY: boolean;
    /** callback for expanding and collapsing on y*/
    expandYCallBack: ()=> void;
    /** callback for setting the active Panel */
    setActivePanelCallBack: (index: number)=> void;
    /** Array of Panel information used to construct UI */
    panelData: PanelData[];
    /** Index of current active Panel in Panel data array */
    activePanelIndex: number;
    /** Forces icon column to be displayed */
    forceIconColumn?: boolean;
    /** Forces display of logo icon */
    forceLogoIcon?: boolean;
}

interface ContainerProps
{
    position?: XY;
    expandedX: boolean;
    expandedY: boolean;
    height: string;
    width: string;
}

interface PanelColumnProps
{
    showScroll: boolean;
    width?: string;
}

interface ItemsContainerProps 
{ 
    forceLogoIcon?: boolean;
    expandedY?: boolean;
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

const PanelColumn = styled.div<PanelColumnProps>`
    border: 0;
    margin: 0;
    height: 100%;
    width: ${(props: PanelColumnProps): string => (props.width ? props.width : '48px')};
`;

const ItemsContainer = styled.div<ItemsContainerProps>`
    border: 0;
    margin: 0;
    height: calc(100% - ${(props: ItemsContainerProps) => props.forceLogoIcon ? '48px' : '0px'});
    display: flex;
    flex-direction: column;
    overflow-y: ${(props: ItemsContainerProps) => props.expandedY ? 'scroll' : 'hidden'};
    ::-webkit-scrollbar {display:none;}
    scrollbar-width: none;
`;

export const WindowContainer: FunctionComponent<WindowContainerData> = (props: WindowContainerData) => {
    let showIconBar = (props.panelData.length > 1) || props.forceIconColumn || props.forceLogoIcon || !props.expandedY;

    return (
        <Container
            height={props.defaultContainerHeight ? props.defaultContainerHeight : '272px'}
            width={props.defaultContainerWidth ? props.defaultContainerWidth : 'auto'}
            expandedX={props.expandedX}
            expandedY={props.expandedY}
            position={props.defaultContainerPosition}
        >
            {showIconBar && 
                <PanelColumn showScroll={props.expandedY} width={props.panelButtonWidth}>
                    {props.forceLogoIcon && 
                        <PanelIconComponent
                            id={'Bolt'}
                            imgSrc={goodboyLogo}
                            imgAlt={'Bolt GUI'}
                            clickCallback={() => props.expandYCallBack()}
                            panelButtonHeight={props.panelButtonHeight}
                            panelButtonWidth={props.panelButtonWidth}
                            active={props.expandedY}
                        />
                    }
                    <ItemsContainer
                        forceLogoIcon={props.forceLogoIcon}
                        expandedY={props.expandedY}
                    >
                        {
                            props.panelData.map((panel, index) =>
                                (
                                    <PanelIconComponent
                                        id={panel.id ? panel.id : panel.title.slice(0, 1)}
                                        idColour={panel.idColour}
                                        panelColour={panel.panelColour}
                                        panelButtonHeight={props.panelButtonHeight}
                                        panelButtonWidth={props.panelButtonWidth}
                                        imgSrc={panel.panelImg}
                                        imgAlt={panel.imgAlt}
                                        clickCallback={() => props.expandedY ? props.setActivePanelCallBack(index) : props.expandYCallBack()}
                                        active={(index === props.activePanelIndex) && props.expandedY}
                                        key={index}
                                    />
                                ))
                        }
                    </ItemsContainer>
                </PanelColumn>
            }
            <ContentPanel
                panelWidth={props.expandedY ? props.panelWidth : '0'}
                expandYCallBack={props.expandYCallBack}
                panelData={props.panelData[props.activePanelIndex]}
            ></ContentPanel>
        </Container>
    );
}
