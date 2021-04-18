class ChangeUpload < ActiveRecord::Migration[6.1]
  def change
    remove_column :uploads, :path
    add_column :uploads, :state, :string
  end
end
