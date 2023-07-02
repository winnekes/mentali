import { Authorized, Ctx, Query, Resolver } from "type-graphql";
import * as util from "util";
import { ServerContext } from "../../../context";
import { getHeartRate, getSteps } from "../../../utils/fitness-client";
import { FitnessType } from "./fitness-type";

@Resolver()
export class FitnessQuery {
  @Authorized()
  @Query(returns => FitnessType)
  async fitness(@Ctx() context: ServerContext): Promise<FitnessType | undefined> {
    if (!context.authId || !context.user) {
      throw new Error("No user set on context");
    }

    if (!context.user.refreshToken) {
      throw new Error("User has not granted access to Google Fitness");
    }

    try {
      const heartRate = await getHeartRate(context.user.refreshToken);
      const steps = await getSteps(context.user.refreshToken);

      console.log(util.inspect({ heartRate, steps }, { showHidden: false, depth: null }));

      const mapHeartRate = (data: any) => {
        const row = data.bucket[0].dataset[0].point[0];
        return (row.fpVal as number) || 0;
      };
      return {
        steps: { today: heartRate },
        heartRate: { today: steps },
      };
    } catch (e) {
      console.log({ e });
    }
  }
}
