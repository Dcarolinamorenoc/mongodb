

import { connect } from "../../helpers/db/connect.js"

export class movis extends connect {
    static instanceMovis;
    db;
    collection;

    constructor(){
        if (movis.instanceMovis){
            return movis.instanceMovis;
        }
        super();
        this.db = this.conexion.db(this.getDbName);
        this.collection = this.db.collection('movis');
        movis.instanceMovis = this;
    }
    destructor(){
        movis.instanceMovis = undefined;
        connect.instanceConnect = undefined;
    }






    // 1.Contar el número total de copias de DVD disponibles en todos los registros:
    
    async getTotalDVDCopies() {
        await this.conexion.connect();
        const collection = this.db.collection('movis'); 
        const data = await collection.aggregate([
            { 
                "$unwind": "$format" 
            },
            { 
                "$match": { "format.name": "dvd" } 
            },
            {
                "$group": {
                    "_id": null,
                    "total_copies": { "$sum": "$format.copies" }
                }
            }
        ]).toArray();
        await this.conexion.close();
        return { DVDcopies: data[0]?.total_copies || 0 };
    }



    // 6.Listar todos los géneros de películas distintos

    async getUniqueGenresSorted(){
        await this.conexion.connect();
        const collection = this.db.collection('movis');
        const data = await collection.aggregate(
            [
                {
                    "$unwind": "$genre"
                },
                {
                    "$group": {
                        "_id": "$genre"
                    }
                },
                {
                    "$sort": { "_id": 1 }
                }
            ]
        ).toArray();
        await this.conexion.close();
        return data;
    }

}


































// ------------------------------------------------------------




// REALIZACION DE CONSULTAS SIN USAR CODE CLEAN



// import { connect } from "../../helpers/db/connect.js"
// import { ObjectId } from "mongodb";




// export const getCountDvd = async()=>{
//     let {db, conexion} = await connect.getinstance();

//     const collection = db.collection('movis');
//     const data = await collection.find(
//         {
//             format:{
//                 $elemMatch: {name: {$eq: "dvd"}}
//             }
//         }
//     ).toArray();
//     conexion.close();
//     return {countByMoviDVD: data.length};

// }




// // INICIO DE LAS CONSULTAS DE BLOCKBUSTER EN EL APARTADO DE MOVIES



// // 1.Contar el número total de copias de DVD disponibles en todos los registros:

// export const getTotalDVDCopies = async () => {
//     let { db, conexion } = await connect.getinstance();

//     const collection = db.collection('movis');
//     const pipeline = [
//         { 
//             "$unwind": "$format" 
//         },
//         { 
//             "$match": { "format.name": "dvd" } 
//         },
//         {
//             "$group": {
//                 "_id": null,
//                 "total_copies": { "$sum": "$format.copies" }
//             }
//         }
//     ];

//     const result = await collection.aggregate(pipeline).toArray();
//     conexion.close();
    
//     if (result.length > 0) {
//         return { total_dvd_copies: result[0].total_copies };
//     } else {
//         return { total_dvd_copies: 0 };
//     }
// }




// // 6.Listar todos los géneros de películas distintos

// export const getUniqueGenresSorted = async () => {
//     let { db, conexion } = await connect.getinstance();

//     const collection = db.collection('movis');
//     const pipeline = [
//         {
//             "$unwind": "$genre"
//         },
//         {
//             "$group": {
//                 "_id": "$genre"
//             }
//         },
//         {
//             "$sort": { "_id": 1 }
//         }
//     ];

//     const result = await collection.aggregate(pipeline).toArray();
//     conexion.close();
    
//     const genres = result.map(item => item._id);
    
//     return genres;
// }




// // 7.Encontrar películas donde el actor con id 1 haya participado

// export const getMoviesForActor = async () => {
//     let { db, conexion } = await connect.getinstance();

//     const collection = db.collection('movis');
//     const pipeline = [
//         {
//             $match: {
//                 "character.id_actor": 1
//             }
//         },
//         {
//             $project: {
//                 _id: 0,
//                 name: 1,
//                 genre: 1,
//                 "character": {
//                     $filter: {
//                         input: "$character",
//                         as: "char",
//                         cond: { $eq: ["$$char.id_actor", 1] }
//                     }
//                 },
//                 format: {
//                     $map: {
//                         input: "$format",
//                         as: "fmt",
//                         in: {
//                             name: "$$fmt.name",
//                             copies: "$$fmt.copies",
//                             value: "$$fmt.value"
//                         }
//                     }
//                 }
//             }
//         }
//     ];

//     const result = await collection.aggregate(pipeline).toArray();
//     conexion.close();
    
