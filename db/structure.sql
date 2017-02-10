--
-- PostgreSQL database dump
--

-- Dumped from database version 9.6.1
-- Dumped by pg_dump version 9.6.1

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


--
-- Name: uuid-ossp; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA public;


--
-- Name: EXTENSION "uuid-ossp"; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON EXTENSION "uuid-ossp" IS 'generate universally unique identifiers (UUIDs)';


SET search_path = public, pg_catalog;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: app_settings; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE app_settings (
    id uuid DEFAULT uuid_generate_v4() NOT NULL,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL,
    enable_signin boolean DEFAULT true,
    enable_signup boolean DEFAULT true,
    enable_remote boolean DEFAULT false,
    enable_saml boolean DEFAULT false,
    auto_approve_services boolean DEFAULT false,
    project_budget_maximum integer DEFAULT 10000000,
    user_default_monthly_maximum integer DEFAULT 10000,
    mail_host text DEFAULT '127.0.0.1'::text,
    mail_port text DEFAULT '1025'::text,
    mail_username text DEFAULT ''::text,
    mail_password text DEFAULT ''::text,
    mail_authentication text DEFAULT 'plain'::text,
    mail_ssl_verify text DEFAULT 'none'::text,
    mail_sender text DEFAULT 'no-reply@my-pj-deployment.io'::text,
    system_notification_email text
);


--
-- Name: ar_internal_metadata; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE ar_internal_metadata (
    key character varying NOT NULL,
    value character varying,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL
);


--
-- Name: filters; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE filters (
    id uuid DEFAULT uuid_generate_v4() NOT NULL,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL,
    filterable_id uuid NOT NULL,
    filterable_type text NOT NULL,
    exclude boolean DEFAULT false NOT NULL,
    cached_tag_list text
);


--
-- Name: memberships; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE memberships (
    id uuid DEFAULT uuid_generate_v4() NOT NULL,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL,
    project_id uuid NOT NULL,
    user_id uuid NOT NULL,
    role integer DEFAULT 0 NOT NULL,
    locked boolean DEFAULT false NOT NULL
);


--
-- Name: projects; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE projects (
    id uuid DEFAULT uuid_generate_v4() NOT NULL,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL,
    deleted_at timestamp without time zone,
    name text NOT NULL,
    description text DEFAULT ''::text NOT NULL,
    budget numeric(12,2) DEFAULT 0.0 NOT NULL,
    spent numeric(14,4) DEFAULT 0.0 NOT NULL,
    monthly_spend numeric(12,2) DEFAULT 0.0 NOT NULL,
    product_policy json DEFAULT '{}'::json NOT NULL,
    last_hourly_compute_at timestamp without time zone NOT NULL,
    last_monthly_compute_at timestamp without time zone NOT NULL,
    tsv tsvector
);


--
-- Name: users; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE users (
    id uuid DEFAULT uuid_generate_v4() NOT NULL,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL,
    deleted_at timestamp without time zone,
    name text NOT NULL,
    email text NOT NULL,
    role integer DEFAULT 0 NOT NULL,
    password_digest text NOT NULL,
    state text,
    session_token text,
    reset_password_token text,
    reset_requested_at timestamp without time zone,
    last_login_at timestamp without time zone,
    last_client_info text,
    last_failed_login_at timestamp without time zone,
    last_failed_client_info text,
    disabled_at timestamp without time zone
);


--
-- Name: members; Type: VIEW; Schema: public; Owner: -
--

CREATE VIEW members AS
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
   FROM ((memberships
     JOIN users ON ((users.id = memberships.user_id)))
     JOIN projects ON ((projects.id = memberships.project_id)));


--
-- Name: product_categories; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE product_categories (
    id uuid DEFAULT uuid_generate_v4() NOT NULL,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL,
    name text NOT NULL,
    description text DEFAULT ''::text,
    cached_tag_list text DEFAULT ''::text
);


--
-- Name: product_types; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE product_types (
    id uuid DEFAULT uuid_generate_v4() NOT NULL,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL,
    type character varying NOT NULL,
    provider_type_id uuid NOT NULL,
    name text NOT NULL,
    description text,
    active boolean DEFAULT true NOT NULL
);


