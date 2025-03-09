
import React, { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Percent } from 'lucide-react';
import { PackService } from '@/services/packService';
import { toast } from 'sonner';
import { Agent } from '@/types/agent';
import { CommissionPack } from '@/types/commission';

interface CommissionPackSelectorProps {
  agent: Agent;
  isAdmin?: boolean;
}

const CommissionPackSelector: React.FC<CommissionPackSelectorProps> = ({ agent, isAdmin = false }) => {
  const queryClient = useQueryClient();
  const [selectedPackId, setSelectedPackId] = useState<string>('');
  
  // Récupérer tous les packs de commission
  const { data: packs, isLoading: isLoadingPacks } = useQuery({
    queryKey: ['commissionPacks'],
    queryFn: PackService.getCommissionPacks,
  });
  
  // Récupérer la commission actuelle de l'agent
  const { data: agentCommission, isLoading: isLoadingCommission } = useQuery({
    queryKey: ['agentCommission', agent.id],
    queryFn: () => PackService.getAgentCommission(agent.id),
  });
  
  // Mettre à jour le selectedPackId quand les données sont chargées
  useEffect(() => {
    if (agentCommission) {
      setSelectedPackId(agentCommission.packId);
    }
  }, [agentCommission]);
  
  // Mutation pour mettre à jour le pack de l'agent
  const updatePackMutation = useMutation({
    mutationFn: (packId: string) => PackService.updateAgentPack(agent.id, packId),
    onSuccess: () => {
      toast.success("Pack de commission mis à jour avec succès");
      queryClient.invalidateQueries({ queryKey: ['agentCommission', agent.id] });
    },
    onError: () => {
      toast.error("Une erreur est survenue lors de la mise à jour du pack");
    }
  });
  
  const handleUpdatePack = () => {
    if (selectedPackId) {
      updatePackMutation.mutate(selectedPackId);
    }
  };
  
  const isLoading = isLoadingPacks || isLoadingCommission;
  const currentPack = packs?.find(p => p.id === agentCommission?.packId);
  
  return (
    <div className="space-y-4">
      <div className="flex flex-col space-y-1">
        <h3 className="text-sm font-medium">Pack de commission</h3>
        {!isAdmin && currentPack && (
          <p className="text-xs text-muted-foreground">
            Vous bénéficiez actuellement du pack {currentPack.name}
          </p>
        )}
      </div>
      
      {isLoading ? (
        <div className="h-10 w-full bg-secondary/50 rounded-md animate-pulse" />
      ) : isAdmin ? (
        <div className="flex gap-2">
          <Select
            value={selectedPackId}
            onValueChange={setSelectedPackId}
            disabled={updatePackMutation.isPending}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Sélectionner un pack" />
            </SelectTrigger>
            <SelectContent>
              {packs?.map((pack: CommissionPack) => (
                <SelectItem key={pack.id} value={pack.id}>
                  {pack.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Button 
            variant="outline" 
            size="sm"
            onClick={handleUpdatePack}
            disabled={!selectedPackId || selectedPackId === agentCommission?.packId || updatePackMutation.isPending}
          >
            <Percent className="h-4 w-4 mr-2" />
            Assigner
          </Button>
        </div>
      ) : (
        <div className="px-4 py-2 bg-secondary/40 rounded-md">
          <p className="text-sm font-medium">
            {currentPack ? currentPack.name : "Aucun pack assigné"}
          </p>
          {currentPack && (
            <p className="text-xs text-muted-foreground mt-1">
              Commission actuelle: {agentCommission?.currentPercentage}%
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default CommissionPackSelector;
