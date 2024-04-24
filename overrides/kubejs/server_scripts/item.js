onEvent('recipes', event=>{
    event.shapeless('tea_kettle:cup', 'simplytea:cup')
    event.remove({input: Item.of('waystones:warp_stone').ignoreNBT()})
    event.remove({input: Item.of('waystones:sharestone').ignoreNBT()})
    event.remove({output: Item.of('waystones:sharestone').ignoreNBT()})
    event.remove({output: Item.of('endrem:end_crystal_eye').ignoreNBT()})
    event.remove({input: Item.of('waystones:warp_dust').ignoreNBT()})
    event.remove({output: Item.of('backpacked:backpack').ignoreNBT()})
    event.remove({output: Item.of('wonderful_enchantments:wonderful_book').ignoreNBT()})
    event.remove({output: Item.of('meetyourfight:ace_of_iron').ignoreNBT()})
    event.remove({output: Item.of('doomangelring:itemdoomangelring').ignoreNBT()})

    event.shaped('inventoryprotection:protector', [
                    ['minecraft:glass_pane','cavesandcliffs:amethyst_shard','minecraft:glass_pane'],
                    ['cavesandcliffs:amethyst_shard','ba_bt:guardian_eye_land','cavesandcliffs:amethyst_shard'],
                    ['minecraft:glass_pane','cavesandcliffs:amethyst_shard','minecraft:glass_pane']
    ])

    event.shaped('kubejs:companion_scrolls', [
                    ['iceandfire:amythest_gem','minecraft:emerald','iceandfire:amythest_gem'],
                    ['minecraft:emerald','waystones:warp_scroll','minecraft:emerald'],
                    ['iceandfire:amythest_gem','minecraft:experience_bottle','iceandfire:amythest_gem']
    ])

    event.shaped('waystones:waystone', [
                    ['minecraft:air','drinkbeer:beer_barrel','minecraft:air'],
                    ['butchersdelight:item_salt',Item.of('waystones:warp_stone').ignoreNBT(),'butchersdelight:item_salt'],
                    ['farmersdelight:cooking_pot','farmersdelight:cooking_pot','farmersdelight:cooking_pot']
    ])

    event.shaped('endrem:end_crystal_eye', [
                    ['iceandfire:cockatrice_eye','minecraft:ender_eye','ba_bt:guardian_eye_land'],
                    ['eyeofdragons:eye_of_icedragon','minecraft:nether_star','eyeofdragons:eye_of_lightningdragon'],
                    [Item.of('meetyourfight:spectres_eye').ignoreNBT(),'eyeofdragons:eye_of_firedragon',Item.of('iceandfire:cyclops_eye').ignoreNBT()]
    ])

    event.shaped('kubejs:sium_advanced_orb', [
                    ['kubejs:sium','#provefrom:sharp_weapon','kubejs:sium'],
                    ['#provefrom:sharp_weapon','eyeofdragons:eye_of_icedragon','#provefrom:sharp_weapon'],
                    ['kubejs:sium','#provefrom:sharp_weapon','kubejs:sium']
    ])

    event.shaped('kubejs:bium_advanced_orb', [
                    ['kubejs:bium','#provefrom:blunt_instruments','kubejs:bium'],
                    ['#provefrom:blunt_instruments','eyeofdragons:eye_of_lightningdragon','#provefrom:blunt_instruments'],
                    ['kubejs:bium','#provefrom:blunt_instruments','kubejs:bium']
    ])

    event.shaped('kubejs:sum_advanced_orb', [
                    ['kubejs:sum','#provefrom:sharps','kubejs:sum'],
                    ['#provefrom:sharps','eyeofdragons:eye_of_firedragon','#provefrom:sharps'],
                    ['kubejs:sum','#provefrom:sharps','kubejs:sum']
    ])

    event.shaped('kubejs:stay', [
                    ['kubejs:sium','kubejs:sium_advanced_orb','kubejs:sum'],
                    ['minecraft:end_crystal','kubejs:scrap',Ingredient.of('#betterendforge:hammers')],
                    ['kubejs:bium_advanced_orb','kubejs:bium','kubejs:sum_advanced_orb']])

    event.shaped('backpacked:backpack', [
                    ['minecraft:string','minecraft:string','minecraft:string'],
                    ['minecraft:string','ironchest:crystal_chest','minecraft:string'],
                    ['minecraft:leather','pfm:leather_block','minecraft:leather']
    ])

    event.shaped('minecraft:totem_of_undying', [
                    ['minecraft:emerald_block','betternether:cincinnasite_tile_large','minecraft:emerald_block'],
                    ['minecraft:emerald_block','aquaculture:neptunium_ingot','minecraft:emerald_block'],
                    ['betternether:cincinnasite_tile_large','betternether:cincinnasite_tile_large','betternether:cincinnasite_tile_large']
    ])

    event.shaped('wonderful_enchantments:wonderful_book', [
                    ['minecraft:air','minecraft:lapis_lazuli','minecraft:diamond'],
                    ['minecraft:lapis_lazuli',Item.of('minecraft:enchanted_book').ignoreNBT(),'minecraft:lapis_lazuli'],
                    ['minecraft:ender_eye','minecraft:lapis_lazuli','minecraft:air']
    ])
    
    event.custom(
        {
            "type": "farmersdelight:cooking",
            "ingredients": [
              {
                "item": "nethers_delight:mimicarnation"
              },
              {
                "item": "nethers_delight:stuffed_hoglin_item"
              },
              {
                "item": "nethers_delight:mimicarnation"
              },
              {
                "item": "nethers_delight:rich_soul_soil"
              },
              {
                "item": "mowziesmobs:wrought_helmet"
              },
              {
                "item": "nethers_delight:rich_soul_soil"
              }
            ],
            "result": {
              "item": 'endrem:magical_eye'
            },
            "container": {
                "item": 'alexsmobs:guster_eye'
              },
            "experience": 0.35,
            "cookingtime": 200
          }
    )
})

