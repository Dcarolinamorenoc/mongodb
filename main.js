import { connect } from "./helpers/db/connect.js";
import util from 'util';


import { getCountDvd,
    getTotalDVDCopies,
    getUniqueGenresSorted,
    getMoviesForActor,
    getTotalValueOfDVDs,
    getMoviesWithJohnDoeActing,
    getMoviesWithMainCharacters,
    getTotalAwards,
    getMoviesByActorAndFormat,
    getSciFiMoviesByActor,
    getTopDVDCopiesMovie,
    getTotalBlurayValue
} from "./js/model/movies.js";


import {
    getOscarWinners,
    getActorsWithAwardCount,
    getActorsBornAfter1980,
    getActorWithMostAwards,
    getTotalActorsCount,
    getAverageActorAge,
    getActorsWithInstagram,
    getActorsRecentAwardsAfter2015
} from "./js/model/authors.js";



// console.log (await getCountDvd());




// Desarrollo Actividad Blockbuster


// 1. Contar el número total de copias de DVD disponibles en todos los registros

// console.log (await getTotalDVDCopies());


// 2.Encontrar todos los actores que han ganado premios Oscar

// console.log (await getOscarWinners());


// 3.Encontrar la cantidad total de premios que ha ganado cada actor

// console.log (await getActorsWithAwardCount());


// 4.Obtener todos los actores nacidos después de 1980

// console.log (await getActorsBornAfter1980());


// 5. Encontrar el actor con más premios

// console.log (await getActorWithMostAwards());


// 6.Listar todos los géneros de películas distintos

// console.log (await getUniqueGenresSorted());


// 7.Encontrar películas donde el actor con id 1 haya participado

// let { movies_for_actor } = await getMoviesForActor();
// console.log(movies_for_actor);


// 8.Calcular el valor total de todas las copias de DVD disponibles

// console.log (await getTotalValueOfDVDs());


// 9.Encontrar todas las películas en las que John Doe ha actuado

// let { movies_for_actor } = await getMoviesWithJohnDoeActing();
// console.log(movies_for_actor);


// 10. Encontrar el número total de actores en la base de datos

// console.log (await getTotalActorsCount());


// 11.Encontrar la edad promedio de los actores en la base de datos

// console.log (await getAverageActorAge());


// 12.Encontrar todos los actores que tienen una cuenta de Instagram

// let { actors_with_instagram } = await getActorsWithInstagram();
// console.log(actors_with_instagram);


// 13.Encontrar todas las películas en las que participan actores principales

// let { movies_with_main_characters } = await getMoviesWithMainCharacters();
// console.log(util.inspect(movies_with_main_characters, { depth: null, colors: true }));


// 14.Encontrar el número total de premios que se han otorgado en todas las películas

// console.log (await getTotalAwards());


// 15.Encontrar todas las películas en las que John Doe ha actuado y que estén en formato Blu-ray

// console.log (await getMoviesByActorAndFormat());


// 16.Encontrar todas las películas de ciencia ficción que tengan al actor con id 3

// console.log (await getSciFiMoviesByActor());


// 17. Encontrar la película con más copias disponibles en formato DVD

// console.log (await getTopDVDCopiesMovie());


// 18. Encontrar todos los actores que han ganado premios después de 2015

// console.log (await getActorsRecentAwardsAfter2015());


// 19. Calcular el valor total de todas las copias de Blu-ray disponibles

console.log (await getTotalBlurayValue());