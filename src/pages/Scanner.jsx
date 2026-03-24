import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../components/ui/Button'
import Card from '../components/ui/Card'
import { api } from '../services/api'
import { useAppStore } from '../store/useAppStore'
import { formatFileSize } from '../utils/helpers'

const ACCEPT = 'image/*,.pdf'
const MAX_SIZE = 10 * 1024 * 1024 // 10MB
const MODES = { upload: 'upload', camera: 'camera' }

export default function Scanner() {
  const [mode, setMode] = useState(MODES.upload)
  const [file, setFile] = useState(null)
  const [preview, setPreview] = useState(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [cameraActive, setCameraActive] = useState(false)
  const [cameraError, setCameraError] = useState('')
  const inputRef = useRef(null)
  const videoRef = useRef(null)
  const streamRef = useRef(null)
  const navigate = useNavigate()
  const setScanResult = useAppStore((s) => s.setScanResult)

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((t) => t.stop())
      streamRef.current = null
    }
    setCameraActive(false)
    setCameraError('')
  }

  const startCamera = async () => {
    setCameraError('')
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment', width: { ideal: 1280 }, height: { ideal: 720 } },
        audio: false,
      })
      streamRef.current = stream
      if (videoRef.current) videoRef.current.srcObject = stream
      setCameraActive(true)
    } catch (err) {
      setCameraError(err.message || 'Camera access denied or not available.')
    }
  }

  const capturePhoto = () => {
    if (!videoRef.current || !streamRef.current) return
    const video = videoRef.current
    const canvas = document.createElement('canvas')
    canvas.width = video.videoWidth
    canvas.height = video.videoHeight
    const ctx = canvas.getContext('2d')
    ctx.drawImage(video, 0, 0)
    canvas.toBlob(
      (blob) => {
        if (!blob) return
        const f = new File([blob], `capture-${Date.now()}.jpg`, { type: 'image/jpeg' })
        setFile(f)
        setPreview(URL.createObjectURL(blob))
        stopCamera()
      },
      'image/jpeg',
      0.9
    )
  }

  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview)
      stopCamera()
    }
  }, [preview])

  useEffect(() => {
    if (mode !== MODES.camera) stopCamera()
  }, [mode])

  const handleFile = (e) => {
    setError('')
    const chosen = e.target.files?.[0]
    if (!chosen) return
    if (chosen.size > MAX_SIZE) {
      setError('File must be under 10MB')
      setFile(null)
      setPreview(null)
      return
    }
    setFile(chosen)
    if (chosen.type.startsWith('image/')) {
      setPreview(URL.createObjectURL(chosen))
    } else {
      setPreview(null)
    }
  }

  const handleDrop = (e) => {
    e.preventDefault()
    const chosen = e.dataTransfer.files?.[0]
    if (chosen) {
      const fakeEvent = { target: { files: [chosen] } }
      handleFile(fakeEvent)
    }
  }

  const handleDragOver = (e) => e.preventDefault()

  const handleSubmit = async () => {
    if (!file) {
      setError('Please select a file or capture a photo')
      return
    }
    setError('')
    setLoading(true)
    try {
      const result = await api.scan(file)
      setScanResult(result)
      navigate('/result')
    } catch (err) {
      setError(err.message || 'Scan failed. Try again.')
    } finally {
      setLoading(false)
    }
  }

  const clearFile = () => {
    setFile(null)
    setPreview(null)
    setError('')
    if (inputRef.current) inputRef.current.value = ''
  }

  return (
    <div className="section-padding">
      <div className="container-narrow">
        <div className="text-center sm:text-left mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-800 dark:text-slate-100 mb-2">
            Scan for malnutrition
          </h1>
          <p className="text-slate-600 dark:text-slate-400 max-w-xl mx-auto sm:mx-0">
            Upload or take a body photo. AI analyzes visible nutritional markers and tells you the status, severity level, and what comes next.
          </p>
        </div>

        <div className="flex justify-center gap-2 mb-6">
          <Button
            variant={mode === MODES.upload ? 'primary' : 'secondary'}
            size="md"
            className="transition-transform hover:scale-[1.02]"
            onClick={() => {
              setMode(MODES.upload)
              clearFile()
            }}
          >
            Upload
          </Button>
          <Button
            variant={mode === MODES.camera ? 'primary' : 'secondary'}
            size="md"
            className="transition-transform hover:scale-[1.02]"
            onClick={() => {
              setMode(MODES.camera)
              clearFile()
            }}
          >
            Camera
          </Button>
        </div>

        <Card className="max-w-xl mx-auto" gradient>
          {mode === MODES.upload && (
            <div
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onClick={() => inputRef.current?.click()}
              className="border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-xl p-8 sm:p-12 text-center cursor-pointer hover:border-primary-500 hover:bg-primary-50/50 dark:hover:bg-primary-950/20 transition-all hover:shadow-lg hover:shadow-primary-500/10"
            >
              <input
                ref={inputRef}
                type="file"
                accept={ACCEPT}
                onChange={handleFile}
                className="hidden"
              />
              {preview ? (
                <div className="space-y-4">
                  <img
                    src={preview}
                    alt="Preview"
                    className="max-h-48 mx-auto rounded-lg object-contain"
                  />
                  <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    {file.name} · {formatFileSize(file.size)}
                  </p>
                  <Button variant="ghost" size="sm" onClick={(e) => { e.stopPropagation(); clearFile(); }}>
                    Choose another
                  </Button>
                </div>
              ) : (
                <>
                  <div className="w-16 h-16 mx-auto rounded-2xl bg-primary-100 dark:bg-primary-900/40 flex items-center justify-center text-primary-600 dark:text-primary-400 mb-4">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                  </div>
                  <p className="text-slate-600 dark:text-slate-400">
                    <span className="font-semibold text-primary-600 dark:text-primary-400">Click to upload</span> or drag and drop
                  </p>
                  <p className="text-sm text-slate-500 dark:text-slate-500 mt-1">
                    Body photos (front-facing, full body visible) or JPG/PNG images (max 10MB).
                  </p>
                </>
              )}
            </div>
          )}

          {mode === MODES.camera && (
            <div className="space-y-4">
              {!cameraActive && !preview && (
                <div className="rounded-xl overflow-hidden bg-slate-200 dark:bg-slate-800 aspect-video flex items-center justify-center">
                  <div className="text-center p-6">
                    <div className="w-16 h-16 mx-auto rounded-2xl bg-primary-100 dark:bg-primary-900/40 flex items-center justify-center text-primary-600 dark:text-primary-400 mb-4">
                      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                      </svg>
                    </div>
                    <p className="text-slate-600 dark:text-slate-400 mb-4">Use your camera to capture a clear full-body photo under good lighting</p>
                    <Button size="md" onClick={startCamera}>
                      Open camera
                    </Button>
                  </div>
                </div>
              )}
              {cameraActive && (
                <div className="relative rounded-xl overflow-hidden bg-slate-900 aspect-video">
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    muted
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
                    <Button size="md" onClick={capturePhoto}>
                      Capture photo
                    </Button>
                    <Button variant="secondary" size="md" onClick={stopCamera}>
                      Cancel
                    </Button>
                  </div>
                </div>
              )}
              {preview && mode === MODES.camera && (
                <div className="space-y-4">
                  <img
                    src={preview}
                    alt="Captured"
                    className="w-full max-h-64 object-contain rounded-lg mx-auto"
                  />
                  <p className="text-sm font-medium text-slate-700 dark:text-slate-300 text-center">
                    {file?.name} · {file && formatFileSize(file.size)}
                  </p>
                  <div className="flex justify-center gap-2">
                    <Button variant="ghost" size="sm" onClick={() => { clearFile(); startCamera(); }}>
                      Retake
                    </Button>
                    <Button variant="secondary" size="sm" onClick={clearFile}>
                      Clear
                    </Button>
                  </div>
                </div>
              )}
              {cameraError && (
                <p className="text-sm text-accent-rose text-center">{cameraError}</p>
              )}
            </div>
          )}

          {error && (
            <p className="mt-4 text-sm text-accent-rose text-center">{error}</p>
          )}

          <div className="mt-6 flex justify-center gap-3">
            <Button
              variant="primary"
              size="lg"
              onClick={handleSubmit}
              loading={loading}
              disabled={!file}
            >
              {loading ? 'Analyzing...' : 'Analyze'}
            </Button>
            {file && !loading && (
              <Button variant="secondary" size="lg" onClick={clearFile}>
                Clear
              </Button>
            )}
          </div>
        </Card>
      </div>
    </div>
  )
}
