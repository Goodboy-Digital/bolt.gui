import { BaseController, BaseControllerOptions } from '../BaseController';

import { ComponentPair } from '../../../components';

export interface BaseInputOptions extends BaseControllerOptions
{
    label?: string;
    onChange?: (...params: any[])=> void;
    onFinish?: (...params: any[])=> void;
}

export type BooleanInputOptions = BaseInputOptions;

export type StringInputOptions = BaseInputOptions;
export type FunctionInputOptions = BaseInputOptions;

export type InputOptions = '';

export interface InputBindingConstructor<T = any, O= any>
{
    new (object: T, property: keyof T, options?: O): InputBinding;
    test<T>(object: T, property: keyof T): boolean;
}

export interface InputBindingObject<T, O = any>
{
    key: keyof T;
    object: T;
    options: O;
}

export abstract class InputBinding<T = any, O extends BaseInputOptions = BaseInputOptions> extends BaseController
{
    protected _view: any;
    protected _style: any;
    protected _options: O;

    protected _object: T;
    protected _property: keyof T;
    protected _initialValue: T[keyof T];

    public onChangeCallback: (...params: any[])=> void;
    public onFinishCallback: (...params: any[])=> void;

    constructor(object: T, property: keyof T, options: BaseInputOptions)
    {
        super(options);
        this._object = object;
        this._property = property;
        this._options = options as O;

        this.onChangeCallback = options?.onChange || null;
        this.onFinishCallback = options?.onFinish || null;
    }

    abstract _getData(): ComponentPair;

    setValue(newValue: string|number|any): this
    {
        this._object[this._property] = newValue;

        if (this.onChangeCallback)
        {
            this.onChangeCallback(newValue);
        }

        // this.updateDisplay();

        return this;
    }

    getValue(): any
    {
        return this._object[this._property];
    }

    get isModified(): boolean
    {
        return this._initialValue !== this.getValue();
    }
}
