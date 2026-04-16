import { useParams, useLocation } from 'wouter';
import { useState, useRef, useEffect } from 'react';
import { ArrowLeft, Play, Pause, Volume2 } from 'lucide-react';
import { Streamdown } from 'streamdown';
import { timelineData, type Volume } from '@/lib/timelineData';
import { volumeNarratives } from '@/lib/volumeNarratives';

export default function VolumeDetail() {
  const { volumeId } = useParams();
  const [, setLocation] = useLocation();

  const [isPlaying, setIsPlaying] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selectedVoiceName, setSelectedVoiceName] = useState<string | null>(null);

  const synthRef = useRef<SpeechSynthesisUtterance | null>(null);

  const volume = timelineData.volumes.find(
    (v: Volume) => v.id === parseInt(volumeId || '0')
  );
  const narrative = volume ? volumeNarratives[volume.id] : null;

  // 🔊 carregar vozes do sistema
  useEffect(() => {
    const loadVoices = () => {
      const v = window.speechSynthesis.getVoices();
      setVoices(v);
    };

    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;

    const saved = localStorage.getItem('selectedVoice');
    if (saved) setSelectedVoiceName(saved);
  }, []);

  if (!volume || !narrative) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground mb-4">Volume não encontrado</p>
          <button
            onClick={() => setLocation('/')}
            className="text-primary hover:text-primary/80 transition-colors flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar para Home
          </button>
        </div>
      </div>
    );
  }

  // 🎯 muda voz selecionada
  const handleVoiceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelectedVoiceName(value);
    localStorage.setItem('selectedVoice', value);
  };

  // 🔊 play/pause TTS
  const handlePlayPause = () => {
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      setIsPlaying(false);
      return;
    }

    const cleanText = narrative
      .replace(/[#*_`\[\]()]/g, '')
      .replace(/\n+/g, ' ');

    const utterance = new SpeechSynthesisUtterance(cleanText);

    // 🎯 aplicar voz selecionada
    const voice = voices.find(v => v.name === selectedVoiceName);

    if (voice) {
      utterance.voice = voice;
      utterance.lang = voice.lang;
    } else {
      utterance.lang = 'pt-BR';
    }

    utterance.rate = 0.9;
    utterance.pitch = 1;
    utterance.volume = 1;

    utterance.onstart = () => {
      setIsSpeaking(true);
      setIsPlaying(true);
    };

    utterance.onend = () => {
      setIsSpeaking(false);
      setIsPlaying(false);
    };

    utterance.onerror = () => {
      setIsSpeaking(false);
      setIsPlaying(false);
    };

    synthRef.current = utterance;
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* HEADER */}
      <header className="border-b border-primary/20 sticky top-0 z-40 bg-background/95 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-4 py-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setLocation('/')}
              className="text-primary hover:text-primary/80 transition-colors"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>

            <div>
              <h1 className="text-2xl font-bold glow-text">{volume.title}</h1>
              <p className="text-sm text-muted-foreground">
                {volume.era} • {volume.timeRange}
              </p>
            </div>
          </div>

          {/* 🎛️ CONTROLES */}
          <div className="flex items-center gap-2">
            {/* 🎤 SELECTOR DE VOZ */}
            <select
              value={selectedVoiceName || ''}
              onChange={handleVoiceChange}
              className="bg-background border border-primary/50 text-primary px-2 py-2 rounded text-sm"
            >
              <option value="">Voz padrão</option>

              {voices.map((voice) => (
                <option key={voice.name} value={voice.name}>
                  {voice.name} ({voice.lang})
                </option>
              ))}
            </select>

            {/* ▶️ PLAY/PAUSE */}
            <button
              onClick={handlePlayPause}
              className={`flex items-center gap-2 px-4 py-2 rounded border transition-all ${
                isPlaying
                  ? 'border-primary bg-primary/20 text-primary'
                  : 'border-primary/50 text-primary hover:border-primary hover:bg-primary/10'
              }`}
            >
              {isPlaying ? (
                <>
                  <Pause className="w-4 h-4" />
                  <span className="text-sm">Pausar</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4" />
                  <span className="text-sm">Ouvir</span>
                </>
              )}
            </button>

            <Volume2 className="w-5 h-5 text-primary/60" />
          </div>
        </div>
      </header>

      {/* CONTEÚDO */}
      <main className="max-w-4xl mx-auto px-4 py-12">
        <div className="sci-fi-card p-8 mb-12">
          <div className="grid grid-cols-3 gap-6 mb-8">
            <div>
              <p className="text-xs text-primary font-semibold mb-1">CAPÍTULOS</p>
              <p className="text-2xl font-bold text-primary">
                {volume.chapters.length}
              </p>
            </div>
            <div>
              <p className="text-xs text-primary font-semibold mb-1">PERÍODO</p>
              <p className="text-sm text-foreground">{volume.timeRange}</p>
            </div>
            <div>
              <p className="text-xs text-primary font-semibold mb-1">ERA</p>
              <p className="text-sm text-foreground">{volume.era}</p>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold text-primary mb-4">Capítulos</h3>
            <div className="space-y-3">
              {volume.chapters.map((chapter) => (
                <div key={chapter.id} className="border-l-2 border-primary/50 pl-4">
                  <h4 className="font-semibold text-primary mb-1">
                    {chapter.title}
                  </h4>
                  <p className="text-xs text-muted-foreground mb-2">
                    {chapter.timeRange}
                  </p>
                  <p className="text-sm text-foreground mb-2">
                    {chapter.summary}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* NARRATIVA */}
        <div className="sci-fi-card p-8">
          <h2 className="text-2xl font-bold glow-text mb-6">
            Narrativa Completa
          </h2>
          <div className="prose prose-invert max-w-none">
            <Streamdown>{narrative}</Streamdown>
          </div>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="border-t border-primary/20 py-8 px-4 mt-12">
        <div className="max-w-6xl mx-auto text-center text-sm text-muted-foreground">
          <p>
            Crônica do Universo Halo • Volume {volume.id} de{' '}
            {timelineData.volumes.length}
          </p>
        </div>
      </footer>
    </div>
  );
}
