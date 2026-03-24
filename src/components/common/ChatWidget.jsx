import { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Input from '../ui/Input'
import Button from '../ui/Button'
import { api } from '../../services/api'
import { useAppStore } from '../../store/useAppStore'

const WELCOME = "Hi! I'm Smart-Aid's AI assistant. Ask me anything about the app, scan, or paste text to analyze."

const QUICK_ASK = [
  'What can you do?',
  'How does scan work?',
  'Help',
]

function renderBold(content) {
  if (!content || typeof content !== 'string') return content
  return content.split(/(\*\*[^*]+\*\*)/g).map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={i}>{part.slice(2, -2)}</strong>
    }
    return part
  })
}

function TypingDots() {
  return (
    <div className="flex justify-start">
      <div className="rounded-2xl px-3 py-2 bg-slate-100 dark:bg-slate-800 flex items-center gap-1">
        <span className="w-1.5 h-1.5 rounded-full bg-primary-500 animate-bounce" style={{ animationDelay: '0ms' }} />
        <span className="w-1.5 h-1.5 rounded-full bg-primary-500 animate-bounce" style={{ animationDelay: '120ms' }} />
        <span className="w-1.5 h-1.5 rounded-full bg-primary-500 animate-bounce" style={{ animationDelay: '240ms' }} />
      </div>
    </div>
  )
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState('')
  const [sending, setSending] = useState(false)
  const [error, setError] = useState('')
  const endRef = useRef(null)
  const chatMessages = useAppStore((s) => s.chatMessages)
  const addChatMessage = useAppStore((s) => s.addChatMessage)

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [chatMessages, sending])

  const sendMessage = async (textToSend = null) => {
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
      const msg = err.message || 'Failed to get reply. Is the backend running on port 3000?'
      setError(msg)
      addChatMessage({ role: 'assistant', content: `Sorry, something went wrong: ${msg}` })
    } finally {
      setSending(false)
    }
  }

  const handleSubmit = (e) => {
    e?.preventDefault()
    sendMessage()
  }

  const showWelcome = chatMessages.length === 0 && !sending

  return (
    <>
      {/* Floating button */}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-primary-500 text-white shadow-lg shadow-primary-500/40 hover:bg-primary-600 hover:scale-105 transition-all flex items-center justify-center"
        aria-label="Open AI chatbot"
      >
        {open ? (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        )}
      </button>

      {/* Chat panel */}
      {open && (
        <div className="fixed bottom-24 right-6 z-50 w-[380px] max-w-[calc(100vw-3rem)] h-[480px] rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-2xl flex flex-col overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 bg-primary-500 text-white">
            <div className="flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center text-sm font-bold">AI</span>
              <div>
                <p className="font-semibold text-sm">AI Chatbot</p>
                <p className="text-xs text-primary-100">Smart-Aid Assistant</p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <Link
                to="/chat"
                onClick={() => setOpen(false)}
                className="text-xs px-2 py-1 rounded bg-white/20 hover:bg-white/30"
              >
                Full chat
              </Link>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="p-1.5 rounded-lg hover:bg-white/20"
                aria-label="Close"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-3 space-y-3">
            {showWelcome && (
              <div className="flex justify-start">
                <div className="max-w-[90%] rounded-2xl rounded-tl-sm px-3 py-2 bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-sm">
                  {renderBold(WELCOME)}
                </div>
              </div>
            )}
            {chatMessages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={`max-w-[90%] rounded-2xl px-3 py-2 text-sm whitespace-pre-wrap ${
                    msg.role === 'user'
                      ? 'bg-primary-500 text-white rounded-tr-sm'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-tl-sm'
                  }`}
                >
                  {msg.role === 'assistant' ? renderBold(msg.content) : msg.content}
                </div>
              </div>
            ))}
            {sending && <TypingDots />}
            <div ref={endRef} />
          </div>

          {chatMessages.length === 0 && !sending && (
            <div className="px-3 pb-2">
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-1.5">Try:</p>
              <div className="flex flex-wrap gap-1.5">
                {QUICK_ASK.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => sendMessage(s)}
                    className="px-2.5 py-1 rounded-full text-xs bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 hover:bg-primary-100 dark:hover:bg-primary-900/50 border border-primary-200 dark:border-primary-800"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="p-3 border-t border-slate-200 dark:border-slate-700">
            {error && <p className="text-xs text-accent-rose mb-1">{error}</p>}
            <div className="flex gap-2">
              <Input
                placeholder="Type a message..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={sending}
                containerClass="flex-1 min-w-0"
                className="text-sm py-2"
              />
              <Button type="submit" size="sm" disabled={sending || !input.trim()} loading={sending}>
                Send
              </Button>
            </div>
          </form>
        </div>
      )}
    </>
  )
}
