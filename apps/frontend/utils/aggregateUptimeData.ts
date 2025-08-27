interface Tick {
  id: string;
  createdAt: string;
  status: string;
  latency: number;
}

export function aggregateUptimeData(ticks: Tick[], windowMinutes: number = 3): boolean[] {
  if (!ticks || ticks.length === 0) return [];

  // Sort ticks by createdAt in descending order (newest first)
  const sortedTicks = [...ticks].sort((a, b) => 
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  const now = new Date();
  const windowMs = windowMinutes * 60 * 1000; // Convert minutes to milliseconds
  const aggregatedData: boolean[] = [];

  // Create 10 time windows going back 30 minutes (3 minutes each)
  for (let i = 0; i < 10; i++) {
    const windowEnd = new Date(now.getTime() - (i * windowMs));
    const windowStart = new Date(windowEnd.getTime() - windowMs);

    // Find ticks within this time window
    const ticksInWindow = sortedTicks.filter(tick => {
      const tickTime = new Date(tick.createdAt);
      return tickTime >= windowStart && tickTime < windowEnd;
    });

    // Determine the status for this window
    let windowStatus = true; // Default to up if no ticks

    if (ticksInWindow.length > 0) {
      // If any tick in the window is down, consider the window as down
      // Otherwise, if all ticks are up, consider it up
      windowStatus = !ticksInWindow.some(tick => tick.status === 'down');
    }

    aggregatedData.push(windowStatus);
  }

  // Reverse to show oldest to newest (left to right)
  return aggregatedData.reverse();
}

export function calculateUptime(ticks: Tick[]): number {
  if (!ticks || ticks.length === 0) return 100;

  const upTicks = ticks.filter(tick => tick.status === 'up').length;
  return (upTicks / ticks.length) * 100;
}

export function getAverageResponseTime(ticks: Tick[]): number {
  if (!ticks || ticks.length === 0) return 0;

  const validTicks = ticks.filter(tick => tick.status === 'up' && tick.latency > 0);
  if (validTicks.length === 0) return 0;

  const totalLatency = validTicks.reduce((sum, tick) => sum + tick.latency, 0);
  return Math.round(totalLatency / validTicks.length);
}

export function getCurrentStatus(ticks: Tick[]): 'up' | 'down' {
  if (!ticks || ticks.length === 0) return 'down';

  // Sort by createdAt and get the most recent tick
  const sortedTicks = [...ticks].sort((a, b) => 
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  return sortedTicks[0].status === 'up' ? 'up' : 'down';
}

export function getLastCheckTime(ticks: Tick[]): string {
  if (!ticks || ticks.length === 0) return 'Never';

  // Sort by createdAt and get the most recent tick
  const sortedTicks = [...ticks].sort((a, b) => 
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  const lastCheck = new Date(sortedTicks[0].createdAt);
  const now = new Date();
  const diffMs = now.getTime() - lastCheck.getTime();
  const diffMinutes = Math.floor(diffMs / (1000 * 60));

  if (diffMinutes < 1) return 'Just now';
  if (diffMinutes === 1) return '1 min ago';
  if (diffMinutes < 60) return `${diffMinutes} min ago`;
  
  const diffHours = Math.floor(diffMinutes / 60);
  if (diffHours === 1) return '1 hour ago';
  if (diffHours < 24) return `${diffHours} hours ago`;
  
  const diffDays = Math.floor(diffHours / 24);
  if (diffDays === 1) return '1 day ago';
  return `${diffDays} days ago`;
}
