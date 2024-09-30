const ContentScriptUI = () => {
  return (
    <button onClick={() => alert("This is injected UI!")}>
      Content Script UI
    </button>
  );
};

export default ContentScriptUI;
