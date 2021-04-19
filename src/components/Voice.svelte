<script>
  import { onMount, afterUpdate, beforeUpdate } from 'svelte';
  import { voice_store, search_store } from '../store.js';

  let voice;
  let final_transcript = '';
  let recognizing = false;
  let ignore_onend = null;
  let recognition = null;
  let animationButton = false;

  const unsubscribeVoice = voice_store.subscribe(value => {
		voice = value;
	});

  onMount(() => {
    voiceSetup()
    voice ? activeVoice() : desactiveVoice()
  });

  beforeUpdate(() => {
    voice ? activeVoice() : desactiveVoice()
  });

  function disableVoice () {
    voice_store.set(false)
    desactiveVoice()
  }

  function activeVoice() {
    if(!recognizing) {
      recognizing = true;
      final_transcript = '';
      recognition.start();
    }
  }

  function desactiveVoice() {
    if(recognizing) {
      recognizing = false;
      recognition.stop();
    }
  }

  function voiceSetup () {
    if (!('webkitSpeechRecognition' in window)) {
      console.log('atualize SpeechRecognition')
    } else {
      recognition = new window.webkitSpeechRecognition();

      recognition.continuous = false;
      recognition.interimResults = true;

      final_transcript = '';
      ignore_onend = false;
      document.querySelector('.App-voice p').textContent = 'Ative o microfone';

      recognition.onstart = function() {
        recognizing = true;
        document.querySelector('.App-voice p').textContent = 'Fale agora';
        animationButton = true;
        console.log('onstart voice');
      };

      recognition.onerror = function(event) {
        animationButton = false;
        if (event.error === 'no-speech') {
          console.log('onerror voice no-speech');
          ignore_onend = true;
        }
        if (event.error === 'audio-capture') {
          console.log('onerror audio-capture');
          ignore_onend = true;
        }
        if (event.error === 'not-allowed') {
          document.querySelector('.App-voice p').textContent = 'Ative o microfone';
          ignore_onend = true;
        }
      };

      recognition.onend = function() {
        recognizing = false;
        if (ignore_onend) {
          return;
        }
        if (!final_transcript) {
          return;
        }
        animationButton = false;
        disableVoice()
        document.querySelector('.App-voice p').textContent = '';
      };

      recognition.onresult = function(event) {
        var interim_transcript = '';
        for (var i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            final_transcript += event.results[i][0].transcript;
          } else {
            interim_transcript += event.results[i][0].transcript;
          }
        }
        if (interim_transcript) {
          document.querySelector('.App-voice p').textContent = interim_transcript;
        }
        if (final_transcript) {
          document.querySelector('body').removeAttribute('style');

          search_store.set(final_transcript)
          recognition.stop();
        }
      };
    }
  }
</script>

<template>
  <section data-testid="app-voice" class='App-voice' class:active='{voice}'>
    <button class="exit" type="button" on:click={disableVoice}><i class="icon icon-exit">X</i></button>
    <p>Fale agora</p>
    <button type="button" class='btn-voice' class:active='{animationButton}'>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
        <path d="M17 11.998c0 2.76-2.23 5-4.99 5l-.002.002a4.994 4.994 0 01-4.979-5h-2c0 3.52 2.59 6.433 5.98 6.92v3.078h.01V22h2v-3.08h-.01A6.982 6.982 0 0019 11.998z"/>
        <path fill="none" d="M0 0h24v24H0z"/>
        <path d="M12 15c1.66 0 2.99-1.34 2.99-3L15 5c0-1.66-1.34-3-3-3S9 3.34 9 5v7c0 1.66 1.34 3 3 3z"/>
      </svg>
    </button>
  </section>
</template>

<style lang="scss" scoped>
.App-voice {
  align-items: center;
  background-color: var(--main-bg-color-primary);
  bottom: 0;
  box-shadow: 0 4px 16px rgba(0,0,0,0.2);
  display: flex;
  font-family: arial,sans-serif;
  font-size: 14px;
  height: auto;
  justify-content: center;
  left: 0;
  opacity: 0;
  padding: 35px;
  pointer-events: none;
  position: absolute;
  right: 0;
  top: 0;
  transition: .5s all;
  user-select: none;
  z-index: 99;
  &.active {
    opacity: 1;
    pointer-events: all;
    p {
      opacity: 1;
      transform: translateX(0);
    }
    .btn-voice { transform: scale(1); }
  }
  p {
    font-size: 22px;
    margin: 0;
    opacity: 0;
    padding: 0;
    transform: translateX(100px);
    transition: 1s all;
  }
  .exit {
    &:before {
      content: '';
      display: block;
      width: 100%;
      height: 100%;
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
    }
  }
}

.btn-voice {
  --mic-volume-size: 150px;
  align-items: center;
  background-color: rgba(var(--main-color-rgb), .05);
  border-radius: 50%;
  border: 0;
  box-shadow: 0 0 0 1px rgba(#fff, .6), 0 10px 20px rgba(var(--main-color-rgb), .1);
  cursor: pointer;
  display: flex;
  height: var(--mic-volume-size);
  justify-content: center;
  margin-left: 20px;
  opacity: .5;
  outline: none;
  transition: .4s all;
  transform: scale(0);
  user-select: none;
  width: var(--mic-volume-size);
  min-width: var(--mic-volume-size);
  &.active {
    animation: 1s voiceAnimation infinite alternate;
    opacity: 1;
    svg { fill: #ea4335; }
  }
  &:hover {
    transform: scale(1.1);
  }
  svg {
    height: 50%;
    width: 50%;
    fill: var(--main-color)
  }
}

@keyframes voiceAnimation {
  0%   { box-shadow: 0 0 0 1px rgba(#fff, .6), 0 10px 20px rgba(var(--main-color-rgb), .1), 0 0 10px rgba(var(--main-color-rgb), .1); }
  100% { box-shadow: 0 0 0 1px rgba(#fff, .6), 0 10px 20px rgba(var(--main-color-rgb), .1), 0 0 0 30px rgba(var(--main-color-rgb), .1);}
}
</style>
