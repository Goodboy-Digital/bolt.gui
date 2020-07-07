import { BaseInputOptions, InputBinding } from './InputBinding';
import { ComponentPair, TextInputComponentData } from '../../../components';

export interface NumberBindingOptions extends BaseInputOptions
{
    onChange?: (value: number)=> any;
    onFinish?: (value: number)=> any;
}

export class NumberBinding<T> extends InputBinding<T, NumberBindingOptions>
{
    public onChangeCallback: (value: number)=> any;
    public onFinishCallback: (value: number)=> any;

    static test<T>(object: T, property: keyof T): boolean
    {
        return Number.isFinite(object[property]);
    }

    constructor(object: T, property: keyof T, options?: NumberBindingOptions)
    {
        super(object, property, options);
    }

    _getData(): ComponentPair<TextInputComponentData>
    {
        return {
            component: this._view,
            inputData: {
                inputType: 'number',
                callOnChange: this.onChange.bind(this),
                callOnInputCapture: this.onChange.bind(this),
                callOnBlur: this.onBlur.bind(this),
                callOnSubmit: this.onFinish.bind(this),
            },
        } as ComponentPair<TextInputComponentData>;
    }

    onChange(value: string): void
    {
        const attempted = parseFloat(value);

        if (!isNaN(attempted))
        {
            this.setValue(attempted);
        }
    }

    onFinish(): void
    {
        if (this.onFinishCallback)
        {
            this.onFinishCallback(this.getValue());
        }
    }

    onBlur(): void
    {
        this.onFinish();
    }
}
