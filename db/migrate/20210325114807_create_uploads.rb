class CreateUploads < ActiveRecord::Migration[6.1]
  def change
    create_table :uploads, id: false do |t|
      t.string :name
      t.string :url
      t.string :error
    end
  end
end
