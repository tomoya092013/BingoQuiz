class CreateEnquetes < ActiveRecord::Migration[7.0]
  def change
    create_table :enquetes, id: false do |t|
      t.integer :guest_id,primary_key: true
      t.integer :enquete_1
      t.integer :enquete_2
      t.integer :enquete_3
      t.integer :enquete_4
      t.integer :enquete_5

      t.timestamps
    end
  end
end
