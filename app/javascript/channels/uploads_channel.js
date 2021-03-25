import consumer from "./consumer"

consumer.subscriptions.create("UploadsChannel", {
  received(payload) {
    const { key, template } = payload;
    const row = document.querySelector(`[data-name='${key}']`);
    const wrapper = document.getElementById('uploads');

    if (!wrapper || row) return;
    wrapper.innerHTML = `${wrapper.innerHTML}${template}`
  }
});
