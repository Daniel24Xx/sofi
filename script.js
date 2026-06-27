/*======================================
        ELEMENTOS
======================================*/

const body = document.body;

const startBtn = document.getElementById("start");

const audio = document.getElementById("audio");

const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");

const progress = document.getElementById("progress");
const musicBar = document.getElementById("musicBar");

const mensaje = document.getElementById("mensaje");

/*======================================
        VARIABLES
======================================*/

let iniciado = false;

let currentSong = 0;

const songs = [

"assets/music/song1.mp3",

"assets/music/song2.mp3",

"assets/music/song3.mp3"

];

/*======================================
        CARGAR PRIMERA CANCIÓN
======================================*/

loadSong(currentSong);

function loadSong(index){

    audio.src = songs[index];

}

/*======================================
        COMENZAR
======================================*/

startBtn.addEventListener("click",()=>{

    if(iniciado) return;

    iniciado = true;

    body.classList.add("zoom");

    mensaje.classList.add("fade");

    mensaje.innerHTML=`

        <h2>🥭 La aventura comienza...</h2>

        <p>

        Haz clic sobre cualquiera de los mangos del árbol.

        Cada uno guarda un mensaje especial.

        </p>

    `;

});

/*======================================
            PLAY
======================================*/

playBtn.addEventListener("click",()=>{

    if(audio.paused){

        audio.play();

        playBtn.textContent="⏸";

    }else{

        audio.pause();

        playBtn.textContent="▶️";

    }

});

/*======================================
        SIGUIENTE
======================================*/

nextBtn.addEventListener("click",()=>{

    currentSong++;

    if(currentSong>=songs.length){

        currentSong=0;

    }

    loadSong(currentSong);

    audio.play();

    playBtn.textContent="⏸";

});

/*======================================
        ANTERIOR
======================================*/

prevBtn.addEventListener("click",()=>{

    currentSong--;

    if(currentSong<0){

        currentSong=songs.length-1;

    }

    loadSong(currentSong);

    audio.play();

    playBtn.textContent="⏸";

});

/*======================================
        TERMINAR CANCIÓN
======================================*/

audio.addEventListener("ended",()=>{

    currentSong++;

    if(currentSong>=songs.length){

        currentSong=0;

    }

    loadSong(currentSong);

    audio.play();

});

/*======================================
        BARRA
======================================*/

audio.addEventListener("timeupdate",()=>{

    if(audio.duration){

        const porcentaje=

        (audio.currentTime/audio.duration)*100;

        progress.style.width=

        porcentaje+"%";

    }

});

/*======================================
        CAMBIAR POSICIÓN
======================================*/

musicBar.addEventListener("click",(e)=>{

    const ancho = musicBar.clientWidth;

    const click = e.offsetX;

    const porcentaje = click/ancho;

    audio.currentTime=

    porcentaje*audio.duration;

});
/*======================================
            MANGOS
======================================*/

const mangos = document.querySelectorAll(".mango");

let mangosAbiertos = 0;

const mensajes = [

{
titulo:"🥭 Mango ",
texto:"¡Feliz cumpleaños Sofi! Espero que hoy sea un día lleno de sonrisas, abrazos y mucha felicidades. 💛"
},

{
titulo:"🌼 Mango ",
texto:"Nunca dejes de sonreír. Tu forma de ser hace que las personas a tu alrededor se sientan muy bien."
},

{
titulo:"🌞 Mango ",
texto:"Que este nuevo año de vida venga con muchos sueños cumplidos, aventuras y momentos inolvidables bot."
},

{
titulo:"💚 Mango ",
texto:"Gracias por ser una gran amiga. Espero que este pequeño detalle te saque una sonrisa."
},

{
titulo:"🎁 Mango ",
texto:"Sofi deja de ser muy bot y manca en duels jsjs solo te debaja ganar porq iba ser tu cumple 🥭✨"
}

];

/*======================================
        CLICK EN LOS MANGOS
======================================*/

mangos.forEach((mango,index)=>{

mango.addEventListener("click",()=>{

    if(!iniciado) return;

    if(mango.dataset.opened) return;

    mango.dataset.opened=true;

    mangosAbiertos++;

    /* Animación */

    mango.style.animation="none";

    mango.style.transform="scale(.9) rotate(-15deg)";

    mango.style.opacity=".45";

    mango.style.filter="brightness(.75)";

    /* Mensaje */

    cambiarMensaje(index);

    /* Final */

    if(mangosAbiertos===5){

        setTimeout(finalHistoria,1000);

    }

});

});

/*======================================
        CAMBIAR MENSAJE
======================================*/

function cambiarMensaje(index){

mensaje.classList.remove("fade");

void mensaje.offsetWidth;

mensaje.classList.add("fade");

mensaje.innerHTML=`

<h2>

${mensajes[index].titulo}

</h2>

<p>

${mensajes[index].texto}

</p>

`;

}

/*======================================
        FINAL
======================================*/

function finalHistoria(){

mensaje.classList.remove("fade");

void mensaje.offsetWidth;

mensaje.classList.add("fade");

mensaje.innerHTML=`

<h2>

🎂 ¡Feliz Cumpleaños Sofía!

</h2>

<p>

Encontraste todos los mangos del árbol.

Pero la aventura todavía no termina...

Muy pronto descubrirás la siguiente sorpresa. 💛🥭

</p>

`;

}

/*======================================
        EFECTO HOVER
======================================*/

mangos.forEach(mango=>{

mango.addEventListener("mouseenter",()=>{

    if(mango.dataset.opened) return;

    mango.style.transform="scale(1.12)";

});

mango.addEventListener("mouseleave",()=>{

    if(mango.dataset.opened) return;

    mango.style.transform="";

});

});

/*======================================
        TECLAS
======================================*/

document.addEventListener("keydown",(e)=>{

if(e.code==="Space"){

e.preventDefault();

playBtn.click();

}

if(e.key==="ArrowRight"){

nextBtn.click();

}

if(e.key==="ArrowLeft"){

prevBtn.click();

}

});