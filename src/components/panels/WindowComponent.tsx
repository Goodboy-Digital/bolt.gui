import React, { FC } from 'react';
import { ApplicationStore, Size, XY, WindowData } from '../../types';
import { defaultAttributes, defaultTheme } from '../Themeable';
import styled from 'styled-components';
import { SidebarComponent } from './sidebar';
import ContentPanelComponent from './ContentPanelComponent';
import { connect, ConnectedProps } from 'react-redux';
import { getWindowSidebarIcons, toggleWindowExpanded } from '../../redux';

const mapStateToProps = (store: ApplicationStore) =>
    ({ store });
const mapDispatch = { toggleWindowExpanded, getWindowSidebarIcons };
const connector = connect(mapStateToProps, mapDispatch);

type WindowReduxProps = ConnectedProps<typeof connector>;

export interface WindowComponentProps extends WindowReduxProps
{
    data: WindowData;
}

interface WindowContainerProps
{
    position: XY;
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
    background: ${defaultTheme.sidebar_bg_color};
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
    z-index: 100;
    border-radius: 5px;
    display: flex;
`;

const WindowComponent: FC<WindowComponentProps> = (props: WindowComponentProps) =>
{
    const data = { ...defaultAttributes.window, ...props.data };
    // eslint-disable-next-line max-len
    const { id, size, expanded, position, sidebarSize, panelSize, showSidebar, sidebarIconSize, sidebarShowLogo, activePanelIndex, panelData } = data;
    const activePanel = panelData[activePanelIndex];
    const showIconBar = (panelData.length > 1) || showSidebar || sidebarShowLogo || expanded;
    const icons: any[] = props.getWindowSidebarIcons(props.store, id).payload || [];

    return (
        <WindowContainer
            size={size}
            position={position}
        >
            {
                showIconBar && <SidebarComponent
                    showSidebar={showSidebar}
                    size={sidebarSize}
                    showLogo={sidebarShowLogo}
                    icons={icons}
                    iconSize={sidebarIconSize}
                    onToggle={() => props.toggleWindowExpanded(id)}
                    expanded={expanded}
                />
            }
            <ContentPanelComponent
                windowID={id}
                panelWidth={expanded ? panelSize.width : '0'}
                panelData={activePanel}
            ></ContentPanelComponent>
        </WindowContainer>
    );
};

export default connector(WindowComponent);
