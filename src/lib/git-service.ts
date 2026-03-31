// Re-export from the canonical services location for backward compatibility.
// All new code should import from '@/utils/services/git-service'.
export {
  fetchGitHubActivity,
  fetchGitLabActivity,
  getAggregatedActivityForYear,
  getAggregatedActivity,
} from '@/utils/services/git-service';

// Re-export CommitModel as CommitLog for any external consumers
export type { CommitModel as CommitLog } from '@/shared/models/commit.model';
