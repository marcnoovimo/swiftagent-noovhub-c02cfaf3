
import { 
  BookOpen, 
  FileText, 
  HelpCircle, 
  Settings, 
  Users, 
  Calendar, 
  MessageSquare, 
  BarChart, 
  FileIcon, 
  HomeIcon, 
  LucideIcon,
} from 'lucide-react';
import { Guide, GuideCategory } from '@/components/support/types';

// Support guides data
export const supportGuides: Guide[] = [
  {
    id: "dashboard-overview",
    title: "Présentation du tableau de bord",
    content: `
      <p>Le tableau de bord Noovimo est votre centre de contrôle personnel. Il vous offre une vue d'ensemble de votre activité et de vos performances.</p>
      
      <h3>Fonctionnalités principales</h3>
      <ul>
        <li><strong>Indicateurs clés :</strong> Chiffre d'affaires, nombre de ventes, commissions.</li>
        <li><strong>Graphiques de performance :</strong> Évolution de votre activité sur différentes périodes.</li>
        <li><strong>Activités récentes :</strong> Les dernières actions réalisées sur la plateforme.</li>
        <li><strong>Objectifs :</strong> Suivi de vos objectifs commerciaux personnels.</li>
      </ul>
      
      <p>Pour personnaliser votre tableau de bord, cliquez sur l'icône de paramètres en haut à droite de chaque widget.</p>
    `,
    category: "plateforme",
    tags: ["tableau de bord", "performance", "statistiques"],
    lastUpdated: "10/05/2023",
    views: 1250,
    likes: 85,
    relatedGuides: [
      {
        id: "performance-stats",
        title: "Comprendre vos statistiques de performance"
      },
      {
        id: "dashboard-customize",
        title: "Personnaliser votre tableau de bord"
      }
    ]
  },
  {
    id: "document-management",
    title: "Gestion documentaire",
    content: `
      <p>Le module de gestion documentaire vous permet d'organiser, stocker et partager tous vos documents professionnels.</p>
      
      <h3>Fonctionnalités principales</h3>
      <ul>
        <li><strong>Stockage sécurisé :</strong> Tous vos documents sont stockés de manière sécurisée et accessibles à tout moment.</li>
        <li><strong>Classification :</strong> Organisez vos documents par catégories, dossiers et sous-dossiers.</li>
        <li><strong>Partage :</strong> Partagez facilement des documents avec vos clients ou collaborateurs.</li>
        <li><strong>Scan :</strong> Numérisez des documents papier directement depuis votre smartphone.</li>
        <li><strong>Recherche avancée :</strong> Retrouvez rapidement n'importe quel document grâce à la recherche par mots-clés.</li>
      </ul>
      
      <h3>Comment utiliser la numérisation de documents</h3>
      <ol>
        <li>Accédez à l'onglet "Documents"</li>
        <li>Cliquez sur "Numériser"</li>
        <li>Prenez une photo du document ou importez-la depuis votre galerie</li>
        <li>Ajustez les coins si nécessaire</li>
        <li>Validez la numérisation</li>
        <li>Complétez les informations du document (titre, catégorie, etc.)</li>
        <li>Enregistrez</li>
      </ol>
      
      <p>Pour des résultats optimaux, assurez-vous d'avoir un bon éclairage et que le document soit bien à plat.</p>
    `,
    category: "plateforme",
    tags: ["documents", "numérisation", "stockage", "partage"],
    lastUpdated: "15/06/2023",
    views: 980,
    likes: 72,
    relatedGuides: [
      {
        id: "document-sharing",
        title: "Partager des documents avec vos clients"
      },
      {
        id: "document-scan-tips",
        title: "Conseils pour une numérisation optimale"
      }
    ]
  },
  {
    id: "calendar-sync",
    title: "Synchronisation du calendrier",
    content: `
      <p>La fonctionnalité de calendrier Noovimo vous permet de gérer efficacement vos rendez-vous et de les synchroniser avec d'autres calendriers.</p>
      
      <h3>Synchronisation avec Google Calendar</h3>
      <ol>
        <li>Accédez à l'onglet "Calendrier"</li>
        <li>Cliquez sur "Paramètres" (icône d'engrenage)</li>
        <li>Sélectionnez "Synchroniser avec Google Calendar"</li>
        <li>Connectez-vous à votre compte Google lorsque demandé</li>
        <li>Sélectionnez les calendriers que vous souhaitez synchroniser</li>
        <li>Validez vos choix</li>
      </ol>
      
      <p>Une fois la synchronisation établie, tous vos rendez-vous Noovimo apparaîtront dans Google Calendar et vice-versa.</p>
      
      <h3>Créer un nouveau rendez-vous</h3>
      <ol>
        <li>Cliquez sur "Nouveau rendez-vous" ou directement sur une plage horaire dans le calendrier</li>
        <li>Remplissez les détails (titre, date, heure, lieu, participants)</li>
        <li>Ajoutez une description si nécessaire</li>
        <li>Configurez les rappels si souhaité</li>
        <li>Enregistrez le rendez-vous</li>
      </ol>
      
      <p>Vous pouvez également définir des rendez-vous récurrents pour les événements qui se répètent régulièrement.</p>
    `,
    category: "plateforme",
    tags: ["calendrier", "rendez-vous", "synchronisation", "Google Calendar"],
    lastUpdated: "22/04/2023",
    views: 820,
    likes: 65,
    relatedGuides: [
      {
        id: "calendar-sharing",
        title: "Partager votre calendrier avec votre équipe"
      },
      {
        id: "recurring-events",
        title: "Configurer des événements récurrents"
      }
    ]
  },
  {
    id: "contact-management",
    title: "Gestion des contacts",
    content: `
      <p>Le CRM Noovimo vous permet de gérer efficacement tous vos contacts professionnels et de suivre vos interactions avec eux.</p>
      
      <h3>Fonctionnalités principales</h3>
      <ul>
        <li><strong>Base de données centralisée :</strong> Tous vos contacts au même endroit.</li>
        <li><strong>Catégorisation :</strong> Classez vos contacts (prospects, clients, partenaires...).</li>
        <li><strong>Historique :</strong> Suivez toutes les interactions avec chaque contact.</li>
        <li><strong>Tâches et rappels :</strong> Planifiez vos actions de suivi.</li>
        <li><strong>Importation/Exportation :</strong> Compatibilité avec d'autres outils CRM.</li>
      </ul>
      
      <h3>Ajouter un nouveau contact</h3>
      <ol>
        <li>Accédez à l'onglet "Contacts"</li>
        <li>Cliquez sur "Ajouter un contact"</li>
        <li>Remplissez les informations (nom, téléphone, email, etc.)</li>
        <li>Attribuez des catégories ou tags si nécessaire</li>
        <li>Enregistrez le contact</li>
      </ol>
      
      <p>Vous pouvez également importer des contacts en masse depuis un fichier CSV ou scanner des cartes de visite.</p>
      
      <h3>Scanner une carte de visite</h3>
      <ol>
        <li>Dans l'onglet "Contacts", cliquez sur "Scanner"</li>
        <li>Prenez une photo de la carte de visite</li>
        <li>Le système extraira automatiquement les informations</li>
        <li>Vérifiez et complétez si nécessaire</li>
        <li>Enregistrez le nouveau contact</li>
      </ol>
    `,
    category: "plateforme",
    tags: ["contacts", "CRM", "prospects", "clients"],
    lastUpdated: "08/05/2023",
    views: 910,
    likes: 78,
    relatedGuides: [
      {
        id: "contact-import",
        title: "Importer des contacts depuis Excel ou Google"
      },
      {
        id: "contact-follow-up",
        title: "Configurer des rappels de suivi"
      }
    ]
  },
  {
    id: "messaging-system",
    title: "Système de messagerie",
    content: `
      <p>Le système de messagerie Noovimo vous permet de communiquer efficacement avec vos collègues, clients et partenaires.</p>
      
      <h3>Types de communications</h3>
      <ul>
        <li><strong>Messagerie interne :</strong> Pour les communications entre agents Noovimo.</li>
        <li><strong>Email :</strong> Interface intégrée pour gérer vos emails professionnels.</li>
        <li><strong>Discussions de groupe :</strong> Pour les projets d'équipe et les discussions thématiques.</li>
      </ul>
      
      <h3>Créer une nouvelle discussion de groupe</h3>
      <ol>
        <li>Accédez à l'onglet "Messages"</li>
        <li>Cliquez sur "Nouvelle discussion"</li>
        <li>Sélectionnez "Créer un groupe"</li>
        <li>Donnez un nom au groupe</li>
        <li>Ajoutez des participants</li>
        <li>Définissez les permissions si nécessaire</li>
        <li>Créez le groupe</li>
      </ol>
      
      <h3>Intégration email</h3>
      <p>Pour configurer votre email professionnel dans Noovimo :</p>
      <ol>
        <li>Allez dans "Paramètres" > "Email"</li>
        <li>Cliquez sur "Ajouter un compte email"</li>
        <li>Entrez votre adresse email et mot de passe</li>
        <li>Suivez les instructions pour configurer IMAP/SMTP</li>
        <li>Validez la configuration</li>
      </ol>
      
      <p>Une fois configuré, vous pourrez envoyer et recevoir des emails directement depuis l'interface Noovimo.</p>
    `,
    category: "plateforme",
    tags: ["messagerie", "email", "communication", "groupes"],
    lastUpdated: "19/05/2023",
    views: 750,
    likes: 61,
    relatedGuides: [
      {
        id: "email-templates",
        title: "Utiliser des modèles d'emails"
      },
      {
        id: "group-permissions",
        title: "Gérer les permissions des groupes"
      }
    ]
  },
  {
    id: "transaction-process",
    title: "Processus de transaction immobilière",
    content: `
      <p>Ce guide explique les étapes clés d'une transaction immobilière et comment les gérer efficacement dans la plateforme Noovimo.</p>
      
      <h3>Étapes principales du processus de vente</h3>
      <ol>
        <li><strong>Estimation :</strong> Évaluation précise du bien immobilier.</li>
        <li><strong>Mandat :</strong> Signature du mandat de vente avec le propriétaire.</li>
        <li><strong>Marketing :</strong> Mise en valeur et diffusion de l'annonce.</li>
        <li><strong>Visites :</strong> Organisation et suivi des visites.</li>
        <li><strong>Offre :</strong> Réception et négociation des offres.</li>
        <li><strong>Compromis :</strong> Signature du compromis de vente.</li>
        <li><strong>Financement :</strong> Suivi de l'obtention du prêt par l'acheteur.</li>
        <li><strong>Acte authentique :</strong> Signature chez le notaire.</li>
        <li><strong>Suivi post-vente :</strong> Maintien de la relation client.</li>
      </ol>
      
      <h3>Suivi d'une transaction dans Noovimo</h3>
      <p>Pour chaque transaction, vous pouvez :</p>
      <ul>
        <li>Créer un dossier spécifique dans "Transactions"</li>
        <li>Stocker tous les documents liés (mandat, diagnostics, compromis...)</li>
        <li>Suivre les étapes grâce au tableau de progression</li>
        <li>Configurer des rappels pour les dates importantes</li>
        <li>Générer automatiquement des rapports d'avancement</li>
        <li>Calculer vos commissions prévisionnelles</li>
      </ul>
      
      <h3>Modèles de documents</h3>
      <p>La plateforme propose des modèles pour chaque étape :</p>
      <ul>
        <li>Mandats (simple, exclusif, semi-exclusif)</li>
        <li>Bon de visite</li>
        <li>Offre d'achat</li>
        <li>Compromis de vente</li>
        <li>Procès-verbal de remise de clés</li>
      </ul>
      
      <p>Vous pouvez personnaliser ces modèles selon vos besoins spécifiques.</p>
    `,
    category: "immobilier",
    tags: ["transaction", "vente", "processus", "étapes"],
    lastUpdated: "02/06/2023",
    views: 1050,
    likes: 92,
    relatedGuides: [
      {
        id: "mandate-types",
        title: "Les différents types de mandats immobiliers"
      },
      {
        id: "offer-negotiation",
        title: "Techniques de négociation d'offres"
      }
    ]
  },
  {
    id: "mandate-types",
    title: "Les différents types de mandats immobiliers",
    content: `
      <p>Comprendre les différents types de mandats immobiliers est essentiel pour tout agent Noovimo.</p>
      
      <h3>Mandat simple</h3>
      <ul>
        <li><strong>Caractéristiques :</strong> Non-exclusif, le propriétaire peut vendre par lui-même ou confier la vente à plusieurs agences.</li>
        <li><strong>Avantages :</strong> Plus facile à obtenir, flexibilité pour le vendeur.</li>
        <li><strong>Inconvénients :</strong> Moins d'engagement, risque de double commission, efforts marketing dilués.</li>
      </ul>
      
      <h3>Mandat exclusif</h3>
      <ul>
        <li><strong>Caractéristiques :</strong> Une seule agence est mandatée pour la vente.</li>
        <li><strong>Avantages :</strong> Engagement fort, meilleur suivi, marketing optimisé, délai de vente généralement plus court.</li>
        <li><strong>Inconvénients :</strong> Plus difficile à obtenir, nécessite une relation de confiance.</li>
      </ul>
      
      <h3>Mandat semi-exclusif</h3>
      <ul>
        <li><strong>Caractéristiques :</strong> Exclusif avec possibilité pour le propriétaire de vendre par lui-même (sans passer par une autre agence).</li>
        <li><strong>Avantages :</strong> Bon compromis, rassure certains vendeurs.</li>
        <li><strong>Inconvénients :</strong> Statut hybride parfois ambigu.</li>
      </ul>
      
      <h3>Obtenir un mandat exclusif</h3>
      <ol>
        <li>Démontrez votre valeur ajoutée (stratégie marketing personnalisée, réseau, expertise locale...)</li>
        <li>Expliquez les avantages concrets pour le vendeur</li>
        <li>Présentez des cas de succès similaires</li>
        <li>Proposez un plan d'action détaillé</li>
        <li>Établissez une relation de confiance (transparence, expertise, réactivité)</li>
      </ol>
      
      <h3>Aspects juridiques importants</h3>
      <ul>
        <li>Durée légale (maximum 3 mois pour un exclusif)</li>
        <li>Clauses de reconduction</li>
        <li>Conditions de rémunération</li>
        <li>Obligations réciproques</li>
        <li>Conditions de résiliation</li>
      </ul>
      
      <p>Les modèles de mandats sont disponibles dans la section "Documents" de la plateforme.</p>
    `,
    category: "immobilier",
    tags: ["mandat", "exclusif", "simple", "juridique"],
    lastUpdated: "18/05/2023",
    views: 890,
    likes: 73,
    relatedGuides: [
      {
        id: "transaction-process",
        title: "Processus de transaction immobilière"
      },
      {
        id: "mandate-negotiation",
        title: "Négocier efficacement un mandat"
      }
    ]
  },
  {
    id: "commission-calculation",
    title: "Calcul des commissions",
    content: `
      <p>Comprendre le calcul des commissions est essentiel pour tout agent Noovimo. Ce guide explique le fonctionnement et vous aide à optimiser vos revenus.</p>
      
      <h3>Structure des commissions Noovimo</h3>
      <p>Chez Noovimo, les commissions fonctionnent selon un barème progressif basé sur votre chiffre d'affaires :</p>
      <ul>
        <li>Moins de 15 000€ : 70% pour l'agent, 30% pour Noovimo</li>
        <li>Entre 15 000€ et 30 000€ : 75% pour l'agent, 25% pour Noovimo</li>
        <li>Entre 30 000€ et 50 000€ : 80% pour l'agent, 20% pour Noovimo</li>
        <li>Plus de 50 000€ : 85% pour l'agent, 15% pour Noovimo</li>
      </ul>
      
      <p>Ces pourcentages peuvent varier selon votre Pack et votre ancienneté.</p>
      
      <h3>Calculer vos honoraires</h3>
      <p>Pour calculer vos honoraires sur une transaction :</p>
      <ol>
        <li>Déterminez le prix de vente net vendeur</li>
        <li>Appliquez le taux d'honoraires convenu (généralement entre 3% et 7%)</li>
        <li>Calculez la TVA sur ces honoraires (20%)</li>
        <li>Le montant total (honoraires + TVA) est payé par l'acquéreur</li>
        <li>Appliquez ensuite votre pourcentage de commission Noovimo</li>
      </ol>
      
      <h3>Exemple concret</h3>
      <p>Pour une vente à 200 000€ avec 5% d'honoraires :</p>
      <ul>
        <li>Honoraires : 10 000€ HT</li>
        <li>TVA (20%) : 2 000€</li>
        <li>Total honoraires TTC : 12 000€</li>
        <li>Si vous êtes à 75%, votre commission sera de 7 500€ HT</li>
      </ul>
      
      <h3>Optimisation fiscale</h3>
      <p>En tant qu'agent commercial indépendant, plusieurs options s'offrent à vous :</p>
      <ul>
        <li>Micro-BNC (abattement forfaitaire de 34%)</li>
        <li>Déclaration contrôlée (déduction des frais réels)</li>
        <li>Création d'une société (SASU, EURL...)</li>
      </ul>
      
      <p>Consultez un expert-comptable pour déterminer la solution la plus adaptée à votre situation.</p>
      
      <h3>Simulateur de commission</h3>
      <p>Utilisez le simulateur de commission intégré à la plateforme Noovimo pour :</p>
      <ul>
        <li>Estimer vos revenus sur une transaction</li>
        <li>Planifier votre activité pour atteindre les paliers supérieurs</li>
        <li>Comparer différents scénarios de vente</li>
      </ul>
      
      <p>Accédez au simulateur depuis la section "Outils" > "Simulateur de commission".</p>
    `,
    category: "business",
    tags: ["commission", "revenus", "honoraires", "fiscalité"],
    lastUpdated: "12/06/2023",
    views: 1150,
    likes: 89,
    relatedGuides: [
      {
        id: "tax-optimization",
        title: "Optimisation fiscale pour agents immobiliers"
      },
      {
        id: "revenue-planning",
        title: "Planifier et maximiser vos revenus"
      }
    ]
  },
  {
    id: "property-valuation",
    title: "Évaluation immobilière",
    content: `
      <p>L'évaluation précise d'un bien immobilier est une compétence fondamentale pour tout agent Noovimo. Ce guide vous présente les méthodes et outils pour réaliser des estimations fiables.</p>
      
      <h3>Méthodes d'évaluation</h3>
      <ul>
        <li><strong>Méthode comparative :</strong> Basée sur les prix de vente de biens similaires dans le même secteur.</li>
        <li><strong>Méthode par capitalisation :</strong> Basée sur le rendement locatif potentiel (pour l'investissement).</li>
        <li><strong>Méthode par le coût de remplacement :</strong> Basée sur le coût de construction moins la vétusté (pour les biens atypiques).</li>
      </ul>
      
      <h3>Facteurs déterminants</h3>
      <p>Pour une évaluation précise, prenez en compte :</p>
      <ul>
        <li><strong>Emplacement :</strong> Quartier, proximité des services, transports...</li>
        <li><strong>Caractéristiques intrinsèques :</strong> Surface, nombre de pièces, étage, exposition...</li>
        <li><strong>État général :</strong> Entretien, rénovations nécessaires, qualité des matériaux...</li>
        <li><strong>Performances énergétiques :</strong> DPE, isolation, type de chauffage...</li>
        <li><strong>Aspects juridiques :</strong> Copropriété, servitudes, urbanisme...</li>
        <li><strong>Tendances du marché :</strong> Dynamique locale, évolution des prix...</li>
      </ul>
      
      <h3>Outils d'évaluation Noovimo</h3>
      <p>La plateforme vous propose plusieurs outils :</p>
      <ul>
        <li>Base de données des transactions récentes</li>
        <li>Cartographie des prix par quartier</li>
        <li>Simulateur d'estimation</li>
        <li>Rapport d'évaluation personnalisable</li>
        <li>Accès aux données notariales</li>
      </ul>
      
      <h3>Présentation de l'évaluation au client</h3>
      <ol>
        <li>Préparez un rapport détaillé et professionnel</li>
        <li>Expliquez clairement votre méthodologie</li>
        <li>Présentez des références de biens comparables</li>
        <li>Proposez plusieurs scénarios de prix selon le délai de vente souhaité</li>
        <li>Soyez transparent sur les forces et faiblesses du bien</li>
        <li>Suggérez des améliorations pour valoriser le bien</li>
      </ol>
      
      <p>Un bon rapport d'évaluation est souvent la première étape pour obtenir un mandat exclusif.</p>
    `,
    category: "immobilier",
    tags: ["évaluation", "estimation", "prix", "marché"],
    lastUpdated: "25/05/2023",
    views: 980,
    likes: 81,
    relatedGuides: [
      {
        id: "valuation-tools",
        title: "Utiliser les outils d'évaluation Noovimo"
      },
      {
        id: "property-presentation",
        title: "Présenter efficacement un bien immobilier"
      }
    ]
  },
  {
    id: "performance-stats",
    title: "Comprendre vos statistiques de performance",
    content: `
      <p>Les statistiques de performance sont essentielles pour suivre votre activité, identifier vos points forts et vos axes d'amélioration.</p>
      
      <h3>Indicateurs clés disponibles</h3>
      <ul>
        <li><strong>Chiffre d'affaires :</strong> Total, mensuel, trimestriel, annuel.</li>
        <li><strong>Nombre de transactions :</strong> Réparties par type de bien, localisation, etc.</li>
        <li><strong>Taux de transformation :</strong> Ratio entre estimations, mandats et ventes.</li>
        <li><strong>Délai moyen de vente :</strong> Temps entre la prise de mandat et la vente.</li>
        <li><strong>Prix moyen des biens vendus :</strong> Analyse de votre positionnement.</li>
        <li><strong>Taux de mandats exclusifs :</strong> Pourcentage d'exclusivités dans votre portefeuille.</li>
        <li><strong>Origine des contacts :</strong> Répartition par source (réseau, recommandation, prospection...).</li>
      </ul>
      
      <h3>Accéder à vos statistiques</h3>
      <ol>
        <li>Sur votre tableau de bord, cliquez sur "Statistiques détaillées"</li>
        <li>OU accédez directement à l'onglet "Statistiques" dans le menu principal</li>
        <li>Sélectionnez la période souhaitée (mois, trimestre, année, personnalisée)</li>
        <li>Naviguez entre les différents onglets thématiques</li>
      </ol>
      
      <h3>Analyse et interprétation</h3>
      <p>Pour tirer le meilleur parti de vos statistiques :</p>
      <ul>
        <li>Comparez vos performances actuelles avec les périodes précédentes</li>
        <li>Identifiez les tendances et cycles saisonniers</li>
        <li>Repérez vos points forts pour les capitaliser</li>
        <li>Identifiez vos axes d'amélioration pour progresser</li>
        <li>Fixez-vous des objectifs réalistes et mesurables</li>
      </ul>
      
      <h3>Rapports personnalisés</h3>
      <p>Vous pouvez créer et enregistrer des rapports personnalisés :</p>
      <ol>
        <li>Dans l'écran Statistiques, cliquez sur "Nouveau rapport"</li>
        <li>Sélectionnez les indicateurs que vous souhaitez suivre</li>
        <li>Configurez la périodicité et le format</li>
        <li>Enregistrez votre configuration</li>
      </ol>
      
      <p>Ces rapports peuvent être générés automatiquement et envoyés par email selon la fréquence choisie.</p>
    `,
    category: "business",
    tags: ["statistiques", "performance", "analyse", "objectifs"],
    lastUpdated: "05/06/2023",
    views: 820,
    likes: 68,
    relatedGuides: [
      {
        id: "goal-setting",
        title: "Définir et suivre vos objectifs commerciaux"
      },
      {
        id: "activity-planning",
        title: "Planifier votre activité pour maximiser vos résultats"
      }
    ]
  },
  {
    id: "chatbot-arthur",
    title: "Utiliser Arthur, l'assistant virtuel Noovimo",
    content: `
      <p>Arthur est l'assistant virtuel Noovimo conçu pour vous aider au quotidien dans vos tâches et répondre à vos questions.</p>
      
      <h3>Capacités d'Arthur</h3>
      <p>Arthur peut vous aider dans de nombreux domaines :</p>
      <ul>
        <li>Répondre à vos questions sur l'utilisation de la plateforme</li>
        <li>Vous guider dans les processus immobiliers</li>
        <li>Vous fournir des informations juridiques et fiscales de base</li>
        <li>Rechercher des documents dans la base documentaire</li>
        <li>Vous orienter vers les bonnes ressources et guides</li>
        <li>Vous aider à préparer des rendez-vous clients</li>
      </ul>
      
      <h3>Comment interagir avec Arthur</h3>
      <ol>
        <li>Cliquez sur l'icône d'Arthur en bas à droite de l'écran</li>
        <li>Posez votre question dans le champ de texte</li>
        <li>Vous pouvez utiliser la dictée vocale en cliquant sur le microphone</li>
        <li>Arthur vous répondra instantanément</li>
      </ol>
      
      <h3>Types de questions efficaces</h3>
      <p>Pour obtenir les meilleures réponses d'Arthur :</p>
      <ul>
        <li>Soyez précis dans vos questions</li>
        <li>Donnez du contexte si nécessaire</li>
        <li>Posez une question à la fois</li>
        <li>Utilisez des mots-clés pertinents</li>
      </ul>
      
      <h3>Exemples de questions utiles</h3>
      <ul>
        <li>"Comment créer un nouveau contact dans le CRM ?"</li>
        <li>"Quelles sont les étapes pour numériser un document ?"</li>
        <li>"Peux-tu m'expliquer la différence entre un mandat simple et exclusif ?"</li>
        <li>"Où puis-je trouver les modèles de compromis de vente ?"</li>
        <li>"Quelles sont les dernières actualités juridiques en immobilier ?"</li>
      </ul>
      
      <p>Arthur apprend continuellement et s'améliore grâce à vos interactions. N'hésitez pas à l'utiliser régulièrement pour gagner en efficacité !</p>
    `,
    category: "plateforme",
    tags: ["assistant", "Arthur", "IA", "aide"],
    lastUpdated: "15/06/2023",
    views: 750,
    likes: 82,
    relatedGuides: [
      {
        id: "platform-search",
        title: "Recherche avancée dans la plateforme"
      },
      {
        id: "productivity-tips",
        title: "Astuces pour améliorer votre productivité"
      }
    ]
  }
];

// Define guide categories
export const guideCategories: GuideCategory[] = [
  {
    id: "plateforme",
    name: "Plateforme Noovimo",
    icon: Settings,
    guides: supportGuides.filter(guide => guide.category === "plateforme")
  },
  {
    id: "immobilier",
    name: "Processus immobiliers",
    icon: HomeIcon,
    guides: supportGuides.filter(guide => guide.category === "immobilier")
  },
  {
    id: "business",
    name: "Business et revenus",
    icon: BarChart,
    guides: supportGuides.filter(guide => guide.category === "business")
  },
  {
    id: "juridique",
    name: "Aspects juridiques",
    icon: FileText,
    guides: supportGuides.filter(guide => guide.category === "juridique" || [])
  }
];

