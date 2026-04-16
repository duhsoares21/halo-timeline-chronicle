import { timelineData, type Volume } from '@/lib/timelineData';

interface EraFilterProps {
  selectedEra: string | null;
  onEraSelect: (era: string | null) => void;
}

export default function EraFilter({ selectedEra, onEraSelect }: EraFilterProps) {
  // Extrair eras únicas
  const eras = Array.from(new Set(timelineData.volumes.map((v: Volume) => v.era)));

  return (
    <div className="w-full py-6 px-4 border-b border-primary/20">
      <div className="max-w-6xl mx-auto">
        <p className="text-sm font-semibold text-primary mb-3">FILTRAR POR ERA:</p>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => onEraSelect(null)}
            className={`px-4 py-2 rounded text-sm font-medium transition-all ${
              selectedEra === null
                ? 'bg-primary text-accent-foreground shadow-[0_0_10px_rgba(99,102,241,0.5)]'
                : 'bg-primary/10 text-primary border border-primary/30 hover:bg-primary/20'
            }`}
          >
            Todas as Eras
          </button>
          {eras.map((era) => (
            <button
              key={era}
              onClick={() => onEraSelect(era)}
              className={`px-4 py-2 rounded text-sm font-medium transition-all ${
                selectedEra === era
                  ? 'bg-primary text-accent-foreground shadow-[0_0_10px_rgba(99,102,241,0.5)]'
                  : 'bg-primary/10 text-primary border border-primary/30 hover:bg-primary/20'
              }`}
            >
              {era}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
