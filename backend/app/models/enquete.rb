class Enquete < ApplicationRecord
  validates :guest_id, presence: true, uniqueness: true
end
