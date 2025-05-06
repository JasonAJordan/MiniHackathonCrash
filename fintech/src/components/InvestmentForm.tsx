"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Trash2 } from "lucide-react";

interface InvestmentFormProps {
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
}

export default function InvestmentForm({
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
}: InvestmentFormProps) {
  const [newLumpSum, setNewLumpSum] = useState<{ amount: number; year: number }>({
    amount: 10000,
    year: 5,
  });

  const handleMonthlyInvestmentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    if (!isNaN(value) && value >= 0) setMonthlyInvestment(value);
  };

  const handleGoalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    if (!isNaN(value) && value >= 0) setTotalGoal(value);
  };

  const handleAddLumpSum = () => {
    setLumpSums([...lumpSums, { ...newLumpSum }]);
  };

  const handleRemoveLumpSum = (index: number) => {
    const newLumpSums = [...lumpSums];
    newLumpSums.splice(index, 1);
    setLumpSums(newLumpSums);
  };

  return (
    <div className="space-y-6">
      {/* Monthly Investment */}
      <div className="space-y-2">
        <Label htmlFor="monthlyInvestment" className="text-white">
          Monthly Investment: ${monthlyInvestment}
        </Label>
        <div className="flex items-center gap-2">
          <Slider
            id="monthlyInvestment"
            min={100}
            max={5000}
            step={100}
            value={[monthlyInvestment]}
            onValueChange={(value) => setMonthlyInvestment(value[0])}
            className="flex-1"
          />
          <Input
            type="number"
            value={monthlyInvestment}
            onChange={handleMonthlyInvestmentChange}
            className="w-24 bg-zinc-800 border-zinc-700 text-white"
          />
        </div>
      </div>

      {/* Years */}
      <div className="space-y-2">
        <Label htmlFor="years" className="text-white">
          Investment Period: {years} years
        </Label>
        <div className="flex items-center gap-2">
          <Slider
            id="years"
            min={1}
            max={50}
            step={1}
            value={[years]}
            onValueChange={(value) => setYears(value[0])}
            className="flex-1"
          />
          <Input
            type="number"
            value={years}
            onChange={(e) => setYears(parseInt(e.target.value) || 1)}
            className="w-24 bg-zinc-800 border-zinc-700 text-white"
          />
        </div>
      </div>

      {/* Rate */}
      <div className="space-y-2">
        <Label className="text-white">Return Rate</Label>
        <RadioGroup value={selectedRate} onValueChange={setSelectedRate} className="flex flex-col space-y-1">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="low" id="low" className="border-green-500 text-green-500" />
            <Label htmlFor="low" className="text-white">
              4% APR (Conservative)
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="real" id="real" className="border-green-500 text-green-500" />
            <Label htmlFor="real" className="text-white">
              Avg Inflation Adjusted Real Return (6.37%)
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="spy" id="spy" className="border-green-500 text-green-500" />
            <Label htmlFor="spy" className="text-white">
              SPY Average (10.11%)
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="custom" id="custom" className="border-green-500 text-green-500" />
            <Label htmlFor="custom" className="text-white">
              Custom Rate
            </Label>
          </div>
          {selectedRate === "custom" && (
            <div className="ml-6 flex items-center gap-2">
              <Input
                type="number"
                min="0"
                max="100"
                step="0.01"
                value={customRate * 100}
                onChange={(e) => setCustomRate(parseFloat(e.target.value) / 100)}
                className="w-24 bg-zinc-800 border-zinc-700 text-white"
              />
              <span className="text-white">%</span>
            </div>
          )}
        </RadioGroup>
      </div>

      {/* Total Goal */}
      <div className="space-y-2">
        <Label htmlFor="goal" className="text-white">
          Investment Goal: ${totalGoal.toLocaleString()}
        </Label>
        <div className="flex items-center gap-2">
          <Slider
            id="goal"
            min={100000}
            max={10000000}
            step={100000}
            value={[totalGoal]}
            onValueChange={(value) => setTotalGoal(value[0])}
            className="flex-1"
          />
          <Input
            type="number"
            value={totalGoal}
            onChange={handleGoalChange}
            className="w-24 bg-zinc-800 border-zinc-700 text-white"
          />
        </div>
      </div>

      {/* Lump Sums */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label className="text-white">Lump Sum Investments</Label>
          <Dialog>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="border-green-500 text-green-500 hover:bg-green-500 hover:text-black bg-zinc-800"
              >
                <Plus className="h-4 w-4 mr-1" /> Add
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-zinc-900 text-white border-green-500/20">
              <DialogHeader>
                <DialogTitle className="text-green-500">Add Lump Sum Investment</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="lumpSumAmount" className="text-white">
                    Amount ($)
                  </Label>
                  <Input
                    id="lumpSumAmount"
                    type="number"
                    value={newLumpSum.amount}
                    onChange={(e) => setNewLumpSum({ ...newLumpSum, amount: parseFloat(e.target.value) || 0 })}
                    className="bg-zinc-800 border-zinc-700 text-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lumpSumYear" className="text-white">
                    Year (1-{years})
                  </Label>
                  <Input
                    id="lumpSumYear"
                    type="number"
                    min={1}
                    max={years}
                    value={newLumpSum.year}
                    onChange={(e) => setNewLumpSum({
                      ...newLumpSum,
                      year: Math.min(years, Math.max(1, parseInt(e.target.value) || 1))
                    })}
                    className="bg-zinc-800 border-zinc-700 text-white"
                  />
                </div>
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button onClick={handleAddLumpSum} className="bg-green-500 text-black hover:bg-green-600">
                    Add Lump Sum
                  </Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {lumpSums.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow className="border-zinc-700">
                <TableHead className="text-zinc-400">Year</TableHead>
                <TableHead className="text-zinc-400">Amount</TableHead>
                <TableHead className="text-right text-zinc-400">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {lumpSums.map((lumpSum, index) => (
                <TableRow key={index} className="border-zinc-700">
                  <TableCell className="text-white">Year {lumpSum.year}</TableCell>
                  <TableCell className="text-white">${lumpSum.amount.toLocaleString()}</TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleRemoveLumpSum(index)}
                      className="text-red-500 hover:text-red-400 hover:bg-red-500/10"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <p className="text-sm text-zinc-400 italic">No lump sum investments added.</p>
        )}
      </div>
    </div>
  );
}
