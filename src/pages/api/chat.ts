import { getPusherInstance } from '@/app/lib/data'
import { NextApiRequest, NextApiResponse } from 'next'
import { NextResponse } from 'next/server'

const pusherInstance = getPusherInstance()

export default async function POST(req: NextApiRequest, res: NextApiResponse ) {
    if(!req.body?.message){
        return res.status(400).json({status: 'Mensagem é obrigatorio'})
    }
    try{

        await pusherInstance.trigger('chat', 'message', {
            message: req.body.message,
        });

        return res.status(200).json({status: 'ok'})
    }catch(e){
        return res.status(500).json({status: 'error'})

    }
}