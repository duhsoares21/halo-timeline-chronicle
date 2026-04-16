import { timelineData, type Volume } from '@/lib/timelineData';
import { X } from 'lucide-react';

interface VolumeContentProps {
  volumeId: number | null;
  onClose: () => void;
}

export default function VolumeContent({ volumeId, onClose }: VolumeContentProps) {
  if (!volumeId) return null;

  const volume = timelineData.volumes.find((v: Volume) => v.id === volumeId);
  if (!volume) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-card border border-primary/30 rounded-sm max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-[0_0_30px_rgba(99,102,241,0.3)]">
        {/* Header */}
        <div className="sticky top-0 bg-card border-b border-primary/20 p-6 flex justify-between items-start">
          <div>
            <h2 className="text-2xl font-bold glow-text mb-2">{volume.title}</h2>
            <p className="text-sm text-muted-foreground">
              Era: <span className="text-primary">{volume.era}</span> • {volume.timeRange}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-muted-foreground hover:text-primary transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Conteúdo */}
        <div className="p-6 space-y-6">
          {volume.chapters.map((chapter) => (
            <div key={chapter.id} className="border-l-2 border-primary/50 pl-4">
              <h3 className="text-lg font-bold text-primary mb-1">
                {chapter.title}
              </h3>
              <p className="text-xs text-muted-foreground mb-3">
                {chapter.timeRange}
              </p>
              <p className="text-sm text-foreground mb-3">
                {chapter.summary}
              </p>
              
              {/* Eventos principais */}
              {chapter.keyEvents.length > 0 && (
                <div className="bg-primary/10 border border-primary/20 rounded p-3">
                  <p className="text-xs font-semibold text-primary mb-2">
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
  );
}
