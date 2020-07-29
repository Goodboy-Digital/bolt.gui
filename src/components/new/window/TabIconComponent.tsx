import { NOOP, Size } from '../../../utils';
import React, { FC } from 'react';

import { defaultTheme } from '../Themeable';
import styled from 'styled-components';

export interface TabIconComponentData
{
    size?: Size;
    /** optional background colour of panel */
    bgColor?: string;
    /** callback function for panel click */
    onClick?: (index: number)=> void;
    /** panel id */
    id: string;
    /** optional custom colour of panel id text, defaults to white */
    idColour?: string;
    /** optional image to replace panel id */
    imgSrc?: string;
    /** optional alt text for src img */
    imgAlt?: string;
    /** true if panel is currently active */
    active: boolean;
}

interface TabIconContainerProps
{
    size: Size;
    colour?: string;
    active?: boolean;
}

const TabIconContainer = styled.div<TabIconContainerProps>`
    width: ${(props: TabIconContainerProps): string => (props.size.width)};
    height: ${(props: TabIconContainerProps): string => (props.size.height)};
    min-height: ${(props: TabIconContainerProps): string => (props.size.height)};
    padding: 0;
    background: ${(props: TabIconContainerProps): string => (props.colour)};
    border-left: ${(props: TabIconContainerProps): string => (props.active ? '3px solid white' : '0')};
    overflow: none;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: ${(props: TabIconContainerProps): string => (props.active ? '0px' : '2.5px')};
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

const tabDefaults: Partial<TabIconComponentData> = {
    onClick: NOOP,
    size: { width: '48px', height: '48px' },
    bgColor: defaultTheme.tab_bg_color,
};

export const TabIconComponent: FC<TabIconComponentData> = (props: TabIconComponentData) =>
{
    props = { ...tabDefaults, ...props };

    return (
        <TabIconContainer
            size={props.size}
            colour={props.bgColor}
            onClick={props.onClick}
            active={props.active}
        >
            {
                props.imgSrc
                    ? <Logo
                        src={props.imgSrc}
                        alt={props.imgAlt
                            ? props.imgAlt
                            : props.id
                        }
                        active={props.active}
                    />
                    : <PanelText
                        colour={props.idColour}
                        active={props.active}
                    >
                        {props.id}
                    </PanelText>
            }
        </TabIconContainer>
    );
};

