const Parser = require("rss-parser");

/**
 * Fetch RSS from Cisco Community Blog "Orbital Corner" and convert to JSON.
 * @return {Object}
 */
exports.getNews = async () => {
  const parser = new Parser();
  try {
    const rawNews = await parser.parseURL(
      "https://community.cisco.com/kxiwq67737/rss/message?board.id=4561-blogs-security&message.id=1790"
    );

    return {
      items: rawNews.items.map((x) => ({
        title: x.title,
        link: x.link,
        date: x.isoDate,
        summary: x.contentSnippet.substr(0, 500) + "...",
        sourceId: "ORBITAL",
      })),
      sources: {
        ORBITAL: {
          icon: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'%0AviewBox='0 0 40 40' width='24' height='24'%3E%3Cpath d='M26.447 24.678l13.186 13.188c1.178 1.179-.59 2.946-1.768 1.768L24.681 26.45l1.766-1.768v-.002z' fill='%23fff'/%3E%3Cpath d='M26.447 24.678c-1.766 1.772 0 .004-1.766 1.772-10.79 9.123-27.05-.372-24.416-14.25C2.901-1.678 21.51-4.55 28.205 7.89l1.64-6.583c.379-1.655 2.865-1.038 2.426.602l-2.72 10.916-10.913-2.72c-1.508-.467-.947-2.72.604-2.426l6.933 1.728a12.493 12.493 0 00-23.558 7.226 12.493 12.493 0 0024.626.868c.2-.776.76-1.276 1.45-1.252.68.026 1.1.52 1.088 1.252a14.926 14.926 0 01-3.334 7.181v-.002z' fill='%236bbf4e'/%3E%3C/svg%3E",
          name: "ORBITAL",
          "color-dusk": "#06144D",
          "color-light": "#06144D",
        },
      },
    };
  } catch (err) {
    return [];
  }
};
