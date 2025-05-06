// src/containers/HomeContainer.tsx
import { useState, useEffect } from 'react';
import HomeView from '../views/HomeView';
import BudgetView from '../views/BudgetView';
import { useAuth } from '../config/AuthUser';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../config/firebase';

interface UserSettings {
  monthlyInvestment: number;
  years: number;
  selectedRate: string;
  customRate: number;
  lumpSums: Array<{ amount: number; year: number }>;
  totalGoal: number;
  // Budget settings
  monthlyIncome: number;
  expenses: Array<{ category: string; amount: number }>;
  savingsGoal: number;
}

export default function HomeContainer() {
  const { userData } = useAuth();
  const [monthlyInvestment, setMonthlyInvestment] = useState(500);
  const [years, setYears] = useState(30);
  const [selectedRate, setSelectedRate] = useState("spy");
  const [customRate, setCustomRate] = useState(0.05);
  const [lumpSums, setLumpSums] = useState<Array<{ amount: number; year: number }>>([]);
  const [totalGoal, setTotalGoal] = useState(2000000);

  // Budget state
  const [monthlyIncome, setMonthlyIncome] = useState<number>(5000);
  const [expenses, setExpenses] = useState<Array<{ category: string; amount: number }>>([
    { category: "Housing", amount: 1500 },
    { category: "Food", amount: 600 },
    { category: "Transportation", amount: 400 },
    { category: "Utilities", amount: 300 },
    { category: "Entertainment", amount: 200 },
  ]);
  const [savingsGoal, setSavingsGoal] = useState<number>(1000);

  const [viewType, setViewType] = useState<'home' | 'budget' >('home');

  // Load settings when user logs in
  useEffect(() => {
    const loadSettings = async () => {
      if (!userData) return;
      
      try {
        const userRef = doc(db, "users", userData.userId);
        const docSnap = await getDoc(userRef);
        
        if (docSnap.exists() && docSnap.data().settings) {
          const settings = docSnap.data().settings as UserSettings;
          setMonthlyInvestment(settings.monthlyInvestment || 500);
          setYears(settings.years || 30);
          setSelectedRate(settings.selectedRate || "spy");
          setCustomRate(settings.customRate || 0.05);
          setLumpSums(settings.lumpSums || []);
          setTotalGoal(settings.totalGoal || 2000000);
          // Load budget settings with defaults
          setMonthlyIncome(settings.monthlyIncome || 5000);
          setExpenses(settings.expenses || [
            { category: "Housing", amount: 1500 },
            { category: "Food", amount: 600 },
            { category: "Transportation", amount: 400 },
            { category: "Utilities", amount: 300 },
            { category: "Entertainment", amount: 200 },
          ]);
          setSavingsGoal(settings.savingsGoal || 1000);
        } else {
          // If no settings exist, set default values
          const defaultSettings: UserSettings = {
            monthlyInvestment: 500,
            years: 30,
            selectedRate: "spy",
            customRate: 0.05,
            lumpSums: [],
            totalGoal: 2000000,
            monthlyIncome: 5000,
            expenses: [
              { category: "Housing", amount: 1500 },
              { category: "Food", amount: 600 },
              { category: "Transportation", amount: 400 },
              { category: "Utilities", amount: 300 },
              { category: "Entertainment", amount: 200 },
            ],
            savingsGoal: 1000
          };
          await setDoc(userRef, { settings: defaultSettings });
          // Set the state with default values
          setMonthlyInvestment(defaultSettings.monthlyInvestment);
          setYears(defaultSettings.years);
          setSelectedRate(defaultSettings.selectedRate);
          setCustomRate(defaultSettings.customRate);
          setLumpSums(defaultSettings.lumpSums);
          setTotalGoal(defaultSettings.totalGoal);
          setMonthlyIncome(defaultSettings.monthlyIncome);
          setExpenses(defaultSettings.expenses);
          setSavingsGoal(defaultSettings.savingsGoal);
        }
      } catch (error) {
        console.error("Error loading settings:", error);
      }
    };

    loadSettings();
  }, [userData]);

  // Save settings to Firestore
  const saveSettings = async () => {
    if (!userData) return;
    
    try {
      const userRef = doc(db, "users", userData.userId);
      const settings: UserSettings = {
        monthlyInvestment,
        years,
        selectedRate,
        customRate,
        lumpSums,
        totalGoal,
        // Save budget settings
        monthlyIncome,
        expenses,
        savingsGoal,
      };
      
      await setDoc(userRef, { settings }, { merge: true });
    } catch (error) {
      console.error("Error saving settings:", error);
    }
  };

  const rates = {
    low: 0.04,
    real: 0.0637,
    spy: 0.1011,
    custom: customRate,
  };

  const calculateInvestment = () => {
    const rate = rates[selectedRate as keyof typeof rates];
    let totalInvested = 0;
    let finalValue = 0;
    const yearlyData = [];

    for (let year = 1; year <= years; year++) {
      let yearValue = finalValue;
      for (let month = 1; month <= 12; month++) {
        yearValue = yearValue * (1 + rate / 12) + monthlyInvestment;
        totalInvested += monthlyInvestment;
      }
      const yearLumpSums = lumpSums.filter((ls) => ls.year === year);
      for (const ls of yearLumpSums) {
        yearValue += ls.amount;
        totalInvested += ls.amount;
      }
      finalValue = yearValue;
      yearlyData.push({ year, value: Math.round(yearValue), invested: Math.round(totalInvested) });
    }

    return {
      totalInvested,
      finalValue,
      additionalValue: finalValue - totalInvested,
      yearlyData,
    };
  };

  const results = calculateInvestment();
  const percentageOfGoal = Math.min(100, (results.finalValue / totalGoal) * 100);
  const estimatedYearsToGoal = results.finalValue >= totalGoal
    ? years
    : Math.ceil(Math.log(totalGoal / results.finalValue) / Math.log(1 + rates[selectedRate as keyof typeof rates]) + years);

  // Calculate budget results
  const calculateBudget = () => {
    const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0)
    const monthlySavings = monthlyIncome - totalExpenses
    const annualSavings = monthlySavings * 12
    const savingsRate = (monthlySavings / monthlyIncome) * 100
    const monthsToGoal = savingsGoal > 0 ? Math.ceil(savingsGoal / monthlySavings) : 0

    // Create monthly projection for the next 12 months
    const monthlyData = []
    let cumulativeSavings = 0

    for (let month = 1; month <= 12; month++) {
      cumulativeSavings += monthlySavings
      monthlyData.push({
        month,
        savings: cumulativeSavings,
        income: monthlyIncome * month,
        expenses: totalExpenses * month,
      })
    }

    return {
      monthlyIncome,
      totalExpenses,
      monthlySavings,
      annualSavings,
      savingsRate,
      savingsGoal,
      monthsToGoal,
      monthlyData,
      expensesBreakdown: expenses,
    }
  }

  if (viewType == 'budget'){
    const budgetResults = calculateBudget();
    return (
      <BudgetView
        onSaveSettings={saveSettings}
        setViewType={setViewType}
        monthlyIncome={monthlyIncome}
        setMonthlyIncome={setMonthlyIncome}
        expenses={expenses}
        setExpenses={setExpenses}
        savingsGoal={savingsGoal}
        setSavingsGoal={setSavingsGoal}
        budgetResults={budgetResults}
      />
    )
  } else{
    return (
      <HomeView
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
        results={results}
        percentageOfGoal={percentageOfGoal}
        estimatedYearsToGoal={estimatedYearsToGoal}
        onSaveSettings={saveSettings}
        setViewType={setViewType}
      />
    );
  }
}
