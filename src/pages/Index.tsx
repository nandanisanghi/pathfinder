
import { useState, useRef } from 'react';
import Header from '@/components/Header';
import PreferenceForm from '@/components/PreferenceForm';
import TravelMap from '@/components/TravelMap';
import ItineraryTimeline from '@/components/ItineraryTimeline';
import PackingList from '@/components/PackingList';
import TravelSummary from '@/components/TravelSummary';
import PDFExport from '@/components/PDFExport';
import { TravelPreference, TravelPlan } from '@/types';
import { mockTravelPlans } from '@/data/mockData';
import { useToast } from '@/components/ui/use-toast';

const Index = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [travelPlan, setTravelPlan] = useState<TravelPlan | null>(null);
  const [selectedDay, setSelectedDay] = useState<number>(1);
  const [showMap, setShowMap] = useState<boolean>(false);
  const [isPDFOpen, setIsPDFOpen] = useState<boolean>(false);
  const pdfRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const handleFormSubmit = (preferences: TravelPreference) => {
    setIsLoading(true);
    
    // Simulate API call with a timeout
    setTimeout(() => {
      // Choose a mock travel plan based on region
      let selectedPlan: TravelPlan;
      
      if (preferences.region.toLowerCase().includes('asia')) {
        selectedPlan = mockTravelPlans[0]; // Bali plan
      } else {
        selectedPlan = mockTravelPlans[1]; // Barcelona plan
      }
      
      // Adjust travel plan based on preferences
      const adjustedPlan = {
        ...selectedPlan,
        totalCost: Math.round(preferences.budget * 0.8), // Use 80% of budget
        itinerary: selectedPlan.itinerary.slice(0, preferences.duration) // Match duration
      };
      
      setTravelPlan(adjustedPlan);
      setSelectedDay(1);
      setIsLoading(false);
      setShowMap(false);
      
      toast({
        title: "Travel Plan Created!",
        description: `Your dream trip to ${adjustedPlan.destination} is ready to explore.`,
      });
    }, 2000);
  };

  const handleDayChange = (day: number) => {
    setSelectedDay(day);
  };

  const handleExportPDF = () => {
    setIsPDFOpen(true);
  };

  const handleShowMap = () => {
    setShowMap(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-dreamscape-lavender/10 to-dreamscape-skyblue/10">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        {!travelPlan ? (
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-10 space-y-4">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-500 to-pink-400 bg-clip-text text-transparent">
                DreamScape
              </h1>
              <p className="text-xl text-gray-700">
                Create your perfect travel experience with AI-powered planning
              </p>
            </div>
            
            <div className="relative">
              {/* Decorative elements */}
              <div className="absolute -top-8 -left-8 w-24 h-24 bg-dreamscape-mint rounded-full blur-3xl opacity-50"></div>
              <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-dreamscape-peach rounded-full blur-3xl opacity-50"></div>
              <div className="absolute top-1/2 -right-16 w-20 h-20 bg-dreamscape-sunshine rounded-full blur-3xl opacity-40"></div>
              
              <PreferenceForm onSubmit={handleFormSubmit} isLoading={isLoading} />
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left column - Summary and packing list */}
            <div className="space-y-6">
              <TravelSummary 
                travelPlan={travelPlan} 
                onExportPDF={handleExportPDF}
                onShowMap={handleShowMap}
              />
              
              <div className="dream-card">
                <PackingList packingItems={travelPlan.packingList} />
              </div>
            </div>
            
            {/* Middle/right columns - Map or Timeline */}
            <div className={`lg:col-span-2 ${showMap ? 'block' : 'hidden lg:block'}`}>
              <div className="dream-card h-[600px]">
                <TravelMap 
                  itinerary={travelPlan.itinerary}
                  selectedDay={selectedDay}
                />
              </div>
            </div>
            
            <div className={`lg:col-span-2 ${!showMap ? 'block' : 'hidden lg:block'}`}>
              <div className="dream-card overflow-y-auto max-h-[600px]">
                <ItineraryTimeline 
                  itinerary={travelPlan.itinerary}
                  selectedDay={selectedDay}
                  onDayChange={handleDayChange}
                />
              </div>
            </div>
          </div>
        )}
      </main>
      
      {isPDFOpen && travelPlan && (
        <PDFExport 
          ref={pdfRef}
          travelPlan={travelPlan}
          isOpen={isPDFOpen}
          onClose={() => setIsPDFOpen(false)}
        />
      )}
      
      <footer className="bg-white/80 backdrop-blur-sm py-6 mt-16">
        <div className="container mx-auto px-4 text-center text-gray-600 text-sm">
          <p>© {new Date().getFullYear()} DreamScape AI Travel Planner</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
