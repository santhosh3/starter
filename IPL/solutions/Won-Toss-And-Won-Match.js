const matches = require('../jsonDB/matches.json');


function Won_Toss_And_Won_Match() {
    let obj = {};

    for(let match of matches) {
        const winner = match['winner'];
        const tossWinner = match['toss_winner'];
        if(winner === tossWinner) {
            if(!obj[winner]) {
                obj[winner] = 0
            }
            obj[winner]++
        }
    }
    return obj
}

console.log(Won_Toss_And_Won_Match());


/*
  {
   "team" : 12
  }
*/