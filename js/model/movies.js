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




// INICIO DE LAS CONSULTAS DE BLOCKBUSTER EN EL APARTADO DE MOVIES



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




// 7.Encontrar películas donde el actor con id 1 haya participado

export const getMoviesForActor = async () => {
    let { db, conexion } = await connect.getinstance();

    const collection = db.collection('movis');
    const pipeline = [
        {
            $match: {
                "character.id_actor": 3
            }
        },
        {
            $project: {
                _id: 0,
                name: 1,
                genre: 1,
                // "character": {
                //     $filter: {
                //         input: "$character",
                //         as: "char",
                //         cond: { $eq: ["$$char.id_actor", 1] }
                //     }
                // },
                format: {
                    $map: {
                        input: "$format",
                        as: "fmt",
                        in: {
                            name: "$$fmt.name",
                            copies: "$$fmt.copies",
                            value: "$$fmt.value"
                        }
                    }
                }
            }
        }
    ];

    const result = await collection.aggregate(pipeline).toArray();
    conexion.close();
    

    return result.map(movie => ({
        name: movie.name,
        genre: movie.genre.join(", "),
        // character: movie.character.map(char => ({
        //     rol: char.rol,
        //     apodo: char.apodo
        // })),
        format: movie.format.map(fmt => `${fmt.name} (${fmt.copies} copies, $${fmt.value})`)
    }));
}





// 8.Calcular el valor total de todas las copias de DVD disponibles

export const getTotalValueOfDVDs = async () => {
    let { db, conexion } = await connect.getinstance();

    const collection = db.collection('movis');
    const pipeline = [
        {
            "$unwind": "$format"
        },
        {
            "$match": {
                "format.name": "dvd"
            }
        },
        {
            "$group": {
                "_id": null,
                "total_value": {
                    "$sum": {
                        "$multiply": ["$format.copies", "$format.value"]
                    }
                }
            }
        },
        {
            "$project": {
                "_id": 0,
                "total_value": { "$round": ["$total_value", 1] } 
            }
        }
    ];

    const result = await collection.aggregate(pipeline).toArray();
    conexion.close();
    
    if (result.length > 0) {
        return { total_value: result[0].total_value };
    } else {
        return { total_value: 0 };
    }
}




// 9.Encontrar todas las películas en las que John Doe ha actuado

export const getMoviesWithJohnDoeActing = async () => {
    let { db, conexion } = await connect.getinstance();

    const collection = db.collection('movis');

    const pipeline = [
        {
            $match: {
                "character.id_actor": 1
            }
        },
        {
            $project: {
                _id: 0,
                name: 1,
                genre: 1,
            }
        }
    ];

    const result = await collection.aggregate(pipeline).toArray();
    conexion.close();
    return result;
}


// 13.Encontrar todas las películas en las que participan actores principales

export const getMoviesWithMainCharacters = async () => {
    let { db, conexion } = await connect.getinstance();

    const collection = db.collection('movis'); 

    const pipeline = [
        { 
            "$unwind": "$character" 
        },
        { 
            "$match": { "character.rol": "principal" } 
        },
        { 
            "$group": { 
                "_id": "$_id", 
                "name": { "$first": "$name" }, 
                "actors": { 
                    "$push": { 
                        "name": "$character.apodo", 
                        "rol": "$character.rol" 
                    } 
                } 
            } 
        },
        {
            "$project": {
                "_id": 0,
                "id": "$_id",
                "name": 1,
                "actors": 1
            }
        }
    ];

    const result = await collection.aggregate(pipeline).toArray();
    conexion.close();

    return result;
}