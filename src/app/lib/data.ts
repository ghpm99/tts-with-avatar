'use server';
const Pusher = require('pusher');

const pusher = new Pusher({
	appId: process.env.app_id,
	key: process.env.key,
	secret: process.env.secret,
	cluster: process.env.cluster,
	useTLS: true,
});



export const sendChatMessage = async (message: string) => {
    pusher.trigger('chat', 'message', {
        message: message,
    });

}
