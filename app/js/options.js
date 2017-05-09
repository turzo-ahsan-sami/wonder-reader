const $ = require('jquery');

let toggle;

const inner = document.getElementById('innerWindow');
const optWindow = document.getElementById('optWindow');

toggle = () => {
  let options = $('#optWindow');
  options.slideToggle(400, function() {
    if (options.is(':animated')) return;
  });
};

exports.onStart = () => {
  let display = {
    'brightness': 'brightness(1.0)',
    'contrast': 'contrast(1.0)',
    'grayscale': 'grayscale(0.0)',
    style: function() {
      return `${this.brightness} ${this.contrast} ${this.grayscale}`;
    }
  };
  inner.style.webkitFilter = display.style();

  // Option :: Updates Styles and Text
  let options = optWindow.getElementsByTagName('input');
  for (let r = 0; r < options.length; r++) {
    options[r].addEventListener('input', function() {
      let val = options[r].value;
      let style = options[r].dataset.style;
      display[style] = `${style}(${val})`;
      inner.style.webkitFilter = display.style();
      let text = document.getElementById(`opt${style.capitalize()}Text`);
      text.value = val;
    });
  }

  // Options :: Reset Buttons
  let buttons = optWindow.getElementsByTagName('button');
  for(let b = 0; b < buttons.length; b++) {
    let style = buttons[b].dataset.style;
    buttons[b].addEventListener('click', function() {
      let c = style.capitalize();
      let range = document.getElementById(`opt${c}Range`);
      let text = document.getElementById(`opt${c}Text`);
      let d = range.dataset.default;
      display[style] = `${style}(${d})`;
      inner.style.webkitFilter = display.style();
      range.value = range.dataset.default;
      text.value = range.dataset.default;
    });
  }
};

exports.toggle = () => {
  toggle();
};
