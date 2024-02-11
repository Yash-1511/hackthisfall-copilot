"use client";
import { useIdContext } from '@/providers/responce-provider';
import { useRef, useState, FormEvent } from 'react';

interface Message {
    role: 'user' | 'bot';
    content: string;
}

export default function ChatWidget() {
     const {setIds}=useIdContext();
    const scrollTargetRef = useRef<HTMLDivElement>(null);
    const initialMessages: Message[] = [
        {
            role: 'user',
            content: 'Hi, what is Shop Genie?',
        },
        {
            role: 'bot',
            content: 'Shop Genie is an AI Copilot to find products that match your exact needs.',
        },
    ];
    const [messages, setMessages] = useState<Message[]>(initialMessages);

    const handleSubmitMessage = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const messageInput = e.currentTarget.message.value as string;
        if (!messageInput) {
            return;
        }

        setMessages([...messages, { role: 'user', content: messageInput }]);
        try {
            const response = await fetch('https://api.dify.ai/v1/chat-messages', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${process.env.NEXT_PUBLIC_DIFY_KEY}`, // Secure your API key
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    query: messageInput,
                    inputs: {},
                    response_mode: "blocking",
                    user: "abc-123", // Unique user identifier
                    // Add other parameters as needed
                }),
            });

            if (!response.ok) throw new Error('Network response was not ok');

            const data = await response.json();
            let answer = data.answer;
            let convert_answer;
            convert_answer = JSON.parse(answer);
            let summary = convert_answer.summary;
            let productIds = convert_answer.productIds;
            setIds(productIds);
            // convert data.answer to json object
            // if (data.answer.startsWith('{') && data.answer.endsWith('}')) {
            //     convert_answer = JSON.parse(data.answer);
            // }  
            // console.log(convert_answer.summary);

            // Handle the response from the API (e.g., displaying the bot's reply)

            setMessages(messages => [...messages, { role: 'bot', content: summary }]);
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
        }

        // e.currentTarget.message.value = '';
        setTimeout(() => scrollTargetRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);

    };

    return (
        <div className="relative bg-white max-w-[400px]">
            <p className="p-4 font-medium">Shop Genie✨ </p>
            <div className="divide-y divide-gray-300/50 border-t border-gray-300/50">
                <div className="space-y-6 py-8 text-base leading-7 text-gray-600 h-[400px] overflow-y-auto">
                    <ul className="space-y-4 px-4">
                        {messages.map((item, idx) => (
                            <li
                                key={idx}
                                className={`flex items-center ${item.role === 'user' ? 'ml-10 justify-end' : 'mr-10'
                                    }`}
                            >
                                <p className="bg-gray-100 p-4 rounded-md">{item.content}</p>
                            </li>
                        ))}
                    </ul>
                    <div ref={scrollTargetRef}></div>
                </div>
                <form
                    onSubmit={handleSubmitMessage}
                    className="p-4 flex gap-2 text-base font-semibold leading-7"
                >
                    <input
                        name="message"
                        placeholder="Ask any question"
                        className="px-2 py-1.5 border rounded-md flex-1 font-normal focus:outline-none focus:border-gray-400"
                    />
                    <button className="bg-gray-600 px-2.5 rounded-md text-white">
                        {/* prettier-ignore */}
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="22" x2="11" y1="2" y2="13"></line>
                            <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                        </svg>
                    </button>
                </form>
            </div>
        </div>
    );
}
