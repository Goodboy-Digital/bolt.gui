import { BaseController, BaseControllerOptions, BaseEvents } from '../BaseController';

import { PanelController } from './PanelController';
import { removeItem } from '../../../utils';

export interface WindowEvents extends BaseEvents
{
    panelAdded: (panel: PanelController)=>void;
    panelRemoved: (panel: PanelController)=>void;
}

export interface WindowControllerOptions extends BaseControllerOptions
{
    hidden?: false;
}

/**
 * A window will render any panels it currently is storing
 * A window could have 0 panels. However its position will be saved.
 */
export class WindowController extends BaseController<WindowEvents>
{
    public children: PanelController[] = [];
    public hidden: boolean;
    protected _activeIndex = 0;

    constructor(options: WindowControllerOptions = {})
    {
        super(options);
        this.hidden = options.hidden;
    }

    /**
     * @internal
     * Adds a panel to the windows children
     * @param panel - panel to add
     */
    _addPanel(panel: PanelController): void
    {
        this.children.push(panel);
        this.emit('panelAdded', panel);
    }

    /**
     * @internal
     * Removes a panel from the windows children
     * @param panel - panel to remove
     */
    _removePanel(panel: PanelController): void
    {
        this.children = removeItem(this.children, panel);
        this.emit('panelRemoved', panel);
    }

    /**
     * @internal
     */
    _removeAll(): void
    {
        for (let i = this.children.length - 1; i >= 0; i--)
        {
            this._removePanel(this.children[i]);
        }
    }

    public show(): void
    {
        this.hidden = false;
    }

    public hide(): void
    {
        this.hidden = true;
    }
}
