import { useLocation } from 'wouter';
import { ArrowLeft, BookMarked } from 'lucide-react';
import { timelineData, type Volume } from '@/lib/timelineData';

// Design: Página de listagem de capítulos
// Cores: Tema sci-fi futurista com azul/ciano primário
// Layout: Lista organizada por volume

export default function Chapters() {
  const [, setLocation] = useLocation();

  const allChapters = timelineData.volumes.flatMap((volume: Volume) =>
    volume.chapters.map((chapter) => ({
      ...chapter,
      volumeId: volume.id,
      volumeTitle: volume.title,
      volumeEra: volume.era,
    }))
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
            <h1 className="text-3xl font-bold glow-text">Todos os Capítulos</h1>
            <p className="text-sm text-muted-foreground">
              {allChapters.length}+ capítulos da história de Halo
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

              <div className="space-y-3">
                {volume.chapters.map((chapter) => (
                  <button
                    key={chapter.id}
                    onClick={() => setLocation(`/volume/${volume.id}`)}
                    className="w-full sci-fi-card p-4 text-left transition-all hover:shadow-[0_0_20px_rgba(99,102,241,0.3)] hover:ring-1 hover:ring-primary"
                  >
                    <div className="flex items-start gap-3">
                      <BookMarked className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                      <div className="flex-1">
                        <h3 className="font-bold text-primary mb-1">{chapter.title}</h3>
                        <p className="text-xs text-muted-foreground mb-2">{chapter.timeRange}</p>
                        <p className="text-sm text-foreground mb-2">{chapter.summary}</p>
                        {chapter.keyEvents.length > 0 && (
                          <div className="text-xs text-primary">
                            {chapter.keyEvents.length} eventos principais
                          </div>
                        )}
                      </div>
                    </div>
                  </button>
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
          <p>Crônica do Universo Halo • {allChapters.length}+ Capítulos</p>
        </div>
      </footer>
    </div>
  );
}
