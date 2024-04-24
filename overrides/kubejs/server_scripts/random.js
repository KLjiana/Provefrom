console.info('start to load the random')
// 最小及最大坐标
const minX = 381;
const maxX = 4867;
const minZ = 436;
const maxZ = 8761;
const minY = 50;
const maxY = 120;

// 是否随机取负值
const reverseNumber = true;
// 设置开关初始状态
global.tellreports = false

// 返回随机数
function getNumber(min,max){
    let randNumber = Math.floor(Math.random() * (max - min + 1) ) + min;
    if(Math.random() > 0.5 && reverseNumber){
        randNumber = -randNumber;
    }
    return randNumber;
}


// 判断玩家是否进入游戏，发送欢迎语，并随机传送，设置事件出生点
onEvent('player.logged_in', event =>{
    console.info('you are in the game')
    event.server.runCommandSilent('/gamerule reducedDebugInfo true')
    event.server.runCommandSilent('/tellraw @a "§6§l欢迎游玩忘却之刻整合包，希望你可以在这里收获快乐！！！"')
    event.server.runCommandSilent('/tellraw @a "§f§o§l友情链接："')
    event.server.runCommandSilent('/tellraw @a {"text":"§5爱发电赞助： §r§5§lhttps://afdian.net/a/PROVEFROM","clickEvent":{"action":"open_url","value":"https://afdian.net/a/PROVEFROM"},"hoverEvent":{"action":"show_text","value":{"text":"","extra":[{"text":"如果你能有能力的话，可可可可...可以赞助一下弱小无力的作者吗 (；′⌒`)"}]}}}')
    event.server.runCommandSilent('/tellraw @a {"text":"§c§ocurseforge： §r§c§lhttps://legacy.curseforge.com/minecraft/modpacks/provefrom","clickEvent":{"action":"open_url","value":"https://legacy.curseforge.com/minecraft/modpacks/provefrom"},"hoverEvent":{"action":"show_text","value":{"text":"","extra":[{"text":"整合包唯一官方下载地址ᕙ(`▿´)ᕗ"}]}}}')
    event.server.runCommandSilent('/tellraw @a {"text":"§4MCBBS帖子： §r§4§lhttps://www.mcbbs.net/thread-1449625-1-1.html","clickEvent":{"action":"open_url","value":"https://www.mcbbs.net/thread-1449625-1-1.html"},"hoverEvent":{"action":"show_text","value":{"text":"","extra":[{"text":"点击查看帖子，可以的话请给我的帖子评个分，顶一下好吗 =￣ω￣="}]}}}')
    event.server.runCommandSilent('/tellraw @a {"text":"§2§oMC百科： §r§2§lhttps://www.mcmod.cn/modpack/569.html","clickEvent":{"action":"open_url","value":"https://www.mcmod.cn/modpack/569.html"},"hoverEvent":{"action":"show_text","value":{"text":"","extra":[{"text":"点击查看百科 ︿(￣︶￣)︿"}]}}}')
    event.player.statusMessage = `你已出生 `
    event.server.runCommandSilent(`/setworldspawn ${getNumber(minX,maxX)} ${Math.abs(getNumber(minY,maxY))} ${getNumber(minZ,maxZ)}`)
})


//每一tick监听，判断开关状态                                                
onEvent('player.tick',function (event){
    if(global.tellreports){
        //设置指令内容
        //event.player.setPosition(getNumber(minX,maxX), Math.abs(getNumber(minY,maxY)), getNumber(minZ,maxZ)) 直接传送
        event.server.runCommandSilent(`/setworldspawn ${getNumber(minX,maxX)} ${Math.abs(getNumber(minY,maxY))} ${getNumber(minZ,maxZ)}`); //运行命令
        event.player.statusMessage = `你已出生 `// 玩家状态栏显示文字
        global.tellreports = false // 将开关重置
    }
})


const minRX = 361;
const maxRX = 46867;
const minRZ = 438;
const maxRZ = 86691;
const minRY = 50;
const maxRY = 120;
onEvent('item.right_click',function (event){
    if(event.player.mainHandItem.id == "kubejs:companion_scrolls"){
        event.player.setPosition(getNumber(minRX,maxRX), Math.abs(getNumber(minRY,maxRY)), getNumber(minRZ,maxRZ));
        event.player.statusMessage = `已将你随机传送，祝你好运`;
        // 数量减一
        event.item.count--;
        event.player.addItemCooldown('kubejs:companion_scrolls', 200);
    }
}) 