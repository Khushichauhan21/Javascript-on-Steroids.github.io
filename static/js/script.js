//Challenge 1:Your Age In Days
function ageIndays(){
    var birthYear=prompt("Which year you were born... good Freind?");
    var currentYear=prompt("Current Year my freind?");
    var ageIndayss=(currentYear-birthYear)*365;
     var h1 = document.createElement('h1');
     var textAnswer =document.createTextNode('You are'+' ' + ageIndayss + ' ' + 'days old.');
     h1.setAttribute('id','ageIndays');
     h1.appendChild(textAnswer);
     document.getElementById('flex-box-result').appendChild(h1);
   
}

function reset(){
        document.getElementById('ageIndays').remove();
    }

    //Challenge 2: generator cat
     function generatecat(){
       var image= document.createElement('img');
       var div =document.getElementById("flex-cat-gen");
       image.src="http://thecatapi.com/api/images/get?format=src&type=gif&size=small";
     div.appendChild(image);
       
     }

 //Challenge 3:Rock , Paper,scissors
     function rpsGame(yourChoice){
        console.log(yourChoice);

      var humanChoice, botChoice;
       humanChoice=yourChoice.id;
       botChoice=numberToChoice(randToRpsInt());
      console.log('computerChoice:',botChoice);
  
    results= decideWinner(humanChoice,botChoice);// [0,1] human lost| bot won
    console.log(results);

   message= finalMessage(results);//{'message':"You won!" , color'green'}
   console.log(message);

     rpsFrontEnd(yourChoice.id,botChoice,message);

     }


     function randToRpsInt(){
       return Math.floor(Math.random()*3);
     }

function numberToChoice(number){
  return ['rock','paper','scissors'][number];
}

function decideWinner(yourChoice,computerChoice){
  var rpsDatabase={
    'rock':{'scissors':1,'rock':0.5,'paper':0},
    'paper':{'rock':1,'paper':0.5,'scissors':0},
    'scissors':{'paper':1,'scissors':0.5,'rock':0},
  }
  var yourScore=rpsDatabase[yourChoice][computerChoice];
  var computerScore=rpsDatabase[computerChoice][yourChoice];
  return [yourScore ,computerScore];
}

function finalMessage([yourScore,computerScore]){

  if(yourScore===0){
    return {'message':'You lost!','color':'red'};
  }
 else if(yourScore==0.5){
   return{ 'message':'tied','color':'yellow'};
 }
 else{
   return {'message':'You won!', 'color':'green'};
 }
}

function rpsFrontEnd(humanImageChoice,botImageChoice,finalMessage){
  var imagesDatabase= {
    'rock':document.getElementById('rock').src,
    'paper':document.getElementById('paper').src,
    'scissors':document.getElementById('scissors').src

  }

//let's remove all the images
document.getElementById('rock').remove();
document.getElementById('paper').remove();
document.getElementById('scissors').remove();

var humanDiv=document.createElement('div');
var botDiv=document.createElement('div');
var messageDiv=document.createElement('div');


humanDiv.innerHTML="<img src='" + imagesDatabase[humanImageChoice] + "' height=150 width=150 style='box-shadow:0px 10px 50px rgba(37,50,233,1);' >"
messageDiv.innerHTML="<h1 style='color:"+finalMessage['color']+";font-size:60px;padding:30px;'>"+finalMessage['message']+"</h1"
botDiv.innerHTML="<img src='" + imagesDatabase[botImageChoice] + "' height=150 width=150 style='box-shadow:0px 10px 50px rgba(243,38,24,1);' >"

document.getElementById('flex-box-rps-div').appendChild(humanDiv);
document.getElementById('flex-box-rps-div').appendChild(messageDiv);
document.getElementById('flex-box-rps-div').appendChild(botDiv);



}


// Challenge 4: change the color of all buttons
var all_buttons=document.getElementsByTagName('button');


