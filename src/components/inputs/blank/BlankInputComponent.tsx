import React, { FunctionComponent } from 'react';

import styled from 'styled-components';

export interface BlankInputComponentProps {
    inputData: {}
}

const Container = styled.div`
    width: 100%;
    height: 100%;
`


export const BlankInputComponent: FunctionComponent<BlankInputComponentProps> = () =>
(
    <Container />           
);


