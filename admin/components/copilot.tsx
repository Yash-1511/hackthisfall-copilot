"use client";
import { CopilotWidget,Root } from "@openchatai/copilot-widget"; // import the component
 // the required styles
const options = {
  apiUrl: "https://localhost:8888/backend", // your base url where your are hosting OpenCopilot at (the API), usually it's http://localhost:8888/backend
  socketUrl: "https://localhost:8888/socket", // your socket server, usually it's http://localhost:8888/socket
  initialMessage: "Hey! happy to help.", // optional: you can pass an array of messages that will be sent to the copilot when it's initialized
  token: "LtgoxA0EPpKPUIbk", // you can get your token from the dashboard
  defaultOpen: true,
  headers: {
    // optional: you can pass your authentication tokens to the copilot or any other header you want to send with every request
    Authorization: "Bearer your_auth_token_goes_here",
    AnyKey: "AnyValue"
  },
}

function Widget(){
    const containerProps = {
        className: "your-custom-class-name",
        style: {
            position: "fixed" as const,
            height: "100%",
            bottom: "0",
            right: "0",
            width: "400px",
        },
    }
    return (
        <Root containerProps={containerProps} options={options}>
            <CopilotWidget triggerSelector='#copilot-trigger' />
        </Root>
    )
}

export default Widget;