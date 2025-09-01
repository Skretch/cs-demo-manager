import { useEffect } from 'react';
import { useNavigateToMatch } from 'csdm/ui/hooks/use-navigate-to-match';
import type { Axis } from './x-axis';
import type { PlayerChartsData } from 'csdm/common/types/charts/player-charts-data';
import type { ECharts } from 'echarts';

// Navigate to a match when double-clicking a point on a chart
// Only active when the X axis represents matches
export function useOpenMatchOnPointDoubleClick({
  axis,
  chartsData,
  getChartInstance,
}: {
  axis: Axis;
  chartsData: PlayerChartsData[];
  getChartInstance: () => ECharts;
}) {
  const navigateToMatch = useNavigateToMatch();

  useEffect(() => {
    if (axis !== 'match') {
      return;
    }
    const chart = getChartInstance();
    const onDoubleClick = ({ dataIndex }: { dataIndex: number }) => {
      const chartData = chartsData[dataIndex];
      if (chartData?.matchChecksum !== undefined) {
        navigateToMatch(chartData.matchChecksum);
      }
    };
    chart.on('dblclick', onDoubleClick);
    return () => {
      chart.off('dblclick', onDoubleClick);
    };
  }, [axis, chartsData, navigateToMatch, getChartInstance]);
}
