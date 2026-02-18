/**
 * Stock Model - Data structure and schema for stock analysis
 */
export class Stock {
  constructor(stockData) {
    this.id = stockData.id;
    this.symbol = stockData.symbol;
    this.name = stockData.name;
    this.q1 = stockData.q1;
    this.q2 = stockData.q2;
    this.q3 = stockData.q3;
    this.q4 = stockData.q4;
    this.currentPrice = stockData.currentPrice || this.q4;
    this.zone = stockData.zone || 'NEUTRAL';
    this.exitPrice = stockData.exitPrice || null;
    this.riskPerShare = stockData.riskPerShare || 0;
  }

  /**
   * Calculate average price across all quarters
   */
  getAveragePrice() {
    return (this.q1 + this.q2 + this.q3 + this.q4) / 4;
  }

  /**
   * Calculate price change percentage
   */
  getPriceChangePercent() {
    const change = this.currentPrice - this.q1;
    return ((change / this.q1) * 100).toFixed(2);
  }

  /**
   * Get price trend direction
   */
  getPriceTrend() {
    if (this.currentPrice > this.q1) return 'UP';
    if (this.currentPrice < this.q1) return 'DOWN';
    return 'NEUTRAL';
  }

  toJSON() {
    return {
      id: this.id,
      symbol: this.symbol,
      name: this.name,
      q1: this.q1,
      q2: this.q2,
      q3: this.q3,
      q4: this.q4,
      currentPrice: this.currentPrice,
      zone: this.zone,
      exitPrice: this.exitPrice,
      riskPerShare: this.riskPerShare,
    };
  }
}
