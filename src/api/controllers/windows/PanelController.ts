import { BaseController, BaseControllerOptions, BaseEvents } from '../BaseController';
import { ComponentController, ComponentControllerOptions } from './ComponentController';

import { PanelData } from './../../../components/panels/ContentPanel';
import { WindowController } from './WindowController';
import { removeItem } from '../../../utils';

export interface PanelControllerOptions extends BaseControllerOptions
{
    parent: WindowController;
}

export interface PanelEvents extends BaseEvents
{
    removed: ()=> void;
    added: ()=> void;
}

export class PanelController extends BaseController<PanelEvents>
{
    public window: WindowController;
    protected _groups: ComponentController[] = [];

    /**
     * Is the panel currently visible.
     * This is determined by its window
     */
    protected _visible: boolean;

    public dirty = false;

    constructor(options: PanelControllerOptions)
    {
        super(options);
        this._add(options.parent);
    }

    _getData(): PanelData
    {
        return {
            title: this._style?.title || 'D',
            id: this._style?.id,
            elements: this._groups.map((value) => value._getData()),
        };
    }

    /**
     * @internal
     */
    _add(parent: WindowController): void
    {
        this.window = parent;
        this.window._addPanel(this);
        this.emit('added');
        this.dirty = true;
    }

    /**
     * @internal
     */
    _remove(): void
    {
        this.window._removePanel(this);
        this.window = null;
        this.emit('removed');
        this.dirty = true;
    }

    /**
     * @internal
     */
    _dispose(): void
    {
        // TODO: maybe call a dispose on the bindings?
        this._groups = [];

        // then remove yourself from the window
        this._remove();
    }

    public addInput<T, O>(object: T, key: keyof T, options?: O, rowOptions?: ComponentControllerOptions): ComponentController
    {
        const row = new ComponentController(rowOptions);

        row.addInput<T>([
            [{ key, object, options }],
        ]);

        this._groups.push(row);

        this.dirty = true;

        return row;
    }

    public removeInput(componentController: ComponentController): void
    {
        if (!this._groups.includes(componentController))
        {
            throw new Error('[ComponentController] cannot remove input that doesn\'t exist');
        }

        this._groups = removeItem(this._groups, componentController);

        this.dirty = true;
    }

    // public addInputGroup<T>(test: InputBindingObject<T, BaseInputOptions>[][], options: ComponentControllerOptions): string
    // {
    //     console.log(test);
    //     console.log(options);

    //     return '';
    // }

    /* eslint-disable @typescript-eslint/no-empty-function, no-empty-function */
    public addButton():void {}
    public addTab():void {}
    public addFolder():void {}
    public addSeparator():void {}
    /* eslint-enable */
}
