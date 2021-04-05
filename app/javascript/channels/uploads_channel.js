import consumer from "./consumer"

consumer.subscriptions.create("UploadsChannel", {
  received(payload) {
    const { key, template } = payload;
    const row = document.querySelector(`[data-name='${key}']`);
    const wrapper = document.getElementById('uploads');
    const nodeTemplate = document.createElement('template');
    nodeTemplate.innerHTML = template;
    const replacableNode = nodeTemplate.content.firstChild;

    if (!wrapper) return;

    if (row) {
      row.replaceWith(replacableNode);
    } else {
      wrapper.appendChild(replacableNode);
    }
  }
});
