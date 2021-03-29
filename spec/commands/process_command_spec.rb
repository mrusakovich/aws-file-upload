require 'rails_helper'

describe ProcessCommand do
  let(:broadcaster) { double(:broadcaster) }
  let(:renderer) { double(:renderer) }
  let(:payload) { OpenStruct.new(file_name: '', file_path: '', bucket_name: '', region: '') }
  let(:command) { described_class.new(payload, broadcaster, renderer) }
  let(:aws_client) { double(:client, put_object: nil) }
  let(:file) { double(:file) }

  before do
    allow(Aws::S3::Client).to receive(:new).and_return(aws_client)
    allow(File).to receive(:new).and_return(file)
    allow(File).to receive(:exists?).and_return(true)
    allow(file).to receive(:read).and_return('')
    allow(broadcaster).to receive(:broadcast)
    allow(renderer).to receive(:render)
  end

  describe '#execute' do
    after { command.execute }

    it 'saves upload' do
      expect_any_instance_of(Upload).to receive(:save!)
    end

    it 'unlinks file' do
      expect(File).to receive(:unlink)
    end

    it 'sets url' do
      expect_any_instance_of(Upload).to receive(:url=)
    end

    it 'sets error' do
      allow(File).to receive(:exists?).and_return(false)
      expect_any_instance_of(Upload).to receive(:error=)
    end
  end
end
