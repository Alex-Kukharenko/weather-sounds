import './style.scss'
import { setRangeColor } from './js/rangeInput.js'

const colorRangeInput = [
  '#34badb',
  '#ddd',
  '#34badb',
]

const slider = document.querySelector('.volume-menu__input')
slider.addEventListener('input', () => {
  setRangeColor(slider, ...colorRangeInput);
});


setRangeColor(slider, ...colorRangeInput);


