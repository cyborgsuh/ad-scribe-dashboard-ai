import { useParams, useNavigate } from 'react-router-dom';
import { useCampaigns } from '@/contexts/CampaignContext';
import DashboardLayout from '@/components/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ArrowLeft, Calendar, MapPin, Target } from 'lucide-react';
import { format } from 'date-fns';

const CampaignDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getCampaign } = useCampaigns();
  
  const campaign = getCampaign(id || '');
  
  if (!campaign) {
    return (
      <DashboardLayout>
        <div className="text-center py-12">
          <h3 className="text-lg font-medium mb-2">Campaign not found</h3>
          <p className="text-muted-foreground mb-6">
            The campaign you're looking for doesn't exist or has been deleted.
          </p>
          <Button 
            onClick={() => navigate('/dashboard')}
            variant="outline"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/dashboard')}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <h1 className="text-2xl font-bold">{campaign.name}</h1>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Campaign Overview */}
          <Card>
            <CardHeader>
              <CardTitle>Campaign Overview</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="aspect-video relative rounded-lg overflow-hidden border border-border">
                <img
                  src={campaign.imageUrl}
                  alt={campaign.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://placehold.co/600x400?text=Ad+Image';
                  }}
                />
              </div>
              
              <div className="space-y-2">
                <h3 className="font-medium">Ad Copy</h3>
                <div className="whitespace-pre-wrap text-muted-foreground">
                  {campaign.adCopy}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Campaign Details */}
          <Card>
            <CardHeader>
              <CardTitle>Campaign Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-start gap-4">
                <Calendar className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="font-medium">Created On</p>
                  <p className="text-sm text-muted-foreground">
                    {format(new Date(campaign.dateCreated), 'MMMM d, yyyy')}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="font-medium">Location</p>
                  <p className="text-sm text-muted-foreground">{campaign.location}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Target className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="font-medium">Targeting</p>
                  <p className="text-sm text-muted-foreground">
                    Age: {campaign.ageRange}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Interests: {campaign.interests.join(', ')}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Performance Metrics */}
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Performance Metrics</CardTitle>
              <CardDescription>
                Campaign performance statistics
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">Total Impressions</p>
                  <p className="text-2xl font-bold">
                    {campaign.impressions.toLocaleString()}
                  </p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">Click-Through Rate</p>
                  <p className="text-2xl font-bold">
                    {campaign.clickThroughRate}%
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default CampaignDetail; 