-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Projects Table
create table public.projects (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  description text not null,
  tags text[] default '{}',
  image_url text,
  github_url text,
  demo_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Skills Table
create table public.skills (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  category text not null check (category in ('mobile', 'backend', 'devops', 'tools')),
  icon_name text,
  is_active boolean default true,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- RLS Policies
alter table public.projects enable row level security;
alter table public.skills enable row level security;

-- Public read access
create policy "Allow public read access on projects" on public.projects for select using (true);
create policy "Allow public read access on skills" on public.skills for select using (true);

-- Authenticated write access (Assume admins only)
create policy "Allow authenticated insert on projects" on public.projects for insert to authenticated with check (true);
create policy "Allow authenticated update on projects" on public.projects for update to authenticated using (true);
create policy "Allow authenticated delete on projects" on public.projects for delete to authenticated using (true);

create policy "Allow authenticated insert on skills" on public.skills for insert to authenticated with check (true);
create policy "Allow authenticated update on skills" on public.skills for update to authenticated using (true);
create policy "Allow authenticated delete on skills" on public.skills for delete to authenticated using (true);
