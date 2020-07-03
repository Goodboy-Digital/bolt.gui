import React, { Component } from 'react';

import styled from 'styled-components';
import { TextInputComponent } from '../index' 

export interface RangeInputComponentProps
{
    inputData: {
        label?: string;
        labelColour?: string;
        labelFontSize?: string;

        min: number;
        max: number;
        step?: number;
        value?: number;

        inputHeight?: string;
        inputWidth?: string;
        
        trackHeight?: string;
        trackColour?: string;
        trackFillColour?: string;

        thumbHeight?: string;
        thumbWidth?: string;
        thumbColour?: string;
        thumbHoverColour?: string;

        textInputWidth?: string;

        disabled?: boolean;
        callOnChange?: (value: any) => any;
    };
}

interface RangeState 
{
    currentValue: number;
    textValue: number;
}

interface LabelStyleOptions
{
    labelColour?: string;
    labelFontSize?: string;
}

interface RangeOptions
{
    inputHeight?: string;
    inputWidth?: string;

    trackHeight?: string;
    trackColour?: string;
    trackFillColour?: string;

    thumbHeight?: string;
    thumbWidth?: string;
    thumbColour: string;
    thumbHoverColour: string;

    disabled?: boolean;
}

interface ContainerOptions 
{
    inputWidth?: string;
}

interface TextContainerOptions 
{
    textInputWidth?: string;
}

const Container = styled.div<ContainerOptions>`
    width: ${(props: ContainerOptions): string => (props.inputWidth ? props.inputWidth : '97.5%')};
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const RangeContainer = styled.div`
    width: 98%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const TextContainer = styled.div<TextContainerOptions>`
    width: ${(props: TextContainerOptions): string => (props.textInputWidth ? props.textInputWidth : '50px')};
`

const InlineContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
`

const LabelText = styled.p<LabelStyleOptions>`
    margin: 0;
    padding: 0;
    color: ${(props: LabelStyleOptions): string => (props.labelColour ? props.labelColour : 'white')};
    font-family: Roboto, sans-serif;
    opacity: 0.8;
    font-size: ${(props: LabelStyleOptions): string => (props.labelFontSize ? props.labelFontSize : '11px')};
    text-align: center;
`;

const RangeInput = styled.input<RangeOptions>`
    width: 100%;
    overflow: visible;
    display: block;
    appearance: none;
    width: 100%;
    margin: 0;
    height: ${(props: RangeOptions): string => (props.inputHeight ? props.inputHeight : '70%')};
    cursor: pointer;
    background-color: transparent;

    &:focus {
        outline: none;
    }

    &::-webkit-slider-runnable-track {
        width: 100%;
        height: ${(props: RangeOptions): string => (props.trackHeight ? props.trackHeight : '5px')};
        background: ${(props: RangeOptions): string => (props.trackColour ? props.trackColour : '#707070')};
    }

    &::-webkit-slider-thumb {
        position: relative;
        appearance: none;
        height: ${(props: RangeOptions): string => (props.thumbHeight ? props.thumbHeight : '20px')};
        width: ${(props: RangeOptions): string => (props.thumbWidth ? props.thumbWidth : '20px')};
        background: ${(props: RangeOptions): string => (props.thumbColour)};
        border-radius: 3px;
        border: 0;
        top: 50%;
        transform: translateY(-50%);
        transition: background-color 150ms;
    }

    &::-moz-range-track,
    &::-moz-range-progress {
        width: 100%;
        height: ${(props: RangeOptions): string => (props.inputHeight ? props.inputHeight : '70%')};
        background: ${(props: RangeOptions): string => (props.trackFillColour ? props.trackFillColour : '#707070')};
    }

    &::-moz-range-progress {
        background: ${(props: RangeOptions): string => (props.trackFillColour ? props.trackFillColour : '#707070')};
    }

    &::-moz-range-thumb {
        appearance: none;
        margin: 0;
        height: ${(props: RangeOptions): string => (props.thumbHeight ? props.thumbHeight : '20px')};
        width: 100;
        background: ${(props: RangeOptions): string => (props.thumbColour)};
        border-radius: 100%;
        border: 0;
        transition: background-color 150ms;
    }

    &::-ms-track {
        width: 100%;
        height: ${(props: RangeOptions): string => (props.inputHeight ? props.inputHeight : '70%')};
        border: 0;
        /* color needed to hide track marks */
        color: transparent;
        background: transparent;
    }

    &::-ms-fill-lower {
        background: #707070;
    }

    &::-ms-fill-upper {
        background: #707070;
    }

    &::-ms-thumb {
        appearance: none;
        height: ${(props: RangeOptions): string => (props.thumbHeight ? props.thumbHeight : '20px')};
        width: ${(props: RangeOptions): string => (props.thumbHeight ? props.thumbHeight : '20px')};
        background: ${(props: RangeOptions): string => (props.thumbColour)};
        border-radius: 100%;
        border: 0;
        transition: background-color 150ms;
        top: 0;
        margin: 0;
        box-shadow: none;
    }
    
    &:hover,
    &:focus {
        &::-webkit-slider-thumb {
        background-color: ${(props: RangeOptions): string => (props.thumbHoverColour)};
        }
        &::-moz-range-thumb {
        background-color: ${(props: RangeOptions): string => (props.thumbHoverColour)};
        }
        &::-ms-thumb {
        background-color: ${(props: RangeOptions): string => (props.thumbHoverColour)};
        }
    }
