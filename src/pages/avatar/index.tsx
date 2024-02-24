'use client';
import { useEffect } from 'react';

import Pusher from 'pusher-js';
import { GetServerSideProps } from 'next';
import { useState } from 'react';

const AvatarPage = (props) => {
	const [playing, setPlaying] = useState(false);

	const avatar = playing
		? 'https://media1.tenor.com/m/Fi3CWqJrT5YAAAAC/sousou-no-frieren-frieren-beyond-journeys-end.gif'
		: 'https://i.imgur.com/TnBhkgG.gif';

	const listenerMessage = (data) => {
		const synth = speechSynthesis;
		const u = new SpeechSynthesisUtterance(data.message);
		u.voice = synth.getVoices()[1];
		u.addEventListener('end', () => {
			setPlaying(false);
		});
		setPlaying(true);
		synth.speak(u);
	};

	useEffect(() => {
		const pusher = new Pusher(props.pusher_key, {
			cluster: props.pusher_cluster,
		});
		const channel = pusher.subscribe('chat');
		channel.bind('message', listenerMessage);
		return () => {
			pusher.unsubscribe('chat');
		};
	}, []);

	return <img width={500} height={500} alt='avatar' src={avatar} />;
};

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
	const props = {
		pusher_key: process.env.key,
		pusher_cluster: process.env.cluster,
	};
	return { props };
};

export default AvatarPage;