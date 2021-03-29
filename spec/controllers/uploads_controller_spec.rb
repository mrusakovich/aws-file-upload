require 'rails_helper'

describe UploadsController do
  describe 'GET index' do
    subject { get :index }
    it { is_expected.to render_template(:index) }
  end
end
