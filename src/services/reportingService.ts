
import { Document, AgentStats, ReportData } from '@/components/documents/types';
import { DocumentMetadata, getDocuments } from '@/services/documentService';
import { User } from '@supabase/supabase-js';
import { format, parseISO, startOfMonth, endOfMonth, addMonths, subMonths } from 'date-fns';
import { fr } from 'date-fns/locale';

// Helper function to extract transaction details from document name and content
const analyzeDocument = (doc: DocumentMetadata): Document => {
  // Convert DocumentMetadata to Document by adding required fields
  const document: Document = {
    ...doc,
    documentType: 'agent', // Default value for documentType
    analyzed: false
  };
  
  if (document.analyzed) return document; // Skip if already analyzed
  
  const updatedDoc = { ...document, analyzed: true };
  
  // Document categories that might contain transaction information
  const transactionCategories = ['Compromis', 'Ventes', 'Mandats', 'Contrats'];
  
  if (!transactionCategories.includes(updatedDoc.category)) {
    return updatedDoc;
  }
  
  // Determine transaction type based on category or document name
  if (updatedDoc.category === 'Compromis' || updatedDoc.name.toLowerCase().includes('compromis')) {
    updatedDoc.transactionType = 'compromis';
  } else if (updatedDoc.category === 'Ventes' || updatedDoc.name.toLowerCase().includes('vente')) {
    updatedDoc.transactionType = 'vente';
  } else if (updatedDoc.category === 'Mandats' || updatedDoc.name.toLowerCase().includes('mandat')) {
    updatedDoc.transactionType = 'mandat';
  } else {
    updatedDoc.transactionType = 'autre';
  }
  
  // Extract property type from document name
  const propertyTypes = ['appartement', 'maison', 'studio', 'villa', 'terrain', 'local', 'bureau'];
  for (const type of propertyTypes) {
    if (doc.name.toLowerCase().includes(type)) {
      updatedDoc.propertyType = type;
      break;
    }
  }
  
  // Check if document has extracted content (from OCR)
  if (doc.extractedContent) {
    // Try to extract property value from content using regex
    const valueMatch = doc.extractedContent.match(/(\d+[\s\d]*[\d.,]+)[\s€]*euros?/i);
    if (valueMatch) {
      const valueStr = valueMatch[1].replace(/\s/g, '').replace(',', '.');
      updatedDoc.propertyValue = parseFloat(valueStr);
    }
    
    // Try to extract commission from content
    const commissionMatch = doc.extractedContent.match(/commission[\s:]*(\d+[\s\d]*[\d.,]+)[\s€%]*/i);
    if (commissionMatch) {
      const commissionStr = commissionMatch[1].replace(/\s/g, '').replace(',', '.');
      updatedDoc.commissionAmount = parseFloat(commissionStr);
      
      // If commission is a percentage and we have property value, calculate actual amount
      if (commissionMatch[0].includes('%') && updatedDoc.propertyValue) {
        updatedDoc.commissionAmount = updatedDoc.propertyValue * (updatedDoc.commissionAmount / 100);
      }
    }
    
    // Try to extract address
    const addressMatch = doc.extractedContent.match(/situ[ée][\s:]*[àa][\s:]*([^\n.]+)/i);
    if (addressMatch) {
      updatedDoc.propertyAddress = addressMatch[1].trim();
    }
  }
  
  // If we couldn't extract from content, make estimates based on document name
  if (!updatedDoc.propertyValue && doc.name.match(/\d+/)) {
    // Look for numbers in name that might be values (between 50k and 10M)
    const valueMatches = doc.name.match(/(\d+)[\s]*[k€]/i);
    if (valueMatches) {
      let value = parseInt(valueMatches[1]);
      if (valueMatches[0].toLowerCase().includes('k')) {
        value *= 1000; // Convert k to thousands
      }
      if (value >= 50000 && value <= 10000000) {
        updatedDoc.propertyValue = value;
      }
    }
  }
  
  // If we have property value but no commission, estimate commission
  if (updatedDoc.propertyValue && !updatedDoc.commissionAmount) {
    // Default commission rate of 3%
    updatedDoc.commissionAmount = updatedDoc.propertyValue * 0.03;
  }
  
  // Set transaction date if not present
  if (!updatedDoc.transactionDate && updatedDoc.createdAt) {
    updatedDoc.transactionDate = updatedDoc.createdAt;
  }
  
  return updatedDoc;
};

