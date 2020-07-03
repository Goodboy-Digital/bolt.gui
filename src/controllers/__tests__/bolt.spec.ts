import { BoltClass } from './../Bolt';
import { PanelController } from './../PanelController';
import { WindowController } from '../WindowController';

describe('Bolt', () =>
{
    let Bolt: BoltClass;

    beforeEach(() =>
    {
        Bolt = new BoltClass();
    });

    it('should have a default window', () =>
    {
        expect(Bolt['_defaultWindow']).toBeInstanceOf(WindowController);
    });

    it('should create a new panel', () =>
    {
        const panel = Bolt.createPanel();

        expect(Bolt['_panels']).toHaveLength(1);
        expect(panel).toBeInstanceOf(PanelController);
        expect(panel.window).toEqual(Bolt['_defaultWindow']);
    });

    it('should create a new panel and attach to the specified window', () =>
    {
        const window = Bolt.createWindow();
        const panel = Bolt.createPanel(window);

        expect(panel).toBeInstanceOf(PanelController);
        expect(panel.window).toEqual(window);
    });

    it('should remove a panel from a window', () =>
    {
        const panel = Bolt.createPanel();

        Bolt.removePanel(panel);

        expect(panel.window).toBeNull();
    });

    it('should remove all panels from there windows', () =>
    {
        const panel = Bolt.createPanel();
        const panel2 = Bolt.createPanel();

        Bolt.removePanel(panel);
        Bolt.removePanel(panel2);

        expect(panel.window).toBeNull();
        expect(panel2.window).toBeNull();
    });

    // it('should dispose of a panel', () =>
    // {

    // });

    // it('should dispose of all panels', () =>
    // {

    // });

    // it('should dispose of everything', () =>
    // {

    // });

    it('should create a window', () =>
    {
        const window = Bolt.createWindow();

        expect(window).toBeInstanceOf(WindowController);
        expect(Bolt['_windows']).toHaveLength(2);
    });

    // it('should refresh the input bindings', () =>
    // {

    // });
});
