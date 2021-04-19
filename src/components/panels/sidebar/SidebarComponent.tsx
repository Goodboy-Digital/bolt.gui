import React, { FC } from 'react';

import { SidebarData, SidebarIconData } from '../../../types';
import { SidebarIconComponent } from './SidebarIconComponent';
import { defaultAttributes } from '../../Themeable';
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
    const { expanded, icons, size, iconSize, logo, logoAlt, onToggle } = props;

    return (
        <SidebarColumnContainer width={size.width}>
            {
                logo && <SidebarIconComponent
                    text={logoAlt || 'Bolt'}
                    img={logo}
                    onClick={onToggle}
                    size={iconSize}
                    active={expanded}
                />
            }
            <SidebarsContainer
                showLogo={!!(logo)}
                isExpanded={expanded}
            >
                {
                    icons.map((icon: SidebarIconData, index: number) =>
                        (
                            <SidebarIconComponent
                                text={icon.text}
                                textColour={icon.textColour}
                                bgColour={icon.bgColour}
                                size={iconSize}
                                img={icon.img}
                                imgAlt={icon.imgAlt}
                                onClick={() => { icon.onClick && icon.onClick(); if (!expanded) onToggle(); }}
                                active={icon.active}
                                key={index}
                            />
                        ))
                }
            </SidebarsContainer>
        </SidebarColumnContainer>
    );
};

