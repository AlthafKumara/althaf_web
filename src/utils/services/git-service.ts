import { CommitModel } from '@/shared/models/commit.model';

export async function fetchGitHubActivity(username: string, token: string): Promise<CommitModel[]> {
    const headers: Record<string, string> = {
        Accept: 'application/vnd.github.v3+json',
    };

    if (token) headers.Authorization = `Bearer ${token}`;

    let page = 1;
    let allEvents: any[] = [];

    while (page <= 3) {
        const res = await fetch(
            `https://api.github.com/users/${username}/events?per_page=100&page=${page}`,
            { headers, cache: 'no-store' }
        );

        if (!res.ok) {
            console.warn(`[git-service] GitHub API error: ${res.status} ${res.statusText}`);
            break;
        }

        const data = await res.json();
        if (data.length === 0) break;

        allEvents = [...allEvents, ...data];
        page++;
    }

    const pushEvents = allEvents.filter((e) => e.type === 'PushEvent');

    return pushEvents.flatMap((event) =>
        (event.payload?.commits || []).map((commit: any) => ({
            source: 'github' as const,
            repo: event.repo.name,
            message: commit.message,
            date: event.created_at,
            url: `https://github.com/${event.repo.name}/commit/${commit.sha}`,
        }))
    );
}

export async function fetchGitLabActivity(userId: string, token: string, year: number): Promise<CommitModel[]> {
    try {
        const after = new Date(year, 0, 1).toISOString();
        const before = new Date(year, 11, 31, 23, 59, 59).toISOString();

        const response = await fetch(
            `https://gitlab.com/api/v4/users/${userId}/events?action=pushed&per_page=100&after=${after}&before=${before}`,
            {
                headers: { Authorization: `Bearer ${token}` },
                next: { revalidate: 1800 },
            }
        );

        if (!response.ok) return [];

        const events = await response.json();
        const commits: CommitModel[] = [];

        for (const event of events) {
            if (event.push_data && event.push_data.commit_title) {
                commits.push({
                    source: 'gitlab',
                    repo: event.project_id.toString(),
                    message: event.push_data.commit_title,
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

export async function getAggregatedActivityForYear(year: number): Promise<CommitModel[]> {
    const ghToken = process.env.GITHUB_TOKEN || '';
    const glToken = process.env.GITLAB_TOKEN || '';
    const glUserId = process.env.GITLAB_USER_ID || '';
    const ghUsername = process.env.GITHUB_USERNAME || '';

    if (!ghUsername) {
        console.warn('[git-service] GITHUB_USERNAME is not set in .env — skipping GitHub fetch.');
    }

    const [ghCommits, glCommits] = await Promise.all([
        fetchGitHubActivity(ghUsername, ghToken),
        glToken && glUserId
            ? fetchGitLabActivity(glUserId, glToken, year)
            : Promise.resolve([]),
    ]);

    return [...ghCommits, ...glCommits]
        .filter((c) => new Date(c.date).getFullYear() === year)
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

/** Backward-compatible alias */
export async function getAggregatedActivity(): Promise<CommitModel[]> {
    return getAggregatedActivityForYear(new Date().getFullYear());
}
