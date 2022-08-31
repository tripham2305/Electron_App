document.getElementById('openButton').addEventListener('click', () => {
    ipcRenderer.send('openFile', {})
  