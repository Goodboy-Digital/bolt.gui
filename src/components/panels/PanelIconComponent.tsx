import React, { FunctionComponent } from 'react';

import styled from 'styled-components';

export interface PanelIconComponentProps
{
    /** optional custom panel button height, defaults to '100px' */
    panelButtonHeight?: string;
    /** optional custom panel button width, defaults to '100px' */
    panelButtonWidth?: string;
    /** optional background colour of panel */
    panelColour?: string;
    /** callback function for panel click */
    clickCallback: ()=> void;
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

interface ContainerProps
{
    height?: string;
    width?: string;
    colour?: string;
    active?: boolean;
    stick?: boolean;
}

interface ChildProps
{
    colour?: string;
    active?: boolean;
}

const Container = styled.div<ContainerProps>`
    width: ${(props: ContainerProps): string => (props.width ? props.width : '48px')};
    height: ${(props: ContainerProps): string => (props.height ? props.height : '48px')};
    min-height: ${(props: ContainerProps): string => (props.height ? props.height : '48px')};
    padding: 0;
    background: ${(props: ContainerProps): string => (props.colour ? props.colour : '#3F51B5')};
    border-left: ${(props: ContainerProps): string => (props.active ? '3px solid white' : '0')};
    overflow: none;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: ${(props: ContainerProps): string => (props.active ? '0px' : '2.5px')};
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

const PanelText = styled.h2<ChildProps>`
    font-family: Roboto, sans-serif;
    font-size: 28px;
    font-style: bold;
    color: ${(props: ChildProps): string => (props.colour ? props.colour : 'white')};
    opacity: ${(props: ChildProps): string => (props.active ? '1' : '0.7')};
`;

const Logo = styled.img<ChildProps>`
    width: 80%;
    opacity: ${(props: ChildProps): string => (props.active ? '1' : '0.7')};
`;

export const PanelIconComponent: FunctionComponent<PanelIconComponentProps> = (props: PanelIconComponentProps) =>
    (
        <Container
            height={props.panelButtonHeight}
            width={props.panelButtonWidth}
            colour={props.panelColour}
            onClick={(): any => props.clickCallback()}
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
        </Container>
    );
