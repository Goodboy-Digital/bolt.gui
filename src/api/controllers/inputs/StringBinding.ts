import { BaseInputOptions, InputBinding } from './InputBinding';
import { ComponentPair, TextInputComponentData } from '../../../components';

export interface StringBindingOptions extends BaseInputOptions
{
    onChange?: (value: string)=> void;
    onFinish?: (value: string)=> void;

}

export class StringBinding<T> extends InputBinding<T, StringBindingOptions>
{
    public onChangeCallback: (value: string)=> void;
    public onFinishCallback: (value: string)=> void;

    static test<T>(object: T, property: keyof T): boolean
    {
        return Object.prototype.toString.call(object[property]) === '[object String]';
    }

    constructor(object: T, property: keyof T, options?: StringBindingOptions)
    {
        super(object, property, options);
    }

    _getData(): ComponentPair<TextInputComponentData>
    {
        return {
            component: this._view,
            inputData: {
                inputType: 'text',
                callOnChange: this.onChange.bind(this),
                callOnInputCapture: this.onChange.bind(this),
                callOnBlur: this.onBlur.bind(this),
                callOnSubmit: this.onFinish.bind(this),
            },
        } as ComponentPair<TextInputComponentData>;
    }

    onChange(value: string): void
    {
        this.setValue(value);
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
