
import { Agent } from '@/types/agent';

// Données simulées des agents pour la démo
const mockAgents: Agent[] = [
  {
    id: "1",
    name: "Sophie Martin",
    email: "sophie.martin@noovimo.fr",
    phone: "06 12 34 56 78",
    photo: "https://i.pravatar.cc/150?img=1",
    city: "Nantes",
    department: "Loire-Atlantique (44)",
    joinDate: "Jan 2020",
    latitude: 47.218371,
    longitude: -1.553621,
    bio: "Spécialiste en immobilier résidentiel à Nantes et ses environs depuis plus de 5 ans. J'accompagne mes clients dans tous leurs projets immobiliers avec passion et professionnalisme.",
    specialties: ["Résidentiel", "Investissement locatif"],
    status: "active",
    passions: ["Photographie", "Jardinage", "Cuisine"],
    favoriteSport: "Yoga",
    family: "Mariée, 2 enfants",
    birthday: "15 avril",
    idealVacation: "Une semaine en Italie, entre culture et gastronomie",
    mantra: "L'immobilier est avant tout une histoire de personnes, pas de propriétés"
  },
  {
    id: "2",
    name: "Thomas Dubois",
    email: "thomas.dubois@noovimo.fr",
    phone: "06 23 45 67 89",
    photo: "https://i.pravatar.cc/150?img=11",
    city: "Rennes",
    department: "Ille-et-Vilaine (35)",
    joinDate: "Mar 2021",
    latitude: 48.117266,
    longitude: -1.677793,
    specialties: ["Maisons individuelles", "Terrains"],
    status: "active",
    bio: "Ancien architecte reconverti dans l'immobilier, je vous aide à trouver le bien qui vous correspond vraiment.",
    passions: ["Architecture", "Design", "Voyages"],
    favoriteSport: "VTT",
    birthday: "3 septembre"
  },
  {
    id: "3",
    name: "Marine Lefevre",
    email: "marine.lefevre@noovimo.fr",
    phone: "06 34 56 78 90",
    photo: "https://i.pravatar.cc/150?img=5",
    city: "Bordeaux",
    department: "Gironde (33)",
    joinDate: "Sep 2020",
    latitude: 44.837789,
    longitude: -0.579180,
    specialties: ["Appartements", "Immobilier de luxe"],
    status: "active",
    bio: "Passionnée par l'immobilier de caractère et les biens d'exception. J'aime mettre en relation des personnes avec le lieu où elles se sentiront chez elles.",
    passions: ["Œnologie", "Art contemporain"],
    favoriteSport: "Tennis",
    family: "Un fils de 8 ans",
    mantra: "Chaque bien a une âme, chaque client a une histoire"
  },
  {
    id: "4",
    name: "Pierre Moreau",
    email: "pierre.moreau@noovimo.fr",
    phone: "06 45 67 89 01",
    photo: "https://i.pravatar.cc/150?img=15",
    city: "Lyon",
    department: "Rhône (69)",
    joinDate: "Nov 2019",
    latitude: 45.764043,
    longitude: 4.835659,
    specialties: ["Immobilier commercial", "Bureaux"],
    status: "active",
    bio: "Expert en immobilier commercial dans la région lyonnaise, je vous accompagne dans l'acquisition ou la vente de vos locaux professionnels.",
    passions: ["Gastronomie", "Musique classique"],
    favoriteSport: "Course à pied",
    family: "Marié",
    birthday: "22 janvier",
    idealVacation: "Voyage culturel dans une capitale européenne",
    mantra: "La clé du succès immobilier : l'écoute et la connaissance du marché"
  },
  {
    id: "5",
    name: "Emilie Rousseau",
    email: "emilie.rousseau@noovimo.fr",
    phone: "06 56 78 90 12",
    photo: "https://i.pravatar.cc/150?img=9",
    city: "Toulouse",
    department: "Haute-Garonne (31)",
    joinDate: "Fév 2022",
    latitude: 43.604652,
    longitude: 1.444209,
    specialties: ["Résidentiel", "Premier achat"],
    status: "active",
    bio: "Passionnée par l'accompagnement des primo-accédants, je vous guide pas à pas dans votre premier projet immobilier.",
    passions: ["Cuisine du Sud-Ouest", "Randonnée"],
    favoriteSport: "Padel",
    family: "Deux enfants",
    birthday: "5 octobre",
    idealVacation: "Un chalet à la montagne en famille",
    mantra: "Votre premier achat mérite un accompagnement d'exception"
  },
  {
    id: "6",
    name: "Lucas Bernard",
    email: "lucas.bernard@noovimo.fr",
    phone: "06 67 89 01 23",
    photo: "https://i.pravatar.cc/150?img=12",
    city: "Lille",
    department: "Nord (59)",
    joinDate: "Juil 2021",
    latitude: 50.629250,
    longitude: 3.057256,
    specialties: ["Maisons anciennes", "Rénovation"],
    status: "active",
    bio: "Expert en biens de caractère dans la métropole lilloise, je saurai vous trouver la perle rare.",
    passions: ["Brocante", "Cyclisme"],
    favoriteSport: "Vélo",
    birthday: "17 mars"
  },
  {
    id: "7",
    name: "Julie Lambert",
    email: "julie.lambert@noovimo.fr",
    phone: "06 78 90 12 34",
    photo: "https://i.pravatar.cc/150?img=6",
    city: "Nice",
    department: "Alpes-Maritimes (06)",
    joinDate: "Mai 2020",
    latitude: 43.710173,
    longitude: 7.261953,
    specialties: ["Vue mer", "Résidences secondaires"],
    status: "active",
    bio: "Je vous aide à trouver votre résidence secondaire idéale sur la Côte d'Azur.",
    passions: ["Voile", "Photographie"],
    favoriteSport: "Natation",
    family: "Un enfant",
    idealVacation: "Un voilier en Méditerranée"
  },
  {
    id: "8",
    name: "Antoine Girard",
    email: "antoine.girard@noovimo.fr",
    phone: "06 89 01 23 45",
    photo: "https://i.pravatar.cc/150?img=17",
    city: "Strasbourg",
    department: "Bas-Rhin (67)",
    joinDate: "Avr 2021",
    latitude: 48.573405,
    longitude: 7.752111,
    specialties: ["Studios", "Investissement"],
    status: "active",
    bio: "Spécialiste de l'investissement locatif à Strasbourg et ses environs.",
    passions: ["Échecs", "Vins d'Alsace"],
    favoriteSport: "Ski",
    family: "Célibataire",
    birthday: "30 novembre",
    mantra: "Investir aujourd'hui pour récolter demain"
  },
  {
    id: "9",
    name: "Sarah Petit",
    email: "sarah.petit@noovimo.fr",
    phone: "06 90 12 34 56",
    photo: "https://i.pravatar.cc/150?img=20",
    city: "Montpellier",
    department: "Hérault (34)",
    joinDate: "Août 2019",
    latitude: 43.610769,
    longitude: 3.876716,
    specialties: ["Immobilier de luxe", "Villas avec piscine"],
    status: "active",
    bio: "Experte en biens d'exception dans la région de Montpellier.",
    passions: ["Équitation", "Œnologie"],
    favoriteSport: "Équitation",
    family: "Mariée, 1 enfant",
    birthday: "12 août",
    idealVacation: "Safari en Afrique",
    mantra: "L'excellence est mon standard"
  },
  {
    id: "10",
    name: "Nicolas Fournier",
    email: "nicolas.fournier@noovimo.fr",
    phone: "06 01 23 45 67",
    photo: "https://i.pravatar.cc/150?img=14",
    city: "Biarritz",
    department: "Pyrénées-Atlantiques (64)",
    joinDate: "Déc 2020",
    latitude: 43.483152,
    longitude: -1.558626,
    specialties: ["Résidentiel", "Biens en bord de mer"],
    status: "active",
    bio: "Natif du Pays Basque, je connais parfaitement le marché immobilier de la côte basque.",
    passions: ["Surf", "Gastronomie basque"],
    favoriteSport: "Surf",
    family: "En couple",
    birthday: "3 juin",
    idealVacation: "Road trip en Californie",
    mantra: "Vivre où les autres passent leurs vacances"
  }
];

// Fonction pour récupérer tous les agents
export const fetchAgents = async (): Promise<Agent[]> => {
  // Dans une vraie application, on ferait une requête API ici
  // mais pour la démo, on retourne les données simulées
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockAgents);
    }, 800); // Simuler un délai réseau
  });
};

// Fonction pour récupérer un agent par son ID
export const fetchAgentById = async (id: string): Promise<Agent | undefined> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const agent = mockAgents.find(agent => agent.id === id);
      resolve(agent);
    }, 500);
  });
};

// Fonction pour rechercher des agents
export const searchAgents = async (query: string): Promise<Agent[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const normalizedQuery = query.toLowerCase();
      const results = mockAgents.filter(agent => 
        agent.name.toLowerCase().includes(normalizedQuery) ||
        agent.city.toLowerCase().includes(normalizedQuery) ||
        agent.department.toLowerCase().includes(normalizedQuery)
      );
      resolve(results);
    }, 500);
  });
};
