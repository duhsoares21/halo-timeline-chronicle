import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { timelineData, type Volume, type Chapter } from '@/lib/timelineData';

interface TimelineProps {
  onVolumeSelect: (volumeId: number) => void;
  selectedVolume: number | null;
}

export default function Timeline({ onVolumeSelect, selectedVolume }: TimelineProps) {
  const [expandedVolume, setExpandedVolume] = useState<number | null>(null);

  const toggleVolume = (volumeId: number) => {
    setExpandedVolume(expandedVolume === volumeId ? null : volumeId);
  };

  return (
    <div className="w-full py-8">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-3xl font-bold glow-text mb-12 text-center">
          A Linha do Tempo do Universo Halo
        </h2>

        <div className="relative">
          {/* Linha vertical central */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full timeline-line" />

          {/* Volumes */}
          <div className="space-y-8">
            {timelineData.volumes.map((volume: Volume, index: number) => (
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

                      {/* Capítulos expandidos */}
                      {expandedVolume === volume.id && (
                        <div className="mt-4 pt-4 border-t border-primary/20 space-y-2">
                            {volume.chapters.map((chapter: Chapter) => (
                            <div
                              key={chapter.id}
                              className="text-xs bg-primary/10 p-2 rounded border border-primary/20"
                            >
                              <p className="font-semibold text-primary">
                                {chapter.title}
                              </p>
                              <p className="text-muted-foreground text-xs mt-1">
                                {chapter.timeRange}
                              </p>
                            </div>
                          ))}
                        </div>
                      )}
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
        </div>
      </div>
    </div>
  );
}
