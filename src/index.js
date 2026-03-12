import './style.scss'
import { data } from './js/data.js';
import { setRangeColor } from './js/rangeInput.js'

const colorRangeInput = [
  '#34badb',
  '#ddd',
  '#34badb',
]

function input() {
  const input = document.createElement('input')
  input.type = 'range';
  input.min = 0;
  input.max = 100;
  input.value = 50;
  input.step = 1;
  input.className = 'volume__input'
  setRangeColor(input, ...colorRangeInput)
  input.addEventListener('input', () => {
    setRangeColor(input, ...colorRangeInput)
  })
  return input
}

const handleButtonClick = (data) => {
  const container = document.querySelector('.container')
  const iconPause = event.target.lastElementChild
  console.log(iconPause)
  container.style.setProperty('--before-bg', `url('${data.bgImg}')`)
  const musicPlay = false
  console.log(musicPlay);
}

function createButtonMenu(data) {
  const buttonMenuWrap = document.createElement('div')
  buttonMenuWrap.className = 'button-menu'

  data.forEach((item) => {
    const button = document.createElement('button')
    button.className = 'button-menu__play'
    button.style.backgroundImage = item.bgImg ? `url('${item.bgImg}')` : 'none'
    const iconPause = document.createElement('img')
    iconPause.className = 'button-menu__icon-pause'
    iconPause.src = './assets/icons/pause.svg'
    iconPause.alt = 'icon'
    if (item.iconSrc) {
      const img = document.createElement('img')
      img.className = 'button-menu__icon'
      img.src = item.iconSrc
      img.alt = 'icon'
      button.appendChild(img)
    }
    button.appendChild(iconPause)
    button.addEventListener('click', () => {
      handleButtonClick(item)
    })

    buttonMenuWrap.appendChild(button)
  })

  return buttonMenuWrap
}

function app(data) {
  const container = document.createElement('div')
  container.className = 'container'
  const title = document.createElement('h1')
  title.className = 'title'
  title.innerText = 'Whether sound'
  container.append(title)
  container.append(createButtonMenu(data))
  container.append(input())
  return container
}

const rootElement = document.getElementById('app')
rootElement.append(app(data))

