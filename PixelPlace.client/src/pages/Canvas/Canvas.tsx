import { useQuery } from "@apollo/client/react";
import { GET_CANVAS } from "../graphql/queries/getCanvas";

function Canvas() {
  const { data, loading, error } = useQuery(GET_CANVAS);

  if (loading) return <div>Loading...</div>;

  if (error) return <div>Error: {error.message}</div>;

  return <div>{JSON.stringify(data, null, 2)}</div>;
}

export default Canvas;
