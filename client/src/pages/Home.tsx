import { useState } from 'react';
import Timeline from '@/components/Timeline';
import VolumeContent from '@/components/VolumeContent';
import EraFilter from '@/components/EraFilter';
import ChapterNarrative from '@/components/ChapterNarrative';
import About from '@/components/About';

// Design: Tema sci-fi futurista inspirado em Halo com tipografia Orbitron para títulos
// Cores: Azul/Ciano primário com fundo muito escuro (quase preto)
// Layout: Assimétrico com timeline central e conteúdo lateral

export default function Home() {
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
            Uma narrativa épica baseada em 4.000 eventos históricos do universo Halo
          </p>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-12 px-4 border-b border-primary/20">
        <div className="max-w-6xl mx-auto">
          <div className="sci-fi-card p-8">
            <p className="text-foreground leading-relaxed mb-4">
              Desde o acúmulo de conhecimento dos Precursores há cem bilhões de anos até os monumentos erguidos no século XXVII, 
              esta crônica documenta a história completa do universo Halo. Navegue pela linha do tempo interativa abaixo para explorar 
              cada era, capítulo e evento que moldou a galáxia.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              <div className="bg-primary/10 border border-primary/20 p-4 rounded">
                <p className="text-xs text-primary font-semibold mb-1">7 VOLUMES</p>
                <p className="text-sm text-foreground">Eras históricas completas</p>
              </div>
              <div className="bg-primary/10 border border-primary/20 p-4 rounded">
                <p className="text-xs text-primary font-semibold mb-1">30+ CAPÍTULOS</p>
                <p className="text-sm text-foreground">Narrativas detalhadas</p>
              </div>
              <div className="bg-primary/10 border border-primary/20 p-4 rounded">
                <p className="text-xs text-primary font-semibold mb-1">4.000+ EVENTOS</p>
                <p className="text-sm text-foreground">Fatos verificados</p>
              </div>
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

      {/* Footer */}
      <footer className="border-t border-primary/20 py-8 px-4 mt-12">
        <div className="max-w-6xl mx-auto text-center text-sm text-muted-foreground">
          <p>
            Crônica do Universo Halo • Baseada em dados da Halopedia e 4.000 registros históricos
          </p>
          <p className="mt-4 text-xs text-primary/70">
            Design Sci-Fi Futurista • Timeline Interativa • Narrativas Épicas
          </p>
          <p className="mt-2 text-xs text-primary">
            "Spartans nunca morrem, eles apenas desaparecem em combate"
          </p>
        </div>
      </footer>
    </div>
  );
}