--
-- Name: products; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE products (
    id uuid DEFAULT uuid_generate_v4() NOT NULL,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL,
    deleted_at timestamp without time zone,
    type character varying,
    provider_id uuid NOT NULL,
    product_type_id uuid NOT NULL,
    name text NOT NULL,
    description text DEFAULT ''::text NOT NULL,
    properties json DEFAULT '[]'::json NOT NULL,
    settings json DEFAULT '{}'::json NOT NULL,
    active boolean DEFAULT true NOT NULL,
    setup_price numeric(10,4) DEFAULT 0.0 NOT NULL,
    hourly_price numeric(10,4) DEFAULT 0.0 NOT NULL,
    monthly_price numeric(10,4) DEFAULT 0.0 NOT NULL,
    cached_tag_list text DEFAULT ''::text,
    tsv tsvector
);


--
-- Name: project_questions; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE project_questions (
    id uuid DEFAULT uuid_generate_v4() NOT NULL,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL,
    label text NOT NULL,
    answers json DEFAULT '[]'::json NOT NULL,
    required boolean DEFAULT true NOT NULL
);


--
-- Name: project_requests; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE project_requests (
    id uuid DEFAULT uuid_generate_v4() NOT NULL,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL,
    user_id uuid NOT NULL,
    processor_id uuid,
    project_id uuid,
    status integer DEFAULT 0 NOT NULL,
    requested boolean DEFAULT false NOT NULL,
    name text NOT NULL,
    budget numeric(12,2) DEFAULT 0.0 NOT NULL,
    request_message text,
    processed_message text,
    requested_at timestamp without time zone,
    processed_at timestamp without time zone
);


--
-- Name: provider_types; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE provider_types (
    id uuid DEFAULT uuid_generate_v4() NOT NULL,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL,
    type character varying NOT NULL,
    name text NOT NULL,
    description text DEFAULT ''::text,
    active boolean DEFAULT true NOT NULL
);


--
-- Name: providers; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE providers (
    id uuid DEFAULT uuid_generate_v4() NOT NULL,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL,
    deleted_at timestamp without time zone,
    type character varying NOT NULL,
    provider_type_id uuid NOT NULL,
    name text NOT NULL,
    description text DEFAULT ''::text,
    credentials json DEFAULT '{}'::json NOT NULL,
    active boolean DEFAULT true NOT NULL,
    credentials_message text,
    status_message text,
    connected boolean DEFAULT true NOT NULL,
    cached_tag_list text DEFAULT ''::text,
    credentials_validated_at timestamp without time zone,
    last_connected_at timestamp without time zone,
    tsv tsvector
);


--
-- Name: schema_migrations; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE schema_migrations (
    version character varying NOT NULL
);


--
-- Name: service_requests; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE service_requests (
    id uuid DEFAULT uuid_generate_v4() NOT NULL,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL,
    deleted_at timestamp without time zone,
    type character varying,
    user_id uuid NOT NULL,
    processor_id uuid,
    product_id uuid NOT NULL,
    project_id uuid NOT NULL,
    service_order_id uuid,
    service_name text DEFAULT ''::text NOT NULL,
    state text,
    request_message text,
    processed_message text,
    settings json DEFAULT '{}'::json NOT NULL,
    setup_price numeric(10,4),
    hourly_price numeric(10,4),
    monthly_price numeric(10,4)
);


--
-- Name: services; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE services (
    id uuid DEFAULT uuid_generate_v4() NOT NULL,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL,
    type character varying,
    user_id uuid NOT NULL,
    provider_id uuid NOT NULL,
    product_id uuid NOT NULL,
    project_id uuid NOT NULL,
    service_request_id uuid NOT NULL,
    service_order_id uuid NOT NULL,
    name text NOT NULL,
    state text,
    monitor_frequency integer DEFAULT 0 NOT NULL,
    status_message text,
    billable boolean DEFAULT false NOT NULL,
    hourly_price numeric(10,4),
    monthly_price numeric(10,4),
    settings json DEFAULT '{}'::json NOT NULL,
    details json DEFAULT '{}'::json NOT NULL,
    actions text,
    last_changed_at timestamp without time zone,
    last_checked_at timestamp without time zone
);


--
-- Name: service_details; Type: VIEW; Schema: public; Owner: -
--

