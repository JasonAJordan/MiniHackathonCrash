// src/components/InvestmentOverview.tsx
"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface InvestmentOverviewProps {
  totalInvested: number;
  finalValue: number;
  additionalValue: number;
  totalGoal: number;
  percentageOfGoal: number;
  estimatedYearsToGoal: number;
}

export default function InvestmentOverview({
  totalInvested,
  finalValue,
  additionalValue,
  totalGoal,
  percentageOfGoal,
  estimatedYearsToGoal,
}: InvestmentOverviewProps) {
  const investedPercentage = (totalInvested / finalValue) * 100;
  const additionalPercentage = 100 - investedPercentage;
  const years = 0;

  return (
    <div className="space-y-6">
      <Card className="bg-zinc-800 border-none">
        <CardContent className="p-4">
          <h3 className="text-xl font-semibold mb-2 text-white">Overall</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <div className="flex flex-col items-center">
              <div className="relative w-48 h-48">
                <svg className="w-full h-full" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="40" fill="none" stroke="#1e1e1e" strokeWidth="10" />

                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="none"
                    stroke="#0d9488"
                    strokeWidth="10"
                    strokeDasharray={`${investedPercentage * 2.51} ${(100 - investedPercentage) * 2.51}`}
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
                    strokeDasharray={`${additionalPercentage * 2.51} ${(100 - additionalPercentage) * 2.51}`}
                    strokeDashoffset={`${-investedPercentage * 2.51}`}
                    transform="rotate(-90 50 50)"
                  />
                </svg>
              </div>

              <div className="flex justify-center gap-8 mt-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-teal-500 rounded-full"></div>
                  <span className="text-sm text-zinc-400">Invested</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-600 rounded-full"></div>
                  <span className="text-sm text-zinc-400">Growth</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4">
              <div>
                <h4 className="text-2xl font-bold text-teal-500">Invested Amount</h4>
                <p className="text-3xl font-bold text-teal-500">${Math.round(totalInvested).toLocaleString()}</p>
                <p className="text-sm text-zinc-400">Net Worth ({Math.round(investedPercentage)}%)</p>
              </div>

              <div>
                <h4 className="text-2xl font-bold text-green-600">Additional Value</h4>
                <p className="text-3xl font-bold text-green-600">${Math.round(additionalValue).toLocaleString()}</p>
                <p className="text-sm text-zinc-400">Net Worth ({Math.round(additionalPercentage)}%)</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <div>
              <h4 className="text-2xl font-bold text-white">Total Goal</h4>
              <p className="text-3xl font-bold text-green-500">${totalGoal.toLocaleString()}</p>
              <div className="mt-2">
                <Progress value={percentageOfGoal} className="h-2 bg-zinc-700 [&>div]:bg-green-500" />
                <p className="text-sm text-zinc-400 mt-1">{Math.round(percentageOfGoal)}% of goal achieved</p>
              </div>
            </div>

            <div>
              <h4 className="text-2xl font-bold text-white">Estimated Time</h4>
              <p className="text-3xl font-bold text-green-500">{estimatedYearsToGoal} years</p>
              <p className="text-sm text-zinc-400 mt-1">
                {finalValue >= totalGoal
                  ? "Goal achieved within investment period!"
                  : `${estimatedYearsToGoal - years} additional years needed`}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <div>
              <h4 className="text-2xl font-bold text-white">Final Value</h4>
              <p className="text-3xl font-bold text-green-500">${Math.round(finalValue).toLocaleString()}</p>
              <p className="text-sm text-zinc-400">{finalValue >= totalGoal ? "✓ Goal Achieved" : ""}</p>
            </div>

            <div>
              <h4 className="text-2xl font-bold text-white">Return Multiplier</h4>
              <p className="text-3xl font-bold text-green-500">{(finalValue / totalInvested).toFixed(2)}x</p>
              <p className="text-sm text-zinc-400">Total Return</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
