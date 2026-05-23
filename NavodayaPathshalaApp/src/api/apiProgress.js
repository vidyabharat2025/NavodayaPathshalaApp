/**
 * API Progress Handler
 * Manages global API loading state
 */

class APIProgress {
  constructor() {
    this.requestCount = 0;
    this.listeners = [];
  }

  /**
   * Subscribe to loading state changes
   * @param {Function} callback - Called with boolean indicating loading state
   */
  subscribe(callback) {
    this.listeners.push(callback);
    return () => {
      this.listeners = this.listeners.filter(listener => listener !== callback);
    };
  }

  /**
   * Notify all listeners of state change
   */
  notifyListeners() {
    const isLoading = this.requestCount > 0;
    this.listeners.forEach(listener => listener(isLoading));
  }

  /**
   * Increment request count and notify
   */
  startRequest() {
    this.requestCount += 1;
    this.notifyListeners();
  }

  /**
   * Decrement request count and notify
   */
  endRequest() {
    this.requestCount = Math.max(0, this.requestCount - 1);
    this.notifyListeners();
  }

  /**
   * Get current loading state
   */
  isLoading() {
    return this.requestCount > 0;
  }

  /**
   * Reset loading state (for errors, etc.)
   */
  reset() {
    this.requestCount = 0;
    this.notifyListeners();
  }
}

// Export singleton instance
export default new APIProgress();
