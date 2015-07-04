var $ = require('jquery');

let FormKeyboardHelper = {
  componentDidMount() {
    var $el = $(this.getDOMNode());

    // focus on first input
    $el.find('input').first().focus();

    let button = $el.find('button').first();

    // capture enter key and trigger button click
    $el.keyup((evt) => {
      if(evt.keyCode === 13 && !evt.target.type !== 'button') {
        evt.stopPropagation();
        evt.preventDefault();
        button.trigger('click');
      }
    })
  }
};

module.exports = FormKeyboardHelper;