import { BookOpen, Zap, Globe } from 'lucide-react';

export default function About() {
  return (
    <section className="py-12 px-4 border-t border-primary/20">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold glow-text mb-8 text-center">
          Sobre Esta Crônica
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Card 1 */}
          <div className="sci-fi-card p-6">
            <BookOpen className="w-8 h-8 text-primary mb-3" />
            <h3 className="text-lg font-bold text-primary mb-2">
              Narrativa Completa
            </h3>
            <p className="text-sm text-foreground">
              Baseada em 4.000 eventos históricos extraídos da planilha HaloUniverseTimeline e validados através de múltiplas fontes da Halopedia.
            </p>
          </div>

          {/* Card 2 */}
          <div className="sci-fi-card p-6">
            <Zap className="w-8 h-8 text-primary mb-3" />
            <h3 className="text-lg font-bold text-primary mb-2">
              Timeline Interativa
            </h3>
            <p className="text-sm text-foreground">
              Navegue através de 7 volumes épicos, 30+ capítulos detalhados e explore cada era do universo Halo de forma visual e envolvente.
            </p>
          </div>

          {/* Card 3 */}
          <div className="sci-fi-card p-6">
            <Globe className="w-8 h-8 text-primary mb-3" />
            <h3 className="text-lg font-bold text-primary mb-2">
              Fidelidade Canônica
            </h3>
            <p className="text-sm text-foreground">
              Cada evento, personagem e batalha é documentado com precisão, mantendo a continuidade com o cânone oficial da franquia Halo.
            </p>
          </div>
        </div>


      </div>
    </section>
  );
}
