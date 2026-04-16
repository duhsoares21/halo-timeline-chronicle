import { useLocation } from 'wouter';
import { ArrowLeft, BookOpen } from 'lucide-react';
import { timelineData, type Volume } from '@/lib/timelineData';

// Design: Página de listagem de volumes com cards interativos
// Cores: Tema sci-fi futurista com azul/ciano primário
// Layout: Grid de volumes com informações e links

export default function Volumes() {
  const [, setLocation] = useLocation();

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
            <h1 className="text-3xl font-bold glow-text">Todos os Volumes</h1>
            <p className="text-sm text-muted-foreground">
              {timelineData.volumes.length} volumes épicos da história de Halo
            </p>
          </div>
        </div>
      </header>

      {/* Conteúdo */}
      <main className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {timelineData.volumes.map((volume: Volume) => (
            <button
              key={volume.id}
              onClick={() => setLocation(`/volume/${volume.id}`)}
              className="sci-fi-card p-6 text-left transition-all hover:shadow-[0_0_30px_rgba(99,102,241,0.3)] hover:ring-1 hover:ring-primary"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="p-3 bg-primary/20 rounded">
                  <BookOpen className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-primary mb-1">
                    Volume {volume.id}
                  </h3>
                  <p className="text-sm text-muted-foreground">{volume.era}</p>
                </div>
              </div>

              <h4 className="text-xl font-bold text-foreground mb-2">{volume.title}</h4>

              <p className="text-sm text-muted-foreground mb-4">
                {volume.timeRange}
              </p>

              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="bg-primary/10 border border-primary/20 rounded p-2">
                  <p className="text-xs text-primary font-semibold">CAPÍTULOS</p>
                  <p className="text-lg font-bold text-primary">{volume.chapters.length}</p>
                </div>
                <div className="bg-primary/10 border border-primary/20 rounded p-2">
                  <p className="text-xs text-primary font-semibold">EVENTOS</p>
                  <p className="text-lg font-bold text-primary">
                    {volume.chapters.reduce((sum, ch) => sum + ch.keyEvents.length, 0)}
                  </p>
                </div>
              </div>

              <div className="text-xs text-primary font-semibold">
                Clique para ler a narrativa completa →
              </div>
            </button>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-primary/20 py-8 px-4 mt-12">
        <div className="max-w-6xl mx-auto text-center text-sm text-muted-foreground">
          <p>Crônica do Universo Halo • {timelineData.volumes.length} Volumes Épicos</p>
        </div>
      </footer>
    </div>
  );
}
