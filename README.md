# Prospect Generator

A powerful sales outreach platform that helps you create personalized content for different channels based on your company profile and prospect information.

https://github.com/user-attachments/assets/bc872c6f-a031-4821-9cfb-1333a183e32d

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Technical Architecture](#technical-architecture)
- [Setup Instructions](#setup-instructions)
- [Usage Guide](#usage-guide)
- [Technologies Used](#technologies-used)

## Overview

Prospect Generator is a sales outreach platform designed to streamline the process of creating personalized content for different communication channels. By leveraging AI, it generates tailored messages for email, LinkedIn, Twitter, and direct messages based on your company profile and prospect information.

The platform helps sales professionals save time while maintaining a personalized approach to outreach, increasing engagement rates and conversion opportunities.

## Features

### Company Profile Management

- Store and manage your company information
- Define your value proposition and industry focus
- Customize your company description for use in outreach content

### Prospect Database

- Maintain a database of target companies and contacts
- Store detailed information about each prospect
- Search and filter prospects based on various criteria

### Content Generation

- Generate personalized outreach content for multiple platforms:
  - Email
  - LinkedIn
  - Twitter
  - Direct messages
- Customize tone of voice for each platform
- Add specific context to make outreach more relevant
- Copy or download generated content

### Settings & Customization

- Set different tones of voice for each platform
- Professional, conversational, friendly, or formal options
- Save and reuse successful outreach templates

## Technical Architecture

The application is built using Next.js with the App Router architecture, providing a modern, responsive, and performant user experience.

### Key Components

- **Layout**: Includes the sidebar navigation and main content area
- **Pages**: Separate pages for dashboard, generations, database, and settings
- **Components**: Reusable UI components using shadcn/ui
- **Server Actions**: Handles AI content generation and database operations
- **Database**: Supabase PostgreSQL database with RLS policies

### Authentication

Authentication is handled by Clerk, providing secure user management and session handling. The application uses Clerk's user IDs to associate data with specific users in the database.



### 2. `prospects`

Stores information about target companies and contacts.

```sql
CREATE TABLE prospects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    clerk_user_id VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    industry VARCHAR(100),
    size VARCHAR(50),
    website VARCHAR(255),
    contact_person VARCHAR(100),
    contact_title VARCHAR(100),
    contact_email VARCHAR(255),
    contact_phone VARCHAR(50),
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);
```

### 3. `generations`

Stores generated outreach content for different platforms.

```sql
CREATE TABLE generations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    clerk_user_id VARCHAR(255) NOT NULL,
    prospect_id UUID REFERENCES prospects(id) ON DELETE CASCADE,
    email_content TEXT,
    linkedin_content TEXT,
    twitter_content TEXT,
    message_content TEXT,
    additional_context TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);
```

## Setup Instructions

### Prerequisites

- Node.js 18.x or higher
- Supabase account
- Clerk account
- OpenAI API key


### Environment Variables

Create a `.env.local` file with the following variables:

```plaintext
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...

# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJh...

# OpenAI
OPENAI_API_KEY=sk-...
```

### Installation

1. Clone the repository:

```shellscript
git clone https://github.com/yourusername/prospect-generator.git
cd prospect-generator
```


2. Install dependencies:

```shellscript
npm install
```


3. Set up the database:

1. Run the SQL scripts provided in the `database` folder in your Supabase SQL Editor
2. The scripts will create the necessary tables, functions, and policies



4. Run the development server:

```shellscript
npm run dev
```


5. Open [http://localhost:3000](http://localhost:3000) in your browser


## Usage Guide

### Setting Up Your Company Profile

1. Navigate to Settings > General
2. Fill in your company information:

1. Company name
2. Industry
3. Size
4. Description
5. Value proposition
6. Website



3. Set your preferred tone of voice for each platform
4. Click "Save Settings"


### Adding Prospects

1. Navigate to Database
2. Click "Add Prospect"
3. Fill in the prospect information:

1. Company name
2. Industry
3. Size
4. Website
5. Contact person
6. Job title
7. Contact information
8. Notes



4. Click "Save Prospect"

## Technologies Used

- **Frontend**:

- Next.js 14 (App Router)
- React 18
- Tailwind CSS
- shadcn/ui components
- Lucide React icons



- **Backend**:

- Next.js Server Actions
- AI SDK
- Zod for validation



- **Database**:

- Supabase (PostgreSQL)
- Row Level Security (RLS)



- **Authentication**:

- Clerk



- **AI**:

- OpenAI GPT-4o
- AI SDK for structured output



- **Deployment**:

- Vercel





## License

MIT
