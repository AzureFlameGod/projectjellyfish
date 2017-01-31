require 'rufus-scheduler'

scheduler = Rufus::Scheduler.singleton

# Limit scheduler to web processes only
if File.split($0).last == 'puma'
  # Provider connection checks
  #
  scheduler.every '10m', overlap: false do
    Provider.where(connected: true).pluck(:id).each do |provider_id|
      Provider::CheckCredentialsJob.perform_later provider_id
    end
  end

  # Monitor services
  #
  # 1. Find only services with connected providers
  # 2. That want to be monitored
  # 3. Have not been checked since `monitor_frequency` seconds ago
  # 4. And we've finished checking the service
  scheduler.every '10s', overlap: false do
    Service
      .select(:id, :updated_at)
      .joins(:provider)
      .merge(Provider.where(connected: true))
      .where('monitor_frequency != 0')
      .where("last_checked_at <= current_timestamp - monitor_frequency * INTERVAL '1 seconds' AND last_checked_at >= services.updated_at")
      .pluck(:id, :updated_at)
      .each do |service_id, updated_at|
      Service::State::CheckJob.perform_later service_id, updated_at.to_s
    end
  end
end
