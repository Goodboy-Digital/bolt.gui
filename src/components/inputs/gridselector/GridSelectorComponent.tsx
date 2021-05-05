import React, { FunctionComponent } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import styled from 'styled-components';
import { ApplicationStore } from '../../../types';
import { updateComponent } from '../../../redux';
import { GridIcon } from './GridIcon';
import { TextInputComponent } from '../textbox';

const mapStateToProps = (store: ApplicationStore) => ({ store });
const mapDispatch = { updateComponent };
const connector = connect(mapStateToProps, mapDispatch);

type GridSelectorReduxProps = ConnectedProps<typeof connector>;

export interface GridSelectorComponentProps extends GridSelectorReduxProps
{
    inputData: GridSelectorComponentOptions;
}

export interface GridSelectorComponentOptions
{
    id: string;
    backgroundColour?: string;
    imageURLs: string[];
    selection: string;
    onSelect?: (url: string) => void;
    search?: string;
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

const IconHolder = styled.div`
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
`;

const UnconnectedGridSelectorComponent: FunctionComponent<GridSelectorComponentProps>
 = (props: GridSelectorComponentProps) =>
 {
     const { updateComponent } = props;
     const { id, label, imageURLs, expanded, backgroundColour, headerColour, search, selection, onSelect } = props.inputData;

     const filter = search || '';
     const filteredUrls = imageURLs.filter((url: string) => url.includes(filter));

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
                         component: GridSelectorComponent,
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
                 <TextInputComponent
                     inputData={{
                         inputType: 'text',
                         defaultText: search,
                         callOnChange: (value: string) =>
                         {
                             updateComponent({
                                 // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                 // @ts-ignore - type mismatch
                                 // eslint-disable-next-line no-use-before-define
                                 component: GridSelectorComponent,
                                 id,
                                 inputData: {
                                     ...props.inputData,
                                     search: value,
                                 },
                             });
                         },
                     }}
                 />
                 <IconHolder>
                     {
                         filteredUrls.map((url, index) =>
                             (
                                 <GridIcon
                                     key={index}
                                     url={url}
                                     width={'33%'}
                                     height={''}
                                     active={selection === url}
                                     onClick={() =>
                                     {
                                         updateComponent({
                                         // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                         // @ts-ignore - type mismatch
                                         // eslint-disable-next-line no-use-before-define
                                             component: GridSelectorComponent,
                                             id,
                                             inputData: {
                                                 ...props.inputData,
                                                 selection: url,
                                             },
                                         });

                                         onSelect && onSelect(url);
                                     }}
                                 />
                             ))
                     }
                 </IconHolder>
             </Content>
         </Container>
     );
 };

export const GridSelectorComponent = connector(UnconnectedGridSelectorComponent);
