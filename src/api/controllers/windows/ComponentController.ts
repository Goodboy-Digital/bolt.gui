import { ComponentPair, ElementData } from '../../../components';
import { InputBinding, InputBindingObject } from '../inputs/InputBinding';

import { BoltClass } from '../../Bolt';
import { removeItem } from '../../../utils';

export interface ComponentControllerOptions
{
    label?: string;
    labelColour?: string;
    labelFont?: string;
}

export class ComponentController
{
    private _bindings: InputBinding[][] = [];
    private _options: ComponentControllerOptions;

    constructor(options?: ComponentControllerOptions)
    {
        this._options = options;

        console.warn(this._options);
    }

    _getData(): ElementData
    {
        const rows: {components: ComponentPair[]}[] = [];

        this._bindings.forEach((value) =>
        {
            const components: ComponentPair[] = [];

            value.forEach((t) =>
            {
                components.push(t._getData());
            });

            rows.push({
                components,
            });
        });

        return {
            label: this._options?.label,
            labelColour: this._options?.labelColour,
            labelFont: this._options?.labelFont,
            rows,
        };
    }

    addInput<T>(data: InputBindingObject<T>[][]): void
    {
        data.forEach((item) =>
        {
            const arrBindings: InputBinding[] = [];

            item.forEach((element) =>
            {
                const { object, key, options } = element;

                const bindingTests = BoltClass['_bindingTests'];

                for (let i = 0; i < bindingTests.length; i++)
                {
                    const BindingClass = bindingTests[i];

                    if (BindingClass.test(object, key))
                    {
                        const binding = new BindingClass(object, key, options);

                        arrBindings.push(binding);
                        break;
                    }
                }
            });

            this._bindings.push(arrBindings);
        });
    }

    removeInput(binding: InputBinding): void
    {
        for (let i = 0; i < this._bindings.length; i++)
        {
            let row = this._bindings[i];

            for (let j = 0; j < row.length; j++)
            {
                const temp = row[j];

                if (temp === binding)
                {
                    if (row.length === 1)
                    {
                        this._bindings = removeItem(this._bindings, row);
                        row = null;
                    }
                    else
                    {
                        row = removeItem(row, temp);
                    }

                    return;
                }
            }
        }

        throw new Error('[ComponentController] cannot remove input that doesn\'t exist');
    }

    getBinding<T>(obj:T, key: keyof T): InputBinding
    {
        for (let i = 0; i < this._bindings.length; i++)
        {
            const row = this._bindings[i];

            for (let j = 0; j < row.length; j++)
            {
                const binding = row[j];

                if (binding['_object'] === obj && binding['_property'] === key)
                {
                    return binding;
                }
            }
        }

        throw new Error('[ComponentController] cannot find binding');
    }
}
