export interface CommitLog {
  source: 'github' | 'gitlab';
  repo: string;
  message: string;
  date: string;
  url: string;
}

export async function fetchGitHubActivity(token: string): Promise<CommitLog[]> {
  try {
    const headers: Record<string, string> = {
      Accept: 'application/vnd.github.v3+json'
    };
    if (token) headers.Authorization = `Token ${token}`;

    const response = await fetch(`https://api.github.com/users/AlthafKumara/events?per_page=100`, {
      headers,
      next: { revalidate: 1800 },
    });

    if (!response.ok) return [];

    const events = await response.json();
    const pushEvents = events.filter((e: any) => e.type === 'PushEvent');

    const commits: CommitLog[] = [];
    for (const event of pushEvents) {
      if (event.payload && event.payload.commits) {
        for (const commit of event.payload.commits) {
          commits.push({
            source: 'github',
            repo: event.repo.name,
            message: commit.message,
            date: event.created_at,
            url: `https://github.com/${event.repo.name}/commit/${commit.sha}`,
          });
        }
      }
    }
    return commits;
  } catch (err) {
    console.error('Error fetching GitHub activity:', err);
    return [];
  }
}

export async function fetchGitLabActivity(userId: string, token: string, year: number): Promise<CommitLog[]> {
  try {
    // GitLab allows filtering events by date strictly, but for simplicity we fetch a large page.
    // In a real scenario we'd query after/before ISO strings.
    const after = new Date(year, 0, 1).toISOString();
    const before = new Date(year, 11, 31, 23, 59, 59).toISOString();

    const response = await fetch(`https://gitlab.com/api/v4/users/${userId}/events?action=pushed&per_page=100&after=${after}&before=${before}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      next: { revalidate: 1800 },
    });

    if (!response.ok) return [];

    const events = await response.json();
    const commits: CommitLog[] = [];

    for (const event of events) {
      if (event.push_data && event.push_data.commit_title) {
        commits.push({
          source: 'gitlab',
          repo: event.project_id.toString(), message: event.push_data.commit_title,
          date: event.created_at,
          url: `https://gitlab.com/projects/${event.project_id}/commits/${event.push_data.commit_to}`,
        });
      }
    }

    return commits;
  } catch (err) {
    console.error('Error fetching GitLab activity:', err);
    return [];
  }
}

export async function getAggregatedActivityForYear(year: number): Promise<CommitLog[]> {
  const ghToken = process.env.GITHUB_TOKEN || '';
  const glToken = process.env.GITLAB_TOKEN || '';
  const glUserId = process.env.GITLAB_USER_ID || '';
  const ghUsername = process.env.GITHUB_USERNAME || 'github_user';

  // GitHub doesn't easily paginate past 90 days on REST event API, but we'll fetch what we can.
  // We'll filter the results manually to match the requested year.
  const [ghCommits, glCommits] = await Promise.all([
    fetchGitHubActivity(ghToken),
    (glToken && glUserId) ? fetchGitLabActivity(glUserId, glToken, year) : Promise.resolve([])
  ]);

  const allCommits = [...ghCommits, ...glCommits]
    .filter(c => new Date(c.date).getFullYear() === year)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return allCommits;
}

// Keep backward compatibility for other modules
export async function getAggregatedActivity(): Promise<CommitLog[]> {
  return getAggregatedActivityForYear(new Date().getFullYear());
}
