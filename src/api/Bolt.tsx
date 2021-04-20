import {
    InputBindingConstructor,
    NumberBinding,
} from './controllers';

import React from 'react';
import { render } from 'react-dom';
import BoltGUI from '../components/BoltGUI';
import { ProviderWrapperComponent } from '../components/ProviderWrapperComponent';
import { ComponentPair, PanelData, WindowData } from '../types';
import store from '../redux/store';
import {
    addPanel,
    clearPanel,
    setActivePanel,
    addWindow,
    addComponent,
    removeComponent,
    updateComponent,
} from '../redux';
import { defaultAttributes } from '../components/Themeable';
import { ButtonInputComponent, Label } from '..';

export class BoltClass
{
    protected static _bindingTests: InputBindingConstructor[];
    protected _defaultWindow: WindowData;

    constructor(options: Partial<WindowData> = {})
    {
        const data = { ...defaultAttributes.window, ...options };

        this._defaultWindow = this.createWindow(data);

        BoltClass._bindingTests = [];
        this.addTest(NumberBinding);
    }

    public init(): void
    {
        let element = document.getElementById('editor-holder');

        if (!element)
        {
            element = document.createElement('div');
            element.id = 'editor-holder';
            document.body.appendChild(element);
        }

        render(
            <ProviderWrapperComponent>
                <BoltGUI/>
            </ProviderWrapperComponent>
            , element);
    }

    /**
     * Creates a new panel and adds it to a window
     * @param window - window to add the panel too
     * This will default to the default window created by Bolt
     */
    public createPanel(options?: PanelData, windowID: string = this._defaultWindow.id): PanelData
    {
        store.dispatch(addPanel(options, windowID));

        return options;
    }

    /**
     * Creates a new panel and adds it to a window
     * @param window - window to add the panel too
     * This will default to the default window created by Bolt
     */
    public clearPanel(id: string, destroyChildren: boolean): void
    {
        store.dispatch(clearPanel(id, destroyChildren));
    }

    /**
     * Creates a new panel and adds it to a window
     * @param window - window to add the panel too
     * This will default to the default window created by Bolt
     */
    public setActivePanel(id: string): void
    {
        store.dispatch(setActivePanel(id));
    }

    // TODO: implement an addPanel() to allow for a panel to be added back after being removed

    /**
     * Removes a panel from a window
     * @param panel - panel to remove
     */
    // public removePanel(panel: PanelController): void
    // {
    //     if (!this._panels.includes(panel))
    //     {
    //         throw new Error('[Bolt] Cannot remove panel that doesn\'t exist');
    //     }

    //     panel._remove();
    // }

    /**
     * Removes all panels from there windows
     */
    // public removeAllPanels(): void
    // {
    //     const removed = this._panels.splice(0, this._panels.length);

    //     for (let i = 0; i < removed.length; ++i)
    //     {
    //         const panel = removed[i];

    //         panel._remove();
    //     }
    // }

    /**
     * Removes a panel from its window and removes all of its bindings.
     * The panel and its bindings should not be used again
     * @param panel - panel to dispose
     */
    // public disposePanel(panel: PanelController): void
    // {
    //     this.removePanel(panel);
    //     panel._dispose();
    // }

    /**
     * Removes all panels from the gui. All binding are also disposed of.
     * The panels, and bindings should not be used again
     */
    // public disposeAllPanels(): void
    // {
    //     const panels = this._panels.splice(0, this._panels.length);

    //     for (let i = 0; i < panels.length; ++i)
    //     {
    //         panels[i]._dispose();
    //     }

    //     this._panels = [];
    // }

    /**
     * Removes all panels and windows from the gui. All binding are also disposed of.
     * The windows, panels, and bindings should not be used again
     */
    // public dispose(): void
    // {
    //     this.disposeAllPanels();
    //     this._windows = [];
    //     this._defaultWindow = this.createWindow();
    // }

    /**
     * Creates a new window in which you can add panels too.
     * @param options - options for the window
     */
    public createWindow(options: WindowData): WindowData
    {
        store.dispatch(addWindow(options));

        return options;
    }

    /**
     * Creates a new component
     * @param options - options for the window
     */
    public createComponent(type: string, id: string, panelId: string, inputData: any): any
    {
        switch (type)
        {
            case 'label': {
                store.dispatch(addComponent({ id, component: Label, inputData }, panelId));
                break;
            }
            case 'button': {
                store.dispatch(addComponent({ id, component: ButtonInputComponent, inputData }, panelId));
                break;
            }
            case 'xyr': {
                break;
            }
            case 'custom': {
                break;
            }
            default: {
                break;
            }
        }

        return inputData;
    }

    /**
     * updates component
     */
    public updateComponent(componentData: ComponentPair<any>): ComponentPair<any>
    {
        store.dispatch(updateComponent(componentData));

        return componentData;
    }

    /**
     * removes component
     */
    public removeComponent(id: string, parentId: string): void
    {
        store.dispatch(removeComponent(id, parentId));
    }

    /**
     * returns default window data
     */
    public getDefaultWindowData(): WindowData { return this._defaultWindow; }

    /**
     * Refreshes the binding for each input
     */
    public refresh(): void
    {
        // refreshes the input bindings
    }

    public addTest(Class: InputBindingConstructor): void
    {
        BoltClass._bindingTests.push(Class);
    }

    /* eslint-disable */
    hide(): void {} // TODO: these will hide/show every window
    show(): void {}
    /* eslint-enable */
}

export const Bolt = new BoltClass();
