import React, { useState } from "react";
import {
  Bot,
  User,
  Send,
  UploadCloud,
  FileText,
  BadgeCheck,
} from "lucide-react";
import Card from "../../components/common/Card";
import Button from "../../components/common/Button";

const ChatBot = () => {
  const [messages, setMessages] = useState([
    {
      from: "bot",
      text: "¡Hola! Soy tu asistente virtual. Puedo ayudarte a analizar tu documento y responder tus preguntas.",
    },
  ]);
  const [input, setInput] = useState("");

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { from: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);

    setTimeout(() => {
      const botResponse = {
        from: "bot",
        text: "Gracias por tu mensaje. Estoy procesando...",
      };
      setMessages((prev) => [...prev, botResponse]);
    }, 1000);

    setInput("");
  };

  const handleSuggestion = (text) => {
    setInput(text);
  };

  return (
    <div className="max-w-5xl mx-auto mt-8 px-4 space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Consulta Inteligente</h1>

      {/* Tipo de consulta */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="border border-blue-500 bg-blue-50 text-blue-700 rounded-lg p-4 flex items-center space-x-3 transition hover:shadow-md cursor-pointer">
          <FileText className="h-6 w-6" />
          <div>
            <p className="font-semibold">Consultar Trámite</p>
            <p className="text-sm">Revisa el estado de tu trámite</p>
          </div>
        </div>
        <div className="border border-gray-300 rounded-lg p-4 flex items-center space-x-3 hover:shadow-md cursor-pointer">
          <BadgeCheck className="h-6 w-6 text-gray-500" />
          <div>
            <p className="font-semibold">Consultar Currículum</p>
            <p className="text-sm text-gray-500">Analiza tu CV</p>
          </div>
        </div>
      </div>

      {/* Área de carga */}
      <div className="border-2 border-dashed border-gray-300 rounded-md p-6 flex flex-col items-center justify-center text-center transition hover:bg-gray-50">
        <UploadCloud className="h-10 w-10 text-gray-400 mb-2" />
        <p className="text-sm text-gray-600">
          Arrastra o haz clic para subir tu documento
        </p>
        <p className="text-xs text-gray-400 mb-3">PDF, DOC, DOCX (máx. 5MB)</p>
        <Button variant="primary" size="sm">
          Seleccionar archivo
        </Button>
      </div>

      {/* Chat */}
      <Card>
        {/* Encabezado del Bot */}
        <div className="flex items-center space-x-2 mb-3">
          <Bot className="h-5 w-5 text-green-500" />
          <span className="text-sm font-medium text-gray-700">
            Asistente Virtual
          </span>
          <span className="text-xs text-green-600">En línea</span>
        </div>

        {/* Mensajes */}
        <div className="h-72 overflow-y-auto flex flex-col space-y-2 pr-2 bg-white p-2 rounded-md border border-gray-200">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`max-w-sm px-4 py-2 rounded-lg text-sm ${
                msg.from === "bot"
                  ? "bg-gray-100 text-left self-start"
                  : "bg-blue-100 text-right self-end"
              }`}
            >
              {msg.text}
            </div>
          ))}
        </div>

        {/* Sugerencias rápidas */}
        <div className="flex flex-wrap gap-2 mt-4">
          <Button
            size="sm"
            variant="outline"
            onClick={() =>
              handleSuggestion(
                "¿Por qué mi trámite fue clasificado como urgente?"
              )
            }
          >
            ¿Por qué mi trámite fue clasificado como urgente?
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() =>
              handleSuggestion("¿Qué le falta a mi CV para mejorar?")
            }
          >
            ¿Qué le falta a mi CV para mejorar?
          </Button>
        </div>

        {/* Input de usuario */}
        <form onSubmit={handleSend} className="flex items-center gap-2 mt-4">
          <input
            type="text"
            placeholder="Escribe una pregunta sobre tu documento..."
            className="flex-grow border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <Button
            type="submit"
            variant="primary"
            icon={<Send className="h-4 w-4" />}
          >
            {/* texto opcional o vacío */}
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default ChatBot;
