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

export const getAllDVDTotalCopies = async () => {
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

    const totalCopies = result.length > 0 ? result[0].total_copies : 0;

    return { countByMoviDVD: totalCopies };
}