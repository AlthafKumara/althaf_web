const token = process.env.GITHUB_TOKEN || '';
const username = process.env.GITHUB_USERNAME || 'smktelkom31';

async function test() {
  const query = `
    query($username: String!) {
      user(login: $username) {
        contributionsCollection {
          commitContributionsByRepository(maxRepositories: 100) {
            repository {
              name
              url
            }
            contributions(first: 100) {
              nodes {
                commitCount
                occurredAt
                url
              }
            }
          }
        }
      }
    }
  `;
  const res = await fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ query, variables: { username } })
  });
  const data = await res.json();
  console.log(JSON.stringify(data, null, 2));
}
test();
