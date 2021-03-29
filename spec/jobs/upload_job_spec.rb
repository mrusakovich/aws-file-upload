require 'rails_helper'

describe UploadJob do
  before { allow(ActionCable.server).to receive(:broadcast) }

  describe '#perform_later' do
    it 'enqueue job' do
      expect {
        UploadJob.perform_later('file_path')
      }.to have_enqueued_job
    end


    context 'execution' do
      before { ActiveJob::Base.queue_adapter.perform_enqueued_jobs = true }
      before { allow_any_instance_of(ProcessCommand).to receive(:execute) }

      it 'performs job' do
        UploadJob.perform_later('file_path')
        expect(UploadJob).to have_been_performed
      end

      it 'invokes command' do
        expect_any_instance_of(ProcessCommand).to receive(:execute)
        UploadJob.perform_later('file_path')
      end
    end
  end
end
