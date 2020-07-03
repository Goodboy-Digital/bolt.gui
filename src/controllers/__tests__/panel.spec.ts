import { BoltClass } from './../Bolt';
import { PanelController } from '../PanelController';

describe('Window Controller', () =>
{
    let Bolt: BoltClass;
    let panel: PanelController;

    beforeEach(() =>
    {
        Bolt = new BoltClass();
        panel = Bolt.createPanel();
    });

    it('should have a parent', () =>
    {
        expect(panel.window).toEqual(Bolt['_defaultWindow']);
    });

    // it('should add a component', () =>
    // {
    //     //
    // });

    // it('should remove a component', () =>
    // {
    //     //
    // });

    // it('should remove all components', () =>
    // {
    //     //
    // });
});
