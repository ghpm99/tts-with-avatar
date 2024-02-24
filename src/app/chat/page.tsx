'use client';

import { useState } from 'react'
import { sendChatMessage } from '../lib/data'


export default function ChatPage() {
	const [messages, setMessages] = useState('');

	const sendMessage = () => {
		console.log(messages);
		sendChatMessage(messages)
		setMessages('');
	};

	const submitOnEnter = (event: any) => {
		if (event.key === 'Enter') {
			sendMessage();
			event.preventDefault();
		}
	};

	return (
		<div>
			<textarea
				id='chat'
				name='chat'
				rows={4}
				cols={50}
                style={{color: 'black'}}
				value={messages}
				onChange={(value) => setMessages(value.target.value)}
				onKeyDown={submitOnEnter}
			/>
			<button onClick={sendMessage}>Enviar</button>
		</div>
	);
}
