# Alternative Piano

A raiz del proyecto propuesto por Factoría F5 titulado "Factoría de sonidos", que realicé con algunos de mis compañeros y que consistía en hacer una página web de una escuela online de música orientada a niños, con un enfocada especialmente en el piano, me propuse por sugerencia de una amiga que toca precisamente este instrumento, realizar un piano un poco más completo
de al menos 5 octavas.
Este proyecto es una simulación de un piano digital interactivo, desarrollado con HTML, CSS y JavaScript. Permite a los usuarios tocar notas musicales utilizando el teclado del ordenador o haciendo clic en las teclas del piano en la interfaz gráfica. Además, incluye una función de reproducción automática de canciones predefinidas.

## Características

- **Interfaz de usuario interactiva**: Diseño atractivo y funcional con controles intuitivos.
- **Reproducción automática**: Selección de canciones predefinidas con diferentes tempos.
- **Modos de control**: Opciones para mostrar notas de letras, usar el teclado o no mostrar ninguna indicación.
- **Teclas animadas**: Las teclas cambian de color cuando se presionan para una mejor visualización.

## Tecnologías Utilizadas

- **HTML**: Estructura básica del proyecto.
- **CSS**: Estilos y diseño de la interfaz.
- **JavaScript**: Lógica de funcionamiento del piano y reproducción automática.

## Puesta en Marcha

Sigue estos pasos para ejecutar el proyecto en tu entorno local:

1. **Clona el repositorio**:

   ```bash
   git clone https://github.com/merkandez/alternativePiano.git

   ```

2. **Navega al directorio del proyecto**:

```bash
cd piano-project

```

3. **Abre el archivo index.html en tu navegador**:

```bash
open index.html

```

### Estructura del Proyecto

- `index.html`: Archivo principal que contiene la estructura HTML del piano.
- `css/piano.css`: Archivo CSS con los estilos del piano.
- `js/piano.js`: Archivo JavaScript con la lógica del piano.

El JavaScript maneja toda la lógica interactiva del piano. Esto incluye:

- **Crear el teclado**: Generar dinámicamente las teclas blancas y negras utilizando bucles.
- **Asignar sonidos a las teclas**: Cada tecla tiene un archivo de sonido asociado que se reproduce cuando la tecla es presionada.
- **Interacción con el teclado del ordenador**: Permitir que las teclas sean activadas mediante el teclado del ordenador.
- **Reproducción de canciones predefinidas**: Permitir la reproducción automática de canciones a diferentes velocidades.

## Código JavaScript Principal

El código JavaScript consta de las siguientes partes:

### 1. **Inicialización del Teclado**

```javascript
let init = () => {
  for (let i = 1; i <= 5; i++) {
    for (let j = 0; j < 7; j++) {
      let key = createKey("white", pianoNotes[j], i);
      key.dataset.keyboard = keyboardMap[j + (i - 1) * 7];
      keyboard.appendChild(key);

      if (j != 2 && j != 6) {
        key = createKey("black", pianoNotes[j], i);
        key.dataset.keyboard = "⇧+" + keyboardMap[j + (i - 1) * 7];
        let space = document.createElement("div");
        space.className = "space";
        space.appendChild(key);
        keyboard.appendChild(space);
      }
    }
  }
};
```

Este bloque de código crea las teclas del piano, diferenciando entre teclas blancas y negras.

### 2. Creación de Teclas

```javascript
let createKey = (type, note, octave) => {
  let key = document.createElement("button");
  key.className = `piano_key piano_key--${type}`;
  key.dataset.letterNote =
    type === "white" ? note + octave : note + "#" + octave;
  key.dataset.letterNoteFileName =
    type === "white" ? note + octave : note + "s" + octave;
  key.textContent = key.dataset.letterNote;
  keys.push(key);

  key.addEventListener("mousedown", () => {
    playSound(key);
    key.classList.add("piano_key--playing");
  });
  key.addEventListener("mouseup", () => {
    key.classList.remove("piano_key--playing");
  });
  key.addEventListener("mouseleave", () => {
    key.classList.remove("piano_key--playing");
  });

  return key;
};
```

Aquí se define la creación individual de las teclas, asignando los sonidos correspondientes y manejando la interacción del usuario.

### 3. Reproducción de Sonidos

```javascript
let playSound = (key) => {
  let audio = document.createElement("audio");
  audio.src = "../sounds/" + key.dataset.letterNoteFileName + ".mp3";
  audio.play().then(() => audio.remove());
};
```

### 4. Reproducción de Canciones

```javascript
let playSong = (noteString, tempo, cb) => {
  let notes = noteString.split(",");
  let currentNote = 0;
  let mousedown = new Event("mousedown");
  let mouseup = new Event("mouseup");
  let btn;
  let interval = setInterval(() => {
    if (currentNote < notes.length) {
      if (notes[currentNote].trim() !== "") {
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
```

Este bloque permite la reproducción automática de canciones predefinidas, ajustando la velocidad según la selección del usuario.

## 5. Interacción con el Teclado

```javascript
document.addEventListener("keydown", (e) => {
  if (e.repeat) {
    return;
  }
  pressKey("mousedown", e);
});

document.addEventListener("keyup", (e) => {
  pressKey("mouseup", e);
});

let pressKey = (mouseEvent, e) => {
  let lastLetter = e.code.substring(e.code.length - 1);
  let isShiftPressed = e.shiftKey;
  let selector;
  if (isShiftPressed) {
    selector = `[data-keyboard="⇧+${lastLetter}"]`;
  } else {
    selector = `[data-keyboard=${lastLetter}]`;
  }
  let key = document.querySelector(selector);
  if (key != null) {
    let event = new Event(mouseEvent);
    key.dispatchEvent(event);
  }
};
```

Este código permite que las teclas del piano puedan ser tocadas utilizando el teclado del ordenador, proporcionando una experiencia interactiva.

## Contribuciones

Las contribuciones son bienvenidas. Si deseas contribuir, por favor sigue estos pasos:

1. Haz un fork del proyecto.
2. Crea una nueva rama (`git checkout -b feature/nueva-caracteristica`).
3. Realiza tus cambios y haz commit (`git commit -am 'Añadir nueva característica'`).
4. Sube tus cambios (`git push origin feature/nueva-caracteristica`).
5. Abre un Pull Request.
