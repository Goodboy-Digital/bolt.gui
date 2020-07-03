import { BaseController, BaseEvents } from './BaseController';

import { WindowController } from './WindowController';

export interface PanelControllerOptions
{
    parent: WindowController;
    style?: any;
    view?: any;
}

export interface PanelEvents extends BaseEvents
{
    removed: ()=> void;
    added: ()=> void;
}

export class PanelController extends BaseController<PanelEvents>
{
    public window: WindowController;
    protected _components: any[] = [];

    /**
     * Is the panel currently visible.
     * This is determined by its window
     */
    protected _visible: boolean;

    constructor(options: PanelControllerOptions)
    {
        super(options.style, options.view);
        this._add(options.parent);
    }

    _add(parent: WindowController): void
    {
        this.window = parent;
        this.window._addPanel(this);
        this.emit('added');
    }

    _remove(): void
    {
        this.window._removePanel(this);
        this.window = null;
        this.emit('removed');
    }

    _dispose(): void
    {
        // TODO: remove all of the components

        // then remove yourself from the window
        this._remove();
    }

    /* eslint-disable @typescript-eslint/no-empty-function, no-empty-function */
    addInput():void {}
    addButton():void {}
    addTab():void {}
    addFolder():void {}
    addSeparator():void {}
    /* eslint-enable */
}
