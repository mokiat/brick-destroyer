const Playground = () => {
  return (
    <div id="playground">
      <div id="playgroundTop">
        <div id="borderTop">
          <span id="message"></span>
        </div>
      </div>
      <div id="playgroundMiddle">
        <div id="borderLeft"></div>
        <canvas id="screen" width="600px" height="406px"></canvas>
        <div id="borderRight"></div>
      </div>
      <div id="playgroundBottom">
        <div id="borderBottom"></div>
      </div>
    </div>
  );
};

export default Playground;
