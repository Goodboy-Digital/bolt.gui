import React, { FunctionComponent } from 'react';

import styled from 'styled-components';

export interface TextInputComponentProps
{
    inputData: {
        label?: string;
        labelColour?: string;
        labelFontSize?: string;
        defaultText?: string;
        inputHeight?: string;
        inputWidth?: string;
        inputType?: 'text' | 'password' |'textarea' | 'number';
        inputBackgroundColour?: string;
        inputTextColour?: string;
        inputTextSize?: string;
        disabled?: boolean;
        inputValue?: string;
        step?: number;
        callOnChange?: (value: any) => any;
        callOnInputCapture?: (value: any) => any;
        callOnBlur?: (value: any) => any;
        callOnSubmit?: (value: any) => any;
    };
}

interface InputStyleOptions
{
    height?: string;
    width?: string;
    backGroundColour?: string;
    textColour?: string;
    textSize?: string;
}

interface LabelStyleOptions
{
    labelColour?: string;
    labelFontSize?: string;
}

const Container = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

const TextInput = styled.input<InputStyleOptions>`
    height: ${(props: InputStyleOptions): string => (props.height ? props.height : '18px')};
    width: ${(props: InputStyleOptions): string => (props.width ? props.width : '98%')};
    border-radius: 5px;
    opacity: 0.92;
    color: ${(props: InputStyleOptions): string => (props.textColour ? props.textColour : 'black')};
    font-size: ${(props: InputStyleOptions): string => (props.textSize ? props.textSize : '11px')};
    background-color: ${(props: InputStyleOptions): string => (props.backGroundColour ? props.backGroundColour : 'white')};
`;

const TextArea = styled.textarea<InputStyleOptions>`
    min-height: ${(props: InputStyleOptions): string => (props.height ? props.height : '18px')};
    width: ${(props: InputStyleOptions): string => (props.width ? props.width : '98%')};
    border-radius: 5px;
    resize: vertical;
    overflow: auto;
    opacity: 0.92;
    color: ${(props: InputStyleOptions): string => (props.textColour ? props.textColour : 'black')};
    font-size: ${(props: InputStyleOptions): string => (props.textSize ? props.textSize : '11px')};
    background-color: ${(props: InputStyleOptions): string => (props.backGroundColour ? props.backGroundColour : 'white')};
`;

const LabelText = styled.p<LabelStyleOptions>`
    margin: 0;
    padding: 0;
    color: ${(props: LabelStyleOptions): string => (props.labelColour ? props.labelColour : 'white')};
    font-family: Roboto, sans-serif;
    opacity: 0.8;
    font-size: ${(props: LabelStyleOptions): string => (props.labelFontSize ? props.labelFontSize : '11px')};
    text-align: center;
`;

export const TextInputComponent: FunctionComponent<TextInputComponentProps> = (props: TextInputComponentProps) =>
{
    const data = props.inputData;
    let isTextOrPassword;

    if (!data.inputType) isTextOrPassword = 'text';
    if (data.inputType === 'text' || data.inputType === 'password' || data.inputType === 'number')
    {
        isTextOrPassword = data.inputType;
    }

    const onChange = data.callOnChange ? data.callOnChange : () => { /** */ };
    const onInput = data.callOnInputCapture ? data.callOnInputCapture : () => { /** */ };
    const onBlur = data.callOnBlur ? data.callOnBlur : () => { /** */ };
    const onSubmit = data.callOnSubmit ? data.callOnSubmit : () => { /** */ };

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
            {
                (isTextOrPassword && <TextInput
                    textColour={data.inputTextColour}
                    textSize={data.inputTextSize}
                    backGroundColour={data.inputBackgroundColour}
                    disabled={data.disabled}
                    type={isTextOrPassword}
                    defaultValue={data.defaultText}
                    height={data.inputHeight}
                    width={data.inputWidth}
                    value={data.inputValue}
                    onChange={(e) => onChange(e.target.value)}
                    step={data.step || 1}
                    onInput={(e) => onInput(e.target.value)}
                    onBlur={(e) => onBlur(e.target.value)}
                    onSubmit={(e) => onBlur(e.target.value)}
                />)}
            {
                (data.inputType && data.inputType === 'textarea') && <TextArea
                    textColour={data.inputTextColour}
                    textSize={data.inputTextSize}
                    backGroundColour={data.inputBackgroundColour}
                    disabled={data.disabled}
                    defaultValue={data.defaultText}
                    height={data.inputHeight}
                    width={data.inputWidth}
                    value={data.inputValue}
                    onChange={(e) => onChange(e.target.value)}
                    onInput={(e) => onInput(e.target.value)}
                    onBlur={(e) => onBlur(e.target.value)}
                    onSubmit={(e) => onSubmit(e.target.value)}
                />}
        </Container>
    );
};

