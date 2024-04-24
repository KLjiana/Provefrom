// forge事件监听玩家是否重生
onForgeEvent("net.minecraftforge.event.entity.player.PlayerEvent$PlayerRespawnEvent", event=>{
    global.tellreports = true
})