// duplicate of all buttons
var copyAllButtons=[]
for( let i=0;i<all_buttons.length;i++){
  copyAllButtons.push(all_buttons[i].classList[1]);
}
console.log(copyAllButtons);

function buttonColorChange(buttonThingy){
 if(buttonThingy.value==='red'){
   buttonsRed();

 }
 else if(buttonThingy.value==='green'){
 buttonsGreen();
 }
 else if(buttonThingy.value==='reset'){
buttonColrReset();
 }
 else if(buttonThingy.value==='random'){
randomColors();
 }
}

function buttonsRed(){
  for( let i=0;i<all_buttons.length;i++){
    all_buttons[i].classList.remove(all_buttons[i].classList[1]);
    all_buttons[i].classList.add("btn-danger");
  }
}

function buttonsGreen(){
  for(let i=0;i<all_buttons.length;i++){
    all_buttons[i].classList.remove(all_buttons[i].classList[1]);
    all_buttons[i].classList.add("btn-success");
  }
}

function buttonColrReset(){
  for(let i=0;i<all_buttons.length;i++){
    all_buttons[i].classList.remove(all_buttons[i].classList[1]);
    all_buttons[i].classList.add(copyAllButtons[i]);
  }

}

function randomColors(){
 
  let choices =['btn-primary','btn-danger','btn-success','btn-warning'];
  for(let i=0;i<all_buttons.length;i++){
    let randomNumber=Math.floor(Math.random()*4);
    all_buttons[i].classList.remove(all_buttons[i].classList[1]);
    all_buttons[i].classList.add(choices[randomNumber]);

  }
}


//challenge 5:Blackjack
//track for all important element(retrieval)

let BlackjackGame={
  'you':{'scoreSpan':'#your-blackjack-result','div':'#your-box','score':0},
  'dealer':{'scoreSpan':'#dealer-blackjack-result','div':'#dealer-box','score':0},
  'cards':['2','3','4','5','6','7','8','9','10','K','J','Q','A'],
  'cardsMap':{'2':2,'3':3,'4':4,'5':5,'6':6,'7':7,'8':8,'9':9,'10':10,'K':11,'J':11,'Q':11,'A':[1,11]},
  'wins':0,
  'losses':0,
  'draws':0,
  'isStand':false,
  'turnOvers':false,
}
//creating constant object of retrieval 
const YOU=BlackjackGame['you'];
const DEALER=BlackjackGame['dealer'];

const hitSound=new Audio('static/sounds/swish.m4a');
const winSound=new Audio('static/sounds/cash.mp3');
const lossSound=new Audio('static/sounds/aww.mp3')

document.querySelector('#blackjack-hit-button').addEventListener('click',blackjackHit);

document.querySelector('#blackjack-deal-button').addEventListener('click',blackjackDeal);

document.querySelector('#blackjack-stand-button').addEventListener('click',dealerLogic);

function blackjackHit()
{// the time the stand node is not activated
if(BlackjackGame['isStand']===false){
  let card= randomCard();
  console.log(card);
  showCard(card,YOU);
  updateScore(card,YOU);
  showScore(YOU);
}


}

function randomCard(){
  let randomIndex=Math.floor(Math.random()*13);
  return BlackjackGame['cards'][randomIndex];
}

 function showCard(card ,activePlayer){
   if(activePlayer['score']<=21){
    let cardImage=document.createElement('img');
    cardImage.src=`static/images/${card}.png`;
    document.querySelector(activePlayer['div']).appendChild(cardImage);
    hitSound.play();
   }

 }


 function blackjackDeal(){

  if(BlackjackGame['turnOvers'] === true){

  BlackjackGame['isStand']=false;
   let yourImages=document.querySelector("#your-box").querySelectorAll('img');
   let dealerImages=document.querySelector("#dealer-box").querySelectorAll('img');

   console.log(yourImages);
   console.log(dealerImages);

   for(i=0;i<yourImages.length;i++){
   yourImages[i].remove();
  
   }

   for(i=0;i<dealerImages.length;i++){
    dealerImages[i].remove();
   
   
    }
 YOU['score']=0;
 DEALER['score']=0;


 document.querySelector('#your-blackjack-result').textContent=0;
 document.querySelector('#dealer-blackjack-result').textContent=0;

 document.querySelector('#your-blackjack-result').style.color='#ffffff';
 document.querySelector('#dealer-blackjack-result').style.color='#ffffff';


 document.querySelector('#blackjack-result').textContent="let's play";
 document.querySelector('#blackjack-result').style.color='black';

 BlackjackGame['turnOvers']=true;//restart the game
 
  }
 

}


