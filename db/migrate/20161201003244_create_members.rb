class CreateMembers < ActiveRecord::Migration
  def change
    create_view :members
  end
end
