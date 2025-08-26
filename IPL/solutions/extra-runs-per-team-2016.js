const matches = require('../jsonDB/matches.json');
const deliveries = require('../jsonDB/deliveries.json');

function extra_runs_per_team_2016() {
    let matchIds = [];

    for(let match of matches) {
        if(match["season"] === "2016") {
            matchIds.push(match["id"])
        }
    }

    let extraRuns = 0

    for(let delivery of deliveries) {
        if(matchIds.includes(delivery['match_id'])) {
            extraRuns = extraRuns + (+delivery['extra_runs'])
        }
    }


   return {
    extraRuns
   }
}

console.log(extra_runs_per_team_2016())

/*

{
   extraRuns : 100
}

*/