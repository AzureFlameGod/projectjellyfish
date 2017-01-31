SELECT memberships.id AS membership_id,
  memberships.project_id,
  memberships.user_id,
  projects.name AS project_name,
  users.name AS user_name,
  users.email,
  memberships.role,
  memberships.locked,
  memberships.created_at,
  memberships.updated_at
FROM memberships
  INNER JOIN users
    ON (users.id = memberships.user_id)
  INNER JOIN projects
    ON (projects.id = memberships.project_id)
