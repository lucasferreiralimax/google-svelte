<script>
  import { shiftEvent, capslockEvent, ctrlAltEvent, backspaceEvent, insertAtCaretEvent } from './events';
  import { noKeysCharEvents } from './utils';
  import { keyboard_store } from '../../store.js';

  let keyboard;
  let ctrlalt = false;
  let capslock = false;
  let shift = false;
  let left = 0;
  let top = 0;
  let moving = false;

  const unsubscribeKeyboard = keyboard_store.subscribe(value => {
		keyboard = value;
	});

  function onKeyVirtualEvents(event) {
    if(event.target.classList.contains('key')) {
      const input = document.querySelector('.App-search-input')
      const typeKey = event.target.textContent
      const keyEvents = {
        backspace: el => backspaceEvent(el),
        whitespace: el => insertAtCaretEvent(el, ' ')
      }

      if(!noKeysCharEvents.includes(typeKey)) {
        return keyEvents[typeKey]
          ? keyEvents[typeKey](input)
          : insertAtCaretEvent(input, typeKey)
      }
    }
  }

  function handleCapslock() {
    capslock = !capslock
    capslockEvent(capslock)
  }

  function handleShift() {
    shift = !shift
    shiftEvent(shift)
  }

  function handleCtrlAlt() {
    ctrlalt = !ctrlalt
    ctrlAltEvent(ctrlalt)
  }

	function onMouseDown() {
		moving = true;
	}

	function onMouseMove(e) {
		if (moving) {
			left += e.movementX;
			top += e.movementY;
		}
	}

	function onMouseUp() {
		moving = false;
	}

  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
</script>

<template>
  <section data-testid="app-keyboard" class="App-keyboard" class:active='{keyboard}' style="left: {left}px; top: {top}px;">
    <h1 on:mousedown={onMouseDown}>português brasileiro</h1>
    <button class="exit" type="button" on:click={() => keyboard_store.set(false)}><i class="icon icon-exit">X</i></button>
    <div class="App-keyboard-content" on:click={onKeyVirtualEvents}>
      <div class="row">
        <button class="key" type="button">'</button>
        <button class="key" type="button">1</button>
        <button class="key" type="button">2</button>
        <button class="key" type="button">3</button>
        <button class="key" type="button">4</button>
        <button class="key" type="button">5</button>
        <button class="key" type="button">6</button>
        <button class="key" type="button">7</button>
        <button class="key" type="button">8</button>
        <button class="key" type="button">9</button>
        <button class="key" type="button">0</button>
        <button class="key" type="button">-</button>
        <button class="key" type="button">=</button>
        <button class="key" type="button" style="width: 62px;"><i class="icon icon-backspace">backspace</i></button>
      </div>
      <div class="row" style="padding-left: 50px;">
        <button class="key" type="button">q</button>
        <button class="key" type="button">w</button>
        <button class="key" type="button">e</button>
        <button class="key" type="button">r</button>
        <button class="key" type="button">t</button>
        <button class="key" type="button">y</button>
        <button class="key" type="button">u</button>
        <button class="key" type="button">i</button>
        <button class="key" type="button">o</button>
        <button class="key" type="button">p</button>
        <button class="key" type="button">´</button>
        <button class="key" type="button">[</button>
      </div>
      <div class="row">
        <button class="key" data-testid="capslock" class:active='{capslock}' on:click={handleCapslock} type="button" style="width: 53.75px;"><i class="icon icon-capslock">capslock</i></button>
        <button class="key" type="button">a</button>
        <button class="key" type="button">s</button>
        <button class="key" type="button">d</button>
        <button class="key" type="button">f</button>
        <button class="key" type="button">g</button>
        <button class="key" type="button">h</button>
        <button class="key" type="button">j</button>
        <button class="key" type="button">k</button>
        <button class="key" type="button">l</button>
        <button class="key" type="button">ç</button>
        <button class="key" type="button">~</button>
        <button class="key" type="button">]</button>
      </div>
      <div class="row">
        <button class="key" data-testid="shift_1" class:active='{shift}' on:click={handleShift} type="button" style="width: 37.25px;"><i class="icon icon-shitf">shift 1</i></button>
        <button class="key" type="button">\</button>
        <button class="key" type="button">z</button>
        <button class="key" type="button">x</button>
        <button class="key" type="button">c</button>
        <button class="key" type="button">v</button>
        <button class="key" type="button">b</button>
        <button class="key" type="button">n</button>
        <button class="key" type="button">m</button>
        <button class="key" type="button">,</button>
        <button class="key" type="button">.</button>
        <button class="key" type="button">;</button>
        <button class="key" data-testid="shift_2" class:active='{shift}' on:click={handleShift} type="button" style="width: 86.75px;"><i class="icon icon-shitf">shift 2</i></button>
      </div>
      <div class="row">
        <button class="key" data-testid="ctrl_alt_1" class:active='{ctrlalt}' on:click={handleCtrlAlt} type="button" style="width: 95px;">Ctrl+Alt</button>
        <button class="key" type="button" style="width: 293px; font-size: 0px;">whitespace</button>
        <button class="key" data-testid="ctrl_alt_2" class:active='{ctrlalt}' on:click={handleCtrlAlt} type="button" style="width: 95px;">Ctrl+Alt</button>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.App-keyboard {
  background-color: var(--main-bg-color-primary);
  border: 1px solid rgba(var(--main-color-rgb),0.15);
  box-shadow: 0 4px 16px rgba(0,0,0,0.2);
  font-family: arial,sans-serif;
  font-size: 14px;
  min-width: 495px;
  height: auto;
  margin: 0;
  opacity: 0;
  padding: 35px 10px 10px;
  pointer-events: none;
  position: fixed;
  transition: .3s background-color opacity;
  user-select: none;
  z-index: 99;
  &.active {
    opacity: 1;
    pointer-events: all;
  }
  .icon-backspace,
  .icon-capslock,
  .icon-shitf {
    height: 17px;
    margin: 0 auto;
    opacity: .667;
    width: 22px;
  }
  .icon-backspace { background-position: -714px -16px; }
  .icon-capslock { background-position: -614px -66px; }
  .icon-shitf { background-position: -814px -16px; }
  h1 {
    cursor: move;
    font-family: arial, sans-serif;
    font-size: 14px;
    font-weight: normal;
    left: 0;
    line-height: 25px;
    margin: 0;
    padding: 5px 10px;
    position: absolute;
    right: 0;
    top: 0;
  }
  .key {
    background-color: rgba(var(--main-color-rgb), .05);
    border-radius: 2px;
    border: 1px solid rgba(var(--main-color-rgb),0.1);
    color: var(--main-color);
    height: 29px;
    margin: 2px 0;
    max-height: 50px;
    max-width: 500px;
    min-height: 0px;
    min-width: 29px;
    padding: 1px;
    position: relative;
    text-align: center;
    vertical-align: middle;
    cursor: pointer;
    &:hover {
      background-color: rgba(var(--main-color-rgb), .02);
      border-color: rgba(var(--main-color-rgb), 0.3);
      box-shadow: 0px 1px 1px rgba(0,0,0,0.1);
      color: var(--main-color);
    }
    &.active,
    &:active {
      background-color: var(--main-bg-color-primary);
      background-image: linear-gradient(to top, rgba(var(--main-color-rgb),0.2), rgba(var(--main-color-rgb),0.1));
      border-color: rgba(var(--main-color-rgb),0.3);
      box-shadow: inset 0px 1px 2px rgba(0,0,0,0.4);
      color: var(--main-color);
      filter: invert(1) brightness(2);
    }
  }
}
</style>
