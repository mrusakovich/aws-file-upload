require 'rails_helper'

describe UploadCommand do
  let(:bucket) { double(:bucket, files: [read]) }
  let(:read) { double(:read, read: 'read', original_filename: 'name') }
  let(:write) { double(:write, path: 'path') }
  let(:command) { described_class.new(bucket) }

  before do
    allow(write).to receive(:write)
    allow(File).to receive(:open) do |&block|
      block.call(write)
    end
  end

  describe '#execute' do
    after { command.execute }

    it 'writes to file' do
      expect(write).to receive(:write).with(read.read)
    end

    it 'performs a job' do
      expect(UploadJob).to receive(:perform_later).with(write.path)
    end
  end
end
