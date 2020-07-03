import { EventEmitter } from 'eventemitter3';

export interface BaseEvents
{
    hidden: ()=> void;
    shown: ()=> void;
    opened: ()=> void;
    closed: ()=> void;
}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export abstract class BaseController<EVENTS extends BaseEvents = BaseEvents> extends EventEmitter<EVENTS>
{
    protected _style: any;
    protected _view: any;

    constructor(style?: any[], view?: any[])
    {
        super();
        this._style = style;
        this._view = view;
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
