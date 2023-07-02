import { OAuth2Client } from "google-auth-library";
import { DateTime as time } from "luxon";
import * as util from "util";
const { google } = require("googleapis");

export const oauth2Client: OAuth2Client = new google.auth.OAuth2({
  clientId: process.env.GOOGLE_FITNESS_CLIENT_ID,
  clientSecret: process.env.GOOGLE_FITNESS_CLIENT_SECRET,
  redirectUri: process.env.GOOGLE_FITNESS_REDIRECT_URL,
  scopes: [
    "https://www.googleapis.com/auth/fitness.activity.read",
    "https://www.googleapis.com/auth/fitness.body.read",
    "https://www.googleapis.com/auth/fitness.heart_rate.read",
    "https://www.googleapis.com/auth/fitness.sleep.read",
  ],
});

export const fitnessClient = async (refreshToken: string) => {
  oauth2Client.setCredentials({
    refresh_token: refreshToken,
  });

  return google.fitness({ version: "v1", auth: oauth2Client });
};

export const getHeartRate = async (refreshToken: string) => {
  const client = await fitnessClient(refreshToken);

  const dataTypeName = "com.google.heart_rate.bpm";
  const durationInMs = 86400000; // 24 hours
  const endTimeInMs = time.now().minus(durationInMs);
  const startTimeInMs = endTimeInMs.startOf("day");

  const result = await client.users.dataset.aggregate({
    userId: "me",
    requestBody: {
      aggregateBy: [
        {
          dataTypeName,
        },
      ],
      bucketByTime: {
        durationMillis: durationInMs,
      },
      startTimeMillis: startTimeInMs.toMillis(),
      endTimeMillis: endTimeInMs.toMillis(),
    },
  });
  // console.log(util.inspect({ result: result.data }, { showHidden: false, depth: null }));
  return (
    (result.data?.bucket?.[0].dataset?.[0]?.point?.[0]?.value?.[0]?.fpVal as number) || undefined
  );
};

export const getSteps = async (refreshToken: string) => {
  const client = await fitnessClient(refreshToken);

  const dataTypeName = "com.google.step_count.delta";
  const durationInMs = 86400000; // 24 hours
  const endTimeInMs = time.now().minus(durationInMs);
  const startTimeInMs = endTimeInMs.startOf("day");

  console.log({ endTimeInMs, startTimeInMs });
  const result = await client.users.dataset.aggregate({
    userId: "me",
    requestBody: {
      aggregateBy: [
        {
          // dataTypeName,
          dataSourceId:
            "derived:com.google.step_count.delta:com.google.android.gms:estimated_steps",
        },
      ],
      bucketByTime: {
        durationMillis: durationInMs,
      },
      startTimeMillis: startTimeInMs.toMillis(),
      endTimeMillis: endTimeInMs.toMillis(),
    },
  });
  //console.log(util.inspect({ result: result.data }, { showHidden: false, depth: null }));
  return (
    (result.data?.bucket?.[0].dataset?.[0]?.point?.[0]?.value?.[0]?.intVal as number) || undefined
  );
};
