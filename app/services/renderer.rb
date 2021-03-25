class Renderer
  def render(upload)
    UploadsController.render('_upload', locals: { upload: upload }, layout: false)
  end
end
