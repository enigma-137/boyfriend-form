# Greeting Project

## Installation

Clone the repository:
```bash
git clone <repository-url>
cd greeting
```

## Setup

1. Install dependencies:
```bash
npm install
```

2. Configure Supabase environment variables:
    - Copy `.env.example` to `.env.local`
    - Add your Supabase credentials:
```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_anon_key
```

3. Run Supabase SQL migrations:
```bash
supabase db push
```

## Running the Project

Start the development server:
```bash
npm run dev
```
