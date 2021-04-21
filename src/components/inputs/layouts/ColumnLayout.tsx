import React, { FunctionComponent } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import styled from 'styled-components';
import { ApplicationStore } from '../../../types';
import { getComponentsByIds } from '../../../redux';

const mapStateToProps = (store: ApplicationStore) => ({ store });
const mapDispatch = { getComponentsByIds };
const connector = connect(mapStateToProps, mapDispatch);

type ColumnLayoutReduxProps = ConnectedProps<typeof connector>;
export interface ColumnLayoutProps extends ColumnLayoutReduxProps
{
    inputData: {
        label?: string;
        labelColour?: string;
        labelFontSize?: string;
        leftColumnWidth?: string;
        rightColumnWidth?: string;
        childIDs: string[];
    };
}

interface LabelProps
{
    labelColour?: string;
    labelFontSize?: string;
}

const Container = styled.div`
    width: 98%;
    display: flex;
    flex-direction: row;
    padding: 2px 1%;
`;

const Column = styled.div<{width: string}>`
    width: ${(props: {width: string}): string => (props.width ? props.width : '100%')};
    margin: 0;
    padding: 0;
    display: flex;
    align-items: center;
`;

const LabelText = styled.p<LabelProps>`
    margin: 0;
    padding: 0;
    color: ${(props: LabelProps): string => (props.labelColour ? props.labelColour : 'white')};
    font-family: Roboto, sans-serif;
    opacity: 0.8;
    font-size: ${(props: LabelProps): string => (props.labelFontSize ? props.labelFontSize : '11px')};
`;

const UnconnectedColumnLayout: FunctionComponent<ColumnLayoutProps> = (props: ColumnLayoutProps) =>
{
    const { getComponentsByIds, store } = props;
    const { childIDs, leftColumnWidth, rightColumnWidth, label } = props.inputData;
    const childComponents = getComponentsByIds(store, childIDs).payload || [];
    const leftColWidth = leftColumnWidth ? leftColumnWidth : '30%';
    let rightColWidth = label ? '70%' : '100%';

    if (rightColumnWidth)
    {
        rightColWidth = rightColumnWidth;
    }

    return (
        <Container>
            {
                label
                && <Column width={leftColWidth}>
                    <LabelText>{label}</LabelText>
                </Column>
            }
            <Column width={rightColWidth}>
                {
                    childComponents.map((pair) =>
                        (
                            <pair.component key={pair.id} inputData={pair.inputData}/>
                        ))
                }
            </Column>
        </Container>
    );
};

export const ColumnLayout = connector(UnconnectedColumnLayout);
