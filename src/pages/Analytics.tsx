import DashboardLayout from '@/components/DashboardLayout';
import { useCampaigns } from '@/contexts/CampaignContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart as BarChartIcon, PieChart as PieChartIcon } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

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
    name: campaign.name.length > 20 ? campaign.name.substring(0, 20) + '...' : campaign.name,
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

  // Fallback data for empty state
  const fallbackPerformanceData = [
    { name: 'Sample Campaign 1', impressions: 25000, ctr: 2.8 },
    { name: 'Sample Campaign 2', impressions: 35000, ctr: 3.2 },
    { name: 'Sample Campaign 3', impressions: 28000, ctr: 2.5 },
  ];

  const fallbackLocationData = [
    { name: 'USA', value: 2 },
    { name: 'UK', value: 1 },
    { name: 'UAE', value: 1 },
  ];

  const chartData = campaigns.length ? campaignPerformanceData : fallbackPerformanceData;
  const pieData = campaigns.length ? locationChartData : fallbackLocationData;

  return (
    <DashboardLayout>
      <h1 className="text-2xl font-bold mb-6">Analytics Overview</h1>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Total Campaigns
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{campaigns.length || '0'}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {campaigns.filter((c) => c.status === 'Live').length || '0'} active campaigns
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
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {/* Campaign Performance Chart */}
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Campaign Performance</CardTitle>
            <CardDescription>
              {campaigns.length ? 'Impressions by campaign' : 'Sample data - Create campaigns to see real metrics'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <XAxis 
                    dataKey="name" 
                    angle={-45}
                    textAnchor="end"
                    height={70}
                    interval={0}
                  />
                  <YAxis />
                  <Tooltip />
                  <Bar 
                    dataKey="impressions" 
                    fill="#8884d8" 
                    name="Impressions"
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Location Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Location Distribution</CardTitle>
            <CardDescription>
              {campaigns.length ? 'Campaigns by location' : 'Sample location distribution'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => 
                      `${name} ${(percent * 100).toFixed(0)}%`
                    }
                  >
                    {pieData.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={COLORS[index % COLORS.length]} 
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* CTR Performance */}
        <Card>
          <CardHeader>
            <CardTitle>Click-Through Rate Performance</CardTitle>
            <CardDescription>
              {campaigns.length ? 'CTR by campaign' : 'Sample CTR data'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <XAxis 
                    dataKey="name" 
                    angle={-45}
                    textAnchor="end"
                    height={70}
                    interval={0}
                  />
                  <YAxis />
                  <Tooltip />
                  <Bar 
                    dataKey="ctr" 
                    fill="#82ca9d" 
                    name="CTR (%)"
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Analytics;
