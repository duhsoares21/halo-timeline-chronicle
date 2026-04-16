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

        {/* Detalhes */}
        <div className="sci-fi-card p-8">
          <h3 className="text-xl font-bold text-primary mb-4">
            Estrutura da Narrativa
          </h3>
          <div className="space-y-4 text-sm text-foreground">
            <div>
              <p className="font-semibold text-primary mb-1">Volume I: A Era dos Criadores</p>
              <p className="text-muted-foreground">
                Desde os Precursores até o disparo do Halo Array (100 bilhões AEC - 97.445 AEC)
              </p>
            </div>
            <div>
              <p className="font-semibold text-primary mb-1">Volume II: O Despertar das Civilizações</p>
              <p className="text-muted-foreground">
                Renascimento humano e ascensão do Covenant (2100 - 2500)
              </p>
            </div>
            <div>
              <p className="font-semibold text-primary mb-1">Volume III: O Primeiro Contato</p>
              <p className="text-muted-foreground">
                Guerra Humano-Covenant e mobilização total (2524 - 2552)
              </p>
            </div>
            <div>
              <p className="font-semibold text-primary mb-1">Volume IV: O Sacrifício de Reach</p>
              <p className="text-muted-foreground">
                Descoberta da Instalação 04 e o heroísmo do Master Chief (Agosto - Dezembro 2552)
              </p>
            </div>
            <div>
              <p className="font-semibold text-primary mb-1">Volume V: O Grande Cisma</p>
              <p className="text-muted-foreground">
                Colapso da Fé e Batalha da Arca (Novembro - Dezembro 2552)
              </p>
            </div>
            <div>
              <p className="font-semibold text-primary mb-1">Volume VI: Reconstrução e Traição</p>
              <p className="text-muted-foreground">
                Era pós-guerra e ascensão dos Spartan-IV (2553 - 2557)
              </p>
            </div>
            <div>
              <p className="font-semibold text-primary mb-1">Volume VII: O Mistério de Zeta Halo</p>
              <p className="text-muted-foreground">
                Ascensão das Criadas e legado eterno (2558 - 2610+)
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
