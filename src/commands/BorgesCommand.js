import Resenhazord2 from '../models/Resenhazord2.js';
import { MongoClient } from 'mongodb';

export default class BorgesCommand {

    static identifier = "^\\s*\\,\\s*borges\\s*$";

    static async run(data) {

        const uri = process.env.MONGODB_URI;
        const client = new MongoClient(uri);

        const exp = await Resenhazord2.socket.groupMetadata?.ephemeralDuration ||
                    data.message?.extendedTextMessage?.contextInfo?.expiration;

        try {
            await client.connect();
            const database = client.db('resenhazord2');
            const collection = database.collection('borges');
            const result = await collection.findOneAndUpdate(
                { _id: 'counter' },
                { $inc: { nargas: 1 } },
                { returnDocument: 'after', upsert: true }
            );
            console.log('borges', result);
            Resenhazord2.socket.sendMessage(
                data.key.remoteJid,
                {text: `Borges já fumou ${result.nargas} nargas 🚬`},
                {quoted: data, ephemeralExpiration: exp}
            );
        }
        catch (error) {
            console.error('BORGES COMMAND ERROR', error);
            Resenhazord2.socket.sendMessage(
                data.key.remoteJid,
                {text: 'Eram muitas bitucas para contar e não consegui... 😔'},
                {quoted: data, ephemeralExpiration: exp}
            );
        }
        finally {
            await client.close();
        }
    }
}