`

export class RangeInputComponent extends Component<RangeInputComponentProps, RangeState>
{
    textComponentActive = false;
    
    constructor(props: RangeInputComponentProps)
    {
        super(props);

        const inputValue = props.inputData?.value || props.inputData.min;

        this.state = {
            currentValue: inputValue,
            textValue: inputValue,
        };
    }

    private sliderValueChanged(value: number): void
    {
        this.setState({ 
            currentValue: value, 
            textValue: value 
        });

        this.props.inputData.callOnChange && this.props.inputData.callOnChange(value);
    }

    private textValueChanged(value: string): void
    {
        this.setState({ textValue: Number(value) });
    }

    private textValueConfirmed(value: string): void
    {
        const numVal = Number(value);

        if (numVal === NaN) return;

        let validatedValue = numVal;

        if (numVal < this.props.inputData.min) validatedValue = this.props.inputData.min;
        if (numVal > this.props.inputData.max) validatedValue = this.props.inputData.max;

        this.setState({ 
            currentValue: validatedValue, 
            textValue: validatedValue 
        });

        this.props.inputData.callOnChange && this.props.inputData.callOnChange(validatedValue);
    }

    render() 
    {
        const data = this.props.inputData;
        let thumbColour = data.thumbColour ? data.thumbColour : '#AEB2B8';
        let thumbHoverColour = data.thumbHoverColour ? data.thumbHoverColour : '#8f9296';
        if (data.disabled) 
        {
            thumbColour = '#8f9296';
            thumbHoverColour = '#8f9296';
        }

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
                <InlineContainer>
                    <RangeContainer>
                        <RangeInput 
                            type={'range'}
                            onChange={(e) => this.sliderValueChanged(Number(e.target.value))}
                            min={data.min}
                            max={data.max}
                            step={data.step || 1}
                            value={this.state.currentValue}
                            inputHeight={data.inputHeight}
                            inputWidth={data.inputWidth}
                            trackHeight={data.trackHeight}
                            trackColour={data.trackColour}
                            trackFillColour={data.trackFillColour}
                            thumbHeight={data.thumbHeight}
                            thumbWidth={data.thumbWidth}
                            thumbColour={thumbColour}
                            thumbHoverColour={thumbHoverColour}
                            disabled={data.disabled}
                        />
                    </RangeContainer>
                    <TextContainer textInputWidth={data.textInputWidth}>
                        <TextInputComponent inputData={{ 
                            inputType: 'number', 
                            callOnChange: (value) => this.textValueChanged(value), 
                            callOnInputCapture: (value) => this.textValueConfirmed(value), 
                            callOnBlur: (value) => this.textValueConfirmed(value),
                            callOnSubmit: (value) => this.textValueConfirmed(value),
                            inputWidth: '100%',
                            inputValue: this.state.textValue.toString(),
                            step: data.step,
                            disabled: data.disabled
                        }}/>
                    </TextContainer>
                </InlineContainer>
            </Container>
        );
    };
}


