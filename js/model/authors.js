import { connect } from "../../helpers/db/connect.js"
import { ObjectId } from "mongodb";


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