import { BaseInputOptions, InputBinding } from './InputBinding';

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
}
