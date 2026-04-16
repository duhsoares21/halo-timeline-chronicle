import { useParams, useLocation } from 'wouter';
import { useState, useRef } from 'react';
import { ArrowLeft, Play, Pause, Volume2 } from 'lucide-react';
import { Streamdown } from 'streamdown';
import { timelineData, type Volume } from '@/lib/timelineData';
import { volumeNarratives } from '@/lib/volumeNarratives';

// Design: Página dedicada de volume com narrativa completa e TTS
// Cores: Tema sci-fi futurista com azul/ciano primário
// Layout: Narrativa central com controles de TTS no topo

export default function VolumeDetail() {
  const { volumeId } = useParams();
  const [, setLocation] = useLocation();
  const [isPlaying, setIsPlaying] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const synthRef = useRef<SpeechSynthesisUtterance | null>(null);

  const volume = timelineData.volumes.find((v: Volume) => v.id === parseInt(volumeId || '0'));
  const narrative = volume ? volumeNarratives[volume.id] : null;

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

  const handlePlayPause = () => {
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      setIsPlaying(false);
    } else {
      // Remove markdown formatting para TTS
      const cleanText = narrative
        .replace(/[#*_`\[\]()]/g, '')
        .replace(/\n+/g, ' ');

      const utterance = new SpeechSynthesisUtterance(cleanText);
      utterance.lang = 'pt-BR';
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
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
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

          {/* Controles de TTS */}
          <div className="flex items-center gap-2">
            <button
              onClick={handlePlayPause}
              className={`flex items-center gap-2 px-4 py-2 rounded border transition-all ${
                isPlaying
                  ? 'border-primary bg-primary/20 text-primary'
                  : 'border-primary/50 text-primary hover:border-primary hover:bg-primary/10'
              }`}
              title={isPlaying ? 'Pausar leitura' : 'Iniciar leitura em voz'}
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

      {/* Conteúdo */}
      <main className="max-w-4xl mx-auto px-4 py-12">
        {/* Informações do Volume */}
        <div className="sci-fi-card p-8 mb-12">
          <div className="grid grid-cols-3 gap-6 mb-8">
            <div>
              <p className="text-xs text-primary font-semibold mb-1">CAPÍTULOS</p>
              <p className="text-2xl font-bold text-primary">{volume.chapters.length}</p>
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

          {/* Capítulos */}
          <div>
            <h3 className="text-lg font-bold text-primary mb-4">Capítulos</h3>
            <div className="space-y-3">
              {volume.chapters.map((chapter) => (
                <div key={chapter.id} className="border-l-2 border-primary/50 pl-4">
                  <h4 className="font-semibold text-primary mb-1">{chapter.title}</h4>
                  <p className="text-xs text-muted-foreground mb-2">{chapter.timeRange}</p>
                  <p className="text-sm text-foreground mb-2">{chapter.summary}</p>
                  {chapter.keyEvents.length > 0 && (
                    <div className="bg-primary/10 border border-primary/20 rounded p-2">
                      <p className="text-xs font-semibold text-primary mb-1">Eventos Principais:</p>
                      <ul className="text-xs text-foreground space-y-1">
                        {chapter.keyEvents.map((event, idx) => (
                          <li key={idx} className="flex items-start">
                            <span className="text-primary mr-2">▸</span>
                            <span>{event}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Narrativa Completa */}
        <div className="sci-fi-card p-8">
          <h2 className="text-2xl font-bold glow-text mb-6">Narrativa Completa</h2>
          <div className="prose prose-invert max-w-none">
            <Streamdown>{narrative}</Streamdown>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-primary/20 py-8 px-4 mt-12">
        <div className="max-w-6xl mx-auto text-center text-sm text-muted-foreground">
          <p>Crônica do Universo Halo • Volume {volume.id} de {timelineData.volumes.length}</p>
        </div>
      </footer>
    </div>
  );
}
