import React, { FunctionComponent } from 'react';

import styled from 'styled-components';

export interface ButtonInputComponentProps {
    inputData: {
        label?: string;
        labelColour?: string;
        labelFontSize?: string;

        imgSrc?: string;
        imgAlt?: string;

        buttonText?: string;
        buttonTextColour?: string;
        buttonFontSize?: string;
        inputHeight?: string;
        inputWidth?: string;
        inputBackgroundColour?: string;

        disabled?: boolean;
        callOnClick?: (value: any) => any;
    }
}

interface LabelStyleOptions {
    labelColour?: string;
    labelFontSize?: string;
}

interface ButtonOptions {
    imgSrc?: string;
    buttonTextColour?: string;
    buttonFontSize?: string;
    inputHeight?: string;
    inputWidth?: string;
    inputBackgroundColour?: string;
}

const Container = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`

const DisabledButton = styled.div<ButtonOptions>`
    background-color: ${(props: ButtonOptions): string => (props.inputBackgroundColour ? props.inputBackgroundColour : 'white')};
    font-family: Roboto;
    padding: 0;
    margin-bottom: 3px;
    border-radius: 3px;
    text-align: center;
    color: ${(props: ButtonOptions): string => (props.buttonTextColour ? props.buttonTextColour : 'black')};
    font-size: ${(props: ButtonOptions): string => (props.buttonFontSize ? props.buttonFontSize : '16px')};
    opacity: 0.6;
    height: ${(props: ButtonOptions): string => (props.inputHeight ? props.inputHeight : '20px')};
    width: ${(props: ButtonOptions): string => (props.inputWidth ? props.inputWidth : '100%')};
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
`

const Button = styled(DisabledButton)`
    &:hover {
        opacity: 0.9;
    }

    &:active {
        opacity: 1;
    }
`

const Image = styled.img<ButtonOptions>`
    height: 90%;
    border-radius: 3px;
`

const LabelText = styled.p<LabelStyleOptions>`
    margin: 0;
    padding: 0;
    color: ${(props: LabelStyleOptions): string => (props.labelColour ? props.labelColour : 'white')};
    font-family: Roboto;
    opacity: 0.8;
    font-size: ${(props: LabelStyleOptions): string => (props.labelFontSize ? props.labelFontSize : '16px')};
    text-align: center;
`

export const ButtonInputComponent: FunctionComponent<ButtonInputComponentProps> = (props: ButtonInputComponentProps) =>{
    const data = props.inputData;

    const onClick = data.callOnClick ? data.callOnClick : () => {};
    return (
        <Container>
            {
                data.label && <LabelText
                    labelColour={data.labelColour}
                    labelFontSize={data.labelFontSize}
                >
                    {data.label}
                </LabelText>
            }
            {!data.disabled && <Button 
                onClick={(e) => onClick(e) }            
                buttonTextColour={data.buttonTextColour}
                buttonFontSize={data.buttonFontSize}
                inputHeight={data.inputHeight}
                inputWidth={data.inputWidth}
                inputBackgroundColour={data.inputBackgroundColour}
            >
                {!data.imgSrc && data.buttonText}
                {data.imgSrc && <Image src={data.imgSrc} alt={data.imgAlt} />}
            </Button>}             
            {data.disabled && <DisabledButton            
                buttonTextColour={data.buttonTextColour}
                buttonFontSize={data.buttonFontSize}
                inputHeight={data.inputHeight}
                inputWidth={data.inputWidth}
                inputBackgroundColour={data.inputBackgroundColour}
            >
                {!data.imgSrc && data.buttonText}
                {data.imgSrc && <Image src={data.imgSrc} alt={data.imgAlt} />}
            </DisabledButton>}             
        </Container>
    );
}

