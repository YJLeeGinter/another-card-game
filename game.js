var rival = {
    hero : document.getElementById('rival-hero'),
    deck : document.getElementById('rival-deck'),
    field : document.getElementById('rival-cards'),
    cost : document.getElementById('rival-cost'),
    deckData : [],
    heroData : [],
    fieldData : [],
    slectedCard : null,
    selectedCardData: null,
}

var me = {
    hero : document.getElementById('my-hero'),
    deck : document.getElementById('my-deck'),
    field : document.getElementById('my-cards'),
    cost : document.getElementById('my-cost'),
    deckData : [],
    heroData : [],
    fieldData : [],
    selectedCard: null,
    selectedCardData : null,
}

var turnBtn = document.getElementById('turn-btn');
var turn = true; // true for my turn

function moveDeckToField(data, myTurn){
    
    var obj = myTurn? me : rival;
   
    var currentCost = Number(obj.cost.textContent);
    if(currentCost < data.cost){
    return 'end';
    }

    var idx = obj.deckData.indexOf(data);
    obj.deckData.splice(idx,1);
    obj.fieldData.push(data);
    drawFieldAgain(obj);
    drawDeckAgain(obj);
    data.field = true; // 참조관계 이용
    obj.cost.textContent = currentCost - data.cost;
}

function drawFieldAgain(obj){
    obj.field.innerHTML = '';
    obj.fieldData.forEach(function(data){
        connectCardAndDom(data, obj.field);
    });
}

function drawDeckAgain(obj){
    obj.deck.innerHTML = '';
    obj.deckData.forEach(function(data){
        connectCardAndDom(data, obj.deck);
        });
}

function drawHeroAgain(obj){
    obj.hero.innerHTML = '';
    connectCardAndDom(obj.heroData, obj.hero, true);
}

function drawScreenAgain(myScreen){
    var obj = myScreen? me : rival;
    drawFieldAgain(obj);
    drawDeckAgain(obj);
    drawHeroAgain(obj);
}

function performTurnAction(card, data, myTurn){
    var ally = myTurn? me : rival;
    var enemy = myTurn? rival: me;
    if(card.classList.contains('card-turnover')){
        return;
    }

    var enemyCard = myTurn? !data.mine : data.mine;
    if( enemyCard && ally.selectedCard ){ 
        // but I clicked rival card, my card is selected and 턴이 끝난 카드가 아니면 상대를 공격
        data.hp = data.hp - ally.selectedCardData.att;
        if(data.hp <=0){ // when the card is dead
            var index = enemy.fieldData.indexOf(data);
            if(index > -1){
                enemy.fieldData.splice(index,1);
            } else{ // when the hero is dead
                alert('You won!');
            initialSetup();
            }
        }
        drawScreenAgain(!myTurn);
        ally.selectedCard.classList.remove('card-selected');
        ally.selectedCard.classList.add('card-turnover');
        ally.selectedCard = null;
        ally.selectedCardData = null;
        return;
    } else if(enemyCard){ // but clicked the rival's card or when a card is in the field
    return;
   }

if(data.field){  // when the card is on the field
    card.parentNode.querySelectorAll('.card-selected').forEach(function(card){
            card.classList.remove('card-selected');
        });
    card.classList.add('card-selected');
    ally.selectedCard = card;
    ally.selectedCardData = data;

} else{ // when the card is on the deck
    
    if(moveDeckToField(data, myTurn) !== 'end') {
       myTurn? createMyDeck(1) : createRivalDeck(1);   
      }
} 
}

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
        performTurnAction(card, data, turn);        
    });

    dom.appendChild(card);
}

function createRivalDeck(num){
    for(var i = 0; i < num ; i++){
        rival.deckData.push(makeCards());
    }
   drawDeckAgain(rival);
}

function createMyDeck(num){
    for(var i = 0; i < num ; i++){
        me.deckData.push(makeCards(false, true));
    }
    drawDeckAgain(me);
}

function createMyHero(){
   me.heroData =  makeCards(true, true);
   connectCardAndDom(me.heroData, me.hero, true);
}

function createRivalHero(){
    rival.heroData = makeCards(true);
   connectCardAndDom(rival.heroData, rival.hero, true);
}

function Card(hero, myCard){  
    if(hero){
        this.att = Math.ceil(Math.random()* 2);
        this.hp = Math.ceil(Math.random()*5)+25;
        this.hero = true;
        this.field = true;

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
    drawScreenAgain(true);
    drawScreenAgain(false);
}

turnBtn.addEventListener('click', function(){
    var obj = turn? me : rival;

    drawFieldAgain(obj);    
    drawHeroAgain(obj);

    turn = !turn; // code to change tunrs
    if(turn){
        me.cost.textContent = 10;
    } else{
        rival.cost.textContent = 10;
    }
    document.getElementById('rival').classList.toggle('turn');    
    document.getElementById('my').classList.toggle('turn');
    
   
});

initialSetup(); 