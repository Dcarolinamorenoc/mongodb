import { connect } from "./helpers/db/connect.js";


import { getCountDvd,
    getAllDVDTotalCopies

} from "./js/model/movies.js";


// console.log (await getCountDvd());


// Desarrollo Actividad Blockbuster

console.log (await getAllDVDTotalCopies());