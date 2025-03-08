
import { StatsData, TimeFilter, Transaction } from '@/types/stats';

// Données fictives pour les transactions
const mockTransactions: Transaction[] = [
  { id: '1', date: '2023-01-15', type: 'vente', property: 'Appartement', amount: 250000, commission: 7500, address: '12 Rue des Lilas, Paris' },
  { id: '2', date: '2023-02-05', type: 'compromis', property: 'Maison', amount: 320000, commission: 9600, address: '8 Avenue des Roses, Lyon' },
  { id: '3', date: '2023-02-20', type: 'vente', property: 'Maison', amount: 450000, commission: 13500, address: '24 Boulevard de la Mer, Nice' },
  { id: '4', date: '2023-03-10', type: 'compromis', property: 'Appartement', amount: 195000, commission: 5850, address: '3 Rue du Commerce, Toulouse' },
  { id: '5', date: '2023-04-02', type: 'vente', property: 'Studio', amount: 120000, commission: 3600, address: '17 Rue des Écoles, Bordeaux' },
  { id: '6', date: '2023-05-15', type: 'vente', property: 'Maison', amount: 380000, commission: 11400, address: '45 Avenue de la Liberté, Nantes' },
  { id: '7', date: '2023-06-07', type: 'compromis', property: 'Appartement', amount: 280000, commission: 8400, address: '29 Rue de la Paix, Lille' },
  { id: '8', date: '2023-07-12', type: 'vente', property: 'Maison', amount: 520000, commission: 15600, address: '56 Boulevard du Parc, Marseille' },
  { id: '9', date: '2023-08-09', type: 'compromis', property: 'Duplex', amount: 420000, commission: 12600, address: '7 Rue des Fleurs, Strasbourg' },
  { id: '10', date: '2023-09-18', type: 'vente', property: 'Appartement', amount: 310000, commission: 9300, address: '34 Rue Principale, Montpellier' },
  { id: '11', date: '2023-10-07', type: 'compromis', property: 'Villa', amount: 690000, commission: 20700, address: '11 Avenue des Pins, Cannes' },
  { id: '12', date: '2023-11-21', type: 'vente', property: 'Appartement', amount: 265000, commission: 7950, address: '22 Rue du Marché, Rennes' },
  { id: '13', date: '2023-12-05', type: 'compromis', property: 'Maison', amount: 430000, commission: 12900, address: '9 Boulevard des Alpes, Grenoble' },
  { id: '14', date: '2024-01-14', type: 'vente', property: 'Studio', amount: 135000, commission: 4050, address: '31 Rue de la Gare, Dijon' },
  { id: '15', date: '2024-02-28', type: 'vente', property: 'Maison', amount: 495000, commission: 14850, address: '15 Avenue de la République, Tours' },
];

// Fonction pour filtrer les transactions en fonction de la période sélectionnée
const filterTransactionsByTime = (transactions: Transaction[], filter: TimeFilter): Transaction[] => {
  const now = new Date();
  let startDate: Date;

  switch (filter) {
    case 'month':
      startDate = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());
      break;
    case 'quarter':
      startDate = new Date(now.getFullYear(), now.getMonth() - 3, now.getDate());
      break;
    case 'year':
      startDate = new Date(now.getFullYear() - 1, now.getMonth(), now.getDate());
      break;
    default:
      startDate = new Date(now.getFullYear(), now.getMonth() - 12, now.getDate());
  }

  return transactions.filter(t => new Date(t.date) >= startDate);
};

// Fonction pour calculer les données de statistiques en fonction des transactions
const calculateStats = (transactions: Transaction[]): StatsData => {
  const sales = transactions.filter(t => t.type === 'vente');
  const compromis = transactions.filter(t => t.type === 'compromis');

  const totalSales = sales.length;
  const totalCompromis = compromis.length;
  const totalCommission = transactions.reduce((sum, t) => sum + t.commission, 0);
  const totalVolume = transactions.reduce((sum, t) => sum + t.amount, 0);

  // Données pour les graphiques
  const monthMap: { [key: string]: { sales: number; compromis: number; commissions: number; displayName: string } } = {};
  
  transactions.forEach(t => {
    const date = new Date(t.date);
    const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
    const monthName = date.toLocaleDateString('fr-FR', { month: 'short', year: '2-digit' });
    
    if (!monthMap[monthKey]) {
      monthMap[monthKey] = { sales: 0, compromis: 0, commissions: 0, displayName: monthName };
    }
    
    if (t.type === 'vente') {
      monthMap[monthKey].sales += 1;
    } else {
      monthMap[monthKey].compromis += 1;
    }
    
    monthMap[monthKey].commissions += t.commission;
  });

  const sortedMonths = Object.keys(monthMap).sort();
  
  const monthlySales = sortedMonths.map(key => ({ 
    month: monthMap[key].displayName || key, 
    value: monthMap[key].sales 
  }));
  
  const monthlyCompromis = sortedMonths.map(key => ({ 
    month: monthMap[key].displayName || key, 
    value: monthMap[key].compromis 
  }));
  
  const monthlyCommissions = sortedMonths.map(key => ({ 
    month: monthMap[key].displayName || key, 
    value: monthMap[key].commissions 
  }));

  // Données pour le graphique en camembert
  const commissionsByType = [
    { name: 'Ventes', value: sales.reduce((sum, t) => sum + t.commission, 0) },
    { name: 'Compromis', value: compromis.reduce((sum, t) => sum + t.commission, 0) },
  ];

  return {
    transactions,
    totalSales,
    totalCompromis,
    totalCommission,
    totalVolume,
    monthlySales,
    monthlyCommissions,
    monthlyCompromis,
    commissionsByType,
  };
};

// Service pour récupérer les statistiques
const StatsService = {
  getStats: async (filter: TimeFilter = 'year'): Promise<StatsData> => {
    // Simuler un appel API avec un délai
    return new Promise(resolve => {
      setTimeout(() => {
        const filteredTransactions = filterTransactionsByTime(mockTransactions, filter);
        const stats = calculateStats(filteredTransactions);
        resolve(stats);
      }, 600);
    });
  },
};

export default StatsService;
