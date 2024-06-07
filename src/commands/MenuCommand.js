import Resenhazord2 from '../models/Resenhazord2.js';
import menu_message from '../../public/messages/menu_message.js'

export default class MenuCommand {

    static identifier = "^\\s*\\,\\s*menu\\s*$";

    static async run(data) {
        console.log('MENU COMMAND');

        const exp = await Resenhazord2.socket.groupMetadata?.ephemeralDuration ||
                    data.message?.extendedTextMessage?.contextInfo?.expiration;

        const menu = menu_message;
        try {
            Resenhazord2.socket.sendMessage(
                data.key.remoteJid,
                {text: menu},
                {quoted: data, ephemeralExpiration: exp}
            );
        }
        catch (error) {
            console.error('ERROR MENU COMMAND', error);

            Resenhazord2.socket.sendMessage(
                data.key.remoteJid,
                {text: 'Viiixxiii.. Não consegui exibir o menu! 🥺👉👈'},
                {quoted: data, ephemeralExpiration: exp}
            );
        }
    }
}