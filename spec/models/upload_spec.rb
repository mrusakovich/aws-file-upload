require 'rails_helper'

describe Upload do
  describe 'attributes' do
    subject { described_class.new }

    it { is_expected.to respond_to(:url) }
    it { is_expected.to respond_to(:name) }
    it { is_expected.to respond_to(:error) }
  end
end
