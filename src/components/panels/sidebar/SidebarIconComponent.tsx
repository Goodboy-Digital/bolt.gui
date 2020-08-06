import { NOOP } from '../../../utils';
import React, { FC } from 'react';
import { defaultTheme } from '../../Themeable';
import styled from 'styled-components';
import { SidebarIconData, Size } from '../../../types';

interface SidebarIconContainerProps
{
    size?: Size;
    colour?: string;
    active?: boolean;
}

const SidebarIconContainer = styled.div<SidebarIconContainerProps>`
    width: ${(props: SidebarIconContainerProps): string => (props.size.width)};
    height: ${(props: SidebarIconContainerProps): string => (props.size.height)};
    min-height: ${(props: SidebarIconContainerProps): string => (props.size.height)};
    padding: 0;
    background: ${(props: SidebarIconContainerProps): string => (props.colour)};
    border-left: ${(props: SidebarIconContainerProps): string => (props.active ? '3px solid white' : '0')};
    overflow: none;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: ${(props: SidebarIconContainerProps): string => (props.active ? '0px' : '2.5px')};
    &:hover {
        border-left: 3px solid white;
        border-radius: 0px;
    }

    &:hover h2 {
        opacity: 1;
    }

    &:hover img {
        opacity: 1;
    }
`;

const SidebarDefaults: Partial<SidebarIconData> = {
    onClick: NOOP,
    size: { width: '48px', height: '48px' },
    bgColour: defaultTheme.sidebar_bg_color,
    textColour: defaultTheme.sidebar_text_color,
};

const PanelText = styled.h2<SidebarIconContainerProps>`
    font-family: Roboto, sans-serif;
    font-size: 28px;
    font-style: bold;
    color: ${(props: SidebarIconContainerProps): string => (props.colour ? props.colour : 'white')};
    opacity: ${(props: SidebarIconContainerProps): string => (props.active ? '1' : '0.7')};
`;

const Logo = styled.img<SidebarIconContainerProps>`
    width: 80%;
    opacity: ${(props: SidebarIconContainerProps): string => (props.active ? '1' : '0.7')};
`;

export const SidebarIconComponent: FC<SidebarIconData> = (props: SidebarIconData) =>
{
    props = { ...SidebarDefaults, ...props };
    const { active, img, imgAlt, bgColour, size, onClick, text, textColour } = props;

    return (
        <SidebarIconContainer
            size={size}
            colour={bgColour}
            onClick={(e) => onClick(e)}
            active={active}
        >
            {
                img
                    ? <Logo
                        src={img}
                        alt={imgAlt
                            ? imgAlt
                            : text
                        }
                        active={props.active}
                    />
                    : <PanelText
                        colour={textColour}
                        active={active}
                    >
                        {text}
                    </PanelText>
            }
        </SidebarIconContainer>
    );
};

