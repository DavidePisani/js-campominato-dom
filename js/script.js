// Consegna
// L'utente indica un livello di difficoltà in base al quale viene generata una griglia di gioco quadrata, 
// in cui ogni cella contiene un numero tra quelli compresi in un range:
// con difficoltà 1 => tra 1 e 100
// con difficoltà 2 => tra 1 e 81
// con difficoltà 3 => tra 1 e 49
// Il computer deve generare 16 numeri casuali nello stesso range della difficoltà prescelta: le bombe.
// I numeri nella lista delle bombe non possono essere duplicati.
// In seguito l'utente clicca su una cella: se il numero è presente nella lista dei numeri generati
//  - abbiamo calpestato una bomba - 
// la cella si colora di rosso e la partita termina, 
// altrimenti la cella cliccata si colora di azzurro e l'utente può continuare a cliccare sulle altre celle.
// La partita termina quando il giocatore clicca su una bomba 
// o raggiunge il numero massimo possibile di numeri consentiti.
// Al termine della partita il software deve comunicare il punteggio,
// cioè il numero di volte che l’utente ha cliccato su una cella che non era una bomba.

const playBtn = document.getElementById("play-btn");
playBtn.addEventListener('click', startGame);

function startGame (){

  const dimensionGrid = document.getElementById("main-grid")
  const userMessage = document.querySelector('#user-message')
  // reset
  dimensionGrid.innerHTML = ''

    // numero di bombe 
    const numBombs = 16
    const userLevel = document.getElementById('level-game').value
    console.log(userLevel)
    let gameRange;
    let mainClass
    if (userLevel === '1'){
        gameRange = 100
        mainClass = 'easy'
    }else if (userLevel === '2'){
        gameRange = 81
        mainClass = 'medium'
    } else if (userLevel === '3') {
        gameRange = 49
        mainClass = 'hard'
    } 

    // numero tentativi 
    const gameAttempts = numBombs - gameRange
    
    // richichiamo il generatore di bombe    
    bombs = randomBombsGenerate (numBombs, 1, gameRange)
    console.log(bombs)

    // creo un arrey per calcolare quanti numeri inserisce l'utente
    // se il numero indicato dall'utente è nell'arrey hai perso
    // altrimenti lo pushi nell'arrey 
    const rightNumbers = []
    console.log(rightNumbers)

    // genero la griglia
    generateGrid()

    function generateGrid(){
      dimensionGrid.classList.add(mainClass);

      for(let i = 1; i <= gameRange; i++ ) {
        // creo cella
        // <!-- <div class="square"><span>1</span></div> -->
        const newSquare = document.createElement('div');
        // popolare il numero
        newSquare.innerHTML = `<span>${i}</span>`;
        // Aggiungere la classe square
        newSquare.classList.add('square');
        newSquare.classList.add(mainClass);
        // richiamo la funzione peri il ceck degli sqere
        newSquare.addEventListener ( 'click', checkClick)
        // appendo
        dimensionGrid.append(newSquare)       
      }
      
    }

    function checkClick(){
   
  let userNumber = parseInt(this.querySelector('span').innerHTML);
      if(bombs.includes(userNumber)){ 
        this.classList.add('red');
        userMessage.innerHTML = `ops sei ESPLOSO!!, hai utilizzato ${rightNumbers} tentativi.`;  
    } else {

            if(!rightNumbers.includes (userNumber)){
                rightNumbers.push(userNumber)
                this.classList.add('blue');
            }
            
            if(rightNumbers.length === gameAttempts){
                 userMessage.innerHTML = `Hai VINTO,non sei ESPLOSO!!, hai utilizzato il massimo dei tentativi: ${rightNumbers}`;
             }            
    }                   
      this.style.pointerEvents = 'none';
   
    }

    





  }
       /*--------------
        FUNZIONI
   ----------------- */ 

// mi creo un arrey dove andro ad inserire le 16 bombe generate casualmente senza duplicati 
// rangeMin = 1 da dove deve iniziare la generazione di numeri 
// rangeMax = gameRange ( range massimo di numeri generati in base al livello )

function randomBombsGenerate(numBomb, minRange, maxRange) {

    // creo arrey
    const bombArrey = [];
     
    while(bombArrey.length < numBomb){
        // richiamo la funzione per generare numeri 
      let randomBombs = bombsGen(minRange, maxRange)
      // controlla se quel numero è stato già inserito in bombsArrey
      if(!bombArrey.includes(randomBombs)){
        bombArrey.push(randomBombs)
      }
    }
    return bombArrey;
  }

// funzione per generare numeri random 
function bombsGen(min, max) {  
 return Math.floor(Math.random() * (max - min + 1) ) + min; }

