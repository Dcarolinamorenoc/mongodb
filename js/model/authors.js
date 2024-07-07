

import { connect } from "../../helpers/db/connect.js"


export class authors extends connect{
    static instanceauthors;
    db
    constructor() {
        super();
        this.db = this.conexion.db(this.getDbName);
        if (typeof authors.instanceauthors === 'object') {
            return authors.instanceauthors;
        }
        authors.instanceauthors = this;
        return this;
    }


    destructor() {
      authors.instanceauthors=undefined
      connect.instanceConnect= undefined
}




    // 2.Encontrar todos los actores que han ganado premios Oscar
    
    async getOscarWinners(){
        await this.conexion.connect();
        const collection = this.db.collection('authors');
        const data = await collection.aggregate(
            [
                {
                    "$unwind": "$awards"
                },
                {
                    "$match": { "awards.name": "Oscar Award" }
                },
                {
                    "$project": {
                        "_id": 0,
                        "id_actor": 1,
                        "full_name": 1,
                        "awards": 1
                    }
                }
            ]
        ).toArray();
        await this.conexion.close();
        return data;
    }



    // 3.Encontrar la cantidad total de premios que ha ganado cada actor

    async getActorsWithAwardCount(){
        await this.conexion.connect();
        const collection = this.db.collection('authors');
        const data = await collection.aggregate(
            [
                {
                    "$project": {
                        "id_actor": 1,
                        "full_name": 1,
                        "total_awards": { "$size": "$awards" }
                    }
                }
            ]
        ).toArray();
        await this.conexion.close();
        return data;
    }




    // 4.Obtener todos los actores nacidos después de 1980

    async getActorsBornAfter1980(){
        await this.conexion.connect();
        const collection = this.db.collection('authors');
        const data = await collection.aggregate(
            [
                {
                  $match: {
                    "date_of_birth": {$gt: "1980-01-01"}
                  }
                },
                {
                  "$project": {
                    "_id": 0,
                    "id_actor": 1,
                    "full_name": 1,
                    "date_of_birth": 1
                  }
                }
              ]
        ).toArray();
        await this.conexion.close();
        return data;
    }



    // 5.Encontrar el actor con más premios

    async getActorWithMostAwards(){
        await this.conexion.connect();
        const collection = this.db.collection('authors');
        const data = await collection.aggregate(
            [
                {
                    "$project": {
                        "id_actor": 1,
                        "full_name": 1,
                        "total_awards": { "$size": "$awards" }
                    }
                },
                {
                    "$sort": { "total_awards": -1 }
                },
                {
                    "$limit": 1
                }
            ]
        ).toArray();
        await this.conexion.close();
        return data;
    }



    // 10. Encontrar el número total de actores en la base de datos

    async getTotalActorsCount(){
        await this.conexion.connect();
        const collection = this.db.collection('authors');
        const data = await collection.aggregate(
            [
                {
                  "$group": {
                    "_id": null,
                    "total_actors": { "$sum": 1 }
                  }
                }
              ]
        ).toArray();
        await this.conexion.close();
        return data;
    }


    // 11.Encontrar la edad promedio de los actores en la base de datos

    async getAverageActorAge(){
        await this.conexion.connect();
        const collection = this.db.collection('authors');
        const data = await collection.aggregate(
            [
                {
                  $project: {
                    age: {
                      $divide: [
                        { $subtract: [new Date(), { $toDate: "$date_of_birth" }] },
                        31536000000
                      ]
                    }
                  }
                },
                {
                  $group: {
                    _id: null,
                    averageAge: { $avg: "$age" }
                  }
                },
                {
                  $project: {
                    _id: 0,
                    "promedio_edad_actores": { $round: ["$averageAge", 2] }
                  }
                }
              ]
        ).toArray();
        await this.conexion.close();
        return data;
    }



    // 12.Encontrar todos los actores que tienen una cuenta de Instagram

