import './style.scss'
import { data } from './js/data.js'
import { setRangeColor } from './js/rangeInput.js'

const colorRangeInput = ['#34badb', '#ddd', '#34badb']
let currentAudio = null
function createRangeInput() {
  const input = document.createElement('input')
  input.type = 'range'
  input.min = 0
  input.max = 100
  input.value = 50
  input.step = 1
  input.className = 'volume__input'

  setRangeColor(input, ...colorRangeInput)

  input.addEventListener('input', () => {
    setRangeColor(input, ...colorRangeInput)
    const volume = input.value / 100
    if (currentAudio) {
      currentAudio.volume = volume
    }
  })
  input.getVolume = () => input.value / 100
  return input
}

const audioMap = {}

const handleButtonClick = (data) => {
  const container = document.querySelector('.container')
  const iconPause = event.target.lastChild
  container.style.setProperty('--before-bg', `url('${data.bgImg}')`)

  const src = data.musicSrc

  // создаём Audio только один раз для каждого src
  if (!audioMap[src]) {
    audioMap[src] = new Audio(src)
  }
  const audio = audioMap[src]
  document.querySelectorAll('.button-menu__icon-paused').forEach((icon) => {
    icon.style.setProperty('--opacity-btn', 0) // или убираем класс .paused
  })
  // если уже играет эта же мелодия – пауза
  if (currentAudio === audio && !audio.paused) {
    audio.pause()
    iconPause.style.setProperty('--opacity-btn', 1)
    return
  }

  // если играла другая – остановить её
  if (currentAudio && currentAudio !== audio) {
    currentAudio.pause()
    iconPause.style.setProperty('--opacity-btn', 0)
    currentAudio.currentTime = 0 // по желанию
  }

  currentAudio = audio
  if (volumeInput) {
    audio.volume = volumeInput.value / 100
  }
  audio.play()
}

function createButtonMenu(data) {
  const buttonMenu = document.createElement('div')
  buttonMenu.className = 'button-menu'

  data.forEach((item) => {
    const button = document.createElement('button')
    button.className = 'button-menu__play'
    button.style.backgroundImage = item.bgImg ? `url('${item.bgImg}')` : 'none'
    const iconPause = document.createElement('img')
    iconPause.className = 'button-menu__icon-paused'
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

    buttonMenu.appendChild(button)
  })

  return buttonMenu
}
let volumeInput = null
function app(data) {
  const container = document.createElement('div')
  container.className = 'container'
  const title = document.createElement('h1')
  title.className = 'title'
  title.innerText = 'Whether sound'
  volumeInput = createRangeInput()
  container.append(title)
  container.append(createButtonMenu(data))
  container.append(volumeInput)
  return container
}

const rootElement = document.getElementById('app')
rootElement.append(app(data))
