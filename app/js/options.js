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
  for (let i = 0; i < options.length; i++) {
    options[i].addEventListener('input', function() {
      let val = options[i].value;
      let style = options[i].dataset.style;
      display[style] = `${style}(${val})`;
      inner.style.webkitFilter = display.style();
      let Style = style.capitalize();
      let text = document.getElementById(`opt${Style}Text`);
      text.value = val;
    });
  }

  // Options :: Reset Buttons
  let buttons = optWindow.getElementsByTagName('button');
  for(let i = 0; i < buttons.length; i++) {
    let style = buttons[i].dataset.style;
    buttons[i].addEventListener('click', function() {
      let Style = style.capitalize();
      let range = document.getElementById(`opt${Style}Range`);
      let text = document.getElementById(`opt${Style}Text`);
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
