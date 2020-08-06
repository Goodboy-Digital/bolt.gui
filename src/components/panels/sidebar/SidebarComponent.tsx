import React, { FC } from 'react';

import { SidebarData, SidebarIconData } from '../../../types';
import { SidebarIconComponent } from './SidebarIconComponent';
import { defaultAttributes } from '../../Themeable';
import goodboyLogo from '../../../assets/goodboy-logo.png';
import styled from 'styled-components';

interface SidebarColumnContainerProps
{
    width?: string;
}

const SidebarColumnContainer = styled.div<SidebarColumnContainerProps>`
    border: 0;
    margin: 0;
    height: 100%;
    width: ${(props: SidebarColumnContainerProps): string => (props.width)};
`;

interface SidebarContainerProps
{
    showLogo?: boolean;
    isExpanded?: boolean;
}

const SidebarsContainer = styled.div<SidebarContainerProps>`
    border: 0;
    margin: 0;
    height: calc(100% - ${(props: SidebarContainerProps) =>
        (props.showLogo ? defaultAttributes.window.sidebarSize.width : '0px')});
    display: flex;
    flex-direction: column;
    overflow-y: ${(props: SidebarContainerProps) => (props.isExpanded ? 'scroll' : 'hidden')};
    ::-webkit-scrollbar {display:none;}
    scrollbar-width: none;
`;

export const SidebarComponent: FC<SidebarData> = (props: SidebarData) =>
{
    const { expanded, icons, size, iconSize, showLogo, onToggle } = props;

    return (
        <SidebarColumnContainer width={size.width}>
            {
                props.showLogo && <SidebarIconComponent
                    text={'Bolt'}
                    img={goodboyLogo}
                    onClick={onToggle}
                    size={iconSize}
                    active={expanded}
                />
            }
            <SidebarsContainer
                showLogo={showLogo}
                isExpanded={expanded}
            >
                {
                    icons.map((icon: SidebarIconData, index: number) =>
                        (
                            <SidebarIconComponent
                                text={icon.text}
                                textColour={icon.textColour}
                                bgColour={icon.bgColour}
                                size={props.size}
                                img={icon.img}
                                imgAlt={icon.imgAlt}
                                onClick={expanded ? icon.onClick : onToggle}
                                active={icon.active}
                                key={index}
                            />
                        ))
                }
            </SidebarsContainer>
        </SidebarColumnContainer>
    );
};

