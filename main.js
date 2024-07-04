import { connect } from "./helpers/db/connect.js";


import { getCountDvd,
    getTotalDVDCopies,
    getUniqueGenresSorted,
    getMoviesForActor
} from "./js/model/movies.js";


import {
    getOscarWinners,
    getActorsWithAwardCount,
    getActorsBornAfter1980,
    getActorWithMostAwards
} from "./js/model/authors.js";



// console.log (await getCountDvd());


// Desarrollo Actividad Blockbuster

// console.log (await getTotalDVDCopies());

// console.log (await getOscarWinners());

// console.log (await getActorsWithAwardCount());

// console.log (await getActorsBornAfter1980());

// console.log (await getActorWithMostAwards());

// console.log (await getUniqueGenresSorted());

console.log (await getMoviesForActor());