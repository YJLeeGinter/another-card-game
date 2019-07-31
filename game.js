var rivalHero = document.getElementById('rival-hero');
var myHero = document.getElementById('my-hero');
var rivalDeck = document.getElementById('rival-deck');
var myDeck = document.getElementById('my-deck');
var rivalField = document.getElementById('rival-cards');
var myField = document.getElementById('my-cards');
var rivalCost = document.getElementById('rival-cost');
var myCost = document.getElementById('my-cost');
var turnBtn = document.getElementById('turn-btn');
var rivalDeckData = [];
var myDeckData = []; 
var rivalHeroData;
var myHeroData;
var rivalFieldData = [];
var myFieldData = [];
var turn = true; // true for my turn

function connectCardAndDom(data, dom, hero){
    var card = document.querySelector('.card-hidden .card').cloneNode(true);
    card.querySelector('.card-cost').textContent = data.cost;
    card.querySelector('.card-att').textContent = data.att;
    card.querySelector('.card-hp').textContent = data.hp;
    if(hero){
        card.querySelector('.card-cost').style.display = 'none';
        var name = document.createElement('div');
        name.textContent = 'Hero';
        card.appendChild(name);
    }
    card.addEventListener('click', function(){
        if(turn){ //  my turn
            if(!data.mine){ // but clicked the rival's card
                return;
            }
            var currentCost = Number(myCost.textContent);
            if(currentCost < data.cost){
                return;
            }
            if(data)    
            var idx = myDeckData.indexOf(data);
            myDeckData.splice(idx,1);
            myFieldData.push(data);
            console.log(myDeckData, myFieldData);
            myDeck.innerHTML = '';
            myField.innerHTML = '';
            myFieldData.forEach(function(data){
                connectCardAndDom(data, myField);
            });
            myDeckData.forEach(function(data){
                connectCardAndDom(data, myDeck);
            });
         myCost.textContent = currentCost - data.cost;
        } else{ // rival's turn
         if(data.mine){ // but clicked my turn
             return;
         }
         var currentCost = Number(rivalCost.textContent);
         if(currentCost < data.cost){
             return;
         }
            var idx = rivalDeckData.indexOf(data);
            rivalDeckData.splice(idx,1);
            rivalFieldData.push(data);
            rivalDeck.innerHTML = '';
            rivalField.innerHTML = '';
            rivalFieldData.forEach(function(data){
                connectCardAndDom(data, rivalField);
            });
            rivalDeckData.forEach(function(data){
                connectCardAndDom(data, rivalDeck);
            });
            myCost.textContent = currentCost - data.cost;

        }
    });

    dom.appendChild(card);
}

function createRivalDeck(num){
    for(var i = 0; i < num ; i++){
        rivalDeckData.push(makeCards());
    }
    rivalDeckData.forEach(function(data){
        connectCardAndDom(data, rivalDeck);
    })
}

function createMyDeck(num){
    for(var i = 0; i < num ; i++){
        myDeckData.push(makeCards(false, true));
    }
    myDeckData.forEach(function(data){
        connectCardAndDom(data, myDeck);
    }) 
}

function createMyHero(){
   myHeroData =  makeCards(true, true);
   connectCardAndDom(myHeroData, myHero, true);
}

function createRivalHero(){
    rivalHeroData = makeCards(true);
   connectCardAndDom(rivalHeroData, rivalHero, true);
}

function Card(hero, myCard){  
    if(hero){
        this.att = Math.ceil(Math.random()* 2);
        this.hp = Math.ceil(Math.random()*5)+25;
        this.hero = true;

    } else{
        this.att = Math.ceil(Math.random()* 5);
        this.hp = Math.ceil(Math.random()*5);
        this.cost = Math.floor((this.att + this.hp) /2);
    }

    if(myCard){
        this.mine = true;
    }
      
}

function makeCards(hero, myCard){
    return new Card(hero, myCard);
}

function initialSetup(){

    createRivalDeck(5);
    createMyDeck(5);
    createMyHero();
    createRivalHero();

}

turnBtn.addEventListener('click', function(){
    turn = !turn;
    document.getElementById('rival').classList.toggle('turn');
    document.getElementById('my').classList.toggle('turn');
});

initialSetup(); 