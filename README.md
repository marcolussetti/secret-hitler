# secret-hitler

[![Build Status](https://api.travis-ci.com/cozuya/secret-hitler.svg?branch=master)](https://travis-ci.com/cozuya/secret-hitler/)
[![Contributions Welcome](https://img.shields.io/badge/contributions-welcome-orange.svg?style=flat)](https://github.com/cozuya/secret-hitler/issues)
[![Dependencies](https://david-dm.org/cozuya/secret-hitler.svg)](https://david-dm.org/cozuya/secret-hitler)
[![Dev Dependencies](https://david-dm.org/cozuya/secret-hitler/dev-status.svg)](https://david-dm.org/cozuya/secret-hitler?type=dev)
[![Styled with Prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)

Secret Hitler is a dramatic game of political intrigue and betrayal set in 1930's Germany. Players are secretly divided into two teams - liberals and fascists.
Known only to each other, the fascists coordinate to sow distrust and install their cold-blooded leader. The liberals must find and stop the Secret Hitler before it’s too late.

Effectively this is a take on the classic social deduction/hidden role board game genre such as Werewolf and Mafia, but closer to the Resistance. Games are 5-10 players, the minority (fascists) know who everyone is and the majority (liberals) don't know anything. Over the course of the game the liberals need to try to identify the fascists to win and the fascists need to remain hidden, with an extra "superfascist" role with an additional win condition for both sides.

This codebase is a "lobby style" implementation of this game - anyone can make a game which is displayed on a list on the "home" page. The game starts when enough players are seated. In addition, anyone can watch a game in progress, etc.

Current production/stable is found at [Secret Hitler IO](https://secrethitler.io).

![Screenshot](https://cdn.discordapp.com/attachments/532418308977328139/538550232015962112/unknown.png)

Considering contributing to this project? Please read our brief guidelines found at
[CONTRIBUTING](https://github.com/cozuya/secret-hitler/blob/master/.github/CONTRIBUTING.md). Contributors get a cool special playername color!

Front end: React, Redux, Sass, Semantic UI, jQuery, SocketIO.

Back end: Node, Express, Pug, Passport, Mongodb with Mongoose, SocketIO.

## Installation

Install [node.js version: LTS](https://nodejs.org/en/), have it in your path.

Install [git](https://git-scm.com/downloads), have it in your path.

Install [mongodb](https://www.mongodb.com/download-center?ct=atlasheader#community), have it in your path.

Install [yarn](https://yarnpkg.com/en/docs/install) for your OS.

then

```bash
git clone https://github.com/cozuya/secret-hitler.git
cd secret-hitler
yarn
```

If you're receiving an error like "Found incompatible module", try using `yarn --ignore-engines`

## Running in dev mode

**Start development:**

```bash
yarn dev
```

Navigate to: http://localhost:8080

You'll most likely need a browser extension such as Chrome's [SessionBox](https://chrome.google.com/webstore/detail/sessionbox-free-multi-log/megbklhjamjbcafknkgmokldgolkdfig?hl=en) to have multiple sessions on the same browser. No, incognito will not work. When developing in Chrome, you'll want to check "disable cache" on the network tab - my webpack setup isn't great and it doesn't cache bust itself. Also it will be very helpful to make all of the "quickdefault" accounts with the default password, `snipsnap`, so that you can log in to an account in one click. There is a yarn script you may run once `server` or `dev` yarn scripts are already running called `create-accounts` which will attempt to populate all of the helper accounts into the database.

```bash
yarn create-accounts
```

**Assigning a local mod:**

In order to better test all functions of the site in a local development environment it is useful to assign an admin account.
This is done for you through the `secret-hitler/scripts/assignLocalMod.js` file courtesy of contributor Hexicube.
After running the `create-accounts` script you will have the helper accounts populated into the database.
Running the next line below will then assign `Uther` to the `admin` staffRole to better test all site functions in testing.

```bash
yarn assign-local-mod
```

Upon seeing the end result in the terminal of `Assigned.` you will know it worked. Just refresh your localhost:8080 page at this point and then you will have a local mod to test additional functions of the site with in a development mode environment.

## Running in production mode

These instructions cover an Ubuntu 18.04 LTS deployment. Convert as appropriate to the deployment vehicle.

```bash

sudo apt update
sudo apt upgrade

# Install MongoDB Community Edition
wget -qO - https://www.mongodb.org/static/pgp/server-4.2.asc | sudo apt-key add -
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu bionic/mongodb-org/4.2 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-4.2.list
sudo apt update
sudo apt-get install -y mongodb-org
sudo systemctl start mongod  # Start MongoDB

# Install Redis
sudo apt-get install redis-server
sudo systemctl enable redis-server.service

# Install NodeJS 12.x
curl -sL https://deb.nodesource.com/setup_12.x | sudo -E bash -
sudo apt-get update && sudo apt-get install -y nodejs

# Install Yarn
curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
sudo apt update && sudo apt install yarn

# Put Secret Hitler somewhere
sudo mkdir /opt/secrethitler
sudo chown secrethitler:secrethitler /opt/secrethitler
sudo su secrethitler
cd /opt/secrethitler
# Currently might need a  fork to get some extra settings https://github.com/marcolussetti/secret-hitler.git
# git clone https://github.com/cozuya/secret-hitler.git .
git clone https://github.com/marcolussetti/secret-hitler.git

# If using upstream, reset to last good revision (check https://github.com/cozuya/secret-hitler/commits/master)
# git reset 7cd57f48b6685cb7a441d8a9b4db144a039dd820 --hard  # Last good revision as of 2020-03-21

# Install prerequisites
yarn

# Build
yarn build

# Export variables
export NODE_ENV=production
export MGKEY=<your_mailgun_key>
export MGDOMAIN=<your_mailgun_domain>
export DOMAIN=<your_domain>
export SITENAME=<your_site_name>
export CHECKIPINTEL=false
export BYPASSALLCHECKS=true
export SECRETSESSIONKEY=<whatever>

# If you want OAUTH integration
export GITHUBCLIENTID=<your_id>
export GITHUBCLIENTSECRET=<your_secret>
export DISCORDCLIENTID=<your_id>
export DISCORDCLIENTSECRET=<your_secret>

node bin/dev.js
```

### Environment variables

- *MONGODB_URI*: takes a valid mongodb URI in the format `mongodb://localhost:27017/secret-hitler-app`. Not fully implemented as there's still hardcoded instances to be fixed.
- *REDIS_HOST*: takes a valid IP to a redis instance in the format `127.0.0.1`. Not fully implemented as there's still hardcoded instances to be fixed.
- *REDIS_PORT*: takes a valid port to the redis instance, default is `6379`. Not fully implemented as there's still hardcoded instances to be fixed.
- *NODE_ENV*: takes the environment type as either `development`  (or anything) or `production`.
- *SECRETSESSIONKEY*: secret key to set up sessions, only used for production
- *DISCORDCLIENTID*, *DISCORDCLIENTSECRET*: for the integration with Discord
- *GITHUBCLIENTID*, *GITHUBCLIENTSECRET*: for the integration with GitHub
- *PORT*: port to run stuff on (default 8080)
- *DOMAIN*: domain name to use for emails, meta tags, etc.
- *SITENAME*: site name to use for templates, emails, etc.
- *DEVTIMEDDELAY*: dunno, some dev stuff
- *DISCORDMODPING*: looks like a keyword to ping devs? Might be some other parameter such as channel for Discord integration
- *DISCORDREPORTURL*, *DISCORDBROADCASTURL*, *DISCORDCRASHURL*, *DISCORDMODLOGURL*, *DISCORDADMINPING*: stuff for Discord report & integration
- *MGKEY*: Mailgun API key
- *MGDOMAIN*: Mailgun domain
- *CHECKIPINTEL*: attempt to configure this ip checker business
- *BYPASSALLCHECKS*: mark all users as bypassing the various TOR, IPCounter, and other checks that block users from creating accounts

## Statistics

Production has a limited set of data on the /stats page, check network traffic for the XHR for that if interested. If you'd like to do more detailed data analysis, please contact the maintainer for a dump of the (anonymized) profile and replay data.

## License and Attribution

Secret Hitler is designed by Max Temkin (Cards Against Humanity, Humans vs. Zombies) Mike Boxleiter (Solipskier, TouchTone), Tommy Maranges (Philosophy Bro) and illustrated by Mackenzie Schubert (Letter Tycoon, Penny Press).

This game is licensed as per the [Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International](https://creativecommons.org/licenses/by-nc-sa/4.0/)
license.

## Alterations to the original game

Minor image alterations and editing (assets available upon request).

Veto power is slightly adjusted so that chancellors need to select a policy prior to saying yes or no to vetoing that policy.

Adapted the rules explanation to account for online vs physical play.

There is an option when players make a game to "rebalance" the 6, 7 and 9 player games - 6p starts with a fascist policy already enacted, 7p starts with one less fascist policy in the deck, 9p starts with two less facist policies in the deck. Players (and results from analyzing statistics) have noted that these game modes are not balanced well in the original ruleset.

There is a custom game mode where game creators can make games with different rulesets such as being able to pick policy powers, pick number of fascists (always less than liberals), number of policies, etc.