CREATE VIEW service_details AS
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
    ((services.hourly_price * (730)::numeric) + services.monthly_price) AS monthly_cost,
    providers.connected AS provider_connected,
    services.last_changed_at,
    services.last_checked_at,
    services.created_at,
    services.updated_at
   FROM (((((services
     JOIN service_requests ON ((services.service_request_id = service_requests.id)))
     JOIN products ON ((service_requests.product_id = products.id)))
     JOIN projects ON ((service_requests.project_id = projects.id)))
     JOIN product_types ON ((products.product_type_id = product_types.id)))
     JOIN providers ON ((products.provider_id = providers.id)));


--
-- Name: service_orders; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE service_orders (
    id uuid DEFAULT uuid_generate_v4() NOT NULL,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL,
    user_id uuid NOT NULL,
    status integer DEFAULT 0 NOT NULL,
    ordered_count integer DEFAULT 0 NOT NULL,
    approved_count integer DEFAULT 0 NOT NULL,
    denied_count integer DEFAULT 0 NOT NULL,
    setup_total numeric(10,4) DEFAULT 0.0 NOT NULL,
    monthly_total numeric(10,4) DEFAULT 0.0 NOT NULL,
    ordered_at timestamp without time zone,
    completed_at timestamp without time zone
);


--
-- Name: taggings; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE taggings (
    id integer NOT NULL,
    tag_id integer,
    taggable_type character varying,
    taggable_id uuid,
    tagger_type character varying,
    tagger_id uuid,
    context character varying(128),
    created_at timestamp without time zone
);


--
-- Name: taggings_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE taggings_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: taggings_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE taggings_id_seq OWNED BY taggings.id;


--
-- Name: tags; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE tags (
    id integer NOT NULL,
    name character varying,
    taggings_count integer DEFAULT 0
);


--
-- Name: tags_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE tags_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: tags_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE tags_id_seq OWNED BY tags.id;


--
-- Name: taggings id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY taggings ALTER COLUMN id SET DEFAULT nextval('taggings_id_seq'::regclass);


--
-- Name: tags id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY tags ALTER COLUMN id SET DEFAULT nextval('tags_id_seq'::regclass);


--
-- Name: app_settings app_settings_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY app_settings
    ADD CONSTRAINT app_settings_pkey PRIMARY KEY (id);


--
-- Name: ar_internal_metadata ar_internal_metadata_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY ar_internal_metadata
    ADD CONSTRAINT ar_internal_metadata_pkey PRIMARY KEY (key);


--
-- Name: filters filters_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY filters
    ADD CONSTRAINT filters_pkey PRIMARY KEY (id);


--
-- Name: memberships memberships_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY memberships
    ADD CONSTRAINT memberships_pkey PRIMARY KEY (id);


--
-- Name: product_categories product_categories_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY product_categories
    ADD CONSTRAINT product_categories_pkey PRIMARY KEY (id);


--
-- Name: product_types product_types_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY product_types
    ADD CONSTRAINT product_types_pkey PRIMARY KEY (id);


--
-- Name: products products_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY products
    ADD CONSTRAINT products_pkey PRIMARY KEY (id);


--
-- Name: project_questions project_questions_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY project_questions
    ADD CONSTRAINT project_questions_pkey PRIMARY KEY (id);


--
-- Name: project_requests project_requests_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY project_requests
    ADD CONSTRAINT project_requests_pkey PRIMARY KEY (id);


--
-- Name: projects projects_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY projects
    ADD CONSTRAINT projects_pkey PRIMARY KEY (id);


--
-- Name: provider_types provider_types_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY provider_types
    ADD CONSTRAINT provider_types_pkey PRIMARY KEY (id);


--
-- Name: providers providers_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY providers
    ADD CONSTRAINT providers_pkey PRIMARY KEY (id);


--
-- Name: schema_migrations schema_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY schema_migrations
    ADD CONSTRAINT schema_migrations_pkey PRIMARY KEY (version);


--
-- Name: service_orders service_orders_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY service_orders
    ADD CONSTRAINT service_orders_pkey PRIMARY KEY (id);


--
-- Name: service_requests service_requests_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY service_requests
    ADD CONSTRAINT service_requests_pkey PRIMARY KEY (id);


--
-- Name: services services_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY services
    ADD CONSTRAINT services_pkey PRIMARY KEY (id);


--
-- Name: taggings taggings_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY taggings
    ADD CONSTRAINT taggings_pkey PRIMARY KEY (id);


