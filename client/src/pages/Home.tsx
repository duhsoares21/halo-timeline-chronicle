import { useState } from 'react';
import { useLocation } from 'wouter';
import Timeline from '@/components/Timeline';
import VolumeContent from '@/components/VolumeContent';
import EraFilter from '@/components/EraFilter';
import ChapterNarrative from '@/components/ChapterNarrative';
import About from '@/components/About';
import { timelineData } from '@/lib/timelineData';

// Design: Tema sci-fi futurista inspirado em Halo com tipografia Orbitron para títulos
// Cores: Azul/Ciano primário com fundo muito escuro (quase preto)
// Layout: Assimétrico com timeline central e conteúdo lateral
// Funcionalidades: Links interativos para páginas dedicadas, TTS em modais e páginas de volumes

export default function Home() {
  const [, setLocation] = useLocation();
  const [selectedVolume, setSelectedVolume] = useState<number | null>(null);
  const [selectedEra, setSelectedEra] = useState<string | null>(null);
  const [selectedChapter, setSelectedChapter] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-primary/20 py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold glow-text mb-2">
            A Crônica Universal de Halo
          </h1>
            <p className="text-lg text-muted-foreground">
            Uma narrativa épica baseada em 78 marcos históricos principais do universo Halo
          </p>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-12 px-4 border-b border-primary/20">
        <div className="max-w-6xl mx-auto">
          <div className="sci-fi-card p-8">
            <p className="text-foreground leading-relaxed mb-4">
              Desde o acúmulo de conhecimento dos Precursores há cem bilhões de anos até os monumentos erguidos no século XXVII, 
              esta crônica documenta a história completa do universo Halo através de 78 marcos históricos principais. Navegue pela linha do tempo interativa abaixo para explorar 
              cada era, capítulo e evento que moldou a galáxia.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              <button
                onClick={() => setLocation('/volumes')}
                className="bg-primary/10 border border-primary/20 p-4 rounded hover:bg-primary/20 hover:border-primary/40 transition-all cursor-pointer text-left"
              >
                <p className="text-xs text-primary font-semibold mb-1">7 VOLUMES</p>
                <p className="text-sm text-foreground">Eras históricas completas</p>
                <p className="text-xs text-primary/60 mt-2">Explorar →</p>
              </button>
              <button
                onClick={() => setLocation('/chapters')}
                className="bg-primary/10 border border-primary/20 p-4 rounded hover:bg-primary/20 hover:border-primary/40 transition-all cursor-pointer text-left"
              >
                <p className="text-xs text-primary font-semibold mb-1">30+ CAPÍTULOS</p>
                <p className="text-sm text-foreground">Narrativas detalhadas</p>
                <p className="text-xs text-primary/60 mt-2">Explorar →</p>
              </button>
              <button
                onClick={() => setLocation('/events')}
                className="bg-primary/10 border border-primary/20 p-4 rounded hover:bg-primary/20 hover:border-primary/40 transition-all cursor-pointer text-left"
              >
                <p className="text-xs text-primary font-semibold mb-1">78 EVENTOS</p>
                <p className="text-sm text-foreground">Marcos históricos principais</p>
                <p className="text-xs text-primary/60 mt-2">Explorar →</p>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Era Filter */}
      <EraFilter 
        selectedEra={selectedEra}
        onEraSelect={setSelectedEra}
      />

      {/* Timeline Section */}
      <section className="py-12 px-4">
        <Timeline 
          onVolumeSelect={setSelectedVolume}
          selectedVolume={selectedVolume}
          selectedEra={selectedEra}
        />
      </section>

      {/* Volume Content Modal */}
      <VolumeContent 
        volumeId={selectedVolume}
        onClose={() => setSelectedVolume(null)}
      />

      {/* Chapter Narrative Modal */}
      <ChapterNarrative
        chapterId={selectedChapter}
        onClose={() => setSelectedChapter(null)}
      />

      {/* About Section */}
      <About />

      {/* Estrutura Narrativa com Links */}
      <section className="py-12 px-4 border-t border-primary/20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold glow-text mb-8 text-center">
            Estrutura da Narrativa
          </h2>

          <div className="sci-fi-card p-8">
            <div className="space-y-4 text-sm text-foreground">
              {timelineData.volumes.map((volume) => (
                <button
                  key={volume.id}
                  onClick={() => setLocation(`/volume/${volume.id}`)}
                  className="w-full text-left p-3 bg-primary/10 border border-primary/20 rounded hover:bg-primary/20 hover:border-primary/40 transition-all"
                >
                  <p className="font-semibold text-primary mb-1">{volume.title}</p>
                  <p className="text-muted-foreground text-xs">
                    {volume.timeRange}
                  </p>
                </button>
              ))}
            </div>
            <button
              onClick={() => setLocation('/volumes')}
              className="w-full mt-6 px-4 py-2 bg-primary text-background font-semibold rounded hover:bg-primary/80 transition-colors"
            >
              Ver Todos os Volumes
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-primary/20 py-8 px-4 mt-12">
        <div className="max-w-6xl mx-auto text-center text-sm text-muted-foreground">
          <p>
            Crônica do Universo Halo • Baseada em dados da Halopedia e 78 marcos históricos principais
          </p>
          <p className="mt-4 text-xs text-primary/70">
            Design Sci-Fi Futurista • Timeline Interativa • Narrativas Épicas • Leitura em Voz
          </p>
        </div>
      </footer>
    </div>
  );
}
