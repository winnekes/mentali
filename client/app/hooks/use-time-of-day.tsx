import { DateTime as time } from "luxon";
import { useEffect, useState } from "react";

enum Time {
  GENERIC = "generic",
  MORNING = "morning",
  AFTERNOON = "afternoon",
  EVENING = "evening",
}

type TimeOfDay = {
  greeting: string;
  time: Time;
};

export const useTimeOfDay: () => TimeOfDay = () => {
  const [greetingNow, setGreetingNow] = useState("Hi");
  const [timeFrame, setTimeFrame] = useState<Time>(Time.GENERIC);

  const timeNow = time.now();
  const greetings: { [key in Time]: string[] } = {
    generic: ["Hello"],
    morning: ["Good morning"],
    afternoon: ["Good afternoon"],
    evening: ["Good evening"],
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeFrame(
        timeNow.hour < 12
          ? Time.MORNING
          : timeNow.hour < 18
          ? Time.AFTERNOON
          : Time.EVENING
      );
      setGreetingNow(greetings[timeFrame][0]);
    }, 36000);
    return () => clearInterval(interval);
  }, [timeFrame]);

  return { greeting: greetingNow || "Hi", time: timeFrame };
};
