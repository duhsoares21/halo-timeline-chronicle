import { timelineData, type Volume } from '@/lib/timelineData';
import { volumeNarratives } from '@/lib/volumeNarratives';
import { X } from 'lucide-react';
import { Streamdown } from 'streamdown';

interface VolumeContentProps {
  volumeId: number | null;
  onClose: () => void;
}

export default function VolumeContent({ volumeId, onClose }: VolumeContentProps) {
  if (!volumeId) return null;

  const volume = timelineData.volumes.find((v: Volume) => v.id === volumeId);
  if (!volume) return null;

  const narrative = volumeNarratives[volumeId];

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-card border border-primary/30 rounded-sm max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-[0_0_30px_rgba(99,102,241,0.3)] flex flex-col">
        {/* Header */}
        <div className="sticky top-0 bg-card border-b border-primary/20 p-6 flex justify-between items-start flex-shrink-0">
          <div>
            <h2 className="text-2xl font-bold glow-text mb-2">{volume.title}</h2>
            <p className="text-sm text-muted-foreground">
              Era: <span className="text-primary">{volume.era}</span> • {volume.timeRange}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-muted-foreground hover:text-primary transition-colors flex-shrink-0"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Conteúdo com scroll */}
        <div className="overflow-y-auto flex-1 p-6">
          <div className="space-y-6">
            {/* Narrativa Completa */}
            {narrative && (
              <div className="prose prose-invert max-w-none text-sm leading-relaxed">
                <Streamdown>{narrative}</Streamdown>
              </div>
            )}

            {/* Capítulos */}
            <div className="border-t border-primary/20 pt-6">
              <h4 className="text-lg font-bold text-primary mb-4">Capítulos</h4>
              <div className="space-y-3">
                {volume.chapters.map((chapter) => (
                  <div key={chapter.id} className="border-l-2 border-primary/50 pl-4">
                    <h5 className="text-sm font-bold text-primary mb-1">
                      {chapter.title}
                    </h5>
                    <p className="text-xs text-muted-foreground mb-2">
                      {chapter.timeRange}
                    </p>
                    <p className="text-xs text-foreground mb-2">
                      {chapter.summary}
                    </p>

                    {/* Eventos principais */}
                    {chapter.keyEvents.length > 0 && (
                      <div className="bg-primary/10 border border-primary/20 rounded p-2 mt-2">
                        <p className="text-xs font-semibold text-primary mb-1">
                          Eventos Principais:
                        </p>
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
        </div>
      </div>
    </div>
  );
}