// Calculate stats for a specific agent and period
export const calculateAgentStats = async (
  agentId: string,
  period: string, // Format: "YYYY-MM"
  agentName = "Agent"
): Promise<AgentStats> => {
  try {
    // Mock user for demo mode
    const mockUser = { id: agentId, email: 'demo@example.com' };
    
    // Get all documents for this agent
    const { data: documents } = await getDocuments(mockUser as User);
    
    // Filter documents by period and owner
    const [year, month] = period.split('-');
    const startDate = startOfMonth(new Date(parseInt(year), parseInt(month) - 1));
    const endDate = endOfMonth(startDate);
    
    const periodDocs = documents.filter(doc => {
      const docDate = doc.createdAt ? new Date(doc.createdAt) : null;
      return (
        doc.ownerId === agentId && 
        docDate && 
        docDate >= startDate && 
        docDate <= endDate
      );
    });
    
    // Analyze documents to extract transaction information
    const analyzedDocs = periodDocs.map(analyzeDocument);
    
    // Count transactions by type
    const sales = analyzedDocs.filter(doc => doc.transactionType === 'vente').length;
    const contracts = analyzedDocs.filter(doc => doc.transactionType === 'compromis').length;
    const mandates = analyzedDocs.filter(doc => doc.transactionType === 'mandat').length;
    
    // Calculate total volume and commission
    let totalVolume = 0;
    let totalCommission = 0;
    
    analyzedDocs.forEach(doc => {
      if (doc.propertyValue && (doc.transactionType === 'vente' || doc.transactionType === 'compromis')) {
        totalVolume += doc.propertyValue;
      }
      
      if (doc.commissionAmount && (doc.transactionType === 'vente')) {
        totalCommission += doc.commissionAmount;
      }
    });
    
    // Calculate conversion rate (sales / mandates)
    const conversionRate = mandates > 0 ? sales / mandates : 0;
    
    return {
      agentId,
      agentName,
      period,
      sales,
      contracts,
      mandates,
      totalVolume,
      totalCommission,
      conversionRate,
      documents: analyzedDocs.length
    };
  } catch (error) {
    console.error('Error calculating agent stats:', error);
    // Return default empty stats
    return {
      agentId,
      agentName,
      period,
      sales: 0,
      contracts: 0,
      mandates: 0,
      totalVolume: 0,
      totalCommission: 0,
      conversionRate: 0,
      documents: 0
    };
  }
};

// Generate performance report for a specific agent and period
export const generateAgentReport = async (
  agentId: string,
  period: string, // Format: "YYYY-MM"
  agentName = "Agent",
  agentEmail = ""
): Promise<ReportData> => {
  try {
    // Get current period stats
    const currentStats = await calculateAgentStats(agentId, period, agentName);
    
    // Get previous period for comparison
    const [year, month] = period.split('-');
    const periodDate = new Date(parseInt(year), parseInt(month) - 1);
    const prevPeriodDate = subMonths(periodDate, 1);
    const prevPeriod = format(prevPeriodDate, 'yyyy-MM');
    const prevStats = await calculateAgentStats(agentId, prevPeriod, agentName);
    
    // Get list of relevant documents for detail section
    const mockUser = { id: agentId, email: agentEmail || 'demo@example.com' };
    const { data: documents } = await getDocuments(mockUser as User);
    
    // Filter documents by period
    const startDate = startOfMonth(new Date(parseInt(year), parseInt(month) - 1));
    const endDate = endOfMonth(startDate);
    
    const periodDocs = documents.filter(doc => {
      const docDate = doc.createdAt ? new Date(doc.createdAt) : null;
      return (
        doc.ownerId === agentId && 
        docDate && 
        docDate >= startDate && 
        docDate <= endDate
      );
    }).map(analyzeDocument);
    
    // Calculate average commission rate
    const averageCommissionRate = currentStats.totalVolume > 0 
      ? (currentStats.totalCommission / currentStats.totalVolume) * 100 
      : 0;
    
    // Format month name in French
    const monthName = format(new Date(parseInt(year), parseInt(month) - 1), 'MMMM', { locale: fr });
    
    // Create report data
    const report: ReportData = {
      agent: {
        id: agentId,
        name: agentName,
        email: agentEmail
      },
      period: {
        month: monthName.charAt(0).toUpperCase() + monthName.slice(1), // Capitalize first letter
        year
      },
      metrics: {
        sales: currentStats.sales,
        contracts: currentStats.contracts,
        mandates: currentStats.mandates,
        conversionRate: currentStats.conversionRate,
        volume: currentStats.totalVolume,
        commission: currentStats.totalCommission,
        averageCommissionRate
      },
      documents: periodDocs,
      previousPeriod: {
        sales: prevStats.sales,
        contracts: prevStats.contracts,
        mandates: prevStats.mandates,
        conversionRate: prevStats.conversionRate,
        volume: prevStats.totalVolume,
        commission: prevStats.totalCommission
      }
    };
    
    return report;
  } catch (error) {
    console.error('Error generating agent report:', error);
    // Return a default empty report
    return {
      agent: {
        id: agentId,
        name: agentName,
        email: agentEmail
      },
      period: {
        month: format(new Date(), 'MMMM', { locale: fr }),
        year: format(new Date(), 'yyyy')
      },
      metrics: {
        sales: 0,
        contracts: 0,
        mandates: 0,
        conversionRate: 0,
        volume: 0,
        commission: 0,
        averageCommissionRate: 0
      },
      documents: []
    };
  }
};

// Get performance stats for current month
export const getCurrentMonthStats = async (userId: string): Promise<AgentStats> => {
  const currentPeriod = format(new Date(), 'yyyy-MM');
  return calculateAgentStats(userId, currentPeriod);
};

// Schedule monthly report generation
// In a real implementation, this would be a server-side cron job
// For this demo, we'll set up a function that could be called at the beginning of each month
export const scheduleMonthlyReports = async (userId: string, userName: string): Promise<void> => {
  try {
    // Generate report for previous month
    const prevMonthDate = subMonths(new Date(), 1);
    const prevMonthPeriod = format(prevMonthDate, 'yyyy-MM');
    
    await generateAgentReport(userId, prevMonthPeriod, userName);
    console.log(`Monthly report generated for ${userName} for ${prevMonthPeriod}`);
    
    // In a real implementation, this would also:
    // 1. Save the report to the database
    // 2. Send an email notification to the agent
    // 3. Schedule the next report generation
  } catch (error) {
    console.error('Error scheduling monthly reports:', error);
  }
};
