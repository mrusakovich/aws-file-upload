class CreateUploads < ActiveRecord::Migration[6.1]
  def change
    create_table :uploads do |t|
      t.string :path
      t.string :name
      t.string :url
      t.string :message
    end
  end
end
