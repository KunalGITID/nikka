create table if not exists public.course_progress (
  user_id uuid not null references auth.users(id) on delete cascade,
  course_id text not null,
  completed_at timestamptz not null default now(),
  primary key (user_id, course_id)
);

alter table public.course_progress enable row level security;

create policy "Users can read their own progress"
on public.course_progress
for select
to authenticated
using (auth.uid() = user_id);

create policy "Users can insert their own progress"
on public.course_progress
for insert
to authenticated
with check (auth.uid() = user_id);

create policy "Users can update their own progress"
on public.course_progress
for update
to authenticated
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

create policy "Users can delete their own progress"
on public.course_progress
for delete
to authenticated
using (auth.uid() = user_id);
