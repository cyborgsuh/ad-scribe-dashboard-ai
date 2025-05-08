import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';

export interface Campaign {
  id: string;
  name: string;
  imageUrl: string;
  ageRange: string;
  location: string;
  interests: string[];
  adCopy: string;
  status: 'Pending' | 'Live';
  dateCreated: string;
  impressions: number;
  clickThroughRate: number;
}

interface CampaignContextType {
  campaigns: Campaign[];
  addCampaign: (campaign: Omit<Campaign, 'id' | 'dateCreated' | 'status' | 'impressions' | 'clickThroughRate'>) => void;
  updateCampaignStatus: (id: string, status: 'Live' | 'Pending') => void; // Add this line
}

const CampaignContext = createContext<CampaignContextType | undefined>(undefined);

export const useCampaigns = () => useContext(CampaignContext);

export const CampaignProvider = ({ children }: { children: ReactNode }) => {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const { toast } = useToast();

  // Load campaigns from localStorage on mount
  useEffect(() => {
    const savedCampaigns = localStorage.getItem('adScribeCampaigns');
    if (savedCampaigns) {
      setCampaigns(JSON.parse(savedCampaigns));
    }
  }, []);

  // Save campaigns to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('adScribeCampaigns', JSON.stringify(campaigns));
  }, [campaigns]);

  const addCampaign = (campaignData: Omit<Campaign, 'id' | 'dateCreated' | 'status' | 'impressions' | 'clickThroughRate'>) => {
    const newCampaign: Campaign = {
      ...campaignData,
      id: crypto.randomUUID(),
      dateCreated: new Date().toISOString(),
      status: Math.random() > 0.5 ? 'Live' : 'Pending', // Randomly assign status
      impressions: Math.floor(Math.random() * 90000) + 10000, // Random 5-digit number
      clickThroughRate: +(Math.random() * 9 + 1).toFixed(2), // Random 1-10%
    };
    
    setCampaigns(prev => [newCampaign, ...prev]);
    
    toast({
      title: "Campaign created",
      description: `${newCampaign.name} has been created successfully`,
    });
    
    return newCampaign;
  };

  const updateCampaignStatus = (id: string, status: 'Live' | 'Pending') => {
    setCampaigns(campaigns.map(campaign => 
      campaign.id === id ? { ...campaign, status } : campaign
    ));
  };

  const getCampaign = (id: string) => {
    return campaigns.find(campaign => campaign.id === id);
  };

  const value = {
    campaigns,
    addCampaign,
    updateCampaignStatus, // Add this line
    getCampaign,
  };

  return <CampaignContext.Provider value={value}>{children}</CampaignContext.Provider>;
};
