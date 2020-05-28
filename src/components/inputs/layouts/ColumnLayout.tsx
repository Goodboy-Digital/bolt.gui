import React, { FunctionComponent } from 'react';

import styled from 'styled-components';

export interface ColumnLayoutProps {
    label?: string;
    labelColour?: string;
    labelFontSize?: string;
    leftColumnWidth?: string;
    rightColumnWidth?: string;
}

interface LabelProps {
    labelColour?: string;
    labelFontSize?: string;
}

const Container = styled.div`
    width: 98%;
    display: flex;
    flex-direction: row;
    padding: 2px 1%;
`

const Column = styled.div<{width: string}>`
    width: ${(props: {width: string}): string => (props.width ? props.width : '100%')};
    margin: 0;
    padding: 0;
    display: flex;
    align-items: center;
`

const LabelText = styled.p<LabelProps>`
    color: ${(props: LabelProps): string => (props.labelColour ? props.labelColour : 'white')};
    font-family: Roboto;
    opacity: 0.8;
    font-size: ${(props: LabelProps): string => (props.labelFontSize ? props.labelFontSize : '16px')};
`

export const ColumnLayout: FunctionComponent<ColumnLayoutProps> = (props: ColumnLayoutProps) => {
    const leftColWidth = props.leftColumnWidth ? props.leftColumnWidth : '30%';
    let rightColWidth = props.label ? '70%' : '100%';

    if (props.rightColumnWidth) {
        rightColWidth = props.rightColumnWidth;
    }

    return (
        <Container>
            {
                props.label &&
                <Column width={leftColWidth}>
                    <LabelText>{props.label}</LabelText>
                </Column>
            }
            <Column width={rightColWidth}>
                {
                    // @ts-ignore: prop type missing
                    props.children
                }
            </Column>
        </Container>
    );
}