--
-- Name: tags tags_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY tags
    ADD CONSTRAINT tags_pkey PRIMARY KEY (id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: index_app_settings_on_created_at; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_app_settings_on_created_at ON app_settings USING btree (created_at);


--
-- Name: index_filters_on_cached_tag_list_array; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_filters_on_cached_tag_list_array ON filters USING gin (string_to_array(cached_tag_list, ', '::text));


--
-- Name: index_filters_on_filterable_type_and_filterable_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_filters_on_filterable_type_and_filterable_id ON filters USING btree (filterable_type, filterable_id);


--
-- Name: index_memberships_on_project_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_memberships_on_project_id ON memberships USING btree (project_id);


--
-- Name: index_memberships_on_project_id_and_user_id; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX index_memberships_on_project_id_and_user_id ON memberships USING btree (project_id, user_id);


--
-- Name: index_memberships_on_user_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_memberships_on_user_id ON memberships USING btree (user_id);


--
-- Name: index_product_types_on_provider_type_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_product_types_on_provider_type_id ON product_types USING btree (provider_type_id);


--
-- Name: index_product_types_on_type; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_product_types_on_type ON product_types USING btree (type);


--
-- Name: index_products_on_deleted_at; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_products_on_deleted_at ON products USING btree (deleted_at);


--
-- Name: index_products_on_product_type_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_products_on_product_type_id ON products USING btree (product_type_id);


--
-- Name: index_products_on_provider_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_products_on_provider_id ON products USING btree (provider_id);


--
-- Name: index_products_on_tsv; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_products_on_tsv ON products USING gin (tsv);


--
-- Name: index_products_on_type; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_products_on_type ON products USING btree (type);


--
-- Name: index_project_requests_on_processor_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_project_requests_on_processor_id ON project_requests USING btree (processor_id);


--
-- Name: index_project_requests_on_project_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_project_requests_on_project_id ON project_requests USING btree (project_id);


--
-- Name: index_project_requests_on_user_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_project_requests_on_user_id ON project_requests USING btree (user_id);


--
-- Name: index_projects_on_deleted_at; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_projects_on_deleted_at ON projects USING btree (deleted_at);


--
-- Name: index_projects_on_last_hourly_compute_at; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_projects_on_last_hourly_compute_at ON projects USING btree (last_hourly_compute_at);


--
-- Name: index_projects_on_last_monthly_compute_at; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_projects_on_last_monthly_compute_at ON projects USING btree (last_monthly_compute_at);


--
-- Name: index_projects_on_tsv; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_projects_on_tsv ON projects USING gin (tsv);


--
-- Name: index_provider_types_on_type; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_provider_types_on_type ON provider_types USING btree (type);


--
-- Name: index_providers_on_deleted_at; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_providers_on_deleted_at ON providers USING btree (deleted_at);


--
-- Name: index_providers_on_provider_type_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_providers_on_provider_type_id ON providers USING btree (provider_type_id);


--
-- Name: index_providers_on_tsv; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_providers_on_tsv ON providers USING gin (tsv);


--
-- Name: index_providers_on_type; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_providers_on_type ON providers USING btree (type);


--
-- Name: index_service_orders_on_status; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_service_orders_on_status ON service_orders USING btree (status);


--
-- Name: index_service_orders_on_user_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_service_orders_on_user_id ON service_orders USING btree (user_id);


--
-- Name: index_service_requests_on_deleted_at; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_service_requests_on_deleted_at ON service_requests USING btree (deleted_at);


--
-- Name: index_service_requests_on_processor_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_service_requests_on_processor_id ON service_requests USING btree (processor_id);


--
-- Name: index_service_requests_on_product_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_service_requests_on_product_id ON service_requests USING btree (product_id);


--
-- Name: index_service_requests_on_project_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_service_requests_on_project_id ON service_requests USING btree (project_id);


--
-- Name: index_service_requests_on_service_order_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_service_requests_on_service_order_id ON service_requests USING btree (service_order_id);


--
-- Name: index_service_requests_on_type; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_service_requests_on_type ON service_requests USING btree (type);


--
-- Name: index_service_requests_on_user_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_service_requests_on_user_id ON service_requests USING btree (user_id);


--
-- Name: index_services_on_billable; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_services_on_billable ON services USING btree (billable);


--
-- Name: index_services_on_last_checked_at; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_services_on_last_checked_at ON services USING btree (last_checked_at);


--
-- Name: index_services_on_monitor_frequency; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_services_on_monitor_frequency ON services USING btree (monitor_frequency);


--
-- Name: index_services_on_product_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_services_on_product_id ON services USING btree (product_id);


--
-- Name: index_services_on_project_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_services_on_project_id ON services USING btree (project_id);


--
-- Name: index_services_on_provider_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_services_on_provider_id ON services USING btree (provider_id);


--
-- Name: index_services_on_service_order_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_services_on_service_order_id ON services USING btree (service_order_id);


--
-- Name: index_services_on_service_request_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_services_on_service_request_id ON services USING btree (service_request_id);


--
-- Name: index_services_on_state; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_services_on_state ON services USING btree (state);


--
-- Name: index_services_on_type; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_services_on_type ON services USING btree (type);


--
-- Name: index_services_on_user_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_services_on_user_id ON services USING btree (user_id);


--
-- Name: index_taggings_on_context; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_taggings_on_context ON taggings USING btree (context);


--
-- Name: index_taggings_on_tag_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_taggings_on_tag_id ON taggings USING btree (tag_id);


--
-- Name: index_taggings_on_taggable_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_taggings_on_taggable_id ON taggings USING btree (taggable_id);


--
-- Name: index_taggings_on_taggable_id_and_taggable_type_and_context; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_taggings_on_taggable_id_and_taggable_type_and_context ON taggings USING btree (taggable_id, taggable_type, context);


--
-- Name: index_taggings_on_taggable_type; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_taggings_on_taggable_type ON taggings USING btree (taggable_type);


--
-- Name: index_taggings_on_tagger_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_taggings_on_tagger_id ON taggings USING btree (tagger_id);


--
-- Name: index_taggings_on_tagger_id_and_tagger_type; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_taggings_on_tagger_id_and_tagger_type ON taggings USING btree (tagger_id, tagger_type);


--
-- Name: index_tags_on_name; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX index_tags_on_name ON tags USING btree (name);


--
-- Name: index_users_on_lower_email; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX index_users_on_lower_email ON users USING btree (lower(email));


--
-- Name: index_users_on_session_token; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_users_on_session_token ON users USING btree (session_token);


--
-- Name: index_users_on_state; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_users_on_state ON users USING btree (state);


--
-- Name: taggings_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX taggings_idx ON taggings USING btree (tag_id, taggable_id, taggable_type, context, tagger_id, tagger_type);


--
-- Name: taggings_idy; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX taggings_idy ON taggings USING btree (taggable_id, taggable_type, tagger_id, context);


--
-- Name: products products_fulltext; Type: TRIGGER; Schema: public; Owner: -
--

CREATE TRIGGER products_fulltext BEFORE INSERT OR UPDATE ON products FOR EACH ROW EXECUTE PROCEDURE tsvector_update_trigger('tsv', 'pg_catalog.english', 'name', 'description', 'cached_tag_list');


--
-- Name: projects projects_fulltext; Type: TRIGGER; Schema: public; Owner: -
--

CREATE TRIGGER projects_fulltext BEFORE INSERT OR UPDATE ON projects FOR EACH ROW EXECUTE PROCEDURE tsvector_update_trigger('tsv', 'pg_catalog.english', 'name', 'description');


--
-- Name: providers providers_fulltext; Type: TRIGGER; Schema: public; Owner: -
--

CREATE TRIGGER providers_fulltext BEFORE INSERT OR UPDATE ON providers FOR EACH ROW EXECUTE PROCEDURE tsvector_update_trigger('tsv', 'pg_catalog.english', 'name', 'description', 'cached_tag_list');


--
-- PostgreSQL database dump complete
--

SET search_path TO "$user", public;

INSERT INTO schema_migrations (version) VALUES
('20160917060944'),
('20160917061620'),
('20160917061714'),
('20161007190321'),
('20161007190946'),
('20161007192544'),
('20161007192554'),
('20161007192558'),
('20161007195537'),
('20161007195538'),
('20161007195539'),
('20161007195540'),
('20161007195541'),
('20161007195542'),
('20161028181904'),
('20161103143050'),
('20161107153027'),
('20161116192522'),
('20161116194716'),
('20161117060010'),
('20161201003244'),
('20161201171144'),
('20161202180326'),
('20161205224323');


