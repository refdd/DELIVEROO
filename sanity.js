import { createClient } from "@sanity/client";
import imageUrlBulider from "@sanity/image-url";
const client = createClient({
  projectId: "5grxn798",
  dataset: "production",
  useCdn: true,
  apiVersion: "2022-03-12",
});
const builder = imageUrlBulider(client);
export const urlFar = (source) => builder.image(source);

export default client;
