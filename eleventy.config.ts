export default function () {
  return {
    templateFormats: ["html", "njk"],
    dir: {
      input: "app/site",
      output: "public",
    },
  };
}
