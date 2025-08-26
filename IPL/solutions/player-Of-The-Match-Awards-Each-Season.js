
const matches = require('../jsonDB/matches.json');


function player_Of_The_Match_Awards_Each_Season() {
        let obj = {};
        
        for(let match of matches) {

            const season = match.season;
            const playerOfMatch = match.player_of_match;

            if(!obj[season]) {
                obj[season] = {}
            }

            if(!obj[season][playerOfMatch]) {
                obj[season][playerOfMatch] = 0
            }

            obj[season][playerOfMatch]++

        }

        return obj;
       
}

console.log(player_Of_The_Match_Awards_Each_Season())

/*
 {
   2007 : {
    BB McCullum : 3,
    MEK Hussey : 5
   },
   2008 : {
     MF Maharoof : 10
   }
 }

*/