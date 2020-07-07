import { BaseInputOptions, InputBinding } from './InputBinding';

export interface FunctionBindingOptions extends BaseInputOptions
{
    onClick: (...params: any[]) => void;
}

export class FunctionBinding<T> extends InputBinding<T, FunctionBindingOptions>
{
    static test<T>(object: T, property: keyof T): boolean
    {
        return object[property] instanceof Function;
    }

    constructor(object: T, property: keyof T, options?: FunctionBindingOptions)
    {
        super(object, property, options);
    }
}
