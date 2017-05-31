SELECT services.id AS service_id,
  products.provider_id,
  products.id AS product_id,
  services.project_id,
  service_requests.id AS service_request_id,
  service_requests.service_order_id,
  service_requests.user_id AS requester_id,
  products.type AS product_type,
  products.name AS product_name,
  product_types.name AS product_type_name,
  providers.type AS provider_type,
  providers.name AS provider_name,
  projects.name AS project_name,
  services.type AS service_type,
  services.name AS service_name,
  services.state,
  services.status_message,
  services.settings,
  services.details,
  services.actions,
  products.cached_tag_list AS tag_list,
  services.billable,
  products.setup_price,
  services.hourly_price,
  services.monthly_price,
  services.hourly_price * 730 + services.monthly_price AS monthly_cost,
  providers.connected AS provider_connected,
  services.last_changed_at,
  services.last_checked_at,
  services.created_at,
  services.updated_at
FROM services
  INNER JOIN service_requests
    ON (services.service_request_id = service_requests.id)
  INNER JOIN products
    ON (service_requests.product_id = products.id)
  INNER JOIN projects
    ON (service_requests.project_id = projects.id)
  INNER JOIN product_types
    ON (products.product_type_id = product_types.id)
  INNER JOIN providers
    ON (products.provider_id = providers.id)
