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
