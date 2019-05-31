


roblox = require('noblox.js')
const Discord = require('discord.js')
const client = new Discord.Client();
var token = "NTgzNDU2NDYyNDI1MDMwNjU2.XO_cYg.L9KC8FfUjZ2RXY2Dru_TvlX7Qdw";

client.login(token)

 
var cookie = "_|WARNING:-DO-NOT-SHARE-THIS.--Sharing-this-will-allow-someone-to-log-in-as-you-and-to-steal-your-ROBUX-and-items.|_D10B59D8D806455F3257C5C978EF422C25D6CA72DDA16415476BD0EBB88E549F67993CA960CE98CCB40DD517F59E541D30303746CFBC4ECA0C422F4092DDCB715D213484707FF385783E30F4F1BE3D50B96D2CFEA0DB2C9752F3557668F6EFD88DFBD24952A4D13EE667B36A61BBE9D5BC0F00C54736F92BFBDD3DE5EFCB13B675D9597836E5A12A16DFAA7A15B07E36074CAA6F1EF02043C706A9E71AB7458BE017A19A4FEDED694C9140EBD39AD3ACE899664E52E9EC813EA95A347BFA9FF2451ACD45341E3A3F0B92912B18965CF05D4A9A3E57BBA32EB8251B6F4E5F201BD8D24B892D35BAD90B3AFB586E8715C591CB86C62960280F4DA38AE9286C755E65D4F00BF8088FE0275014A215795D51289821EDEC85AA57FD75AD8490032937BCE2E6048673BE0997E3F2FED44F4D40A21633BE";
var prefix = '!';
var groupId = 4295585;
var maximumRank = 2;

function login() {
    return roblox.cookieLogin(cookie);
}

login() // Log into ROBLOX
    .then(function() { // After the function has been executed
        console.log('Logged in.') // Log to the console that we've logged in
    })
    .catch(function(error) { // This is a catch in the case that there's an error. Not using this will result in an unhandled rejection error.
        console.log(`Login error: ${error}`) // Log the error to console if there is one.
    });
 
function isCommand(command, message){
    var command = command.toLowerCase();
    var content = message.content.toLowerCase();
    return content.startsWith(prefix + command);
}
 
client.on('message', (message) => {
    if (message.author.bot) return; // Dont answer yourself.
    var args = message.content.split(/[ ]+/)
   
    if(isCommand('whitelist', message)){
       if(!message.member.roles.some(r=>["Owner", "Whitelist Token"].includes(r.name)) ) // OPTIONAL - Checks if the sender has the specified roles to carry on further
        return message.reply("You can't use this command.");
        var username = args[1]
        var rankIdentifier = Number(args[2]) ? Number(args[2]) : args[2];
        if (!rankIdentifier) return message.reply("plz use ``!whitelist YourRobloxName 2``.");
        if (username){
            message.channel.send(`Looking for ${username}`)
            roblox.getIdFromUsername(username)
            .then(function(id){
                roblox.getRankInGroup(groupId, id)
                .then(function(rank){
                    if(maximumRank <= rank){
                        message.channel.send(`${username} is already Whitelisted`)
                    } else {
                        message.channel.send(`Whitelisting... `)
                        roblox.setRank(groupId, id, rankIdentifier)
                        .then(function(newRole){
                            message.reply("Your Roblox account is now Whitelisted ");
                        }).catch(function(err){
                            console.error(err)
                            message.channel.send("Failed to Whitelist")
                            message.channel.send("Make sure you are in the roblox group")
                        });
                    }
                }).catch(function(err){
                    message.channel.send("Couldn't get that player in the group.")
                });
            }).catch(function(err){
                message.channel.send(`${username} was not found `)
           });
       } else {
           message.channel.send("Please enter a username")
       }
       return;
   }
})