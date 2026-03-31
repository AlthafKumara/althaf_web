"use server";

import { activityRepository } from "@/features/home/activity/repositories/activity.repository";
import { DayActivityModel, ActivityDataModel } from "@/shared/models/activity.model";
import { CommitModel } from "@/shared/models/commit.model";

// Re-export model types for any consumers that still import from this module
export type DayActivity = DayActivityModel;
export type ActivityDataPayload = ActivityDataModel;

export async function fetchActivityData(year: number): Promise<ActivityDataModel> {
  return activityRepository.fetchActivityData(year);
}
