import { BoltGUI, ViewData } from '../components/BoltGUI';
import {
    InputBindingConstructor,
    NumberBinding,
    PanelController,
    WindowControllerOptions,
} from './controllers';

import { PanelControllerOptions } from './controllers/windows/PanelController';
import React from 'react';
import { WindowController } from './controllers/windows/WindowController';
import { render } from 'react-dom';

export class BoltClass
{
    protected _panels: PanelController[] = [];
    protected _defaultWindow: WindowController;
    protected _windows: WindowController[] = [];
    protected static _bindingTests: InputBindingConstructor[];

    constructor()
    {
        this._defaultWindow = this.createWindow();

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

        this._update();
    }

    private _update(): void
    {
        let updateDisplay = false;

        for (let i = 0; i < this._panels.length; i++)
        {
            const panel = this._panels[i];

            if (panel.dirty)
            {
                updateDisplay = true;
                panel.dirty = false;
            }
        }

        updateDisplay && this._updateGUI();
        requestAnimationFrame(this._update.bind(this));
    }

    private _updateGUI(): void
    {
        // need to gather all of the windows
        const data: ViewData[] = [];

        this._windows.forEach((window) =>
        {
            if (window.children.length === 0) return;

            data.push(window._getData());
        });

        const element = document.getElementById('editor-holder');

        if (!element) return;

        render(<BoltGUI viewData={data} />, element);
    }

    /**
     * Creates a new panel and adds it to a window
     * @param window - window to add the panel too
     * This will default to the default window created by Bolt
     */
    public createPanel(window: WindowController = this._defaultWindow, options?: PanelControllerOptions): PanelController
    {
        const panel = new PanelController({ ...options, parent: window });

        this._panels.push(panel);

        return panel;
    }

    // TODO: implement an addPanel() to allow for a panel to be added back after being removed

    /**
     * Removes a panel from a window
     * @param panel - panel to remove
     */
    public removePanel(panel: PanelController): void
    {
        if (!this._panels.includes(panel))
        {
            throw new Error('[Bolt] Cannot remove panel that doesn\'t exist');
        }

        panel._remove();
    }

    /**
     * Removes all panels from there windows
     */
    public removeAllPanels(): void
    {
        const removed = this._panels.splice(0, this._panels.length);

        for (let i = 0; i < removed.length; ++i)
        {
            const panel = removed[i];

            panel._remove();
        }
    }

    /**
     * Removes a panel from its window and removes all of its bindings.
     * The panel and its bindings should not be used again
     * @param panel - panel to dispose
     */
    public disposePanel(panel: PanelController): void
    {
        this.removePanel(panel);
        panel._dispose();
    }

    /**
     * Removes all panels from the gui. All binding are also disposed of.
     * The panels, and bindings should not be used again
     */
    public disposeAllPanels(): void
    {
        const panels = this._panels.splice(0, this._panels.length);

        for (let i = 0; i < panels.length; ++i)
        {
            panels[i]._dispose();
        }

        this._panels = [];
    }

    /**
     * Removes all panels and windows from the gui. All binding are also disposed of.
     * The windows, panels, and bindings should not be used again
     */
    public dispose(): void
    {
        this.disposeAllPanels();
        this._windows = [];
        this._defaultWindow = this.createWindow();
    }

    /**
     * Creates a new window in which you can add panels too.
     * @param options - options for the window
     */
    public createWindow(options?: WindowControllerOptions): WindowController
    {
        const window = new WindowController(options);

        this._windows.push(window);

        return window;
    }

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
