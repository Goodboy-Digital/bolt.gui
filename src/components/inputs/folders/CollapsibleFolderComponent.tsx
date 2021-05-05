import React, { FunctionComponent } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import styled from 'styled-components';
import { ApplicationStore } from '../../../types';
import { getComponentsByIds, updateComponent } from '../../../redux';

const mapStateToProps = (store: ApplicationStore) => ({ store });
const mapDispatch = { getComponentsByIds, updateComponent };
const connector = connect(mapStateToProps, mapDispatch);

type CollapsibleFolderReduxProps = ConnectedProps<typeof connector>;

export interface CollapsibleFolderComponentProps extends CollapsibleFolderReduxProps
{
    inputData: CollapsibleFolderComponentOptions;
}

export interface CollapsibleFolderComponentOptions
{
    id: string;
    backgroundColour?: string;
    childIDs: string[];
    label: string;
    labelColour?: string;
    labelFontSize?: string;
    headerColour?: string;
    expanded: boolean;
}

interface LabelProps
{
    labelColour?: string;
    labelFontSize?: string;
}

const Container = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    padding: 2px 0px;
    `;

const Header = styled.div<{headerColour?: string}>`
    width: 100%;
    display: flex;
    flex-direction: row;
    background-color: ${(props: {headerColour?: string}): string => (props.headerColour
        ? props.headerColour
        : '#5C6BC0'
    )};
    `;

const Arrow = styled.div<{expanded: boolean}>`
    position: relative;
    left: ${(props: {expanded: boolean}) => (props.expanded ? '5px' : '10px')};
    top: ${(props: {expanded: boolean}) => (props.expanded ? '5px' : '0')};
    width: 0; 
    height: 0; 
    border-top: 8px solid ${(props: {expanded: boolean}) => (!props.expanded ? 'transparent' : 'white')};
    border-bottom: 8px solid transparent; 
    border-right: 8px solid transparent; 
    border-left: 8px solid ${(props: {expanded: boolean}) => (props.expanded ? 'transparent' : 'white')};; 
`;

const LabelText = styled.p<LabelProps>`
    margin: 0 0 0 15px;
    padding: 0;
    color: ${(props: LabelProps): string => (props.labelColour ? props.labelColour : 'white')};
    font-family: Roboto, sans-serif;
    opacity: 0.8;
    font-size: ${(props: LabelProps): string => (props.labelFontSize ? props.labelFontSize : '11px')};
`;

const Content = styled.div<{backgroundColour?: string; expanded: boolean}>`
    width: '98%';
    height: ${(props: {expanded: boolean}) => (props.expanded ? 'auto' : '0px')};
    transition: width 0.25s, height 0.25s;
    overflow: hidden;
    margin: 0;
    padding: 0 1%;
    display: flex;
    flex-direction: column;
    background-color: ${(props: {backgroundColour?: string}): string => (props.backgroundColour
        ? props.backgroundColour
        : '#1C2127'
    )};
`;

const UnconnectedCollapsibleFolderComponent: FunctionComponent<CollapsibleFolderComponentProps>
 = (props: CollapsibleFolderComponentProps) =>
 {
     const { getComponentsByIds, updateComponent, store } = props;
     const { id, label, childIDs, expanded, backgroundColour, headerColour } = props.inputData;
     const childComponents = getComponentsByIds(store, childIDs).payload || [];

     return (
         <Container>
             <Header
                 headerColour={headerColour}
                 onClick={() =>
                 {
                     updateComponent({
                         // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                         // @ts-ignore - type mismatch
                         // eslint-disable-next-line no-use-before-define
                         component: CollapsibleFolderComponent,
                         id,
                         inputData: {
                             ...props.inputData,
                             expanded: !expanded,
                         },
                     });
                 }}>
                 <Arrow expanded={expanded}/>
                 <LabelText>{label}</LabelText>
             </Header>
             <Content
                 backgroundColour={backgroundColour}
                 expanded={expanded}
             >
                 {
                     childComponents.map((pair) =>
                         (
                             <pair.component key={pair.id} inputData={pair.inputData}/>
                         ))
                 }
             </Content>
         </Container>
     );
 };

export const CollapsibleFolderComponent = connector(UnconnectedCollapsibleFolderComponent);
