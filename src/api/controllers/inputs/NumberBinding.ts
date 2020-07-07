import { BaseInputOptions, InputBinding } from './InputBinding';

export interface NumberBindingOptions extends BaseInputOptions
{
    onChange?: (value: number)=> void;
    onFinish?: (value: number)=> void;
}

export class NumberBinding<T> extends InputBinding<T, NumberBindingOptions>
{
    public onChangeCallback: (value: number)=> void;
    public onFinishCallback: (value: number)=> void;

    static test<T>(object: T, property: keyof T): boolean
    {
        return Number.isFinite(object[property]);
    }

    constructor(object: T, property: keyof T, options?: NumberBindingOptions)
    {
        super(object, property, options);
    }
}
