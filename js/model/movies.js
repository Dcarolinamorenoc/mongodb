import { connect } from "../../helpers/db/connect.js"
import { ObjectId } from "mongodb";



export const getCountDvd = async()=>{
    let {db, conexion} = await connect.getinstance();

    const collection = db.collection('movis');
    const data = await collection.find(
        {
            format:{
                $elemMatch: {name: {$eq: "dvd"}}
            }
        }
    ).toArray();
    conexion.close();
    return {countByMoviDVD: data.length};

}

// 1.Contar el número total de copias de DVD disponibles en todos los registros:

export const getTotalDVDCopies = async () => {
    let { db, conexion } = await connect.getinstance();

    const collection = db.collection('movis');
    const pipeline = [
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
    ];

    const result = await collection.aggregate(pipeline).toArray();
    conexion.close();
    
    if (result.length > 0) {
        return { total_dvd_copies: result[0].total_copies };
    } else {
        return { total_dvd_copies: 0 };
    }
}


// 6.Listar todos los géneros de películas distintos

export const getUniqueGenresSorted = async () => {
    let { db, conexion } = await connect.getinstance();

    const collection = db.collection('movis');
    const pipeline = [
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
    ];

    const result = await collection.aggregate(pipeline).toArray();
    conexion.close();
    
    const genres = result.map(item => item._id);
    
    return genres;
}