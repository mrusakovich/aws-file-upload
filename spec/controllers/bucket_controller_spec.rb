require 'rails_helper'

describe BucketController do
  describe 'POST upload' do
    before { allow_any_instance_of(UploadCommand).to receive(:execute) }
    
    context 'success' do
      subject { post :upload, params: { bucket: { file: ['file'] } } }
      it { is_expected.to redirect_to(uploads_path) }
    end

    context 'params missing' do
      subject { post :upload }
      it { expect { subject }.to raise_error(ActionController::ParameterMissing) }
    end
  end

  describe 'GET clear' do
    subject { get :clear }

    it { is_expected.to redirect_to(root_path) }
  end
end
