"use client";

import BudgetForm from "@/components/BudgetForm";
import BudgetOverview from "@/components/BudgetOverview";
import BudgetChart from "@/components/BudgetChart";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AuthView } from "@/config/auth";

interface BudgetViewProps {
  onSaveSettings: () => void;
  setViewType: (view: 'home' | 'budget') => void;
  monthlyIncome: number;
  setMonthlyIncome: (value: number) => void;
  expenses: Array<{ category: string; amount: number }>;
  setExpenses: (value: Array<{ category: string; amount: number }>) => void;
  savingsGoal: number;
  setSavingsGoal: (value: number) => void;
  budgetResults: {
    monthlyIncome: number;
    totalExpenses: number;
    monthlySavings: number;
    annualSavings: number;
    savingsRate: number;
    savingsGoal: number;
    monthsToGoal: number;
    expensesBreakdown: Array<{ category: string; amount: number }>;
    monthlyData: Array<{
      month: number;
      savings: number;
      income: number;
      expenses: number;
    }>;
  };
}

export default function BudgetView({
  onSaveSettings,
  setViewType,
  monthlyIncome,
  setMonthlyIncome,
  expenses,
  setExpenses,
  savingsGoal,
  setSavingsGoal,
  budgetResults,
}: BudgetViewProps) {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto py-8 px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-green-500">Budget Planner</h1>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setViewType('home')}
              className="px-4 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 transition-colors"
            >
              Future Value
            </button>
            <button
              onClick={() => setViewType('budget')}
              className="px-4 py-2 rounded-lg bg-green-500 text-black font-medium"
            >
              Budget
            </button>
            <AuthView onSaveSettings={onSaveSettings} />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-1 bg-zinc-900 border-green-500/20">
            <CardHeader>
              <CardTitle className="text-green-500">Budget Parameters</CardTitle>
              <CardDescription className="text-zinc-400">
                Manage your income and expenses
              </CardDescription>
            </CardHeader>
            <CardContent>
              <BudgetForm
                monthlyIncome={monthlyIncome}
                setMonthlyIncome={setMonthlyIncome}
                expenses={expenses}
                setExpenses={setExpenses}
                savingsGoal={savingsGoal}
                setSavingsGoal={setSavingsGoal}
              />
            </CardContent>
          </Card>

          <Card className="lg:col-span-2 bg-zinc-900 border-green-500/20">
            <CardHeader>
              <CardTitle className="text-green-500">Budget Analysis</CardTitle>
              <CardDescription className="text-zinc-400">
                Monthly savings: ${budgetResults.monthlySavings.toLocaleString()} ({budgetResults.savingsRate.toFixed(1)}% of income)
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
                  <BudgetOverview
                    monthlyIncome={budgetResults.monthlyIncome}
                    totalExpenses={budgetResults.totalExpenses}
                    monthlySavings={budgetResults.monthlySavings}
                    annualSavings={budgetResults.annualSavings}
                    savingsRate={budgetResults.savingsRate}
                    savingsGoal={savingsGoal}
                    monthsToGoal={budgetResults.monthsToGoal}
                    expensesBreakdown={budgetResults.expensesBreakdown}
                  />
                </TabsContent>
                <TabsContent value="chart" className="mt-4">
                  <BudgetChart
                    monthlyData={budgetResults.monthlyData}
                    expensesBreakdown={budgetResults.expensesBreakdown}
                  />
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
