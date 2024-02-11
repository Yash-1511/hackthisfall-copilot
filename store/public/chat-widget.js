(function () {
    const styleTag = `
          <style>
              #chat-widget {
                  position: fixed;
                  bottom: 20px;
                  right: 20px;
                  display: grid;
                  z-index: 999999999 !important;
              }
              #chat-messages {
                  height: auto;
                  padding: 10px;
                  overflow-y: auto;
              }
              #btn-trigger-chat {
                  box-sizing: border-box;
                  margin-left: auto;
                  margin-top: auto;
                  display: inline-flex;
                  height: 3rem;
                  width: 3rem;
                  align-items: center;
                  justify-content: center;
                  border-radius: 9999px;
                  color: white;
                  cursor: pointer;
                  
                  border-style: none;
              }
              .h-7 {
                  height: 1.75rem;
              }
              .w-7 {
                  width: 1.75rem;
              }
              .rounded-lg {
                  border-radius: 0.5rem;
              }
              .shadow-xl {
                  --tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0
                  --tw-ring-shadow: 0 0 #0000;
                  --tw-shadow-colored: 0 0 #0000;
                  --tw-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1),
                      0 8px 10px -6px rgb(0 0 0 / 0.1);
                  --tw-shadow-colored: 0 20px 25px -5px var(--tw-shadow-color),
                      0 8px 10px -6px var(--tw-shadow-color);
                  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000),
                      var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
              }
              .ring-1 {
                  --tw-ring-color: rgb(17 24 39 / 0.05);
                  --tw-ring-shadow: 0 0 #0000;
                  --tw-ring-offset-color: #fff;
                  --tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0
                      var(--tw-ring-offset-width) var(--tw-ring-offset-color);
                  --tw-ring-shadow: var(--tw-ring-inset) 0 0 0
                      calc(1px + var(--tw-ring-offset-width)) var(--tw-ring-color);
                  box-shadow: var(--tw-ring-offset-shadow), var(--tw-ring-shadow),
                      var(--tw-shadow, 0 0 #0000);
              }
          </style>
      `;
  
    const components = {
      icon_close: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-7 h-7"><line x1="18" x2="6" y1="6" y2="18"></line><line x1="6" x2="18" y1="6" y2="18"></line></svg>`,
      icon_message: `<svg width="45" height="45" viewBox="0 0 31 30" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0.30957 15C0.30957 23.2722 7.0374 30 15.3096 30C23.5817 30 30.3096 23.2722 30.3096 15C30.3019 6.72783 23.5741 0 15.3096 0C7.0374 0 0.30957 6.72783 0.30957 15Z" fill="url(#paint0_radial_160_60080)"></path><path d="M13.6455 21.057C13.5983 21.057 13.551 21.057 13.5041 21.057C13.3933 21.0302 13.3542 20.9442 13.3261 20.8457C13.1889 20.3651 13.0727 19.877 12.9077 19.4059C12.4838 18.1958 11.6402 17.4199 10.4123 17.0635C10.0089 16.9463 9.6041 16.8339 9.2 16.7188C9.10624 16.6919 9.02452 16.6494 9 16.5427C9 16.4953 9 16.448 9 16.4004C9.02679 16.2892 9.1126 16.2503 9.2109 16.2223C9.66562 16.093 10.1253 15.9783 10.5732 15.8288C11.8221 15.4117 12.623 14.5571 12.9864 13.2898C13.1004 12.8925 13.2128 12.4945 13.3267 12.0972C13.3651 11.9637 13.4546 11.8902 13.5751 11.8904C13.6957 11.8904 13.7835 11.9643 13.8232 12.0979C13.9776 12.6167 14.0882 13.1501 14.2832 13.6546C14.729 14.8078 15.5631 15.5442 16.7491 15.8819C17.1493 15.9959 17.5495 16.1094 17.9493 16.2248C18.0905 16.2655 18.17 16.3604 18.1666 16.4774C18.1632 16.5932 18.0885 16.6785 17.9493 16.719C17.4492 16.8649 16.9386 16.9818 16.4503 17.16C15.2653 17.5924 14.5088 18.4375 14.1633 19.6524C14.0491 20.0538 13.9358 20.4552 13.8214 20.8566C13.7946 20.9508 13.7515 21.032 13.6455 21.057Z" fill="white"></path><path d="M18.6208 14.2236C18.5925 14.2236 18.5641 14.2236 18.5359 14.2236C18.4695 14.2075 18.446 14.1559 18.4291 14.0968C18.3469 13.8084 18.2771 13.5156 18.1781 13.233C17.9238 12.5069 17.4176 12.0413 16.6809 11.8275C16.4388 11.7572 16.196 11.6898 15.9535 11.6207C15.8972 11.6046 15.8482 11.579 15.8335 11.515C15.8335 11.4866 15.8335 11.4582 15.8335 11.4297C15.8496 11.3629 15.9011 11.3396 15.96 11.3228C16.2329 11.2452 16.5087 11.1764 16.7774 11.0867C17.5267 10.8364 18.0073 10.3236 18.2254 9.5633C18.2937 9.32491 18.3612 9.08612 18.4295 8.84774C18.4526 8.7676 18.5062 8.7235 18.5786 8.72363C18.6509 8.72363 18.7036 8.76801 18.7274 8.84815C18.8201 9.15944 18.8864 9.47947 19.0034 9.78216C19.2709 10.4741 19.7714 10.9159 20.4829 11.1185C20.7231 11.1869 20.9632 11.255 21.2031 11.3243C21.2878 11.3487 21.3355 11.4056 21.3334 11.4758C21.3314 11.5453 21.2866 11.5965 21.2031 11.6208C20.903 11.7083 20.5967 11.7785 20.3037 11.8854C19.5927 12.1448 19.1388 12.6519 18.9315 13.3808C18.863 13.6217 18.795 13.8625 18.7264 14.1033C18.7103 14.1599 18.6844 14.2086 18.6208 14.2236Z" fill="white"></path><defs><radialGradient id="paint0_radial_160_60080" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(11 22.2236) rotate(-40.3331) scale(34.7635 34.7635)"><stop offset="0.0705463" stop-color="#5433EB"></stop><stop offset="0.667546" stop-color="#A533EB"></stop><stop offset="1" stop-color="#5433EB" stop-opacity="0"></stop></radialGradient></defs></svg>`,
    };
  
    function intChatInterface(chatKey) {
      const chatWidget = document.createElement("div");
      chatWidget.id = "chat-widget";
      chatWidget.innerHTML = `
              <iframe id="chat-frame-widget" src="/chat" class="shadow-xl ring-1 rounded-lg" style="display: none; border: none; position: fixed; inset: auto 15px 75px auto; width: 400px; height: 540px; opacity: 1; color-scheme: none; background: white !important; margin: 0px; max-height: 100vh; max-width: 100vw; transform: translateY(0px); transition: none 0s ease 0s !important; visibility: visible; z-index: 999999999 !important;"></iframe>
              <button id="btn-trigger-chat" class="shadow-xl">${components.icon_message}</button>
              `;
  
      document.head.insertAdjacentHTML("beforeend", styleTag);
      document.body.appendChild(chatWidget);
  
      const btn = document.getElementById("btn-trigger-chat");
      const frameWidget = document.getElementById("chat-frame-widget");
      frameWidget.style.display = "none";
      btn.addEventListener("click", () => {
        if (btn.innerHTML === components.icon_message) {
          btn.innerHTML = components.icon_close;
          frameWidget.style.display = "block";
        } else {
          btn.innerHTML = components.icon_message;
          frameWidget.style.display = "none";
        }
      });
    }
  
    window.ChatWidget = {
      init: intChatInterface,
    };
  })();
  