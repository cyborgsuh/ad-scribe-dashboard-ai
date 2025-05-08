import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCampaigns, Campaign } from '@/contexts/CampaignContext';
import DashboardLayout from '@/components/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { PlusCircle, Search, Check, ChevronDown } from 'lucide-react';
import { format } from 'date-fns';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Dashboard = () => {
  const { campaigns } = useCampaigns();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  // Filter campaigns based on search term
  const filteredCampaigns = campaigns.filter(
    (campaign) =>
      campaign.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      campaign.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      campaign.interests.some((interest) =>
        interest.toLowerCase().includes(searchTerm.toLowerCase())
      )
  );

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold">Campaign Dashboard</h1>
            <p className="text-muted-foreground">
              Manage and monitor your advertising campaigns
            </p>
          </div>
          <Button 
            className="bg-brand hover:bg-brand-hover"
            onClick={() => navigate('/campaigns/create')}
          >
            <PlusCircle className="h-4 w-4 mr-2" />
            New Campaign
          </Button>
        </div>

        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search campaigns..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="text-sm text-muted-foreground">
                Showing {filteredCampaigns.length} of {campaigns.length} campaigns
              </div>
            </div>

            {campaigns.length === 0 ? (
              <div className="text-center py-12">
                <h3 className="text-lg font-medium mb-2">No campaigns yet</h3>
                <p className="text-muted-foreground mb-6">
                  Create your first campaign to get started
                </p>
                <Button 
                  className="bg-brand hover:bg-brand-hover"
                  onClick={() => navigate('/campaigns/create')}
                >
                  <PlusCircle className="h-4 w-4 mr-2" />
                  Create Campaign
                </Button>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Campaign</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Created</TableHead>
                      <TableHead>Targeting</TableHead>
                      <TableHead className="text-right">Metrics</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredCampaigns.map((campaign) => (
                      <CampaignRow key={campaign.id} campaign={campaign} />
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

const CampaignRow = ({ campaign }: { campaign: Campaign }) => {
  const navigate = useNavigate();
  const { updateCampaignStatus } = useCampaigns();

  const handleRowClick = (e: React.MouseEvent) => {
    // Prevent navigation when clicking the status dropdown
    if ((e.target as HTMLElement).closest('.status-dropdown')) {
      e.stopPropagation();
      return;
    }
    navigate(`/campaigns/${campaign.id}`);
  };

  // Format date
  const formattedDate = format(
    new Date(campaign.dateCreated),
    'MMM d, yyyy'
  );

  return (
    <TableRow
      className="cursor-pointer hover:bg-muted/50"
      onClick={handleRowClick}
    >
      <TableCell>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded overflow-hidden flex-shrink-0">
            <img
              src={campaign.imageUrl}
              alt={campaign.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'https://placehold.co/100?text=Ad';
              }}
            />
          </div>
          <div>
            <p className="font-medium">{campaign.name}</p>
            <p className="text-xs text-muted-foreground line-clamp-1">
              {campaign.adCopy.split('\n')[0].replace('Headline: ', '')}
            </p>
          </div>
        </div>
      </TableCell>
      <TableCell>
        <div className="status-dropdown">
          <DropdownMenu>
            <DropdownMenuTrigger className={`flex items-center gap-1 ${
              campaign.status === 'Live' ? 'status-live' : 'status-pending'
            }`}>
              {campaign.status}
              <ChevronDown className="h-4 w-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem 
                onClick={() => updateCampaignStatus(campaign.id, 'Live')}
                className="flex items-center gap-2"
              >
                {campaign.status === 'Live' && <Check className="h-4 w-4" />}
                Live
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => updateCampaignStatus(campaign.id, 'Pending')}
                className="flex items-center gap-2"
              >
                {campaign.status === 'Pending' && <Check className="h-4 w-4" />}
                Pending
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </TableCell>
      <TableCell>{formattedDate}</TableCell>
      <TableCell>
        <div>
          <p className="text-xs">{campaign.location}, {campaign.ageRange}</p>
          <p className="text-xs text-muted-foreground">
            {campaign.interests.slice(0, 2).join(', ')}
            {campaign.interests.length > 2 && ` +${campaign.interests.length - 2} more`}
          </p>
        </div>
      </TableCell>
      <TableCell className="text-right">
        <p className="font-medium">{campaign.impressions.toLocaleString()} impressions</p>
        <p className="text-xs text-muted-foreground">{campaign.clickThroughRate}% CTR</p>
      </TableCell>
    </TableRow>
  );
};

export default Dashboard;
