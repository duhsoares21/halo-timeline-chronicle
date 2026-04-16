import { useLocation } from 'wouter';
import { ArrowLeft, Zap, ExternalLink } from 'lucide-react';
import { timelineData, type Volume } from '@/lib/timelineData';
import { getHalopediaLink } from '@/lib/eventLinks';

// Design: Página de listagem de eventos
// Cores: Tema sci-fi futurista com azul/ciano primário
// Layout: Lista organizada por volume e capítulo

export default function Events() {
  const [, setLocation] = useLocation();

  const allEvents = timelineData.volumes.flatMap((volume: Volume) =>
    volume.chapters.flatMap((chapter) =>
      chapter.keyEvents.map((event) => ({
        event,
        chapterId: chapter.id,
        chapterTitle: chapter.title,
        volumeId: volume.id,
        volumeTitle: volume.title,
        timeRange: chapter.timeRange,
      }))
    )
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-primary/20 sticky top-0 z-40 bg-background/95 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-4 py-6 flex items-center gap-4">
          <button
            onClick={() => setLocation('/')}
            className="text-primary hover:text-primary/80 transition-colors"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div>
            <h1 className="text-3xl font-bold glow-text">Todos os Eventos</h1>
            <p className="text-sm text-muted-foreground">
              {allEvents.length} marcos históricos principais verificados
            </p>
          </div>
        </div>
      </header>

      {/* Conteúdo */}
      <main className="max-w-4xl mx-auto px-4 py-12">
        <div className="space-y-8">
          {timelineData.volumes.map((volume: Volume) => (
            <div key={volume.id}>
              <div className="mb-6">
                <h2 className="text-2xl font-bold glow-text mb-2">{volume.title}</h2>
                <p className="text-sm text-muted-foreground">
                  {volume.era} • {volume.timeRange}
                </p>
              </div>

              <div className="space-y-6">
                {volume.chapters.map((chapter) => (
                  <div key={chapter.id} className="border-l-2 border-primary/50 pl-4">
                    <h3 className="font-bold text-primary mb-3">{chapter.title}</h3>
                    <div className="space-y-2">
                      {chapter.keyEvents.map((event, idx) => {
                        const halopediaLink = getHalopediaLink(event);
                        return (
                          <div
                            key={idx}
                            className="sci-fi-card p-3 flex items-start gap-3 transition-all hover:shadow-[0_0_15px_rgba(99,102,241,0.2)]"
                          >
                            <Zap className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                            <div className="flex-1 flex items-center justify-between gap-2">
                              <p className="text-sm text-foreground">{event}</p>
                              {halopediaLink && (
                                <a
                                  href={halopediaLink}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-primary hover:text-primary/80 transition-colors flex-shrink-0"
                                  title="Abrir na Halopedia"
                                >
                                  <ExternalLink className="w-4 h-4" />
                                </a>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>

              {volume.id !== timelineData.volumes.length && (
                <div className="border-t border-primary/20 my-8" />
              )}
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-primary/20 py-8 px-4 mt-12">
        <div className="max-w-6xl mx-auto text-center text-sm text-muted-foreground">
          <p>Crônica do Universo Halo • {allEvents.length} Marcos Históricos Principais</p>
          <p className="mt-2 text-xs text-primary/70">
            Clique no ícone <ExternalLink className="w-3 h-3 inline" /> para abrir na Halopedia
          </p>
        </div>
      </footer>
    </div>
  );
}
