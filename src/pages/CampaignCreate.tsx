
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCampaigns } from '@/contexts/CampaignContext';
import { useToast } from '@/components/ui/use-toast';
import DashboardLayout from '@/components/DashboardLayout';
import { generateAdCopy } from '@/services/ollamaService';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';

const INTERESTS = [
  { id: 'tech', label: 'Tech' },
  { id: 'fashion', label: 'Fashion' },
  { id: 'fitness', label: 'Fitness' },
  { id: 'food', label: 'Food & Cooking' },
  { id: 'travel', label: 'Travel' },
  { id: 'finance', label: 'Finance' },
  { id: 'gaming', label: 'Gaming' },
  { id: 'beauty', label: 'Beauty' },
];

const AGE_RANGES = [
  { id: '18-25', label: '18-25' },
  { id: '26-35', label: '26-35' },
  { id: '36-50', label: '36-50' },
  { id: '50+', label: '50+' },
];

const LOCATIONS = [
  { id: 'USA', label: 'United States' },
  { id: 'UK', label: 'United Kingdom' },
  { id: 'UAE', label: 'United Arab Emirates' },
  { id: 'India', label: 'India' },
];

const CampaignCreate = () => {
  const [name, setName] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [ageRange, setAgeRange] = useState('');
  const [location, setLocation] = useState('');
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [adCopy, setAdCopy] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  
  const { addCampaign } = useCampaigns();
  const { toast } = useToast();
  const navigate = useNavigate();

  const toggleInterest = (interestId: string) => {
    setSelectedInterests(current => 
      current.includes(interestId)
        ? current.filter(i => i !== interestId)
        : [...current, interestId]
    );
  };

  const handleImageUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImageUrl(e.target.value);
  };

  const handleGenerateAdCopy = async () => {
    if (!name || selectedInterests.length === 0) {
      toast({
        title: "Missing information",
        description: "Please enter a campaign name and select at least one interest",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    
    try {
      // Get selected interest labels, not IDs
      const interestLabels = selectedInterests.map(
        id => INTERESTS.find(i => i.id === id)?.label || id
      );
      
      const generatedCopy = await generateAdCopy(name, interestLabels);
      setAdCopy(generatedCopy);
      
      toast({
        title: "Ad copy generated",
        description: "AI has created ad copy based on your campaign details",
      });
    } catch (error) {
      console.error("Error generating ad copy:", error);
      toast({
        title: "Generation failed",
        description: "Could not generate ad copy. Is Ollama running locally?",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !imageUrl || !ageRange || !location || selectedInterests.length === 0 || !adCopy) {
      toast({
        title: "Missing information",
        description: "Please fill in all the required fields",
        variant: "destructive",
      });
      return;
    }

    // Get selected interest labels for storage
    const interestLabels = selectedInterests.map(
      id => INTERESTS.find(i => i.id === id)?.label || id
    );
    
    const campaign = addCampaign({
      name,
      imageUrl,
      ageRange,
      location,
      interests: interestLabels,
      adCopy,
    });
    
    navigate('/dashboard');
  };

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Create New Campaign</h1>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Campaign Details</CardTitle>
              <CardDescription>
                Enter the basic information for your new advertising campaign.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Campaign Name</Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Summer Collection Promotion"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="image">Ad Banner Image URL</Label>
                <Input
                  id="image"
                  value={imageUrl}
                  onChange={handleImageUrlChange}
                  placeholder="https://example.com/your-image.jpg"
                  required
                />
                {imageUrl && (
                  <div className="mt-2 border border-border rounded-md overflow-hidden">
                    <img 
                      src={imageUrl} 
                      alt="Ad Preview" 
                      className="w-full h-40 object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://placehold.co/600x400?text=Invalid+Image+URL';
                      }} 
                    />
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Targeting Options</CardTitle>
              <CardDescription>
                Define who should see your campaign.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="age-range">Age Range</Label>
                  <Select 
                    value={ageRange} 
                    onValueChange={setAgeRange}
                    required
                  >
                    <SelectTrigger id="age-range">
                      <SelectValue placeholder="Select age range" />
                    </SelectTrigger>
                    <SelectContent>
                      {AGE_RANGES.map((range) => (
                        <SelectItem key={range.id} value={range.id}>
                          {range.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Select 
                    value={location} 
                    onValueChange={setLocation}
                    required
                  >
                    <SelectTrigger id="location">
                      <SelectValue placeholder="Select location" />
                    </SelectTrigger>
                    <SelectContent>
                      {LOCATIONS.map((loc) => (
                        <SelectItem key={loc.id} value={loc.id}>
                          {loc.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Interests</Label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {INTERESTS.map((interest) => (
                    <div key={interest.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={`interest-${interest.id}`}
                        checked={selectedInterests.includes(interest.id)}
                        onCheckedChange={() => toggleInterest(interest.id)}
                      />
                      <label
                        htmlFor={`interest-${interest.id}`}
                        className="text-sm cursor-pointer"
                      >
                        {interest.label}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Ad Copy</CardTitle>
              <CardDescription>
                Generate AI-powered ad copy or write your own.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="ad-copy">Ad Copy</Label>
                  <Button
                    type="button"
                    variant="secondary"
                    size="sm"
                    onClick={handleGenerateAdCopy}
                    disabled={isGenerating}
                  >
                    {isGenerating && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Generate with AI
                  </Button>
                </div>
                <Textarea
                  id="ad-copy"
                  value={adCopy}
                  onChange={(e) => setAdCopy(e.target.value)}
                  placeholder="Enter ad copy or generate it with AI..."
                  className="min-h-[150px]"
                  required
                />
              </div>
            </CardContent>
            <CardFooter className="flex justify-end space-x-2">
              <Button 
                type="button" 
                variant="outline"
                onClick={() => navigate('/dashboard')}
              >
                Cancel
              </Button>
              <Button type="submit" className="bg-brand hover:bg-brand-hover">
                Submit Campaign
              </Button>
            </CardFooter>
          </Card>
        </form>
      </div>
    </DashboardLayout>
  );
};

export default CampaignCreate;