//     const formattedResult = result.map(movie => ({
//         name: movie.name,
//         genre: movie.genre.join(", "),
//         character: movie.character.map(char => ({
//             rol: char.rol,
//             apodo: char.apodo
//         })),
//         format: movie.format.map(fmt => `${fmt.name} (${fmt.copies} copies, $${fmt.value})`)
//     }));

//     return { movies_for_actor: formattedResult[0] }; 
// }





// // 8.Calcular el valor total de todas las copias de DVD disponibles

// export const getTotalValueOfDVDs = async () => {
//     let { db, conexion } = await connect.getinstance();

//     const collection = db.collection('movis');
//     const pipeline = [
//         {
//             "$unwind": "$format"
//         },
//         {
//             "$match": {
//                 "format.name": "dvd"
//             }
//         },
//         {
//             "$group": {
//                 "_id": null,
//                 "total_value": {
//                     "$sum": {
//                         "$multiply": ["$format.copies", "$format.value"]
//                     }
//                 }
//             }
//         },
//         {
//             "$project": {
//                 "_id": 0,
//                 "total_value": { "$round": ["$total_value", 1] } 
//             }
//         }
//     ];

//     const result = await collection.aggregate(pipeline).toArray();
//     conexion.close();
    
//     if (result.length > 0) {
//         return { total_value: result[0].total_value };
//     } else {
//         return { total_value: 0 };
//     }
// }




// // 9.Encontrar todas las películas en las que John Doe ha actuado

//     export const getMoviesWithJohnDoeActing = async () => {
//         let { db, conexion } = await connect.getinstance();
//         const collection = db.collection('movis');
//         const pipeline = [
//             {
//                 $match: {
//                     "character.id_actor": 1
//                 }
//             },
//             {
//                 $lookup: {
//                     from: "authors",
//                     localField: "character.id_actor",
//                     foreignField: "id_actor",
//                     as: "actor_info"
//                 }
//             },
//             {
//                 $project: {
//                     _id: 0,
//                     name: 1,
//                     genre: 1,
//                     character: {
//                         $filter: {
//                             input: "$character",
//                             as: "char",
//                             cond: { $eq: ["$$char.id_actor", 1] }
//                         }
//                     },
//                     format: {
//                         $map: {
//                             input: "$format",
//                             as: "fmt",
//                             in: {
//                                 name: "$$fmt.name",
//                                 copies: "$$fmt.copies",
//                                 value: "$$fmt.value"
//                             }
//                         }
//                     },
//                     actor_info: { $arrayElemAt: ["$actor_info", 0] }
//                 }
//             }
//         ];
    
//         const result = await collection.aggregate(pipeline).toArray();
//         conexion.close();
    
//         const formattedResult = result.map(movie => ({
//             name: movie.name,
//             genre: movie.genre.join(", "),
//             character: movie.character.map(char => ({
//                 rol: char.rol,
//                 apodo: char.apodo
//             })),
//             format: movie.format.map(fmt => `${fmt.name} (${fmt.copies} copies, $${fmt.value})`),
//             actor: {
//                 full_name: movie.actor_info.full_name,
//                 date_of_birth: movie.actor_info.date_of_birth,
//                 nationality: movie.actor_info.nationality
//             }
//         }));
    
//         return { movies_for_actor: formattedResult[0] };
//     }




// // 13.Encontrar todas las películas en las que participan actores principales


// export const getMoviesWithMainCharacters = async () => {
//     let { db, conexion } = await connect.getinstance();

//     const collection = db.collection('movis'); 

//     const pipeline = [
//         { "$unwind": "$character" },
//         { "$match": { "character.rol": "principal" } },
//         { 
//             "$group": { 
//                 "_id": "$_id", 
//                 "name": { "$first": "$name" }, 
//                 "actors": { 
//                     "$push": { 
//                         "name": "$character.apodo", 
//                         "rol": "$character.rol" 
//                     } 
//                 } 
//             } 
//         },
//         {
//             "$project": {
//                 "_id": 0,
//                 "id": { "$toString": "$_id" },
//                 "name": 1,
//                 "actors": 1
//             }
//         }
//     ];

//     const result = await collection.aggregate(pipeline).toArray();
//     conexion.close();

//     const formattedResult = result.map(movie => ({
//         id: movie.id,
//         name: movie.name,
//         actors: movie.actors
//     }));

//     return { 
//         movies_with_main_characters: formattedResult
//     };
// }



// // 14.Encontrar el número total de premios que se han otorgado en todas las películas

// export const getTotalAwards = async () => {
//     let { db, conexion } = await connect.getinstance();

//     const collection = db.collection('movis');
//     const pipeline = [
//         {
//             $unwind: "$character"
//         },
//         {
//             $lookup: {
//                 from: "authors",
//                 localField: "character.id_actor",
//                 foreignField: "id_actor",
//                 as: "movies_award"
//             }
//         },
//         {
//             $unwind: "$movies_award"
//         },
//         {
//             $unwind: "$movies_award.awards"
//         },
//         {
//             $group: {
//                 _id: null,
//                 total_award: { $sum: 1 }
//             }
//         }
//     ];

