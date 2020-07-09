import { ButtonInputComponent, ButtonInputComponentData } from './../../../components/inputs/button/ButtonInputComponent';

import { ComponentPair } from '../../../components';
import { InputBinding } from './InputBinding';
import { NOOP } from '../../../utils';

export interface FunctionBindingOptions
{
    label?: string;
    onClick: (object: any) => void;
}

export class FunctionBinding<T> extends InputBinding<T, FunctionBindingOptions>
{
    static test<T>(object: T, property: keyof T): boolean
    {
        return object[property] instanceof Function;
    }

    onClick: (object: any)=> void;

    constructor(object: T, property: keyof T, options?: FunctionBindingOptions)
    {
        super(object, property, options);
        this.onClick = this._options.onClick || NOOP;
    }

    _getData(): ComponentPair<ButtonInputComponentData>
    {
        return {
            component: this._view || ButtonInputComponent,
            inputData: {
                callOnClick: this.fire.bind(this),
            },
        } as ComponentPair<ButtonInputComponentData>;
    }

    fire(): void
    {
        this.getValue().call(this._object);
        if (this.onClick)
        {
            this.onClick(this.getValue());
        }
    }
}
