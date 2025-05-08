
import DashboardLayout from '@/components/DashboardLayout';
import { useCampaigns } from '@/contexts/CampaignContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Pie } from 'recharts';
import { BarChart as BarChartIcon, PieChart } from 'lucide-react';

const Analytics = () => {
  const { campaigns } = useCampaigns();

  // Calculate total impressions
  const totalImpressions = campaigns.reduce(
    (total, campaign) => total + campaign.impressions,
    0
  );

  // Calculate average CTR
  const averageCTR = campaigns.length
    ? (
        campaigns.reduce(
          (total, campaign) => total + campaign.clickThroughRate,
          0
        ) / campaigns.length
      ).toFixed(2)
    : '0';

  // Prepare data for charts
  const campaignPerformanceData = campaigns.map((campaign) => ({
    name: campaign.name,
    impressions: campaign.impressions,
    ctr: campaign.clickThroughRate,
  }));

  // Location distribution data
  const locationData = campaigns.reduce((acc: Record<string, number>, campaign) => {
    acc[campaign.location] = (acc[campaign.location] || 0) + 1;
    return acc;
  }, {});

  const locationChartData = Object.entries(locationData).map(([name, value]) => ({
    name,
    value,
  }));

  return (
    <DashboardLayout>
      <h1 className="text-2xl font-bold mb-6">Analytics Overview</h1>

      {campaigns.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg shadow">
          <BarChartIcon className="mx-auto h-12 w-12 text-muted-foreground" />
          <h3 className="text-lg font-medium mt-4 mb-2">No analytics data available</h3>
          <p className="text-muted-foreground">
            Create campaigns to start viewing analytics
          </p>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">
                Total Campaigns
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{campaigns.length}</div>
              <p className="text-xs text-muted-foreground mt-1">
                {campaigns.filter((c) => c.status === 'Live').length} active campaigns
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">
                Total Impressions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                {totalImpressions.toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Across all campaigns
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">
                Average Click-Through Rate
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{averageCTR}%</div>
              <p className="text-xs text-muted-foreground mt-1">
                Industry average: 2.5%
              </p>
            </CardContent>
          </Card>

          <Card className="md:col-span-2 lg:col-span-3">
            <CardHeader>
              <CardTitle>Campaign Analytics</CardTitle>
              <CardDescription>
                Note: This is simulated data for demo purposes.
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center text-muted-foreground p-6">
              <p>Charts would be displayed here with real data.</p>
              <p>Using Recharts, you can visualize impressions, click-through rates, and more.</p>
            </CardContent>
          </Card>
        </div>
      )}
    </DashboardLayout>
  );
};

export default Analytics;
