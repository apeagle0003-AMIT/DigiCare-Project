import { useState, useRef, useEffect } from 'react'
import { MessageSquare, X, Send, Bot, User } from 'lucide-react'

export default function ChatBox() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([
    { id: 1, text: "Hi there! I'm your DigiCare AI assistant. How can I help you today?", isBot: true }
  ])
  const [input, setInput] = useState('')
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    if (isOpen) {
      scrollToBottom()
    }
  }, [messages, isOpen])

  const handleSend = (e) => {
    e.preventDefault()
    if (!input.trim()) return

    const userMessage = { id: Date.now(), text: input, isBot: false }
    setMessages(prev => [...prev, userMessage])
    setInput('')

    // Mock AI response
    setTimeout(() => {
      const responses = [
        "I can help you find a doctor! Check out our Doctors page.",
        "To book an appointment, go to the Appointments section.",
        "Your medical history is securely stored on your device.",
        "I'm a simple AI assistant for DigiCare. Let me know if you need navigation help!"
      ]
      const randomResponse = responses[Math.floor(Math.random() * responses.length)]
      
      const botMessage = { id: Date.now() + 1, text: randomResponse, isBot: true }
      setMessages(prev => [...prev, botMessage])
    }, 1000)
  }

  return (
    <>
      {/* Floating Chat Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 p-4 rounded-full bg-gradient-to-r from-teal-500 to-cyan-500 text-white shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 z-50 ${isOpen ? 'scale-0 opacity-0' : 'scale-100 opacity-100'}`}
      >
        <MessageSquare size={24} />
      </button>

      {/* Chat Window */}
      <div 
        className={`fixed bottom-6 right-6 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-slate-100 flex flex-col overflow-hidden transition-all duration-300 transform origin-bottom-right z-50 ${
          isOpen ? 'scale-100 opacity-100' : 'scale-0 opacity-0 pointer-events-none'
        }`}
        style={{ height: '500px', maxHeight: '80vh' }}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-teal-500 to-cyan-500 p-4 flex justify-between items-center text-white">
          <div className="flex items-center space-x-2">
            <div className="bg-white/20 p-1.5 rounded-lg">
              <Bot size={20} />
            </div>
            <span className="font-semibold">DigiCare AI Help</span>
          </div>
          <button 
            onClick={() => setIsOpen(false)}
            className="p-1 hover:bg-white/20 rounded-full transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
          {messages.map((msg) => (
            <div 
              key={msg.id} 
              className={`flex ${msg.isBot ? 'justify-start' : 'justify-end'}`}
            >
              <div className={`flex max-w-[80%] ${msg.isBot ? 'flex-row' : 'flex-row-reverse'}`}>
                <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${msg.isBot ? 'bg-teal-100 text-teal-600 mr-2' : 'bg-slate-200 text-slate-600 ml-2'}`}>
                  {msg.isBot ? <Bot size={16} /> : <User size={16} />}
                </div>
                <div className={`p-3 rounded-2xl text-sm ${
                  msg.isBot 
                    ? 'bg-white border border-slate-100 text-slate-700 rounded-tl-sm shadow-sm' 
                    : 'bg-teal-500 text-white rounded-tr-sm shadow-sm'
                }`}>
                  {msg.text}
                </div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <form onSubmit={handleSend} className="p-3 bg-white border-t border-slate-100">
          <div className="relative flex items-center">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              className="w-full pl-4 pr-12 py-3 bg-slate-50 border border-slate-200 rounded-full focus:outline-none focus:border-teal-400 focus:ring-1 focus:ring-teal-400 transition-all text-sm"
            />
            <button 
              type="submit"
              disabled={!input.trim()}
              className="absolute right-2 p-2 bg-teal-500 text-white rounded-full hover:bg-teal-600 disabled:opacity-50 disabled:hover:bg-teal-500 transition-colors"
            >
              <Send size={16} className="ml-0.5" />
            </button>
          </div>
        </form>
      </div>
    </>
  )
}
