"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plus, Trash2, Edit2 } from "lucide-react";

interface BudgetFormProps {
  monthlyIncome: number;
  setMonthlyIncome: (value: number) => void;
  expenses: { category: string; amount: number }[];
  setExpenses: (value: { category: string; amount: number }[]) => void;
  savingsGoal: number;
  setSavingsGoal: (value: number) => void;
}

export default function BudgetForm({
  monthlyIncome,
  setMonthlyIncome,
  expenses,
  setExpenses,
  savingsGoal,
  setSavingsGoal,
}: BudgetFormProps) {
  const [newExpense, setNewExpense] = useState({ category: "", amount: 0 });
  const [editingExpense, setEditingExpense] = useState<{
    index: number;
    category: string;
    amount: number;
  } | null>(null);

  const handleIncomeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    if (!isNaN(value) && value >= 0) setMonthlyIncome(value);
  };

  const handleSavingsGoalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    if (!isNaN(value) && value >= 0) setSavingsGoal(value);
  };

  const handleAddExpense = () => {
    if (newExpense.category.trim() && newExpense.amount > 0) {
      setExpenses([...expenses, newExpense]);
      setNewExpense({ category: "", amount: 0 });
    }
  };

  const handleUpdateExpense = () => {
    if (editingExpense && editingExpense.category.trim() && editingExpense.amount > 0) {
      const updated = [...expenses];
      updated[editingExpense.index] = {
        category: editingExpense.category,
        amount: editingExpense.amount,
      };
      setExpenses(updated);
      setEditingExpense(null);
    }
  };

  const handleRemoveExpense = (index: number) => {
    const updated = expenses.filter((_, i) => i !== index);
    setExpenses(updated);
  };

  const handleEditExpense = (index: number) => {
    setEditingExpense({ index, ...expenses[index] });
  };

  const totalExpenses = expenses.reduce((sum, e) => sum + e.amount, 0);
  const monthlySavings = monthlyIncome - totalExpenses;

  return (
    <div className="space-y-6">
      {/* Income Slider */}
      <div className="space-y-2">
        <Label htmlFor="income" className="text-white">
          Monthly Income: ${monthlyIncome.toLocaleString()}
        </Label>
        <div className="flex items-center gap-2">
          <Slider
            id="income"
            min={0}
            max={20000}
            step={100}
            value={[monthlyIncome]}
            onValueChange={(v) => setMonthlyIncome(v[0])}
            className="flex-1"
          />
          <Input
            type="number"
            value={monthlyIncome}
            onChange={handleIncomeChange}
            className="w-24 bg-zinc-800 border-zinc-700 text-white"
          />
        </div>
      </div>

      {/* Expenses Table */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label className="text-white">Monthly Expenses</Label>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm" className="border-green-500 text-green-500 hover:bg-green-500 hover:text-black">
                <Plus className="h-4 w-4 mr-1" /> Add
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-zinc-900 text-white border-green-500/20">
              <DialogHeader>
                <DialogTitle className="text-green-500">Add Expense</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <Input
                  placeholder="Category"
                  value={newExpense.category}
                  onChange={(e) => setNewExpense({ ...newExpense, category: e.target.value })}
                  className="bg-zinc-800 border-zinc-700 text-white"
                />
                <Input
                  type="number"
                  placeholder="Amount"
                  value={newExpense.amount}
                  onChange={(e) => setNewExpense({ ...newExpense, amount: parseFloat(e.target.value) || 0 })}
                  className="bg-zinc-800 border-zinc-700 text-white"
                />
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button onClick={handleAddExpense} className="bg-green-500 text-black hover:bg-green-600">
                    Add Expense
                  </Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {expenses.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow className="border-zinc-700">
                <TableHead className="text-zinc-400">Category</TableHead>
                <TableHead className="text-zinc-400">Amount</TableHead>
                <TableHead className="text-right text-zinc-400">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {expenses.map((e, i) => (
                <TableRow key={i} className="border-zinc-700">
                  <TableCell className="text-white">{e.category}</TableCell>
                  <TableCell className="text-white">${e.amount.toLocaleString()}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon" onClick={() => handleEditExpense(i)} className="text-zinc-400 hover:text-white">
                        <Edit2 className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleRemoveExpense(i)} className="text-red-500 hover:bg-red-500/10">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              <TableRow className="border-zinc-700 font-semibold">
                <TableCell className="text-white">Total Expenses</TableCell>
                <TableCell className="text-white" colSpan={2}>${totalExpenses.toLocaleString()}</TableCell>
              </TableRow>
              <TableRow className="border-zinc-700 font-semibold">
                <TableCell className="text-green-500">Monthly Savings</TableCell>
                <TableCell className={monthlySavings >= 0 ? "text-green-500" : "text-red-500"} colSpan={2}>
                  ${monthlySavings.toLocaleString()}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        ) : (
          <p className="text-sm text-zinc-400 italic">No expenses added yet.</p>
        )}
      </div>

      {/* Savings Goal */}
      <div className="space-y-2">
        <Label htmlFor="savingsGoal" className="text-white">
          Savings Goal: ${savingsGoal.toLocaleString()}
        </Label>
        <div className="flex items-center gap-2">
          <Slider
            id="savingsGoal"
            min={1000}
            max={100000}
            step={1000}
            value={[savingsGoal]}
            onValueChange={(v) => setSavingsGoal(v[0])}
            className="flex-1"
          />
          <Input
            type="number"
            value={savingsGoal}
            onChange={handleSavingsGoalChange}
            className="w-24 bg-zinc-800 border-zinc-700 text-white"
          />
        </div>
      </div>

      {/* Edit Dialog */}
      {editingExpense && (
        <Dialog open={!!editingExpense} onOpenChange={(open) => !open && setEditingExpense(null)}>
          <DialogContent className="bg-zinc-900 text-white border-green-500/20">
            <DialogHeader>
              <DialogTitle className="text-green-500">Edit Expense</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <Input
                value={editingExpense.category}
                onChange={(e) => setEditingExpense({ ...editingExpense, category: e.target.value })}
                className="bg-zinc-800 border-zinc-700 text-white"
              />
              <Input
                type="number"
                value={editingExpense.amount}
                onChange={(e) => setEditingExpense({ ...editingExpense, amount: parseFloat(e.target.value) || 0 })}
                className="bg-zinc-800 border-zinc-700 text-white"
              />
            </div>
            <DialogFooter>
              <Button onClick={handleUpdateExpense} className="bg-green-500 text-black hover:bg-green-600">
                Update Expense
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
