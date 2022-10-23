import { ApplicationCommandOptionType, findOption } from "../api/Commands";
import definePlugin from "../utils/types";

function rand(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default definePlugin({
    name: "xkcd-fetcher",
    authors: [{
        name: "hadean",
        id: 503295439072919572n
    }],
    description: "adds a command to send xkcd comics in chat",
    dependencies: ["CommandsAPI"],
    commands: [{
        name: "xkcd",
        description: "Send an xkcd comic",
        options: [
            {
                name: "comic",
                description: "which comic to send",
                type: ApplicationCommandOptionType.INTEGER,
                required: false,
            },
            {
                name: "random",
                description: "randomizes comic number",
                type: ApplicationCommandOptionType.BOOLEAN,
                required: false
            }
        ],

        async execute(args) {
            console.error(args);
            const latest = await (await fetch(`https://xkcd.now.sh/?comic=latest`)).json();
            const num = latest.num;

            if (findOption(args, "comic")) {
                let comic = await (await fetch(`https://xkcd.now.sh/?comic=${findOption(args, "comic") as number}`)).json();
                return {content: comic.img}
            }
            if (findOption(args, "random")) {
                let comic = await (await fetch(`https://xkcd.now.sh/?comic=${rand(0, num) as number}`)).json();
                return {content: comic.img}
            }

            return {
                content: latest.img,
            };
        },
    }]
});
