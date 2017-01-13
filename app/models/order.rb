class Order < ApplicationRecord
  belongs_to :user
  def self.open?(id)
    return !find_by(id: id, status: 'open').nil?
  end
end
