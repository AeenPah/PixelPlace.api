import Canvas from "./components/Canvas";

function App() {
  return (
    <div className="flex h-screen items-center justify-center bg-slate-900 text-4xl text-white">
      <div className="flex flex-col items-center">
        <div>Pixel Place</div>

        <Canvas />
      </div>
    </div>
  );
}

export default App;
