let keyboard = document.querySelector('.piano_keyboard');
let controls = document.querySelectorAll('.piano_control_option');

let pianoNotes = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
let keyboardMap = [
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '0',
  'Q',
  'W',
  'E',
  'R',
  'T',
  'Y',
  'U',
  'I',
  'O',
  'P',
  'A',
  'S',
  'D',
  'F',
  'G',
  'H',
  'J',
  'K',
  'L',
  'Z',
  'X',
  'C',
  'V',
  'B',
  'N',
];
let playBtn = document.querySelector('.piano_play-btn');
let tempoSelect = document.querySelector('.piano_tempo');
let songSelect = document.querySelector('.piano_song_list');
let keys = [];

let happyBirthday = `G4,G4,A4,,G4,,C5,,B4,,,,
                    G4,G4,A4,,G4,,D5,,C5,,,,
                    G4,G4,G5,,E5,,C5,,B4,,A4,,
                    F5,F5,E5,,C5,,D5,,C5`;
let jingleBells = `B3,,B3,,B3,,,,B3,,B3,,B3,,,,
                  B3,,D4,,G3,,A3,B3,,,,,,
                  C4,,C4,,C4,,,,C4,C4,,B3,,B3,,,,
                  B3,B3,B3,,A3,,A3,,B3,,A3,,,,D4`;

let playSong = (noteString, tempo, cb) => {
  let notes = noteString.split(',');
  let currentNote = 0;
  let mousedown = new Event('mousedown');
  let mouseup = new Event('mouseup');
  let btn;
  let interval = setInterval(() => {
    if (currentNote < notes.length) {
      if (notes[currentNote].trim() !== '') {
        if (btn) {
          btn.dispatchEvent(mouseup);
        }
        btn = document.querySelector(
          `[data-letter-note="${notes[currentNote].trim()}"]`
        );
        btn.dispatchEvent(mousedown);
      }

      currentNote++;
    } else {
      btn.dispatchEvent(mouseup);
      clearInterval(interval);
      cb();
    }
  }, 300 / tempo);
};
playBtn.addEventListener('mousedown', () => {
  let tempo = +tempoSelect.value;
  let SongNum = +songSelect.value;
  playBtn.disabled = true;

  let enablePlayBtn = () => (playBtn.disabled = false);
  switch (SongNum) {
    case 1:
      playSong(jingleBells, tempo, enablePlayBtn);
      break;
    case 2:
      playSong(happyBirthday, tempo, enablePlayBtn);
      break;
  }
});

//Creación del teclado teclas blancas y negras con 2 bucles
let init = () => {
  for (let i = 1; i <= 5; i++) {
    for (let j = 0; j < 7; j++) {
      let key = createKey('white', pianoNotes[j], i);
      key.dataset.keyboard = keyboardMap[j + (i - 1) * 7];
      keyboard.appendChild(key);

      if (j != 2 && j != 6) {
        key = createKey('black', pianoNotes[j], i);
        key.dataset.keyboard = '⇧+' + keyboardMap[j + (i - 1) * 7];
        let space = document.createElement('div');
        space.className = 'space';
        space.appendChild(key);
        keyboard.appendChild(space);
      }
    }
  }
};

// Creación del nombre de las teclas
let createKey = (type, note, octave) => {
  let key = document.createElement('button');
  key.className = `piano_key piano_key--${type}`;
  key.dataset.letterNote =
    type === 'white' ? note + octave : note + '#' + octave;
  key.dataset.letterNoteFileName =
    type === 'white' ? note + octave : note + 's' + octave;
  /* type === 'white' ? `${note}${octave}` : `${note}s${octave}`; */
  key.textContent = key.dataset.letterNote;
  keys.push(key);

  //Hacemos que al pulsar la tecla ésta tome una clase que haga que tenga un background azul según la clase "piano_key--playing" del CSS y que la pierda cuando dejemos de pulsar la tecla.

  key.addEventListener('mousedown', () => {
    playSound(key);
    key.classList.add('piano_key--playing');
  });
  key.addEventListener('mouseup', () => {
    key.classList.remove('piano_key--playing');
  });
  key.addEventListener('mouseleave', () => {
    key.classList.remove('piano_key--playing');
  });

  return key;
};
document.addEventListener('keydown', (e) => {
  if (e.repeat) {
    return;
  }
  pressKey('mousedown', e);
  /* let lastLetter = e.code.substring(e.code.length - 1);
  console.log(lastLetter);
  let isShiftPressed = e.shiftKey;
  let selector;
  if (isShiftPressed) {
    selector = `[data-keyboard="⇧+${lastLetter}"]`;
  } else {
    selector = `[data-keyboard=${lastLetter}]`;
  }
  let key = document.querySelector(selector);
  console.log(key);
  if (key != null) {
    let mousedown = new Event('mousedown');
    key.dispatchEvent(mousedown);
  } */ //Esto es lo que hemos metido dentro de pressKey y cambiamos los argumentos
});
document.addEventListener('keyup', (e) => {
  pressKey('mouseup', e);
  /*  let lastLetter = e.code.substring(e.code.length - 1);
  console.log(lastLetter);
  let isShiftPressed = e.shiftKey;
  let selector;
  if (isShiftPressed) {
    selector = `[data-keyboard="⇧+${lastLetter}"]`;
  } else {
    selector = `[data-keyboard=${lastLetter}]`;
  }
  let key = document.querySelector(selector);
  console.log(key);
  if (key != null) {
    let mouseup = new Event('mouseup');
    key.dispatchEvent(mouseup);
  } */ //Esto es lo que hemos metido dentro debajo en la variable presKey
});
let pressKey = (mouseEvent, e) => {
  let lastLetter = e.code.substring(e.code.length - 1);
  /* console.log(lastLetter); */
  let isShiftPressed = e.shiftKey;
  let selector;
  if (isShiftPressed) {
    selector = `[data-keyboard="⇧+${lastLetter}"]`;
  } else {
    selector = `[data-keyboard=${lastLetter}]`;
  }
  let key = document.querySelector(selector);
  /* console.log(key); */
  if (key != null) {
    let event = new Event(mouseEvent);
    key.dispatchEvent(event);
  }
};

//Damos a cada tecla un sonido que para cuando dejamos de pulsarla.
let playSound = (key) => {
  let audio = document.createElement('audio');
  audio.src = '../sounds/' + key.dataset.letterNoteFileName + '.mp3';
  /* audio.src = `../sounds/${key.dataset.letterNoteFileName}.mp3`; */
  audio.play().then(() => audio.remove());
};

controls.forEach((input) => {
  input.addEventListener('input', () => {
    let value = input.value;
    let type;
    switch (value) {
      case 'letterNotes':
        type = 'letterNote';
        break;
      case 'keyboard':
        type = 'keyboard';
        break;
      case 'none':
        type = '';
        break;
    }
    keys.forEach((key) => {
      key.textContent = key.dataset[type];
    });
  });
});
init();
