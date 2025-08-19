import { useImageNavigator } from "../hooks/useImageNavigator";

export default function ImageNavigatorPage() {
  const { count, increment, decrement, reset, setValue } = useImageNavigator();

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Image Navigator
        </h1>

        <div className="bg-base-200 p-8 rounded-lg shadow-lg">
          <div className="text-6xl font-bold text-primary mb-6">{count}</div>

          <div className="flex gap-4 justify-center mb-6">
            <button onClick={decrement} className="btn btn-circle btn-primary">
              -
            </button>
            <button onClick={increment} className="btn btn-circle btn-primary">
              +
            </button>
          </div>

          <div className="flex gap-2 justify-center">
            <button onClick={reset} className="btn btn-outline btn-secondary">
              Reset
            </button>
            <button
              onClick={() => setValue(10)}
              className="btn btn-outline btn-accent"
            >
              Set to 10
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
