import { EventEmitter } from 'eventemitter3';

export interface BaseEvents
{
    hidden: ()=> void;
    shown: ()=> void;
    opened: ()=> void;
    closed: ()=> void;
}

export interface BaseControllerOptions
{
    style?: any;
    view?: any;
}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export abstract class BaseController<EVENTS extends BaseEvents = BaseEvents> extends EventEmitter<EVENTS>
{
    protected _style: any;
    protected _view: any;

    constructor(options: BaseControllerOptions = {})
    {
        super();
        this._style = options.style;
        this._view = options.view;
    }

    public setView(): void
    {
        //
    }

    public setStyle(): void
    {
        //
    }
}
