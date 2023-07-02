import { Box, Heading, Text, useBreakpointValue } from "@chakra-ui/react";
import { FunctionComponent } from "react";
import { PolarArea } from "react-chartjs-2";
import { StatisticsQuery } from "../../types/graphql";
import { emotions } from "../../types/mood";

type Props = {
  moodCounts: StatisticsQuery["statistics"]["moodCounts"];
};

export const MoodRadar: FunctionComponent<Props> = ({ moodCounts }) => {
  const showLegend = useBreakpointValue({ base: true, lg: false });

  const config = {
    responsive: true,
    scales: {
      r: {
        ticks: { precision: 0, backdropColor: "transparent" },
        grid: {
          color: "#232834",
        },
      },
    },
    plugins: {
      legend: {
        display: showLegend,
        position: "bottom",
      },
      datalabels: {
        formatter: function (value: any, context: any) {
          return !showLegend && value > 0 ? context.chart.data.labels[context.dataIndex] : null;
        },
        color: "white",
      },

      title: {
        display: false,
      },
    },
  };

  const data = {
    labels: moodCounts.map(moodCount => moodCount.emotion.toLowerCase()),
    datasets: [
      {
        label: "Your mood distribution overall",
        data: moodCounts.map(moodCount => moodCount.count),
        backgroundColor: moodCounts.map(moodCount => emotions[moodCount.emotion].color),
        borderColor: moodCounts.map(moodCount => emotions[moodCount.emotion].color),
        borderWidth: 1,
      },
    ],
  };

  return (
    <Box my={10}>
      <Heading as="h3" size="lg">
        Your mood distribution over time
      </Heading>
      <Text mb={12}>It is good to have perspective.</Text>
      <PolarArea data={data} options={config} />
    </Box>
  );
};
