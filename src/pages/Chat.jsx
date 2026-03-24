import { useState, useRef, useEffect } from 'react'
import Button from '../components/ui/Button'
import Card from '../components/ui/Card'
import Input from '../components/ui/Input'
import { api } from '../services/api'
import { useAppStore } from '../store/useAppStore'

const SUGGESTIONS = [
  "How accurate is body scanning?",
  "What malnutrition stages does it detect?",
  "How do I take a good photo?",
  "Is my data private?",
  "Works on any phone?",
]

const WELCOME_MESSAGE = "Hi, I'm Smart-Aid's assistant. I can help explain how body image scanning detects malnutrition, guide you through taking and uploading photos, explain what your results mean, answer privacy questions, or help troubleshoot technical issues. Ask me anything about how we work."

function renderMessageContent(content) {
  if (!content || typeof content !== 'string') return content
  return content.split(/(\*\*[^*]+\*\*)/g).map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={i}>{part.slice(2, -2)}</strong>
    }
    return part
  })
}

function TypingIndicator() {
  return (
    <div className="flex justify-start">
      <div className="rounded-2xl px-4 py-3 bg-slate-100 dark:bg-slate-800 flex items-center gap-1.5">
        <span className="w-2 h-2 rounded-full bg-primary-500 animate-bounce" style={{ animationDelay: '0ms' }} />
        <span className="w-2 h-2 rounded-full bg-primary-500 animate-bounce" style={{ animationDelay: '150ms' }} />
        <span className="w-2 h-2 rounded-full bg-primary-500 animate-bounce" style={{ animationDelay: '300ms' }} />
      </div>
    </div>
  )
}

export default function Chat() {
  const [input, setInput] = useState('')
  const [sending, setSending] = useState(false)
  const [error, setError] = useState('')
  const messagesEndRef = useRef(null)
  const chatMessages = useAppStore((s) => s.chatMessages)
  const addChatMessage = useAppStore((s) => s.addChatMessage)
  const clearChat = useAppStore((s) => s.clearChat)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [chatMessages, sending])

  const handleSend = async (textToSend = null) => {
    const text = (textToSend ?? input).trim()
    if (!text || sending) return
    setError('')
    setInput('')
    addChatMessage({ role: 'user', content: text })
    setSending(true)
    try {
      const history = chatMessages.slice(-10).map((m) => ({ role: m.role, content: m.content }))
      const data = await api.chat(text, history)
      const reply = data?.reply != null ? String(data.reply) : "I'm not sure what to say. Please try again."
      addChatMessage({ role: 'assistant', content: reply })
    } catch (err) {
      const msg = err.message || 'Failed to get reply. Make sure the backend is running on port 3000.'
      setError(msg)
      addChatMessage({
        role: 'assistant',
        content: `Sorry, something went wrong: ${msg}`,
      })
    } finally {
      setSending(false)
    }
  }

  const handleSubmit = (e) => {
    e?.preventDefault()
    handleSend()
  }

  const handleSuggestion = (s) => {
    handleSend(s)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const showWelcome = chatMessages.length === 0 && !sending

  return (
    <div className="section-padding">
      <div className="container-narrow max-w-3xl">
        <div className="text-center mb-6">
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-800 dark:text-slate-100 mb-2">
            AI Chatbot
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            Ask about body scanning, how to get the best results, what your assessment means, or technical help.
          </p>
        </div>

        <Card className="flex flex-col h-[560px] p-0 overflow-hidden">
          {/* Chat header */}
          <div className="flex items-center gap-3 px-4 py-3 border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50">
            <div className="w-10 h-10 rounded-xl bg-primary-500 flex items-center justify-center text-white font-bold text-sm">
              AI
            </div>
            <div>
              <p className="font-semibold text-slate-800 dark:text-slate-100">Smart-Aid Assistant</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">Online · Ask anything</p>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {showWelcome && (
              <div className="flex justify-start">
                <div className="flex gap-2 max-w-[90%]">
                  <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-primary-500 flex items-center justify-center text-white text-xs font-bold">
                    AI
                  </div>
                  <div className="rounded-2xl rounded-tl-sm px-4 py-3 bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200">
                    <p className="whitespace-pre-wrap text-sm sm:text-base">
                      {renderMessageContent(WELCOME_MESSAGE)}
                    </p>
                  </div>
                </div>
              </div>
            )}
            {chatMessages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.role === 'user' ? (
                  <div className="max-w-[85%] rounded-2xl rounded-tr-sm px-4 py-3 bg-primary-500 text-white">
                    <p className="whitespace-pre-wrap text-sm sm:text-base">{msg.content}</p>
                  </div>
                ) : (
                  <div className="flex gap-2 max-w-[90%]">
                    <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-primary-500 flex items-center justify-center text-white text-xs font-bold">
                      AI
                    </div>
                    <div className="rounded-2xl rounded-tl-sm px-4 py-3 bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200">
                      <p className="whitespace-pre-wrap text-sm sm:text-base">
                        {renderMessageContent(msg.content)}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            ))}
            {sending && <TypingIndicator />}
            <div ref={messagesEndRef} />
          </div>

          {/* Suggestions when empty */}
          {chatMessages.length === 0 && !sending && (
            <div className="px-4 pb-2">
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-2">Try asking:</p>
              <div className="flex flex-wrap gap-2">
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => handleSuggestion(s)}
                    className="px-3 py-1.5 rounded-full text-sm bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 hover:bg-primary-100 dark:hover:bg-primary-900/50 border border-primary-200 dark:border-primary-800 transition-colors"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          <form onSubmit={handleSubmit} className="p-4 border-t border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900/30">
            {error && (
              <p className="text-sm text-accent-rose mb-2">{error}</p>
            )}
            <div className="flex gap-2">
              <Input
                placeholder="Type a message or paste text to analyze..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                autoFocus
                disabled={sending}
                className="flex-1 min-w-0"
                containerClass="flex-1 min-w-0"
              />
              <Button
                type="submit"
                size="md"
                disabled={sending || !input.trim()}
                loading={sending}
                className="flex-shrink-0"
              >
                Send
              </Button>
            </div>
            <p className="mt-1.5 text-xs text-slate-500 dark:text-slate-400">
              Press Enter to send. Paste text for word count, summary & key phrases.
            </p>
            {chatMessages.length > 0 && (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="mt-2"
                onClick={() => clearChat()}
              >
                Clear chat
              </Button>
            )}
          </form>
        </Card>
      </div>
    </div>
  )
}
