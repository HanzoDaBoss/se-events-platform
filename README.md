# WentEvent

## An events platform to discover, join, and organise your favourite events effortlessly.

Link to the live site: [WentEvent](https://wentevent.netlify.app)

The WentEvent site functions as an events platform. It allows community members to view, sign up for, and add events to their own Google calendars. Furthermore, staff members have additional functionality to create and manage events.

## Test Accounts

Note: New accounts can be registered but will only have user privileges and not staff access.

Users:

```
Username: test-user@wentevent.com
Password: password123
```

Staff:

```
Username: test-staff@wentevent.com
Password: password123
```

## Clone

```zsh
git clone https://github.com/HanzoDaBoss/se-events-platform.git
```

## Install Dependencies

```zsh
npm install
```

## Setup Databases

To run this project locally with your own database you will need to setup, configure and deploy your own back-end server. You will also need to create a Supabase project and acquire your API keys.

The following files are required in the `back-end` directory:

`.env.production`:

```zsh
DATABASE_URL=*insert_your_database_url_here*
```

`.env.supabase`:

```zsh
SUPABASE_URL='insert_your_supabase_url_here'
SERVICE_ROLE_KEY='insert_your_service_role_here'
ANON_KEY='insert_your_anon_key_here'
```

You can then seed the database using:

```zsh
npm run seed-prod
```

### Setup Environment Variables

create an _.env.development_ file in the root of the front-end folder:

```zsh
touch .env.development
```

Create the following variables and set the values from your deployed back-end server and supabase project:

```zsh
VITE_API_URL='insert_your_backend_api_url_here'
VITE_SUPABASE_URL='insert_your_supabase_url_here'
VITE_SUPABASE_ANON_KEY='insert_your_supabase_anon_key_here'
```

## Run App

Run this script to run the app locally

```zsh
npm run dev
```

## Minimum Version Requirements

Node.js: `v21.5.0`

React: `v18.3.1`
