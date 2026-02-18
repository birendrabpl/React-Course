import { useState, useEffect, useCallback } from 'react';
import StockAnalysisService from '../services/StockAnalysisService';

/**
 * useStockAnalysis - Custom hook for stock analysis logic (Controller)
 */
export const useStockAnalysis = (stockData) => {
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const performAnalysis = useCallback(() => {
    try {
      setLoading(true);
      if (!stockData) {
        setError('No stock data provided');
        return;
      }

      const analysisResult = StockAnalysisService.getFullAnalysis(stockData);
      setAnalysis(analysisResult);
      setError(null);
    } catch (err) {
      setError(err.message);
      setAnalysis(null);
    } finally {
      setLoading(false);
    }
  }, [stockData]);

  useEffect(() => {
    performAnalysis();
  }, [performAnalysis]);

  const calculateRiskAllocation = useCallback((totalAllocation) => {
    if (!analysis) return { riskPerShare: 0, quantityShares: 0, totalValue: 0 };

    const riskPerShare = analysis.riskMeter;
    const quantityShares = Math.floor(totalAllocation / (analysis.currentPrice || 1));
    const totalValue = quantityShares * (analysis.currentPrice || 1);

    return {
      riskPerShare: parseFloat(riskPerShare.toFixed(2)),
      quantityShares,
      totalValue: parseFloat(totalValue.toFixed(2)),
    };
  }, [analysis]);

  return {
    analysis,
    loading,
    error,
    calculateRiskAllocation,
    refetch: performAnalysis,
  };
};
