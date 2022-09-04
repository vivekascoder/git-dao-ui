# Git DAO

This is the repo for frontend for gitdao.

## Links

### What github api gives you about a repository ?

Read Here: https://docs.github.com/en/rest/repos/repos#get-a-repository

**User info**
Stuff needee: login, id, avatar_url

```json
{
  "login": "vivekascoder",
  "id": 54495208,
  "node_id": "MDQ6VXNlcjU0NDk1MjA4",
  "avatar_url": "https://avatars.githubusercontent.com/u/54495208?v=4",
  "gravatar_id": "",
  "url": "https://api.github.com/users/vivekascoder",
  "html_url": "https://github.com/vivekascoder",
  "followers_url": "https://api.github.com/users/vivekascoder/followers",
  "following_url": "https://api.github.com/users/vivekascoder/following{/other_user}",
  "gists_url": "https://api.github.com/users/vivekascoder/gists{/gist_id}",
  "starred_url": "https://api.github.com/users/vivekascoder/starred{/owner}{/repo}",
  "subscriptions_url": "https://api.github.com/users/vivekascoder/subscriptions",
  "organizations_url": "https://api.github.com/users/vivekascoder/orgs",
  "repos_url": "https://api.github.com/users/vivekascoder/repos",
  "events_url": "https://api.github.com/users/vivekascoder/events{/privacy}",
  "received_events_url": "https://api.github.com/users/vivekascoder/received_events",
  "type": "User",
  "site_admin": false,
  "name": "Vivek",
  "company": "@instaraise",
  "blog": "vivek.biz",
  "location": "0.0.0.0",
  "email": "vivekascoder@gmail.com",
  "hireable": null,
  "bio": "Imposter",
  "twitter_username": "0xStateMachine",
  "public_repos": 69,
  "public_gists": 152,
  "followers": 51,
  "following": 71,
  "created_at": "2019-08-25T07:43:51Z",
  "updated_at": "2022-08-23T15:26:16Z"
}
```

## Contract Integration

```sol
    function createDAO(
        string memory _daoTokenName,
        string memory _daoTokenSymbol,
        uint256 _daoTokenSupply,
        uint256 _minDelay,
        uint256 _quorumPercentage,
        uint256 _votingPeriod,
        uint256 _votingDelay
    ) external;

```

##

"execution reverted: AccessControl: account 0x1b626a54106113691f7858ea4b5406834506d866 is missing role 0x5f58e3a2316349923ce3780f8d587db2d72378aed66a8261c916544fa6846ca5"
