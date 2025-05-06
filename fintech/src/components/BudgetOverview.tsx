"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface BudgetOverviewProps {
  monthlyIncome: number;
  totalExpenses: number;
  monthlySavings: number;
  annualSavings: number;
  savingsRate: number;
  savingsGoal: number;
  monthsToGoal: number;
  expensesBreakdown: Array<{ category: string; amount: number }>;
}

export default function BudgetOverview({
  monthlyIncome,
  totalExpenses,
  monthlySavings,
  annualSavings,
  savingsRate,
  savingsGoal,
  monthsToGoal,
}: BudgetOverviewProps) {
  const expensesPercentage = (totalExpenses / monthlyIncome) * 100;
  const savingsPercentage = 100 - expensesPercentage;

  return (
    <div className="space-y-6">
      <Card className="bg-zinc-800 border-none">
        <CardContent className="p-6">
          <h3 className="text-xl font-semibold mb-4 text-white">Overall</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="flex flex-col items-center">
              <div className="relative w-48 h-48">
                <svg className="w-full h-full" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="40" fill="none" stroke="#1e1e1e" strokeWidth="10" />
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="none"
                    stroke="#ef4444"
                    strokeWidth="10"
                    strokeDasharray={`${expensesPercentage * 2.51} ${(100 - expensesPercentage) * 2.51}`}
                    strokeDashoffset="0"
                    transform="rotate(-90 50 50)"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="none"
                    stroke="#22c55e"
                    strokeWidth="10"
                    strokeDasharray={`${savingsPercentage * 2.51} ${(100 - savingsPercentage) * 2.51}`}
                    strokeDashoffset={`${-expensesPercentage * 2.51}`}
                    transform="rotate(-90 50 50)"
                  />
                </svg>
              </div>
              <div className="flex justify-center gap-8 mt-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <span className="text-sm text-zinc-400">Expenses</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-zinc-400">Savings</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6">
              <div>
                <h4 className="text-2xl font-bold text-red-500">Monthly Expenses</h4>
                <p className="text-3xl font-bold text-red-500">${Math.round(totalExpenses).toLocaleString()}</p>
                <p className="text-sm text-zinc-400">Monthly Income ({Math.round(expensesPercentage)}%)</p>
              </div>
              <div>
                <h4 className="text-2xl font-bold text-green-500">Monthly Savings</h4>
                <p className="text-3xl font-bold text-green-500">${Math.round(monthlySavings).toLocaleString()}</p>
                <p className="text-sm text-zinc-400">Monthly Income ({Math.round(savingsPercentage)}%)</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
            <div>
              <h4 className="text-2xl font-bold text-white">Monthly Income</h4>
              <p className="text-3xl font-bold text-green-500">${monthlyIncome.toLocaleString()}</p>
              <p className="text-sm text-zinc-400">Total monthly earnings</p>
            </div>
            <div>
              <h4 className="text-2xl font-bold text-white">Savings Rate</h4>
              <p className="text-3xl font-bold text-green-500">{savingsRate.toFixed(1)}%</p>
              <p className="text-sm text-zinc-400">Percentage of income saved</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
            <div>
              <h4 className="text-2xl font-bold text-white">Savings Goal</h4>
              <p className="text-3xl font-bold text-green-500">${savingsGoal.toLocaleString()}</p>
              <div className="mt-2">
                <Progress
                  value={monthlySavings > 0 ? Math.min(100, (monthlySavings / savingsGoal) * 100) : 0}
                  className="h-2 bg-zinc-700 [&>div]:bg-green-500"
                />
                <p className="text-sm text-zinc-400 mt-1">
                  {monthlySavings <= 0
                    ? "Not saving enough to reach goal"
                    : `${monthsToGoal} months to reach goal`}
                </p>
              </div>
            </div>
            <div>
              <h4 className="text-2xl font-bold text-white">Annual Savings</h4>
              <p className="text-3xl font-bold text-green-500">${annualSavings.toLocaleString()}</p>
              <p className="text-sm text-zinc-400 mt-1">Total savings per year</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
