
-- Function to check if the current user is an admin
create or replace function is_admin()
returns boolean
language plpgsql security definer as $$
begin
  return exists (
    select 1
    from public.user_roles
    where user_id = auth.uid()
    and role = 'admin'
  );
end;
$$;
