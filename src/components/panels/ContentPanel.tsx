import { ColumnLayout, ComponentPair, RowLayout } from '../inputs/layouts';
import { Label } from '../inputs/Label'
import React, { FunctionComponent } from 'react';

import styled from 'styled-components';

export interface PanelData {
    /** title of tab */
    title: string;
    /** tab id, abbreviation to be displayed in side bar */
    id?: string;
    /** optional over-ride for tab button text colour */
    idColour?: string;
    /** if provided, replaces tab button text with image */
    tabImg?: string;
    /** alt text for replaced image */
    imgAlt?: string;
    /** optional background colour for tab button */
    tabColour?: string;
    /** components to be displayed under tab */
    elements: ElementData[];
}

export interface ElementData {
    label?: string,
    labelColour?: string,
    labelFont?: string,
    rows: {
        components: ComponentPair[]
    }[];
}

export interface ContentPanelProps
{
    /** panel width, defaults to '400px' */
    panelWidth?: string;
    /** Information to be rendered in content panel */
    panelData: PanelData;
}

interface ContainerProps {
    panelWidth?: string;
}

const Container = styled.div<ContainerProps>`
    width: ${(props: ContainerProps): string => (props.panelWidth ? props.panelWidth : '300px')};
    transition: width 0.25s, height 0.25s;
    background-color: #343C47;
    border-radius: 0px 5px 5px 0px;
    overflow-y: scroll;
    ::-webkit-scrollbar {display:none;}
`

const Header = styled.div`
    width: 100%;
    margin: 0;
    padding: 2px 0 2px 10px;
    border-radius: 0px 5px 0 0;
    background-color: #5C6BC0;
    display: flex;
`

const TitleText = styled.h1`
    margin: 0;
    padding: 0;
    color: white;
    opacity: 0.8;
    font-family: Roboto;
    font-size: 20px;
`

const ElementContainer = styled.div`
    width: 100%;
    overflow-y: scroll;
    ::-webkit-scrollbar {display:none;}
`

const ComponentWrapper = styled.div`
    width: 100%;
`

export const ContentPanel: FunctionComponent<ContentPanelProps> = (props: ContentPanelProps) =>
{
    const data = props.panelData || {
        title: 'Default panel title',
        elements: [
            {
                rows: [
                    {
                        components: [
                            { component: Label, inputData: { label: 'Oh no - something exploded. Window missing panel data', textAlign: 'center' }},
                        ]
                    },
                ]
            },
        ],
    };
    return (
        <Container
            panelWidth={props.panelWidth}
        >
            <Header>
                <TitleText>{data.title.toUpperCase()}</TitleText>
            </Header>
            <ElementContainer>
                {
                    data.elements.map((element, index) => {
                    return (
                        <ComponentWrapper key={index}>
                            <ColumnLayout
                                label={element.label}
                                labelColour={element.labelColour}
                                labelFontSize={element.labelColour}
                            >
                                <RowLayout rows={element.rows}/>
                            </ColumnLayout>
                        </ComponentWrapper>
                    )
                    })
                }
            </ElementContainer>
        </Container>
    );
}
