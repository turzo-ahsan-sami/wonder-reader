export default class ButtonFunction {
  constructor() {
    this.disabled = true;
    this.func = function() {};
    this.source = '';
  }

  disable() {
    this.disabled = true;
  }

  function(input) {
    input = input || null;
    this.func(input);
  }

  set(func, filepath) {
    this.disabled = false;
    this.func = func;
    this.source = filepath || '';
  }
}
