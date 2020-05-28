import { ColumnLayout, ComponentPair, RowLayout } from '../inputs/layouts';
import React, { FunctionComponent } from 'react';

import styled from 'styled-components';

export interface TabData {
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
    columns: {
        components: ComponentPair[]
    }[];
}

export interface ContentPanelProps
{
    /** panel width, defaults to '400px' */
    panelWidth?: string;
    /** Information to be rendered in content panel */
    tabData: TabData;
}

interface ContainerProps {
    panelWidth?: string;
}

const Container = styled.div<ContainerProps>`
    width: ${(props: ContainerProps): string => (props.panelWidth ? props.panelWidth : '400px')};
    transition: width 0.25s, height 0.25s;
    background-color: #252C39;
    border-radius: 0px 5px 5px 0px;
    overflow-y: scroll;
    ::-webkit-scrollbar {display:none;}
`

const Header = styled.div`
    width: 100%;
    margin: 0;
    padding: 5px 0 5px 10px;
    border-radius: 0px 5px 0 0;
    background-color: #5C65BC;
    display: flex;
`

const TitleText = styled.h1`
    margin: 0;
    padding: 0;
    color: white;
    opacity: 0.8;
    font-family: Roboto;
    font-size: 36px;
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
    const data = props.tabData;
    return (
        <Container
            panelWidth={props.panelWidth}
        >
            <Header>
                <TitleText>{data.title.toUpperCase()}</TitleText>
            </Header>
            <ElementContainer>
                {
                    data.elements.map((element) => {
                    return (
                        <ComponentWrapper>
                            <ColumnLayout
                                label={element.label}
                                labelColour={element.labelColour}
                                labelFontSize={element.labelColour}
                            >
                                <RowLayout columns={element.columns}/>
                            </ColumnLayout>
                        </ComponentWrapper>
                    )
                    })
                }
            </ElementContainer>
        </Container>
    );
}