//     const result = await collection.aggregate(pipeline).toArray();
//     conexion.close();
    
//     if (result.length > 0) {
//         return { total_awards: result[0].total_award };
//     } else {
//         return { total_awards: 0 };
//     }
// }


// // 15.Encontrar todas las películas en las que John Doe ha actuado y que estén en formato Blu-ray

// export const getMoviesByActorAndFormat = async () => {
//     let { db, conexion } = await connect.getinstance();

//     const collection = db.collection('movis');
//     const pipeline = [
//         {
//             $lookup: {
//                 from: "authors",
//                 localField: "character.id_actor",
//                 foreignField: "id_actor",
//                 as: "actor_info"
//             }
//         },
//         {
//             $unwind: "$format"
//         },
//         {
//             $match: {
//                 "actor_info.full_name": "John Doe",
//                 "format.name": "Bluray"
//             }
//         },
//         {
//             $project: {
//                 _id: 0,
//                 actor_name: { $arrayElemAt: ["$actor_info.full_name", 0] },
//                 movie_name: "$name",
//                 format: "$format.name"
//             }
//         }
//     ];

//     const result = await collection.aggregate(pipeline).toArray();
//     conexion.close();
    
//     return result;
// };



// // 16.Encontrar todas las películas de ciencia ficción que tengan al actor con id 3

// export const getSciFiMoviesByActor = async () => {
//     let { db, conexion } = await connect.getinstance();

//     const collection = db.collection('movis');
//     const pipeline = [
//         {
//             $lookup: {
//                 from: "authors",
//                 localField: "character.id_actor",
//                 foreignField: "id_actor",
//                 as: "actor_info"
//             }
//         },
//         {
//             $unwind: "$genre"
//         },
//         {
//             $match: {
//                 genre: "Ciencia Ficción",
//                 "character.id_actor": 3
//             }
//         },
//         {
//             $project: {
//                 _id: 0,
//                 movie_name: "$name",
//                 actor_name: { $arrayElemAt: ["$actor_info.full_name", 2] },
//                 genre: 1
//             }
//         }
//     ];

//     const result = await collection.aggregate(pipeline).toArray();
//     conexion.close();
    
//     return result;
// };



// // 17. Encontrar la película con más copias disponibles en formato DVD

// export const getTopDVDCopiesMovie = async () => {
//     let { db, conexion } = await connect.getinstance();

//     const collection = db.collection('movis');
//     const pipeline = [
//         { 
//             $unwind: "$format" 
//         },
//         { 
//             $match: { "format.name": "dvd" } 
//         },
//         { 
//             $sort: { "format.copies": -1 } 
//         },
//         { 
//             $limit: 1 
//         },
//         {
//             $project: {
//                 _id: 1,
//                 name: 1,
//                 "format.copies": 1
//             }
//         }
//     ];

//     const result = await collection.aggregate(pipeline).toArray();
//     conexion.close();
    
//     return result;
// };


// // 19. Calcular el valor total de todas las copias de Blu-ray disponibles

// export const getTotalBlurayValue = async () => {
//     let { db, conexion } = await connect.getinstance();

//     const collection = db.collection('movis');
//     const pipeline = [
//         { 
//             $unwind: "$format" 
//         },
//         { 
//             $match: { "format.name": "Bluray" } 
//         },
//         {
//             $group: {
//                 _id: null,
//                 total_value: { $sum: { $multiply: ["$format.copies", "$format.value"] } }
//             }
//         }
//     ];

//     const result = await collection.aggregate(pipeline).toArray();
//     conexion.close();
    
//     if (result.length > 0) {
//         return { total_bluray_value: result[0].total_value };
//     } else {
//         return { total_bluray_value: 0 };
//     }
// };



// // 20.Encontrar todas las películas en las que el actor con id 2 haya participado

// export const getMoviesByActorId2 = async () => {
//     let { db, conexion } = await connect.getinstance();

//     const collection = db.collection('movis');
//     const pipeline = [
//         { 
//             $match: { "character.id_actor": 2 } 
//         },
//         {
//             $lookup: {
//                 from: "authors",
//                 localField: "character.id_actor",
//                 foreignField: "id_actor",
//                 as: "actors"
//             }
//         },
//         {
//             $project: {
//                 _id: 1,
//                 name: 1,
//                 actor_name: { $arrayElemAt: ["$actors.full_name", 1] }
//             }
//         }
//     ];

//     const result = await collection.aggregate(pipeline).toArray();
//     conexion.close();
    
//     return result;
// };
