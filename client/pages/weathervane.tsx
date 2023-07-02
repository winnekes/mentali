import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import {
  Heading,
  HStack,
  Stat,
  Stack,
  StatHelpText,
  StatLabel,
  StatNumber,
  useBreakpointValue,
  StackDirection,
} from "@chakra-ui/react";
import { ErrorAlert } from "../app/components/generic/error-alert";
import { Loading } from "../app/components/generic/loading";
import { PageWrapper } from "../app/components/generic/page-wrapper";
import { Panel } from "../app/components/generic/panel";
import { Subheading } from "../app/components/generic/text/subheading";
import { MoodRadar } from "../app/components/weathervane/mood-radar";
import { WordCloud } from "../app/components/weathervane/word-cloud";
import { Emotion, useStatisticsQuery } from "../app/types/graphql";
import { EmotionDescription, Emotions, emotions } from "../app/types/mood";
import Image from "next/image";

export default function Weathervane() {
  const direction = (useBreakpointValue({ base: "column", lg: "row" }) ||
    "column") as StackDirection;
  const { data, loading, error } = useStatisticsQuery();

  const pageTitle = "Weathervane";
  const subTitle = "This is an overview of you";

  const emotion = data?.statistics.moodCounts && emotions[data.statistics.moodCounts[0].emotion];

  return (
    <PageWrapper pageTitle={pageTitle} pageSubtitle={subTitle}>
      <Panel>
        {loading && <Loading />}
        {error && <ErrorAlert />}
        {data && (
          <>
            <Stack
              direction={direction}
              justify="stretch"
              spacing={10}
              align="stretch"
              textAlign="center"
            >
              <Panel bg="gray.700">
                <Heading as="h3" size="lg">
                  Your current streak
                </Heading>
                <Stat>
                  <StatLabel>In days</StatLabel>
                  <StatNumber>{data.profile.currentStreak}</StatNumber>
                  <StatHelpText>
                    Your longest streak so far: <strong>{data.profile.longestStreak}</strong>
                    <br />
                    <strong>
                      {data.profile.currentStreak > data.profile.longestStreak
                        ? "You are on fire! Keep it up."
                        : data.profile.currentStreak === data.profile.longestStreak
                        ? "Awesome!"
                        : "Almost there!"}
                    </strong>
                  </StatHelpText>
                </Stat>
              </Panel>
              {emotion && (
                <Panel bg="gray.700" position="relative">
                  <Heading as="h3" size="lg">
                    You are often
                  </Heading>
                  <Stack minHeight="100px" w="full" position="relative">
                    <Image
                      src={emotion.imageUrl}
                      layout="fill"
                      objectFit="contain"
                      alt="Image of emotional cloud"
                    />
                  </Stack>
                  <Subheading>{emotion.name}</Subheading>
                </Panel>
              )}
            </Stack>
            <MoodRadar moodCounts={data.statistics.moodCounts} />
            <WordCloud tagUsageCounts={data.statistics.tagUsageCounts} />
          </>
        )}
      </Panel>
    </PageWrapper>
  );
}

export const getServerSideProps = withPageAuthRequired();
