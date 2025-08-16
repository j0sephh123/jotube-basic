import { useGetTodosQuery } from "@/generated/graphql";

export const TodosFetcher = () => {
  const { loading, error, data } = useGetTodosQuery();

  if (loading) {
    console.log("Loading todos...");
    return <div>Loading todos...</div>;
  }

  if (error) {
    console.error("Error fetching todos:", error);
    return <div>Error loading todos</div>;
  }

  if (data && data.todos) {
    console.log("Todos fetched successfully:", data.todos);
    return (
      <div>
        <h2>Todos loaded successfully!</h2>
        <p>Check the console to see the todos data</p>
        <p>Total todos: {data.todos.length}</p>
      </div>
    );
  }

  return <div>No todos found</div>;
};
