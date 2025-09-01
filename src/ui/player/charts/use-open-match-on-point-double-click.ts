import { useEffect, useMemo } from 'react';
import { useNavigateToMatch } from 'csdm/ui/hooks/use-navigate-to-match';
import type { Axis } from './x-axis';
import type { PlayerChartsData } from 'csdm/common/types/charts/player-charts-data';
import type { MatchTable } from 'csdm/common/types/match-table';
import type { ECharts } from 'echarts';

// Navigate to a match when double-clicking a point on a chart
// Only active when the X axis represents matches
export function useOpenMatchOnPointDoubleClick({
  axis,
  chartsData,
  matches,
  getChartInstance,
}: {
  axis: Axis;
  chartsData: PlayerChartsData[];
  matches: MatchTable[];
  getChartInstance: () => ECharts;
}) {
  const navigateToMatch = useNavigateToMatch();
  const checksumPerDate = useMemo(() => {
    const map: Record<string, string> = {};
    for (const match of matches) {
      map[match.date] = match.checksum;
    }
    return map;
  }, [matches]);

  useEffect(() => {
    if (axis !== 'match') {
      return;
    }
    const chart = getChartInstance();
    const onDoubleClick = ({ dataIndex }: { dataIndex: number }) => {
      const chartData = chartsData[dataIndex];
      if (!chartData) {
        return;
      }
      const checksum = checksumPerDate[chartData.matchDate];
      if (checksum !== undefined) {
        navigateToMatch(checksum);
      }
    };
    chart.on('dblclick', onDoubleClick);
    return () => {
      chart.off('dblclick', onDoubleClick);
    };
  }, [axis, chartsData, checksumPerDate, navigateToMatch, getChartInstance]);
}