onEvent('item.right_click', event => {
  if(event.item.id == 'mod_lavacow:vespa_shield'||event.item.id == 'bountifulbaubles:shield_cobalt'||event.item.id == 'bountifulbaubles:shield_ankh'||event.item.id == 'bountifulbaubles:shield_obsidian '){
    event.player.addItemCooldown(event.item.id, 1145141919)
    event.cancel()// 取消该事件
  }
  if(event.item.id == 'kubejs:scrap'&&event.item.count==64){
    if(event.player.offHandItem.id == 'iceandfire:ice_dragon_heart'&&event.player.offHandItem.count>=3){
        event.player.mainHandItem.count=-64
        event.player.offHandItem.count=event.player.offHandItem.count-3
        event.server.runCommandSilent('/give @p kubejs:sium')
        event.server.runCommandSilent('/tellraw @a "§6§l转换成功！！！"')
    } 
    if(event.player.offHandItem.id == 'iceandfire:fire_dragon_heart'&&event.player.offHandItem.count>=3){
        event.player.mainHandItem.count=-64
        event.player.offHandItem.count=event.player.offHandItem.count-3
        event.server.runCommandSilent('/give @p kubejs:sum')
        event.server.runCommandSilent('/tellraw @a "§6§l转换成功！！！"')
    } 
    if(event.player.offHandItem.id == 'iceandfire:lightning_dragon_heart'&&event.player.offHandItem.count>=3){
        event.player.mainHandItem.count=-64
        event.player.offHandItem.count=event.player.offHandItem.count-3
        event.server.runCommandSilent('/give @p kubejs:bium')
        event.server.runCommandSilent('/tellraw @a "§6§l转换成功！！！"')
    } 
  }
  if(event.item.id == 'minecraft:compass'){
        event.server.runCommandSilent(`/tellraw @a "您当前的坐标x:${(event.player.x).toFixed(2)} y:${(event.player.y).toFixed(2)} z:${(event.player.z).toFixed(2)}"`)
    } 
})

onEvent("lootjs", (event) => {
    event
        .addLootTableModifier('champions:champion_loot')
        .thenRemove(Item.of('minecraft:enchanted_book').ignoreNBT())
        .thenAdd('kubejs:scrap')

    event//保护符文
        .addEntityLootModifier("redstone_monstrosity_mod:mooshroom_monstrosity")
        .killedByPlayer() 
        .thenAdd("kubejs:stay")

    event//保护符文
        .addEntityLootModifier("redstone_monstrosity_mod:obsidian_monstrosity")
        .killedByPlayer() 
        .thenAdd("kubejs:stay")

    event//保护符文
        .addEntityLootModifier("redstone_monstrosity_mod:redstone_monstrosity")
        .killedByPlayer() 
        .thenAdd("kubejs:stay")

    event//漆黑之眼
        .addEntityLootModifier("aquamirae:captain_cornelia")
        .killedByPlayer() 
        .thenAdd("endrem:black_eye")

    event//远古之眼
        .addEntityLootModifier("mod_lavacow:skeletonking")
        .killedByPlayer()
        .thenAdd("endrem:old_eye")
    
    event//巫师之眼
        .addEntityLootModifier("illageandspillage:magispeller")
        .killedByPlayer()
        .thenAdd("endrem:witch_eye")

    event//下界之眼
        .addEntityLootModifier("cataclysm:ignis")
        .killedByPlayer()
        .thenAdd("endrem:nether_eye")

    event//无赖之眼
        .addEntityLootModifier("redstone_monstrosity_mod:namelessone")
        .killedByPlayer()
        .thenAdd("endrem:rogue_eye")

    event//腐化之眼
        .addEntityLootModifier("dungeonsmod:sun")
        .killedByPlayer()
        .thenAdd("endrem:corrupted_eye")

    event//迷离之眼
        .addEntityLootModifier("cataclysm:netherite_monstrosity")
        .killedByPlayer()
        .thenAdd("endrem:lost_eye")

    event//魔力之眼
        .addEntityLootModifier("minecraft:evoker")
        .thenRemove("endrem:magical_eye")

    event//王冠
        .addEntityLootModifier("mod_lavacow:boneworm")
        .thenRemove("mod_lavacow:stained_kings_crown")
    event
        .addEntityLootModifier("mod_lavacow:boneworm")
        .killedByPlayer()
        .thenAdd("mod_lavacow:stained_kings_crown")
    
    event//下界之眼
        .addEntityLootModifier('meetyourfight:dame_fortuna')
        .killedByPlayer()
        .thenRemove(Item.of('minecraft:enchanted_book').ignoreNBT())

    event//眼睛
        .addLootTypeModifier(LootType.CHEST)
        .thenRemove(["endrem:magical_eye","endrem:black_eye","endrem:wither_eye","endrem:lost_eye","endrem:corrupted_eye","endrem:rogue_eye","endrem:nether_eye","endrem:witch_eye","endrem:old_eye","endrem:cold_eye",Item.of('minecraft:enchanted_book').ignoreNBT(),Ingredient.of('#starmute:tools_armor')])
})