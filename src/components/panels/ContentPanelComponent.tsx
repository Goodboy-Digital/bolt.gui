import { ComponentPair } from '../inputs/layouts';
import React, { FunctionComponent } from 'react';
import { PanelData, ApplicationStore } from '../../types';
import styled from 'styled-components';
import { connect, ConnectedProps } from 'react-redux';
import { getComponentsByIds, toggleWindowExpanded } from '../../redux';

const mapStateToProps = (store: ApplicationStore) => ({ store });
const mapDispatch = { getComponentsByIds, toggleWindowExpanded };
const connector = connect(mapStateToProps, mapDispatch);

type ContentPanelReduxProps = ConnectedProps<typeof connector>;

export interface ContentPanelComponentProps extends ContentPanelReduxProps
{
    windowID: string;
    panelWidth?: string;
    panelData: PanelData;
}

export interface ElementData
{
    label?: string;
    labelColour?: string;
    labelFont?: string;
    rows: {
        components: ComponentPair[];
    }[];
}

interface ContainerProps
{
    panelWidth?: string;
}

const Container = styled.div<ContainerProps>`
    width: ${(props: ContainerProps): string => (props.panelWidth ? props.panelWidth : '300px')};
    transition: width 0.25s, height 0.25s;
    background-color: #343C47;
    border-radius: 0px 5px 5px 0px;
    overflow-y: hidden;
`;

const Header = styled.div`
    width: 100%;
    margin: 0;
    padding: 0;
    border-radius: 0px 5px 0 0;
    background-color: #5C6BC0;
    display: flex;
`;

const TitleText = styled.h1`
    margin: 2px 0 2px 10px;
    padding: 0;
    color: white;
    opacity: 0.8;
    font-family: Roboto, sans-serif;
    font-size: 20px;
`;

const ElementContainer = styled.div`
    width: 100%;
    height: calc(100% - 24px);
    overflow-y: scroll;
    ::-webkit-scrollbar {display:none;}
    scrollbar-width: none;
`;

const ContentPanelComponent: FunctionComponent<ContentPanelComponentProps> = (props: ContentPanelComponentProps) =>
{
    const { toggleWindowExpanded, getComponentsByIds, store, panelData, windowID } = props;
    const childComponents = getComponentsByIds(store, panelData.childIDs).payload || [];

    return (
        <Container
            panelWidth={props.panelWidth}
        >
            <Header
                onClick={() => toggleWindowExpanded(windowID)}
            >
                <TitleText>{props.panelData.title.toUpperCase()}</TitleText>
            </Header>
            <ElementContainer>
                {
                    childComponents.map((pair) =>
                        (
                            <pair.component key={pair.id} inputData={pair.inputData}/>
                        ))
                }
            </ElementContainer>
        </Container>
    );
};

export default connector(ContentPanelComponent);
