import InvestmentForm from "@/components/InvestmentForm";
import InvestmentOverview from "@/components/InvestmentOverview";
import InvestmentChart from "@/components/InvestmentChart";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AuthView } from "@/config/auth";

interface HomeViewProps {
  monthlyInvestment: number;
  setMonthlyInvestment: (value: number) => void;
  years: number;
  setYears: (value: number) => void;
  selectedRate: string;
  setSelectedRate: (value: string) => void;
  customRate: number;
  setCustomRate: (value: number) => void;
  lumpSums: Array<{ amount: number; year: number }>;
  setLumpSums: (value: Array<{ amount: number; year: number }>) => void;
  totalGoal: number;
  setTotalGoal: (value: number) => void;
  results: {
    totalInvested: number;
    finalValue: number;
    additionalValue: number;
    yearlyData: Array<{ year: number; value: number; invested: number }>;
  };
  percentageOfGoal: number;
  estimatedYearsToGoal: number;
  onSaveSettings: () => void;
  setViewType: (view: 'home' | 'budget') => void;
}

export default function HomeView({
  monthlyInvestment,
  setMonthlyInvestment,
  years,
  setYears,
  selectedRate,
  setSelectedRate,
  customRate,
  setCustomRate,
  lumpSums,
  setLumpSums,
  totalGoal,
  setTotalGoal,
  results,
  percentageOfGoal,
  estimatedYearsToGoal,
  onSaveSettings,
  setViewType,
}: HomeViewProps) {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto py-8 px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-green-500">Investment Calculator</h1>
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setViewType('home')}
              className="px-4 py-2 rounded-lg bg-green-500 text-black font-medium"
            >
              Future Value
            </button>
            <button 
              onClick={() => setViewType('budget')}
              className="px-4 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 transition-colors"
            >
              Budget
            </button>
            <AuthView onSaveSettings={onSaveSettings} />
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-1 bg-zinc-900 border-green-500/20">
            <CardHeader>
              <CardTitle className="text-green-500">Investment Parameters</CardTitle>
              <CardDescription className="text-zinc-400">Adjust your investment strategy</CardDescription>
            </CardHeader>
            <CardContent>
              <InvestmentForm
                monthlyInvestment={monthlyInvestment}
                setMonthlyInvestment={setMonthlyInvestment}
                years={years}
                setYears={setYears}
                selectedRate={selectedRate}
                setSelectedRate={setSelectedRate}
                customRate={customRate}
                setCustomRate={setCustomRate}
                lumpSums={lumpSums}
                setLumpSums={setLumpSums}
                totalGoal={totalGoal}
                setTotalGoal={setTotalGoal}
              />
            </CardContent>
          </Card>

          <Card className="lg:col-span-2 bg-zinc-900 border-green-500/20">
            <CardHeader>
              <CardTitle className="text-green-500">Investment Projection</CardTitle>
              <CardDescription className="text-zinc-400">
                {selectedRate === "low"
                  ? "4% APR"
                  : selectedRate === "real"
                  ? "6.37% APR"
                  : selectedRate === "spy"
                  ? "SPY Average (10.11% APR)"
                  : `Custom Rate (${(customRate * 100).toFixed(2)}% APR)`}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="overview" className="w-full">
                <TabsList className="grid w-full grid-cols-2 bg-zinc-800">
                  <TabsTrigger
                    value="overview"
                    className="data-[state=active]:bg-green-500 data-[state=active]:text-black"
                  >
                    Overview
                  </TabsTrigger>
                  <TabsTrigger
                    value="chart"
                    className="data-[state=active]:bg-green-500 data-[state=active]:text-black"
                  >
                    Chart
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="overview" className="mt-4">
                  <InvestmentOverview
                    totalInvested={results.totalInvested}
                    finalValue={results.finalValue}
                    additionalValue={results.additionalValue}
                    totalGoal={totalGoal}
                    percentageOfGoal={percentageOfGoal}
                    estimatedYearsToGoal={estimatedYearsToGoal}
                  />
                </TabsContent>
                <TabsContent value="chart" className="mt-4">
                  <InvestmentChart data={results.yearlyData} />
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}