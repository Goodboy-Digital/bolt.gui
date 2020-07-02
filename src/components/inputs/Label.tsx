import React, { FunctionComponent } from 'react';

import styled from 'styled-components';

export interface LabelProps
{
    inputData: LabelOptions;
}

interface LabelOptions
{
    label?: string;
    labelColour?: string;
    labelFontSize?: string;
    textAlign?: string;
}

const Container = styled.div<LabelOptions>`
    width: 100%;
    color: ${(props: LabelOptions): string => (props.labelColour ? props.labelColour : 'white')};
    font-family: Roboto, sans-serif;
    opacity: 0.8;
    font-size: ${(props: LabelOptions): string => (props.labelFontSize ? props.labelFontSize : '11px')};
    text-align: ${(props: LabelOptions): string => (props.textAlign ? props.textAlign : 'left')};
`;

export const Label: FunctionComponent<LabelProps> = (props: LabelProps) =>
    (
        <Container
            labelColour={props.inputData.labelColour}
            labelFontSize={props.inputData.labelFontSize}
            textAlign={props.inputData.textAlign}
        >
            {props.inputData.label}
        </Container>
    );
