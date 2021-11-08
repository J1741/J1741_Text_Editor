const butInstall = document.getElementById('buttonInstall');

// Logic for installing the PWA
// TODO: Add an event handler to the `beforeinstallprompt` event (** DONE **)
window.addEventListener('beforeinstallprompt', (event) => {

  // ** store the triggered events **
  window.deferredPrompt = event;

  // ** remove hidden class from button **
  butInstall.classList.toggle('hidden', false);

});

// TODO: Implement a click event handler on the `butInstall` element (** DONE **)
butInstall.addEventListener('click', async () => {

  const promptEvent = window.deferredPrompt;

  if (!promptEvent) {
    return;
  }

  // ** show prompt **
  promptEvent.prompt();
  
  // ** reset the deferred prompt variable, it can only be used once
  window.deferredPrompt = null;

  butInstall.classList.toggle('hidden', true);

});

// TODO: Add an handler for the `appinstalled` event (** DONE **)
window.addEventListener('appinstalled', (event) => {
  // ** clear prompt **
  window.deferredPrompt = null;
});