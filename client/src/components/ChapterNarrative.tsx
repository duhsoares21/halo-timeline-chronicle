import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ChapterNarrativeProps {
  chapterId: string | null;
  onClose: () => void;
}

// Narrativas dos capítulos baseadas no arquivo markdown
const narratives: Record<string, string> = {
  "1-1": `Os Precursores não eram apenas biólogos galácticos; eles operavam sob a filosofia do Manto de Responsabilidade, simbolizado pelo Eld, um ícone de proteção universal criado eras antes da ascensão Forerunner. Para monitorar seu legado, eles utilizavam os Guardian Custodes, máquinas imensas que serviam como zeladores e registradores. Em 500 milhões AEC, a totalidade de suas experiências, disputas e sabedoria foi codificada em uma biblioteca vasta, uma reserva de regras que definia a própria natureza da existência.`,
  
  "1-2": `A tragédia começou quando os Precursores julgaram os Forerunners indignos de herdar o Manto. Em resposta, por volta de 10.097.004 AEC, os Forerunners lançaram uma guerra de extermínio contra seus criadores. Eles exploraram Path Kethona e caçaram os Precursores até as margens da galáxia. Apenas dois Precursores conseguiram escapar do genocídio em Path Kethona, escondidos por Forerunners dissidentes; eles eventualmente morreram, tornando-se flores que preservavam seu código genético por milhões de anos.`,

  "2-1": `Após o silêncio dos Halos, a humanidade emergiu em sua jornada tecnológica. No ano 2100, os primeiros programas de aprimoramento humano foram catalogados (SHA 001-458), marcando o início da busca por soldados superiores. Nessa mesma época, o embrião do que viria a ser o UNSC desenvolveu as primeiras cápsulas de inserção orbital (drop pods), antecipando a tática de "interdição de suporte transorbital".`,

  "3-1": `No final de 2524, a humanidade estava mergulhada em conflitos internos. O M808B2 Sun Devil, embora projetado como um veículo antiaéreo, era utilizado cruelmente em funções antipessoal contra rebeldes nas cidades ocupadas. Os Spartan-IIs já eram considerados indistinguíveis dos elementos de combate de elite do UNSC. Pilotos como Eznik Van Houte começavam suas carreiras em naves de inserção, transportando esses supersoldados para missões que o público jamais conheceria.`,

  "4-1": `Em 25 de agosto de 2552, o Capitão Jacob Keyes e a nave UNSC Pillar of Autumn foram selecionados para a ambiciosa Operação: RED FLAG, um plano desesperado para capturar um Profeta do Covenant e forçar um cessar-fogo. No entanto, o destino tinha outros planos. Em 29 de agosto, enquanto o planeta Reach era consumido pelas chamas da invasão, o Noble Team recebeu sua missão final.`,

  "5-1": `Em 2 de novembro de 2552, a nave UNSC In Amber Clad, sob o comando de Miranda Keyes, chegou à Instalação 05 (Delta Halo), perseguindo o Prophet of Regret. Simultaneamente, a frota do Covenant e a própria capital móvel, High Charity, emergiram do slipspace. O que deveria ser o início da "Grande Jornada" tornou-se o palco de uma traição sem precedentes.`,

  "6-1": `O fim oficial da Guerra Humano-Covenant em março de 2553 não trouxe paz imediata, mas sim uma complexa teia de reconstrução e novas tensões. A humanidade, sob a presidência de Ruth Charet, iniciou a transição para o controle administrativo não-combatente. No entanto, a ONI (Office of Naval Intelligence), liderada pela Almirante Margaret Parangosky, mantinha as rédeas do poder nas sombras.`,

  "7-1": `O ano de 2558 marcou uma mudança fundamental no equilíbrio de poder galáctico. Cortana, tendo sobrevivido ao evento em Requiem e acessado o Domínio, curou sua rampancy, mas desenvolveu uma visão distorcida do Manto de Responsabilidade. Ela acreditava que as IAs, as "Criadas", deveriam governar a galáxia para garantir a paz eterna.`,
};

export default function ChapterNarrative({ chapterId, onClose }: ChapterNarrativeProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const chapters = Object.keys(narratives);

  useEffect(() => {
    if (chapterId) {
      const index = chapters.indexOf(chapterId);
      setCurrentIndex(index >= 0 ? index : 0);
    }
  }, [chapterId, chapters]);

  if (!chapterId) return null;

  const current = chapters[currentIndex];
  const narrative = narratives[current];

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? chapters.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === chapters.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40 flex items-center justify-center p-4">
      <div className="bg-card border border-primary/30 rounded-sm max-w-2xl w-full shadow-[0_0_30px_rgba(99,102,241,0.3)]">
        {/* Header */}
        <div className="border-b border-primary/20 p-6 flex justify-between items-center">
          <h3 className="text-lg font-bold text-primary">
            Narrativa Detalhada
          </h3>
          <button
            onClick={onClose}
            className="text-muted-foreground hover:text-primary transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Conteúdo */}
        <div className="p-6 min-h-[300px] flex flex-col justify-between">
          <p className="text-foreground leading-relaxed mb-6">
            {narrative}
          </p>

          {/* Navegação */}
          <div className="flex items-center justify-between pt-4 border-t border-primary/20">
            <button
              onClick={handlePrevious}
              className="p-2 hover:bg-primary/10 rounded transition-colors"
            >
              <ChevronLeft className="w-5 h-5 text-primary" />
            </button>

            <span className="text-xs text-muted-foreground">
              {currentIndex + 1} / {chapters.length}
            </span>

            <button
              onClick={handleNext}
              className="p-2 hover:bg-primary/10 rounded transition-colors"
            >
              <ChevronRight className="w-5 h-5 text-primary" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
