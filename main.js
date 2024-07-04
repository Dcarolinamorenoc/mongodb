import { connect } from "./helpers/db/connect.js";


import { getCountDvd,
    getAllDVDTotalCopies

} from "./js/model/movies.js";


import {
    getOscarWinners,
    getActorsWithAwardCount
} from "./js/model/authors.js";



// console.log (await getCountDvd());


// Desarrollo Actividad Blockbuster

// console.log (await getAllDVDTotalCopies());

// console.log (await getOscarWinners());

console.log (await getActorsWithAwardCount());