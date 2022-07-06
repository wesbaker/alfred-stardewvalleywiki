const alfy = require("alfy");

alfy
  .fetch("https://stardewvalleywiki.com/mediawiki/api.php", {
    searchParams: {
      action: "opensearch",
      format: "json",
      search: alfy.input,
      namespace: 0,
      limit: 10,
    },
  })
  .then(([query, words, _, urls]) => {
    if (words.length === 0 && urls.length === 0) {
      const encodedInput = encodeURIComponent(alfy.input);
      return alfy.output([
        {
          title: `No results found for '${alfy.input}'`,
          subtitle: `Search Stardew Valley Wiki for '${alfy.input}'`,
          arg: `https://stardewvalleywiki.com/mediawiki/index.php?search=${encodedInput}`,
        },
      ]);
    }

    const results = words.map((word, index) => {
      return {
        title: word,
        arg: urls[index],
      };
    });
    alfy.output(results);
  });
