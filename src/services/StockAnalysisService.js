import { Stock } from '../models/Stock';

/**
 * Stock Analysis Service - Business logic for stock analysis
 */
class StockAnalysisService {
  /**
   * Calculate overall score (0-10)
   */
  calculateScore(stock) {
    const priceChange = parseFloat(stock.getPriceChangePercent());
    const volatility = this.calculateVolatility(stock);
    
    // Score based on price performance (60%) and stability (40%)
    const performanceScore = Math.min(10, (priceChange + 5) / 1.5);
    const stabilityScore = Math.max(0, 10 - volatility);
    
    return Math.round((performanceScore * 0.6 + stabilityScore * 0.4) * 10) / 10;
  }

  /**
   * Calculate volatility (0-10)
   */
  calculateVolatility(stock) {
    const prices = [stock.q1, stock.q2, stock.q3, stock.q4];
    const mean = prices.reduce((a, b) => a + b) / prices.length;
    const variance = prices.reduce((sum, price) => sum + Math.pow(price - mean, 2), 0) / prices.length;
    const stdev = Math.sqrt(variance);
    const volatility = (stdev / mean) * 100;
    
    return Math.min(10, volatility * 0.5);
  }

  /**
   * Get rating based on score
   */
  getRating(score) {
    if (score >= 8) return 'STRONG BUY';
    if (score >= 6) return 'BUY';
    if (score >= 4) return 'HOLD';
    if (score >= 2) return 'SELL';
    return 'STRONG SELL';
  }

  /**
   * Determine zone based on current price vs quarters
   */
  determineZone(stock) {
    const prices = [stock.q1, stock.q2, stock.q3, stock.q4];
    const maxPrice = Math.max(...prices);
    const minPrice = Math.min(...prices);
    const range = maxPrice - minPrice;
    const current = stock.currentPrice;

    const upperBound = maxPrice - (range * 0.25);
    const lowerBound = minPrice + (range * 0.25);

    if (current > upperBound) return 'OVERBOUGHT';
    if (current < lowerBound) return 'OVERSOLD';
    return 'NEUTRAL';
  }

  /**
   * Calculate risk meter (0-100) - higher is riskier
   */
  calculateRiskMeter(stock) {
    const volatility = this.calculateVolatility(stock);
    const priceChange = Math.abs(parseFloat(stock.getPriceChangePercent()));
    
    // Risk based on volatility (60%) and price change (40%)
    const riskScore = volatility * 6 + (priceChange * 0.4);
    return Math.min(100, Math.round(riskScore));
  }

  /**
   * Calculate fundamentals score (0-10)
   */
  calculateFundamentalsScore(stock) {
    const volatility = this.calculateVolatility(stock);
    const consistency = 10 - volatility; // Less volatile = more consistent
    const growth = parseFloat(stock.getPriceChangePercent()) / 10; // Normalized growth
    
    return Math.round((consistency * 0.7 + Math.max(0, growth) * 3) * 10) / 10;
  }

  /**
   * Calculate momentum score (0-10)
   */
  calculateMomentumScore(stock) {
    const q1q2Change = ((stock.q2 - stock.q1) / stock.q1) * 100;
    const q3q4Change = ((stock.q4 - stock.q3) / stock.q3) * 100;
    const recentMomentum = (q3q4Change + q1q2Change) / 2;
    
    return Math.min(10, Math.max(0, 5 + (recentMomentum / 5)));
  }

  /**
   * Calculate technical score (0-10)
   */
  calculateTechnicalScore(stock) {
    const prices = [stock.q1, stock.q2, stock.q3, stock.q4];
    const maxPrice = Math.max(...prices);
    
    // Check if price is above exit price
    const aboveExitPrice = stock.exitPrice ? (stock.currentPrice > stock.exitPrice ? 10 : 2) : 5;
    
    return Math.round((aboveExitPrice * 0.7 + (stock.currentPrice / maxPrice) * 3) * 10) / 10;
  }

  /**
   * Get full analysis object for a stock
   */
  getFullAnalysis(stockData) {
    const stock = new Stock(stockData);
    
    return {
      ...stock.toJSON(),
      score: this.calculateScore(stock),
      rating: this.getRating(this.calculateScore(stock)),
      zone: this.determineZone(stock),
      riskMeter: this.calculateRiskMeter(stock),
      volatility: this.calculateVolatility(stock),
      fundamentalsScore: this.calculateFundamentalsScore(stock),
      momentumScore: this.calculateMomentumScore(stock),
      technicalScore: this.calculateTechnicalScore(stock),
      priceChange: parseFloat(stock.getPriceChangePercent()),
      priceTrend: stock.getPriceTrend(),
      averagePrice: stock.getAveragePrice(),
    };
  }
}

const stockAnalysisService = new StockAnalysisService();

export default stockAnalysisService;
