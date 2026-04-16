import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { timelineData, type Volume, type Chapter } from '@/lib/timelineData';

interface TimelineProps {
  onVolumeSelect: (volumeId: number) => void;
  selectedVolume: number | null;
  selectedEra: string | null;
}

export default function Timeline({ onVolumeSelect, selectedVolume, selectedEra }: TimelineProps) {
  const [expandedVolume, setExpandedVolume] = useState<number | null>(null);
  const [expandedChapters, setExpandedChapters] = useState<Set<string>>(new Set());

  const toggleVolume = (volumeId: number) => {
    setExpandedVolume(expandedVolume === volumeId ? null : volumeId);
  };

  const toggleChapter = (chapterId: string) => {
    const newSet = new Set(expandedChapters);
    if (newSet.has(chapterId)) {
      newSet.delete(chapterId);
    } else {
      newSet.add(chapterId);
    }
    setExpandedChapters(newSet);
  };

  // Filtrar volumes baseado na era selecionada
  const filteredVolumes = timelineData.volumes.filter(
    (volume: Volume) => selectedEra === null || volume.era === selectedEra
  );

  return (
    <div className="w-full py-8">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold glow-text mb-12 text-center">
          A Linha do Tempo do Universo Halo
        </h2>

        <div className="relative">
          {/* Linha vertical central */}
          {filteredVolumes.length > 0 && (
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full timeline-line" />
          )}

          {/* Volumes */}
          <div className="space-y-8">
            {filteredVolumes.map((volume: Volume, index: number) => (
              <div key={volume.id} className="relative">
                {/* Alternância esquerda/direita */}
                <div className={`flex ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                  {/* Conteúdo */}
                  <div className="w-1/2 px-4">
                    <button
                      onClick={() => {
                        onVolumeSelect(volume.id);
                        toggleVolume(volume.id);
                      }}
                      className={`w-full sci-fi-card p-6 text-left transition-all duration-300 ${
                        selectedVolume === volume.id
                          ? 'ring-2 ring-primary shadow-[0_0_30px_rgba(99,102,241,0.5)]'
                          : 'hover:shadow-[0_0_20px_rgba(99,102,241,0.3)]'
                      }`}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-lg font-bold text-primary">
                          {volume.title}
                        </h3>
                        {expandedVolume === volume.id ? (
                          <ChevronUp className="w-5 h-5 text-primary flex-shrink-0" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-primary flex-shrink-0" />
                        )}
                      </div>

                      <p className="text-sm text-muted-foreground mb-2">
                        Era: <span className="text-primary">{volume.era}</span>
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {volume.timeRange}
                      </p>

                      {/* Capítulos e Eventos - Sempre Visíveis */}
                      <div className="mt-4 pt-4 border-t border-primary/20 space-y-3 max-h-96 overflow-y-auto">
                        {volume.chapters.map((chapter: Chapter) => (
                          <div key={chapter.id}>
                            <div
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleChapter(chapter.id);
                              }}
                              className="w-full text-left flex items-start gap-2 p-2 bg-primary/10 rounded border border-primary/20 hover:bg-primary/20 transition-all cursor-pointer"
                            >
                              <div className="flex-1">
                                <p className="text-xs font-semibold text-primary">
                                  {chapter.title}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                  {chapter.timeRange}
                                </p>
                              </div>
                              {expandedChapters.has(chapter.id) ? (
                                <ChevronUp className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                              ) : (
                                <ChevronDown className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                              )}
                            </div>

                            {/* Eventos do Capítulo */}
                            {expandedChapters.has(chapter.id) && (
                              <div className="mt-2 ml-2 space-y-1 border-l-2 border-primary/30 pl-2">
                                {chapter.keyEvents.map((event, idx) => (
                                  <button
                                    key={idx}
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      // Scroll para a narrativa correspondente
                                      const eventElement = document.getElementById(`event-${chapter.id}-${idx}`);
                                      if (eventElement) {
                                        eventElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
                                        eventElement.classList.add('highlight-event');
                                        setTimeout(() => {
                                          eventElement.classList.remove('highlight-event');
                                        }, 2000);
                                      }
                                    }}
                                    className="w-full text-left text-xs p-1.5 bg-primary/5 rounded hover:bg-primary/15 transition-all text-foreground hover:text-primary"
                                  >
                                    ▸ {event}
                                  </button>
                                ))}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </button>
                  </div>

                  {/* Ponto central */}
                  <div className="w-0 flex justify-center">
                    <div className="timeline-dot" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Mensagem quando nenhum volume é encontrado */}
          {filteredVolumes.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Nenhum volume encontrado para esta era.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
