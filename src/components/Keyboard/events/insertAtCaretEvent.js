import { search_store } from '../../../store.js';

let search;

const unsubscribeSearch = search_store.subscribe(value => {
  search = value;
});

export default function insertAtCaretEvent(element, text) {
  if (document.selection) {
    element.focus()
    let sel = document.selection.createRange()
    sel.text = text;
    element.focus()
  } else if (element.selectionStart || element.selectionStart === 0) {
    let startPos = element.selectionStart;
    let endPos = element.selectionEnd;
    let textValue = element.value.substring(0, startPos) + text + element.value.substring(endPos, element.value.length)

    search_store.set(textValue)
    element.focus()
    element.selectionStart = startPos + text.length;
    element.selectionEnd = startPos + text.length;
  } else {
    search_store.set(element.value += text)
    element.focus()
  }
}
