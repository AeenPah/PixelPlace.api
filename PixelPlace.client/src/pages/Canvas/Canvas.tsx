import { useQuery } from "@apollo/client/react";
import { GET_CANVAS } from "../../graphql/queries/getCanvas";
import PixelCanvas from "./components/PixelCanvas";

function Canvas() {
  const { data, loading, error } = useQuery(GET_CANVAS);

  if (loading) return <div>Loading...</div>;

  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <PixelCanvas pixels={data?.canvas ?? []} />
    </div>
  );
}

export default Canvas;