function updateScore(card,activePlayer){
  if (card ==='A'){
  //if adding 11 keeps me below 21, add 11, otherwise ,add 1
  if (activePlayer['score']+BlackjackGame['cardsMap'][card][1] <=21){
    activePlayer['score'] += BlackjackGame['cardsMap'][card][1];

  }
  else {
    activePlayer['score']+=BlackjackGame['cardsMap'][card][0];
  }

}
else{
  activePlayer['score']+=BlackjackGame['cardsMap'][card];
}


 
}


function showScore(activePlayer){
  if(activePlayer['score']>21){
    document.querySelector(activePlayer['scoreSpan']).textContent="BUST!";
    document.querySelector(activePlayer['scoreSpan']).style.color='red';
  }
  else{
    document.querySelector(activePlayer['scoreSpan']).textContent=activePlayer['score'];
  }
 

}

function sleep(ms){
  return new Promise(resolve => setTimeout(resolve,ms));
}

async function dealerLogic(){
  BlackjackGame['isStand']=true;//stand note has been activated

  while(DEALER['score']<16&& BlackjackGame['isStand'] === true){
 let card=randomCard();
 showCard(card,DEALER);
 updateScore(card,DEALER);
 showScore(DEALER);
 
 await sleep(1000);
  }

// if(DEALER['score']>15){
  BlackjackGame['turnOvers']=true;//all turns are over
  let Winner=computeWinner();
  showResult(Winner);
  // console.log(BlackjackGame['turnOvers']);

 
}


//compute Winner and return who just won
//update the wins,draws and losses

function computeWinner(){
  let Winner;
  if(YOU['score']<=21){
    //condition higher score than dealer or when dealer bust you're at 21
   if(YOU['score']>DEALER['score']||DEALER['score']>21){
     BlackjackGame['wins']++;
     Winner=YOU;
   }
   else if(YOU['score']<DEALER['score']){
     BlackjackGame['losses']++;
     Winner=DEALER;
   }
   else if(YOU['score']===DEALER['score']){
    BlackjackGame['draws']++;
   }
  }

  //condition:when user bust dealer doesn't
else if(YOU['score']>21 && DEALER['score']<=21){
  BlackjackGame['losses']++;
  Winner=DEALER;
} 

//condition:When you AND dealer busts

else if(YOU['score']>21 && DEALER['score']>21){
  BlackjackGame['draws']++;
}

console.log(BlackjackGame);
return Winner;


}


function showResult(Winner){
  //show the result until all the turns are over
  if(BlackjackGame['turnOvers']===true){

  
  let message , messageColor;
  if(Winner===YOU){
    document.querySelector('#wins').textContent=BlackjackGame['wins'];
    message='You Won!';
    messageColor='green';
    winSound.play();

  }
  else if(Winner===DEALER){
    document.querySelector('#losses').textContent=BlackjackGame['losses'];
    message='You lost !';
    messageColor='red';
    lossSound.play();

  }
  else{
    document.querySelector('#draws').textContent=BlackjackGame['draws'];
    message='You drew!';
    messageColor='black';
  

  }
  document.querySelector('#blackjack-result').textContent=message;
  document.querySelector('#blackjack-result').style.color=messageColor;
  }
}




