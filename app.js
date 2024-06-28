const { MongoClient } = require('mongodb');

// URL de conexión a MongoDB (reemplaza con tu propia URL si es necesario)
const url = 'mongodb://localhost:27017';
const dbName = 'Libreria';

// Función asincrónica para conectar a MongoDB y realizar operaciones
async function main() {
    const client = new MongoClient(url);

    try {
        // Conectar al servidor de MongoDB
        await client.connect();
        console.log('Conectado exitosamente a MongoDB');

        // Seleccionar la base de datos
        const db = client.db(dbName);

        // Seleccionar la colección (crea una si no existe)
        const collection = db.collection('Principito');

        // Insertar siete documentos en la colección
        const documentos = [
            { Genero: 'Cuento',},
            { Autor: 'Christopher',},
            { anioLanzamiento: '2000',},
            { Nohojas: 350,},
            { Clasificacion: 'AA' },
            { Precio: 200 },
            { Ventas: 1000000 }
        ];
        const insertResult = await collection.insertMany(documentos);
        console.log('Documentos insertados:', insertResult.insertedIds);

        // Encontrar todos los documentos en la colección
        const todosDocumentos = await collection.find({}).toArray();
        console.log('Documentos encontrados:', todosDocumentos);

    } catch (err) {
        console.error('Error al conectar a MongoDB:', err);
    } finally {
        // Cerrar la conexión
        await client.close();
    }
}

main().catch(console.error);
