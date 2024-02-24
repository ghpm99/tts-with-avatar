import PusherServer from 'pusher';

let pusherInstance: PusherServer | null = null

export const getPusherInstance = () => {
    if(!pusherInstance){
        pusherInstance = new PusherServer({
            appId: process.env.app_id ?? '',
            key: process.env.key ?? '',
            secret: process.env.secret ?? '',
            cluster: process.env.cluster?? '',
            useTLS: true,
        })
    }
    return pusherInstance;
}
