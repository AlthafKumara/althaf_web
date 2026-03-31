export interface CommitModel {
    source: 'github' | 'gitlab';
    repo: string;
    message: string;
    date: string;
    url: string;
}
