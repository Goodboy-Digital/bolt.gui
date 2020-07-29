import React, { FC } from 'react';

import { PanelData } from '../../panels';
import { Size } from '../../../utils';
import { TabIconComponent } from './TabIconComponent';
import { defaultAttributes } from '../Themeable';
import goodboyLogo from '../../../assets/goodboy-logo.png';
import styled from 'styled-components';

export interface TabComponentData
{
    size: Size;
    onClick: ()=> void;
    onToggle: ()=> void;
    panelData: PanelData[];
    isExpanded: boolean;
    showLogo: boolean;
}

interface TabColumnContainerProps
{
    width?: string;
}

const TabColumnContainer = styled.div<TabColumnContainerProps>`
    border: 0;
    margin: 0;
    height: 100%;
    width: ${(props: TabColumnContainerProps): string => (props.width)};
`;

interface TabsContainerProps
{
    showLogo?: boolean;
    isExpanded?: boolean;
}

const TabsContainer = styled.div<TabsContainerProps>`
    border: 0;
    margin: 0;
    height: calc(100% - ${(props: TabsContainerProps) =>
        (props.showLogo ? defaultAttributes.window.tabSize.width : '0px')});
    display: flex;
    flex-direction: column;
    overflow-y: ${(props: TabsContainerProps) => (props.isExpanded ? 'scroll' : 'hidden')};
    ::-webkit-scrollbar {display:none;}
    scrollbar-width: none;
`;

export const TabComponent: FC<TabComponentData> = (props: TabComponentData) =>
    (
        <TabColumnContainer width={props.size.width}>
            {
                props.showLogo && <TabIconComponent
                    id={'Bolt'}
                    imgSrc={goodboyLogo}
                    onClick={props.onClick}
                    size={props.size}
                    active={props.isExpanded}
                />
            }
            <TabsContainer
                showLogo={props.showLogo}
                isExpanded={props.isExpanded}
            >
                {
                    props.panelData.map((panel: PanelData, index: number) =>
                        (
                            <TabIconComponent
                                id={panel.id ? panel.id : panel.title.slice(0, 1)}
                                idColour={panel.idColour}
                                bgColor={panel.panelColour}
                                size={props.size}
                                imgSrc={panel.panelImg}
                                onClick={props.isExpanded ? props.onClick : props.onToggle}
                                active={panel.isActive && props.isExpanded}
                                key={index}
                            />
                        ))
                }
            </TabsContainer>
        </TabColumnContainer>
    );
