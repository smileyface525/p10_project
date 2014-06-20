class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.string :username
      t.string :email
      t.string :address
      t.string :password_hash
      t.string :lat
      t.string :long
      t.timestamps
    end
  end
end
