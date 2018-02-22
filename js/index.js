var TerminalEmulator = {
  init: function init(screen) {
    var inst = Object.create(this);
    inst.screen = screen;
    inst.createInput();

    return inst;
  },

  createInput: function createInput() {
    var inputField = document.createElement('div');
    var inputWrap = document.createElement('div');

    inputField.className = 'terminal_emulator__field';
    inputField.innerHTML = '';
    inputWrap.appendChild(inputField);
    this.screen.appendChild(inputWrap);
    this.field = inputField;
    this.fieldwrap = inputWrap;
  },

  enterInput: function enterInput(input) {
    var _this = this;

    return new Promise(function (resolve, reject) {
      var randomSpeed = function randomSpeed(max, min) {
        return Math.random() * (max - min) + min;
      };

      var speed = randomSpeed(70, 90);
      var i = 0;
      var str = '';
      var type = function type() {

        str = str + input[i];
        _this.field.innerHTML = str.replace(/ /g, '&nbsp;');
        i++;

        setTimeout(function () {
          if (i < input.length) {
            if (i % 5 === 0) speed = randomSpeed(80, 120);
            type();
          } else {
            console.log('tick');
            setTimeout(function () {
              console.log('tock');
              resolve();
            }, 400);
          }
        }, speed);
      };

      type();
    });
  },

  enterCommand: function enterCommand() {
    var _this2 = this;

    return new Promise(function (resolve, reject) {
      var resp = document.createElement('div');
      resp.className = 'terminal_emulator__command';
      resp.innerHTML = _this2.field.innerHTML;
      _this2.screen.insertBefore(resp, _this2.fieldwrap);

      _this2.field.innerHTML = '';
      resolve();
    });
  },

  enterResponse: function enterResponse(response) {
    var _this3 = this;

    return new Promise(function (resolve, reject) {
      var resp = document.createElement('div');
      resp.className = 'terminal_emulator__response';
      resp.innerHTML = response;
      _this3.screen.insertBefore(resp, _this3.fieldwrap);

      resolve();
    });
  },

  wait: function wait(time, busy) {
    var _this4 = this;

    busy = busy === undefined ? true : busy;
    return new Promise(function (resolve, reject) {
      if (busy) {
        _this4.field.classList.add('waiting');
      } else {
        _this4.field.classList.remove('waiting');
      }
      setTimeout(function () {
        resolve();
      }, time);
    });
  },

  reset: function reset() {
    var _this5 = this;

    return new Promise(function (resolve, reject) {
      _this5.field.classList.remove('waiting');
      resolve();
    });
  }

};

/*
 * 
 * This is where the magic happens
 *
 */

var TE = TerminalEmulator.init(document.getElementById('screen'));

TE.wait(1000, false).then(TE.enterInput.bind(TE, 'Welcome to 0wnedlab.')).then(TE.enterCommand.bind(TE)).then(TE.enterResponse.bind(TE, '0wnedlab setup challenges/machines...')).then(TE.wait.bind(TE, 2000)).then(TE.enterResponse.bind(TE, '-Machines Done.')).then(TE.wait.bind(TE, 600)).then(TE.enterResponse.bind(TE, '-PWN Done.')).then(TE.wait.bind(TE, 600)).then(TE.enterResponse.bind(TE, '-Crypto Done.')).then(TE.wait.bind(TE, 300)).then(TE.enterResponse.bind(TE, '-Stego Done.')).then(TE.wait.bind(TE, 700)).then(TE.enterResponse.bind(TE, 'Enjoy your stay, happy hacking!.'))
