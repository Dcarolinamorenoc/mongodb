import { connect } from "../../helpers/db/connect.js"
import { ObjectId } from "mongodb";



// INICIO DE LAS CONSULTAS DE BLOCKBUSTER EN EL APARTADO DE AUTHORS

// 2.Encontrar todos los actores que han ganado premios Oscar

export const getOscarWinners = async () => {
    let { db, conexion } = await connect.getinstance();

    const collection = db.collection('authors');
    const pipeline = [
        {
            "$unwind": "$awards"
        },
        {
            "$match": { "awards.name": "Oscar Award" }
        },
        {
            "$project": {
                "_id": 0,
                "full_name": 1,
                "awards.name": 1,
                "awards.year": 1,
                "awards.category": 1
            }
        }
    ];

    const result = await collection.aggregate(pipeline).toArray();
    conexion.close();
    return result;
}



// 3.Encontrar la cantidad total de premios que ha ganado cada actor

export const getActorsWithAwardCount = async () => {
    let { db, conexion } = await connect.getinstance();

    const collection = db.collection('authors');
    const pipeline = [
        {
            "$project": {
                "_id": 0,
                "full_name": 1,
                "total_awards": { "$size": "$awards" }
            }
        }
    ];

    const result = await collection.aggregate(pipeline).toArray();
    conexion.close();
    return result;
}



// 4.Obtener todos los actores nacidos después de 1980

export const getActorsBornAfter1980 = async () => {
    let { db, conexion } = await connect.getinstance();

    const collection = db.collection('authors');
    const pipeline = [
        {
            $match: {
                "date_of_birth": { $gt: "1980-01-01" }
            }
        },
        {
            "$project": {
                "_id": 0,
                "full_name": 1,
                "date_of_birth": 1
            }
        }
    ];

    const result = await collection.aggregate(pipeline).toArray();
    conexion.close();
    return result;
}


// 5.Encontrar el actor con más premios

export const getActorWithMostAwards = async () => {
    let { db, conexion } = await connect.getinstance();

    const collection = db.collection('authors');
    const pipeline = [
        {
            "$project": {
                "_id": 0,
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
    ];

    const result = await collection.aggregate(pipeline).toArray();
    conexion.close();
    
    return result[0] || null;
}


// 10. Encontrar el número total de actores en la base de datos

export const getTotalActorsCount = async () => {
    let { db, conexion } = await connect.getinstance();

    const collection = db.collection('authors');

    const pipeline = [
        {
            "$group": {
                "_id": null,
                "total_actors": { "$sum": 1 }
            }
        }
    ];

    const result = await collection.aggregate(pipeline).toArray();
    conexion.close();


    return result[0]?.total_actors || 0;
}






// 12.Encontrar todos los actores que tienen una cuenta de Instagram

export const getActorsWithInstagram = async () => {
    let { db, conexion } = await connect.getinstance();

    const collection = db.collection('authors');

    const pipeline = [
        {
            "$match": {
                "social_media.instagram": { "$exists": true, "$ne": "" }
            }
        },
        {
            "$project": {
                "_id": 0,
                "id_actor": 1,
                "full_name": 1,
                "date_of_birth": 1,
                "nationality": 1,
                "biography": 1,
                "social_media": 1,
                "website": 1
            }
        }
    ];

    const result = await collection.aggregate(pipeline).toArray();
    conexion.close();

    // Serializar y deserializar para asegurar que todos los objetos anidados se expandan
    return result;
}