class Upload < ApplicationRecord
  state_machine initial: :pending do
    event :process do
      transition [:pending, :uploaded, :errored] => :processing
    end

    event :success do
      transition processing: :uploaded
    end

    event :error do
      transition all => :errored
    end
  end
end
