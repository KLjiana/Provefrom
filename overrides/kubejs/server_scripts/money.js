//赞助者物品
onEvent('block.right_click', event=>{
    if(event.player.getHeldItem(event.hand)=='kubejs:silver_key'&&event.block.hasTag('minecraft:doors')){
        event.server.runCommand(`say §4§l神明对你开始了考验`)
        event.player.mainHandItem.count--
        if(Math.random()<0.1){
            event.player.give('inventoryprotection:protector');
            if(Math.random()<0.2){
                event.player.mainHandItem.set('kubejs:stay')
                event.server.runCommand(`say §6§l获得犹格·索托斯的祝福`)
            }
            else{
                event.server.runCommand(`say §2§l犹格·索托斯赦免了你`)
                event.player.setPosition(514,-200,114)
            }
        }
        else{
            event.server.runCommand(`say §4§l犹格·索托斯拒绝了你`)
            event.player.setPosition(514,-200,114)
        }
    }
})

onEvent("lootjs", (event) => {
    event
        .addLootTypeModifier(LootType.CHEST)
        .randomChance(0.08)
        .thenAdd("kubejs:silver_key");
})