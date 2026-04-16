// Mapeamento de eventos para links da Halopedia
export const eventHalopediaLinks: Record<string, string> = {
  // Era Ancestral - Precursores
  "Chegada dos Precursores": "https://www.halopedia.org/Precursor",
  "Criação do Eld": "https://www.halopedia.org/Domain",
  "Codificação do Domínio": "https://www.halopedia.org/Domain",

  // Era Ancestral - Forerunners
  "Semeadura dos Forerunners": "https://www.halopedia.org/Forerunner",
  "Desenvolvimento da Luz Sólida": "https://www.halopedia.org/Hard_light",
  "Genocídio dos Precursores": "https://www.halopedia.org/Precursor",

  // Era Ancestral - Diáspora
  "Destruição de Ghibalb": "https://www.halopedia.org/Ghibalb",
  "Formação das Rates": "https://www.halopedia.org/Forerunner_rate",
  "Guerras Civis Internas": "https://www.halopedia.org/Forerunner_history",

  // Era Ancestral - Figuras Centrais
  "Nascimento da Librarian": "https://www.halopedia.org/Librarian",
  "Nascimento do Ur-Didact": "https://www.halopedia.org/Ur-Didact",
  "Estabelecimento de Maethrillian": "https://www.halopedia.org/Maethrillian",

  // Era Ancestral - Guerra contra Ancestrais
  "Descoberta do Primordial": "https://www.halopedia.org/Primordial",
  "Cerco de Charum Hakkor": "https://www.halopedia.org/Charum_Hakkor",
  "Uso de War Sphinxes": "https://www.halopedia.org/War_Sphinx",

  // Era Ancestral - Flood e Halo
  "Invasão do Flood": "https://www.halopedia.org/Flood",
  "Praga Lógica": "https://www.halopedia.org/Logic_plague",
  "Ativação do Halo Array": "https://www.halopedia.org/Halo_Array",

  // Era Renascimento Humano
  "Fundação da UNSC": "https://www.halopedia.org/UNSC",
  "Primeira Colônia Humana": "https://www.halopedia.org/Human_colonies",
  "Desenvolvimento de Spartans": "https://www.halopedia.org/SPARTAN",
  "Projeto ORION": "https://www.halopedia.org/SPARTAN-I",
  "Formação do Covenant": "https://www.halopedia.org/Covenant",
  "Ascensão dos Elites": "https://www.halopedia.org/Elite",

  // Era Guerra Humano-Covenant
  "Primeiro Contato em Harvest": "https://www.halopedia.org/Harvest",
  "Mobilização Spartan-II": "https://www.halopedia.org/SPARTAN-II",
  "Queda de Reach": "https://www.halopedia.org/Fall_of_Reach",
  "Descoberta de Halo": "https://www.halopedia.org/Installation_04",
  "Despertar do Flood": "https://www.halopedia.org/Flood",
  "Morte de Jenkins": "https://www.halopedia.org/Sergeant_Johnson",
  "Ativação de Halo 04": "https://www.halopedia.org/Installation_04",

  // Era Grande Cisma
  "Grande Cisma": "https://www.halopedia.org/Great_Schism",
  "Queda de High Charity": "https://www.halopedia.org/High_Charity",
  "Morte do Profeta da Verdade": "https://www.halopedia.org/Prophet_of_Truth",
  "Batalha da Arca": "https://www.halopedia.org/Battle_of_the_Ark",
  "Desaparecimento do Master Chief": "https://www.halopedia.org/John-117",

  // Era Pós-Guerra
  "Reconstrução de Reach": "https://www.halopedia.org/Reach",
  "Despertar em Requiem": "https://www.halopedia.org/Requiem",
  "Ascensão dos Spartan-IV": "https://www.halopedia.org/SPARTAN-IV",
  "Retorno do Master Chief": "https://www.halopedia.org/John-117",

  // Era Moderna
  "Ascensão das Criadas": "https://www.halopedia.org/Created",
  "Ameaça de Cortana": "https://www.halopedia.org/Cortana",
  "Descoberta de Zeta Halo": "https://www.halopedia.org/Zeta_Halo",
  "Retorno de Atriox": "https://www.halopedia.org/Atriox",
  "Ascensão dos Banished": "https://www.halopedia.org/Banished",
  "Legado dos Spartans": "https://www.halopedia.org/SPARTAN",
};

// Função para obter o link da Halopedia para um evento
export function getHalopediaLink(eventName: string): string | null {
  return eventHalopediaLinks[eventName] || null;
}

// Função para verificar se um evento tem link
export function hasHalopediaLink(eventName: string): boolean {
  return eventName in eventHalopediaLinks;
}
