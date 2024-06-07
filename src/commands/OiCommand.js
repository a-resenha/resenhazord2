import Resenhazord2 from "../models/Resenhazord2.js";

export default class OiCommand {

    static identifier = "^\\s*\\,\\s*oi\\s*$";

    static async run(data) {
        console.log('OI COMMAND');

        const exp = await Resenhazord2.socket.groupMetadata?.ephemeralDuration ||
                    data.message?.extendedTextMessage?.contextInfo?.expiration;

        const sender_phone = data.key.participant.replace('@s.whatsapp.net', '');
        try {
            Resenhazord2.socket.sendMessage(
                data.key.remoteJid,
                {
                    text: `Vai se fuder @${sender_phone} filho da puta! 🖕`,
                    mentions: [data.key.participant]
                },
                {quoted: data, ephemeralExpiration: exp}
            );
        } catch (error) {
            console.error('ERROR OI COMMAND', error);

            Resenhazord2.socket.sendMessage(
                data.key.remoteJid,
                {text: `Não consegui responder @${sender_phone} 😔`, mentions: [data.key.participant]},
                {quoted: data, ephemeralExpiration: exp}
            );
        }
    }
}