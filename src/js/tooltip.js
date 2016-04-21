/* global Tether Drop */

const { extend } = Tether.Utils;

const _Drop = Drop.createContext({
  classPrefix: 'tooltip'
});

const defaults = {
  position: 'top center',
  openOn: 'hover',
  classes: 'tooltip-theme-arrows',
  constrainToWindow: true,
  constrainToScrollParent: false
};

let tooltipCount = 0;

class Tooltip {
  constructor(options) {

    if (!options.target) {
      throw new Error('Tooltip Error: You must provide a target for Tooltip to attach to');
    }

    const position = options.target.getAttribute('data-tooltip-position');
    if (position) {
      if (typeof options.position === 'undefined') {
        options.position = position;
      }
    }

    const content = options.target.getAttribute('data-tooltip');

    if (content) {
      if (typeof options.content === 'undefined') {
        const contentEl = document.createElement('div');
        contentEl.innerHTML = content;

        // Add ARIA attributes (see #50)
        contentEl.setAttribute('role', 'tooltip');
        contentEl.id = `drop-tooltip-${ tooltipCount }`;
        options.target.setAttribute('aria-describedby', contentEl.id);
        tooltipCount += 1;

        options.content = contentEl;
      }
    }

    if (!options.content) {
      throw new Error('Tooltip Error: You must provide content for Tooltip to display');
    }

    options = extend({}, defaults, options);

    this.drop = new _Drop(options);
    this.options = options;


  }

  close() {
    this.drop.close();
  }

  open() {
    this.drop.open();
  }

  toggle() {
    this.drop.toggle();
  }

  remove() {
    this.drop.remove();
  }

  destroy() {
    this.drop.destroy();
  }

  position() {
    this.drop.position();
  }
}

let initialized = [];

Tooltip.init = () => {
  const tooltipElements = document.querySelectorAll('[data-tooltip]');
  const len = tooltipElements.length;
  for (let i = 0; i < len; ++i) {
    const el = tooltipElements[i];
    if (initialized.indexOf(el) === -1) {
      new Tooltip({
        target: el
      });
      initialized.push(el);
    }
  }
};

document.addEventListener('DOMContentLoaded', () => {
  if (Tooltip.autoinit !== false) {
    Tooltip.init();
  }
});
