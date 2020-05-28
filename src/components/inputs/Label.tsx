import React, { FunctionComponent } from 'react';

import styled from 'styled-components';

export interface LabelProps {
    inputData: {
        label: string;
        labelColour?: string;
        labelFontSize?: string;
    }
}

const Container = styled.div`
    color: ${(props: LabelProps): string => (props.inputData.labelColour ? props.inputData.labelColour : 'white')};
    font-family: Roboto;
    opacity: 0.8;
    font-size: ${(props: LabelProps): string => (props.inputData.labelFontSize ? props.inputData.labelFontSize : '16px')};
`

export const Label: FunctionComponent<LabelProps> = (props: LabelProps) =>
(
    <Container inputData={props.inputData}>
        {props.inputData.label}
    </Container>
);
