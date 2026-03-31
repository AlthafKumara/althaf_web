import { CommitModel } from './commit.model';

export interface DayActivityModel {
    date: string;
    total: number;
    github: number;
    gitlab: number;
}

export interface ActivityDataModel {
    heatmap: DayActivityModel[];
    topCommits: CommitModel[];
}
