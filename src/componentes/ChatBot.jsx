import React, { useState } from 'react';
import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({ apiKey: 'TU APIKEY' });

const ChatBot = () => {
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState([]);

    const handleSend = async () => {
        if (input.trim()) {
            setMessages([...messages, { user: true, text: input }]);

            try {
                const response = await ai.models.generateContent({
                    model: 'gemini-2.0-flash',
                    contents: input,
                });

                setMessages(prev => [...prev, { user: false, text: response.text || 'No se pudo obtener una respuesta.' }]);
            } catch (error) {
                setMessages(prev => [...prev, { user: false, text: 'Error al conectar con el servidor de Google.' }]);
            }

            setInput('');
        }
    };

    return (
        <div className="chatbot">
            <h2>ChatBot Matemático</h2>
            <div className="chat-window">
                {messages.map((msg, index) => (
                    <div key={index} className={msg.user ? 'user-message' : 'bot-message'}>
                        {msg.text}
                    </div>
                ))}
            </div>
            <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Haz una pregunta matemática..."
            />
            <button onClick={handleSend}>Enviar</button>
        </div>
    );
};

export default ChatBot;