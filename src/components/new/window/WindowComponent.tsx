import React, { FC } from 'react';
import { Size, XY } from '../../../utils';
import { defaultAttributes, defaultTheme } from '../Themeable';

import { PanelData } from '../../panels';
import { WindowView } from '../BoltComponent';
import styled from 'styled-components';
import { TabComponent, TabComponentData } from './TabComponent';

export interface WindowContainerData
{
    position?: XY;
    showTabs?: boolean;
    activeTab?: number;
    size?: Size;
    tabData: TabComponentData;
    panelData?: PanelData[];
}

interface WindowContainerProps
{
    position?: XY;
    size: Size;
}

const WindowContainer = styled.div<WindowContainerProps>`
    position: fixed;
    left: ${(props: WindowContainerProps): string => (props.position.x)};
    top: ${(props: WindowContainerProps): string => (props.position.y)};
    width: ${(props: WindowContainerProps): string => (props.size.width)};
    height: ${(props: WindowContainerProps): string => (props.size.height)};
    transition: width 0.25s, height 0.25s;
    padding: 0;
    background: ${defaultTheme.tab_bg_color};
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
    z-index: 100;
    border-radius: 5px;
    display: flex;
`;

export const WindowComponent: FC<WindowView> = (props: WindowContainerData) =>
{
    props = { ...defaultAttributes.window, ...props };
    const showIconBar = (props.panelData.length > 1) || props.showTabs || props.tabData.showLogo || !props.tabData.isExpanded;

    return (
        <WindowContainer
            size={{ width: props.size?.width, height: props.size.height }}
            position={props.position}
        >
            {
                showIconBar && <TabComponent {props.tabData}></TabComponent>/>
            }
            <ContentPanel
                panelWidth={props.isExpanded ? props.panelWidth : '0'}
                expandYCallBack={props.expandYCallBack}
                panelData={props.panelData[props.activePanelIndex]}
            ></ContentPanel>
        </WindowContainer>
    );
};
