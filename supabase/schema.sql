create extension if not exists "uuid-ossp";
create extension if not exists "pgcrypto";
drop table if exists health_check;
create table health_check ( now timestamptz default now() );
drop table if exists emergency_reports cascade;
create table emergency_reports (
  id uuid primary key default uuid_generate_v4(),
  app_id text not null,
  type text not null,
  description text not null,
  location_text text,
  lat double precision,
  lng double precision,
  phone text,
  source text not null default 'pwa',
  status text not null default 'new',
  created_at timestamptz not null default now()
);
drop table if exists audit_log cascade;
create table audit_log (
  id uuid primary key default uuid_generate_v4(),
  actor text not null default 'system',
  action text not null,
  entity text not null,
  entity_id uuid,
  meta jsonb,
  created_at timestamptz not null default now()
);
alter table emergency_reports enable row level security;
alter table audit_log enable row level security;
drop policy if exists "deny all" on emergency_reports;
create policy "deny all" on emergency_reports for all using (false);
drop policy if exists "deny all audit" on audit_log;
create policy "deny all audit" on audit_log for all using (false);
drop view if exists v_emergency_counts;
create view v_emergency_counts as
select type, count(*) as total, min(created_at) as first, max(created_at) as last
from emergency_reports group by type;
create or replace function trg_audit_report() returns trigger as $$
begin
  insert into audit_log(actor, action, entity, entity_id, meta)
  values ('server', 'create', 'emergency_reports', NEW.id, json_build_object('app_id', NEW.app_id, 'source', NEW.source));
  return NEW;
end;
$$ language plpgsql;
drop trigger if exists t_audit_report on emergency_reports;
create trigger t_audit_report after insert on emergency_reports
for each row execute procedure trg_audit_report();
