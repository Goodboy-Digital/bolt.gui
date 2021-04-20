# Structure

- root (contains all the data about everything)
  - window
    - panel data [] (aka window but without tabs)
      - components
  - window

## Root

Contains data on the all the windows. All other data can be handled individually by each window

### Root API

```ts
const Bolt = new Bolt();
const window = Bolt.addWindow();
Bolt.removeWindow(window);
Bolt.dispose(); // completely destroys everything

Bolt.hideAll(); // hides all windows
Bolt.showAll(); // opens all windows, respecting tabs
```

```ts
window.setView();
window.setStyle();

window.addPanel();
window.removePanel(panel);
window.clear(); // removes all panels from window. These are not destroyed
window.dispose(); // destroys the window and all panels

window.show();
window.hide();
window.open();
window.close();
window.on();
```

```ts
panel.setView();
panel.setStyle();

panel.setWindow(window);
panel.open();
panel.close();
panel.on();
panel.clear(); // removes all component controllers
panel.dispose(); // destroys all

panel.addCustomInput()
panel.addInput();
panel.addInputAt();
panel.addButton(object, id, {view});
panel.addButtonAt(object, id, {view});
panel.addFolder();
panel.addFolderAt();
panel.addSeparator();
panel.addSeparatorAt();
panel.addTab();
panel.addTabAt();
panel.addInputGroup()
```

## Features

- window
  - lock window so panels cannot be moved or added/removed
  - setting width = 0 creates just the sidebar?
- Bolt
  - implement an addPanel() to allow for a panel to be added back after being removed
  - add refresh for inputs
  - add show/hide for all windows

## Clean up

- Remove eventemitter stuff for a callback approach
- Refactor gui data to closure match controller data
- Refactor interfaces in gui to inherit and be more generic
- Create more tests
- Create window manager class to handle states
