import React, { FunctionComponent } from 'react';

import styled from 'styled-components';

export interface PanelIconComponentProps
{
    /** optional custom tab button height, defaults to '100px' */
    tabButtonHeight?: string;   
    /** optional custom tab button width, defaults to '100px' */
    tabButtonWidth?: string;
    /** optional background colour of tab */
    tabColour?: string;
    /** callback function for tab click */
    clickCallback: Function;
    /** tab id */
    id: string;
    /** optional custom colour of tab id text, defaults to white */
    idColour?: string;
    /** optional image to replace tab id */
    imgSrc?: string; 
    /** optional alt text for src img */
    imgAlt?: string;
    /** true if tab is currently active */
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

const TabText = styled.h2<ChildProps>`
    font-family: Roboto;
    font-size: 28px;
    font-style: bold;
    color: ${(props: ChildProps): string => (props.colour ? props.colour : 'white')};
    opacity: ${(props: ChildProps): string => (props.active ? '1' : '0.7')};
`

const Logo = styled.img<ChildProps>`
    width: 80%;
    opacity: ${(props: ChildProps): string => (props.active ? '1' : '0.7')};
`;

export const PanelIconComponent: FunctionComponent<PanelIconComponentProps> = (props: PanelIconComponentProps) =>
    (
        <Container 
            height={props.tabButtonHeight} 
            width={props.tabButtonWidth} 
            colour={props.tabColour} 
            onClick={(): any => props.clickCallback()}
            active={props.active}
        >
            {
                props.imgSrc
                ?
                    <Logo 
                        src={props.imgSrc} 
                        alt={props.imgAlt 
                                ? props.imgAlt 
                                : props.id
                            }
                        active={props.active}
                    /> 
                : 
                    <TabText 
                        colour={props.idColour}
                        active={props.active}
                    >
                        {props.id}
                    </TabText>
            }
        </Container>
    );