    async getActorsWithInstagram(){
        await this.conexion.connect();
        const collection = this.db.collection('authors');
        const data = await collection.aggregate(
            [
                {
                  $match: {
                    "social_media.instagram": { $exists: true, $ne: "" }
                  }
                },
                {
                  $project: {
                    _id: 1,
                    id_actor: 1,
                    actor_name: "$full_name",
                    social_media: 1
                  }
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
// import util from 'util';


// // INICIO DE LAS CONSULTAS DE BLOCKBUSTER EN EL APARTADO DE AUTHORS



// // 2.Encontrar todos los actores que han ganado premios Oscar

// export const getOscarWinners = async () => {
//     let { db, conexion } = await connect.getinstance();

//     const collection = db.collection('authors');
//     const pipeline = [
//         {
//             "$unwind": "$awards"
//         },
//         {
//             "$match": { "awards.name": "Oscar Award" }
//         },
//         {
//             "$project": {
//                 "_id": 0,
//                 "full_name": 1,
//                 "awards.name": 1,
//                 "awards.year": 1,
//                 "awards.category": 1
//             }
//         }
//     ];

//     const result = await collection.aggregate(pipeline).toArray();
//     conexion.close();
//     return result;
// }




// // 3.Encontrar la cantidad total de premios que ha ganado cada actor

// export const getActorsWithAwardCount = async () => {
//     let { db, conexion } = await connect.getinstance();

//     const collection = db.collection('authors');
//     const pipeline = [
//         {
//             "$project": {
//                 "_id": 0,
//                 "full_name": 1,
//                 "total_awards": { "$size": "$awards" }
//             }
//         }
//     ];

//     const result = await collection.aggregate(pipeline).toArray();
//     conexion.close();
//     return result;
// }





// // 4.Obtener todos los actores nacidos después de 1980

// export const getActorsBornAfter1980 = async () => {
//     let { db, conexion } = await connect.getinstance();

//     const collection = db.collection('authors');
//     const pipeline = [
//         {
//             $match: {
//                 "date_of_birth": { $gt: "1980-01-01" }
//             }
//         },
//         {
//             "$project": {
//                 "_id": 0,
//                 "full_name": 1,
//                 "date_of_birth": 1
//             }
//         }
//     ];

//     const result = await collection.aggregate(pipeline).toArray();
//     conexion.close();
//     return result;
// }




// // 5.Encontrar el actor con más premios

// export const getActorWithMostAwards = async () => {
//     let { db, conexion } = await connect.getinstance();

//     const collection = db.collection('authors');
//     const pipeline = [
//         {
//             "$project": {
//                 "_id": 0,
//                 "full_name": 1,
//                 "total_awards": { "$size": "$awards" }
//             }
//         },
//         {
//             "$sort": { "total_awards": -1 }
//         },
//         {
//             "$limit": 1
//         }
//     ];

//     const result = await collection.aggregate(pipeline).toArray();
//     conexion.close();
    
//     return result[0] || null;
// }




// // 10. Encontrar el número total de actores en la base de datos

// export const getTotalActorsCount = async () => {
//     let { db, conexion } = await connect.getinstance();

//     const collection = db.collection('authors');

//     const pipeline = [
//         {
//             "$group": {
//                 "_id": null,
//                 "total_actors": { "$sum": 1 }
//             }
//         },
//         {
//             "$project": {
//                 "_id": 0,
//                 "total_actors": 1
//             }
//         }
//     ];

//     const result = await collection.aggregate(pipeline).toArray();
//     conexion.close();

//     return { total_actors: result[0]?.total_actors || 0 };
// }




// // 11.Encontrar la edad promedio de los actores en la base de datos

// export const getAverageActorAge = async () => {
//     let { db, conexion } = await connect.getinstance();

//     const collection = db.collection('authors');
//     const pipeline = [
//         {
//           "$addFields": {
//             "date_of_birth": { "$toDate": "$date_of_birth" }
//           }
//         },
//         {
//           "$addFields": {
//             "age": {
//               "$divide": [
//                 { "$subtract": [new Date(), "$date_of_birth"] },
//                 1000 * 60 * 60 * 24 * 365
//               ]
//             }
//           }
//         },
//         {
//           "$group": {
//             "_id": null,
//             "average_age": { "$avg": "$age" }
//           }
//         }
//     ];

//     const result = await collection.aggregate(pipeline).toArray();
//     await conexion.close();

//     if (result.length > 0) {
//         return { average_actors_age: result[0].average_age };
//     } else {
//         return { average_actors_age: 0 };
//     }
// }




// // 12.Encontrar todos los actores que tienen una cuenta de Instagram

// export const getActorsWithInstagram = async () => {
//     let { db, conexion } = await connect.getinstance();
//     const collection = db.collection('authors');
//     const pipeline = [
//       {
//         $match: {
//           "social_media.instagram": { $exists: true, $ne: "" }
//         }
//       },
//       {
//         $project: {
//           _id: 1,
//           id_actor: 1,
//           full_name: 1,
//           date_of_birth: 1,
//           nationality: 1,
//           biography: 1,
//           awards: {
//             $map: {
//               input: "$awards",
//               as: "award",
//               in: {
//                 name: "$$award.name",
//                 year: "$$award.year"
//               }
//             }
//           },
//           social_media: 1,
//           website: 1
//         }
//       }
//     ];
//     const result = await collection.aggregate(pipeline).toArray();
//     conexion.close();
    
//     return { 
//       actors_with_instagram: {
//         [util.inspect.custom]: function(depth, options) {
//           return util.inspect(result, { depth: null, colors: options.colors });
//         },
//         toJSON: function() {
//           return result;
//         }
//       }
//     };
// }


// // 18. Encontrar todos los actores que han ganado premios después de 2015

// export const getActorsRecentAwardsAfter2015 = async () => {
//     let { db, conexion } = await connect.getinstance();

//     const collection = db.collection('authors');
//     const pipeline = [
//         { 
//             $match: { "awards.year": { $gt: 2015 } } 
//         },
//         { 
//             $unwind: "$awards" 
//         },
//         {
//             $project: {
//                 _id: 1,
//                 full_name: 1,
//                 name: "$awards.name",
//                 year: "$awards.year",
//                 category: "$awards.category"
//             }
//         }
//     ];

//     const result = await collection.aggregate(pipeline).toArray();
//     conexion.close();
    
//     return result;
// };
