const blessed = require('blessed');
const XTerm = require('blessed-xterm');

// 1. Create the Blessed screen
const screen = blessed.screen({
  smartCSR: true,
  title: 'My Embedded Terminal'
});

// 2. Create the XTerm widget
const terminal = new XTerm({
  parent: screen,
  top: 'center',
  left: 'center',
  width: '80%',
  height: '80%',
  shell: process.env.SHELL || 'sh', // Command to run (e.g., /bin/bash)
  args: [],                        // Arguments for the shell
  cursor: 'block',
  style: {
    fg: 'white',
    bg: 'black',
    border: { fg: 'cyan' }
  },
  border: 'line',
  scrollable: true
});

// 3. Handle exit behavior
terminal.on('exit', () => {
  process.exit(0);
});

// 4. Quit on 'q' or 'Ctrl-C' (optional)
screen.key(['q', 'C-c'], () => {
  return process.exit(0);
});

terminal.focus();
screen.render();
