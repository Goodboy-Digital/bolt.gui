import { BoltGUI } from './../components/BoltGUI';
import { PanelController } from './PanelController';
import { WindowController } from './WindowController';

export class BoltClass
{
    protected gui: BoltGUI = new BoltGUI({});
    protected _panels: PanelController[] = [];
    protected _defaultWindow: WindowController;
    protected _windows: WindowController[] = [];

    constructor()
    {
        this._defaultWindow = this.createWindow();
        BoltGUI.init();
    }

    /**
     * Creates a new panel and adds it to a window
     * @param window - window to add the panel too
     * This will default to the default window created by Bolt
     */
    public createPanel(window: WindowController = this._defaultWindow): PanelController
    {
        const panel = new PanelController({ parent: window });

        this._panels.push(panel);

        return panel;
    }

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
     * @param style - style for the window
     * @param view - view for the window
     */
    public createWindow(style?: any[], view?: any[]): WindowController
    {
        const window = new WindowController(style, view);

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

    /* eslint-disable */
    hide(): void {} // TODO: these will hide/show every window
    show(): void {}
    /* eslint-enable */
}

export const Bolt = new BoltClass();
