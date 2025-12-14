CREATE TABLE applications (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  age TEXT NOT NULL,
  country TEXT NOT NULL,
  state TEXT NOT NULL,
  height TEXT NOT NULL,
  education TEXT NOT NULL,
  occupation TEXT NOT NULL,
  grammar_test TEXT NOT NULL,
  can_cook TEXT NOT NULL,
  anatomy_knowledge TEXT NOT NULL,
  reliability TEXT NOT NULL,
  football_team TEXT NOT NULL,
  additional_info TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
