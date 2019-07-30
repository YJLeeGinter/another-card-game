var rivalHero = document.getElementById('rival-hero');
var myHero = document.getElementById('my-hero');
var rivalDeck = document.getElementById('rival-deck');
var myDeck = document.getElementById('my-deck');
var rivalDeckData = [];
var myDeckData = [];
var rivalHeroData;
var myHeroData;

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
        myDeckData.push(makeCards());
    }
    myDeckData.forEach(function(data){
        connectCardAndDom(data, myDeck);
    }) 
}

function createMyHero(){
   myHeroData =  makeCards(true);
   connectCardAndDom(myHeroData, myHero, true);
}

function createRivalHero(){
    rivalHeroData = makeCards(true);
   connectCardAndDom(rivalHeroData, rivalHero, true);
}

function Card(hero){  
    if(hero){
        this.att = Math.ceil(Math.random()* 2);
        this.hp = Math.ceil(Math.random()*5)+25;
        this.hero = true;

    } else{
        this.att = Math.ceil(Math.random()* 5);
        this.hp = Math.ceil(Math.random()*5);
        this.cost = Math.floor((this.att + this.hp) /2);
    }
      
}

function makeCards(hero){
    return new Card(hero);
}

function initialSetup(){

    createRivalDeck(5);
    createMyDeck(5);
    createMyHero();
    createRivalHero();

}

initialSetup(); 