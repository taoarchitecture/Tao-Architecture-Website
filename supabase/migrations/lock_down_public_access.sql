begin;

-- Remove direct public API access to application data.
revoke all on all tables in schema public from anon, authenticated;
revoke all on all sequences in schema public from anon, authenticated;
revoke all on all routines in schema public from anon, authenticated;

alter default privileges in schema public revoke all on tables from anon, authenticated;
alter default privileges in schema public revoke all on sequences from anon, authenticated;
alter default privileges in schema public revoke all on routines from anon, authenticated;

-- Enforce deny-by-default row access on every application table.
alter table public."User" enable row level security;
alter table public."User" force row level security;

alter table public."Application" enable row level security;
alter table public."Application" force row level security;

alter table public."Project" enable row level security;
alter table public."Project" force row level security;

alter table public."HomeConfig" enable row level security;
alter table public."HomeConfig" force row level security;

alter table public."TeamMember" enable row level security;
alter table public."TeamMember" force row level security;

alter table public."Publication" enable row level security;
alter table public."Publication" force row level security;

alter table public."Award" enable row level security;
alter table public."Award" force row level security;

alter table public."ContactSubmission" enable row level security;
alter table public."ContactSubmission" force row level security;

alter table public."Video" enable row level security;
alter table public."Video" force row level security;

alter table public."VideoTag" enable row level security;
alter table public."VideoTag" force row level security;

alter table public."VideoTagOnVideo" enable row level security;
alter table public."VideoTagOnVideo" force row level security;

alter table public."VideoCategory" enable row level security;
alter table public."VideoCategory" force row level security;

alter table public."VideoCategoryOnVideo" enable row level security;
alter table public."VideoCategoryOnVideo" force row level security;

alter table public."GlobalSettings" enable row level security;
alter table public."GlobalSettings" force row level security;

alter table public."PageContent" enable row level security;
alter table public."PageContent" force row level security;

alter table public."Service" enable row level security;
alter table public."Service" force row level security;

commit;
