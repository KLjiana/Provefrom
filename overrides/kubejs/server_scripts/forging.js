
console.info('start to load')//开始加载
let sent = false
let damage = 0
let ifsucceed = 0
let probability = 100
let notf = 20
let failure = 0
let turn = true
let n = 0
onEvent("player.tick", event =>{
    for(let i = 0; i <= 35; i++) {//遍历每个格子
        // 代码逻辑
        //console.info(inventory.get(i).id)
        if(event.player.inventory.get(i).hasTag("provefrom:weapon")){//判断是否是武器
            if(!event.player.inventory.get(i).nbt.openattribute) {//判断武器中是否有sword_attribute属性
                //event.player.potionEffects.add("minecraft:instant_health", 1, 2, false, false) 检测代码
                let nbb = event.player.inventory.get(i).nbtString//克隆扫中的武器NBT属性
                uuid = `${randNumber = Math.floor(Math.random() * (4861256 - 565 + 1)) + 8961},${randNumber = Math.floor(Math.random() * (4861256 - 565 + 1)) + 8961},${randNumber = Math.floor(Math.random() * (4861256 - 565 + 1)) + 8961},${randNumber = Math.floor(Math.random() * (4861256 - 565 + 1)) + 8961}`
                if(event.player.inventory.get(i).hasTag("provefrom:sharp_weapon")){
                  nbb = `{${nbb.slice(1, -1)},recast:0,openattribute:1,succeed:100,sword_attribute:3,AttributeModifiers:[{AttributeName:generic.attack_damage,Name:generic.attack_damage,Amount:7,Operation:0,UUID:[I;${uuid}],Slot:mainhand},{AttributeName:generic.attack_speed,Name:generic.attack_speed,Amount:-2.8,Operation:0,UUID:[I;${uuid}],Slot:mainhand}]}`//加入sword_attribute NBT设为3
                }
                else if(event.player.inventory.get(i).hasTag("provefrom:sharps")){
                  nbb = `{${nbb.slice(1, -1)},recast:0,openattribute:1,succeed:100,sword_attribute:3,AttributeModifiers:[{AttributeName:generic.attack_damage,Name:generic.attack_damage,Amount:3,Operation:0,UUID:[I;${uuid}],Slot:mainhand},{AttributeName:generic.attack_speed,Name:generic.attack_speed,Amount:-1.5,Operation:0,UUID:[I;${uuid}],Slot:mainhand}]}`//加入sword_attribute NBT设为3
                }
                else{
                  nbb = `{${nbb.slice(1, -1)},recast:0,openattribute:1,succeed:100,sword_attribute:3,AttributeModifiers:[{AttributeName:generic.attack_damage,Name:generic.attack_damage,Amount:12,Operation:0,UUID:[I;${uuid}],Slot:mainhand},{AttributeName:generic.attack_speed,Name:generic.attack_speed,Amount:-3.2,Operation:0,UUID:[I;${uuid}],Slot:mainhand}]}`//加入sword_attribute NBT设为3
                }
                //console.info(nbb) 检测代码
                event.player.inventory.set(i, Item.of(`${event.player.inventory.get(i).id}`, nbb))//替换武器 
            }
        }

        if(sent){
          event.server.runCommand('/tellraw @a "§f§o§l开始锻造..."')
          if(ifsucceed == 1){
            event.server.runCommand('/tellraw @a "§6恭喜您，锻造成功！！！"')
            event.server.runCommand(`/tellraw @a "此次武器的伤害为：§2§l${(damage + 1).toFixed(2)}§r,"`)
            event.server.runCommand(`/tellraw @a "下次武器成功的概率为：§2§l${probability}%"`)
            event.server.runCommand(`/tellraw @a "剩余锻造次数：§4§l${notf}"`)
            event.server.runCommand('/tellraw @a "§d祝您下次成功！"')
            ifsucceed = 0
          }
          else{
            event.server.runCommand('/tellraw @a "§4武器锻造失败。"')
            event.server.runCommand(`/tellraw @a "此次武器的伤害为：§2§l${(damage + 1).toFixed(2)}§r,"`)
            event.server.runCommand(`/tellraw @a "下次武器成功的概率为：§2§l${probability}%"`)
            event.server.runCommand(`/tellraw @a "剩余锻造次数：§4§l${notf}"`)
            event.server.runCommand('/tellraw @a "§d祝您下次成功！"')
            ifsucceed = 0
          }
          sent = false
        }
    }
})

onEvent('recipes', event => {
  Ingredient.registerCustomIngredientAction('change_damage', (itemstack, index, inventory) => {//武器锻造配方函数
    if (turn){
        turn = false
        return itemstack
    }
    else{
        turn = true
        console.info(n)
        n++
        if(itemstack.nbt.sword_attribute <= 0){// 判断SA是否为零
            return itemstack
          }
        if(itemstack.nbt.AttributeModifiers[0].Amount <= 0){// 判断SA是否为零
            return itemstack
          }
          else{// 执行锻造程序
            itemstack.nbt.sword_attribute = itemstack.nbt.sword_attribute-1// 减少SA
            notf = itemstack.nbt.sword_attribute
            fight_damage = itemstack.nbt.AttributeModifiers[0].Amount
            // 锻造百分比随机
            if(Math.random() < 0.1){
              console.info('Single digits')
              rom_s = Math.random()
            }
            else{
              console.info('Two digits')
              rom_s = Math.random() * 90
              rom_s = rom_s + Math.random() * 10
            }
      
            if(itemstack.nbt.succeed>70){
              failure = (itemstack.nbt.succeed/1.06).toFixed(2)// 失败概率计算
              probability = failure
              itemstack.nbt.succeed = probability
            }
            else if(70>itemstack.nbt.succeed>30){
              failure = (itemstack.nbt.succeed/1.04).toFixed(2)// 失败概率计算
              probability = failure
              itemstack.nbt.succeed = probability
            }
            else{
              failure = (itemstack.nbt.succeed/1.02).toFixed(2)// 失败概率计算
              probability = failure
              itemstack.nbt.succeed = probability
            }
            console.info(`damage: ${fight_damage}`)
            console.info(`gailv: ${100-failure}`)
            console.info(`baifenbi: ${rom_s}}`) 
      
            if(rom_s > (100-failure)){//开始判断
              if(fight_damage<30){
                console.info('succeed')
                damage = (fight_damage * Math.random() * 0.8) + fight_damage
              }
              else if(30<fight_damage<70){
                console.info('succeed')
                damage = (fight_damage * Math.random() * 0.3) + fight_damage
              }
              else{
                console.info('succeed')
                damage = (fight_damage * Math.random() * 0.08) + fight_damage
              }
              itemstack.nbt.AttributeModifiers[0].Amount = damage
              ifsucceed = 1
              sent = true
            }
            else{
              console.info('failure')
              damage = fight_damage * Math.random() * 0.4
              itemstack.nbt.AttributeModifiers[0].Amount = damage
              ifsucceed = 2
              sent = true
            }
            itemstack.nbt.recast++
          }
          return itemstack
    }
  })
  
  event.shaped('kubejs:scrap', [
                ' D ',
                ' SH',
                ' A '
          ], {
                S: Ingredient.of('#provefrom:sharp_weapon'),
                D: Ingredient.of('kubejs:sium').ignoreNBT(),
                A: Ingredient.of('#minecraft:anvil'),
                H: Ingredient.of('#betterendforge:hammers')
          }).customIngredientAction('#provefrom:sharp_weapon', 'change_damage').keepIngredient('#minecraft:anvil').damageIngredient('#betterendforge:hammers',20)

  event.shaped('kubejs:scrap', [
                ' D ',
                ' SH',
                ' A '
          ], {
                S: Ingredient.of('#provefrom:sharps'),
                D: Ingredient.of('kubejs:sum').ignoreNBT(),
                A: Ingredient.of('#minecraft:anvil'),
                H: Ingredient.of('#betterendforge:hammers')
          }).customIngredientAction('#provefrom:sharps', 'change_damage').keepIngredient('#minecraft:anvil').damageIngredient('#betterendforge:hammers',20)

  event.shaped('kubejs:scrap', [
                ' D ',
                ' SH',
                ' A '
          ], {
                S: Ingredient.of('#provefrom:blunt_instruments'),
                D: Ingredient.of('kubejs:bium').ignoreNBT(),
                A: Ingredient.of('#minecraft:anvil'),
                H: Ingredient.of('#betterendforge:hammers')
          }).customIngredientAction('#provefrom:blunt_instruments', 'change_damage').keepIngredient('#minecraft:anvil').damageIngredient('#betterendforge:hammers',20)
})

onEvent('recipes', event => {
  Ingredient.registerCustomIngredientAction('tosa', (itemstack, index, inventory) => {// 增加sa
    itemstack.nbt.sword_attribute=itemstack.nbt.sword_attribute+5
    return itemstack
  })

  Ingredient.registerCustomIngredientAction('succto', (itemstack, index, inventory) => {// 增加sa
      if(itemstack.nbt.sword_attribute == 0){// 判断SA是否为零
        return itemstack
      }
      else{// 执行锻造程序
                // 执行锻造程序
        itemstack.nbt.sword_attribute = itemstack.nbt.sword_attribute-1// 减少SA
        notf = itemstack.nbt.sword_attribute
        fight_damage = itemstack.nbt.AttributeModifiers[0].Amount
        console.info(`damage: ${fight_damage}`)
        if(fight_damage<30){
            console.info('succeed')
            damage = (fight_damage * Math.random() * 0.8) + fight_damage
          }
          else if(30<fight_damage<70){
            console.info('succeed')
            damage = (fight_damage * Math.random() * 0.3) + fight_damage
          }
          else{
            console.info('succeed')
            damage = (fight_damage * Math.random() * 0.08) + fight_damage
          }
          itemstack.nbt.AttributeModifiers[0].Amount = damage
          ifsucceed = 1
          sent = true
        itemstack.nbt.recast++
      return itemstack
      }
  })

    event.shaped('kubejs:scrap', [
                ' B ',
                ' SH',
                ' A '
          ], {
                S: Ingredient.of('#provefrom:sharp_weapon'),
                B: Ingredient.of('kubejs:sium_advanced_orb').ignoreNBT(),
                A: Ingredient.of('#minecraft:anvil'),
                H: Ingredient.of('#betterendforge:hammers')
          }).customIngredientAction('#provefrom:sharp_weapon', 'tosa').keepIngredient('#minecraft:anvil').damageIngredient('#betterendforge:hammers',100)

    event.shaped('kubejs:scrap', [
                ' B ',
                ' SH',
                ' A '
          ], {
                S: Ingredient.of('#provefrom:blunt_instruments'),
                B: Ingredient.of('kubejs:bium_advanced_orb').ignoreNBT(),
                A: Ingredient.of('#minecraft:anvil'),
                H: Ingredient.of('#betterendforge:hammers')
          }).customIngredientAction('#provefrom:blunt_instruments', 'tosa').keepIngredient('#minecraft:anvil').damageIngredient('#betterendforge:hammers',100)
          
    event.shaped('kubejs:scrap', [
                ' B ',
                ' SH',
                ' A '
          ], {
                S: Ingredient.of('#provefrom:sharps'),
                B: Ingredient.of('kubejs:sum_advanced_orb').ignoreNBT(),
                A: Ingredient.of('#minecraft:anvil'),
                H: Ingredient.of('#betterendforge:hammers')
          }).customIngredientAction('#provefrom:sharps', 'tosa').keepIngredient('#minecraft:anvil').damageIngredient('#betterendforge:hammers',100)

    event.shaped('kubejs:scrap', [
                ' B ',
                ' SH',
                ' AC'
        ], {
                S: Ingredient.of('#provefrom:sharp_weapon'),
                B: Ingredient.of('kubejs:sium_advanced_orb').ignoreNBT(),
                C: Ingredient.of('kubejs:stay'),
                A: Ingredient.of('#minecraft:anvil'),
                H: Ingredient.of('#betterendforge:hammers')
        }).customIngredientAction('#provefrom:sharp_weapon', 'succto').keepIngredient('#minecraft:anvil').damageIngredient('#betterendforge:hammers',300)

    event.shaped('kubejs:scrap', [
                ' B ',
                ' SH',
                ' AC'
        ], {
                S: Ingredient.of('#provefrom:blunt_instruments'),
                B: Ingredient.of('kubejs:bium_advanced_orb').ignoreNBT(),
                C: Ingredient.of('kubejs:stay'),
                A: Ingredient.of('#minecraft:anvil'),
                H: Ingredient.of('#betterendforge:hammers')
        }).customIngredientAction('#provefrom:blunt_instruments', 'succto').keepIngredient('#minecraft:anvil').damageIngredient('#betterendforge:hammers',300)
        
    event.shaped('kubejs:scrap', [
                ' B ',
                ' SH',
                ' AC'
        ], {
                S: Ingredient.of('#provefrom:sharps'),
                B: Ingredient.of('kubejs:sum_advanced_orb').ignoreNBT(),
                C: Ingredient.of('kubejs:stay'),
                A: Ingredient.of('#minecraft:anvil'),
                H: Ingredient.of('#betterendforge:hammers')
        }).customIngredientAction('#provefrom:sharps', 'succto').keepIngredient('#minecraft:anvil').damageIngredient('#betterendforge:hammers',300) 

})

// 设置三大武器tag
onEvent('item.tags', event => {
  event.add('provefrom:blunt_instruments', ['minecraft:trident',// 钝器
  'stalwart_dungeons:wooden_hammer',
  'stalwart_dungeons:stone_hammer',
  'stalwart_dungeons:iron_hammer',
  'stalwart_dungeons:golden_hammer',
  'stalwart_dungeons:diamond_hammer',
  'stalwart_dungeons:netherite_hammer',
  'aquamirae:whisper_of_the_abyss',
  'aquamirae:coral_lance',
  'iceandfire:troll_weapon_axe',
  'iceandfire:troll_weapon_column',
  'iceandfire:troll_weapon_column_forest',
  'iceandfire:troll_weapon_column_frost',
  'iceandfire:troll_weapon_hammer',
  'iceandfire:troll_weapon_trunk',
  'iceandfire:troll_weapon_trunk_frost',
  'cataclysm:infernal_forge',
  'mod_lavacow:moltenhammer',
  'mod_lavacow:beast_claw',
  'mod_lavacow:skeletonking_mace',
  'mod_lavacow:soulfirehammer',
  'piglin_expansion:piglin_divinity_staff',
  'stalwart_dungeons:tungsten_hammer',
  'stalwart_dungeons:nether_hammer',
  'meetyourfight:depth_star',
  'iceandfire:tide_trident',
  'mowziesmobs:spear',
  'mowziesmobs:wrought_axe']
  )

  event.add('provefrom:sharps',[// 利器
  'graveyard:bone_dagger',
  'aquamirae:poisoned_blade',
  'aquamirae:dagger_of_greed',
  'aquamirae:divider',
  'iceandfire:hippogryph_sword',
  'iceandfire:stymphalian_bird_dagger',
  'iceandfire:ghost_sword',
  'mod_lavacow:famine',
  'mod_lavacow:tooth_dagger',
  'mod_lavacow:vespa_dagger',
  'mod_lavacow:frozen_dagger',
  'mod_lavacow:spectral_dagger',
  'stalwart_dungeons:awful_dagger',
  'mowziesmobs:naga_fang_dagger']
  )

  event.add('provefrom:sharp_weapon',['minecraft:wooden_sword',// 锐器
  'minecraft:stone_sword',
  'minecraft:iron_sword',
  'minecraft:golden_sword',
  'minecraft:diamond_sword',
  'minecraft:netherite_sword',
  'savageandravage:cleaver_of_beheading',
  'ba_bt:platinum_sword',
  'aquamirae:terrible_sword',
  'aquamirae:fin_cutter',
  'aquamirae:remnants_saber',
  'iceandfire:silver_sword',
  'iceandfire:copper_sword',
  'iceandfire:dragonbone_sword',
  'iceandfire:dragonbone_sword_fire',
  'iceandfire:dragonbone_sword_ice',
  'iceandfire:dragonbone_sword_lightning',
  'iceandfire:myrmex_desert_sword',
  'iceandfire:myrmex_desert_sword_venom',
  'iceandfire:myrmex_jungle_sword',
  'iceandfire:myrmex_jungle_sword_venom',
  'iceandfire:amphithere_macuahuitl',
  'iceandfire:dragonsteel_fire_sword',
  'iceandfire:dragonsteel_ice_sword',
  'iceandfire:dragonsteel_lightning_sword',
  'iceandfire:dread_knight_sword',
  'iceandfire:dread_sword',
  'iceandfire:dread_queen_sword',
  'endrem:end_crystal_sword',
  'mod_lavacow:bonesword',
  'mod_lavacow:reapers_scythe',
  'betterendforge:aeternium_sword',
  'betterendforge:thallasium_sword',
  'betterendforge:terminite_sword',
  'betternether:cincinnasite_sword',
  'betternether:cincinnasite_sword_diamond',
  'betternether:nether_ruby_sword',
  'stalwart_dungeons:tungsten_sword',
  'byg:pendorite_sword',
  'witherstormmod:command_block_sword',
  'meetyourfight:cocktail_cutlass',
  'stalwart_dungeons:chorundum_sword',
  'farlanders:nightfall_sword'
  ])

  event.add('provefrom:weapon',[
      '#provefrom:sharp_weapon',
      '#provefrom:sharps',
      '#provefrom:blunt_instruments'
  ])
})

//删除武器的配方
onEvent('recipes', event => { // 监听recipes事件
  // 主体修改内容
  event.remove({output: '#provefrom:weapon'})
  event.remove({output: 'dreadsteel:dreadsteel_shield'})
  event.remove({output: 'cataclysm:bulwark_of_the_flame'})
})

//怪物无法掉落
onEvent("lootjs", (event) => {
  event
      .addLootTypeModifier(LootType.ENTITY)
      .thenRemove('#provefrom:sharp_weapon')
      .thenRemove('#provefrom:sharps')
      .thenRemove('#provefrom:blunt_instruments')
});

onEvent('recipes', event => { // 监听recipes事件
  // 主体修改内容
  event.shaped('shieldexp:griefer_shield', [
          'SSS',
          'SWS',
          'SSS'
    ], 
    {
          S: 'savageandravage:blast_proof_plating',
          W: 'minecraft:stick'
    })
  
  event.shaped('shieldexp:paragon_shield', [
          'ISI',
          'SWS',
          'ESE'
    ], 
    {
          S: 'cavesandcliffs:amethyst_shard',
          W: 'minecraft:stick',
          E: 'endrem:end_crystal_ingot',
          I: 'endrem:end_crystal_fragment'
    })
})

onEvent("lootjs", (event) => {
    event
        .addEntityLootModifier("minecraft:ender_dragon")
        .thenAdd(['kubejs:stay','8x quark:dragon_scale', 'doomangelring:itemdoomangelring']);
    event
        .addLootTypeModifier(LootType.ENTITY)
        .randomChance(0.007)
        .killedByPlayer()
        .thenAdd('kubejs:sium_advanced_orb')
    event
        .addLootTypeModifier(LootType.ENTITY)
        .randomChance(0.007)
        .killedByPlayer()
        .thenAdd('kubejs:bium_advanced_orb')
    event
        .addLootTypeModifier(LootType.ENTITY)
        .randomChance(0.007)
        .killedByPlayer()
        .thenAdd('kubejs:sum_advanced_orb')
    event
        .addLootTypeModifier(LootType.CHEST)
        .randomChance(0.03)
        .thenAdd('kubejs:bium');
    event
        .addLootTypeModifier(LootType.CHEST)
        .randomChance(0.03)
        .thenAdd('kubejs:sum');
    event
        .addLootTypeModifier(LootType.CHEST)
        .randomChance(0.03)
        .thenAdd('kubejs:sium');
    event
        .addLootTypeModifier(LootType.FISHING)
        .randomChance(0.08)
        .thenAdd('kubejs:bium');
    event
        .addLootTypeModifier(LootType.FISHING)
        .randomChance(0.08)
        .thenAdd('kubejs:sum');
    event
        .addLootTypeModifier(LootType.FISHING)
        .randomChance(0.08)
        .thenAdd('kubejs:sium');
    event
        .addLootTypeModifier(LootType.CHEST)
        .randomChance(0.0007)
        .thenAdd('mowziesmobs:naga_fang_dagger');
    event
        .addLootTypeModifier(LootType.CHEST)
        .randomChance(0.0007)
        .thenAdd('mowziesmobs:spear');
    event
        .addLootTypeModifier(LootType.CHEST)
        .randomChance(0.0007)
        .thenAdd('minecraft:wooden_sword');
    event
        .addLootTypeModifier(LootType.CHEST)
        .randomChance(0.0007)
        .thenAdd('minecraft:trident');
    event
        .addLootTypeModifier(LootType.CHEST)
        .randomChance(0.0007)
        .thenAdd('stalwart_dungeons:wooden_hammer');
    event
        .addLootTypeModifier(LootType.CHEST)
        .randomChance(0.0007)
        .thenAdd('stalwart_dungeons:stone_hammer');
    event
        .addLootTypeModifier(LootType.CHEST)
        .randomChance(0.0007)
        .thenAdd('stalwart_dungeons:iron_hammer');
    event
        .addLootTypeModifier(LootType.CHEST)
        .randomChance(0.0007)
        .thenAdd('stalwart_dungeons:golden_hammer');
    event
        .addLootTypeModifier(LootType.CHEST)
        .randomChance(0.0007)
        .thenAdd('stalwart_dungeons:diamond_hammer');
    event
        .addLootTypeModifier(LootType.CHEST)
        .randomChance(0.0007)
        .thenAdd('stalwart_dungeons:netherite_hammer');
    event
        .addLootTypeModifier(LootType.CHEST)
        .randomChance(0.0007)
        .thenAdd('aquamirae:whisper_of_the_abyss');
    event
        .addLootTypeModifier(LootType.CHEST)
        .randomChance(0.0007)
        .thenAdd('aquamirae:coral_lance');
    event
        .addLootTypeModifier(LootType.CHEST)
        .randomChance(0.0007)
        .thenAdd('iceandfire:troll_weapon_axe');
    event
        .addLootTypeModifier(LootType.CHEST)
        .randomChance(0.0007)
        .thenAdd('iceandfire:troll_weapon_column');
    event
        .addLootTypeModifier(LootType.CHEST)
        .randomChance(0.0007)
        .thenAdd('iceandfire:troll_weapon_column_forest');
    event
        .addLootTypeModifier(LootType.CHEST)
        .randomChance(0.0007)
        .thenAdd('iceandfire:troll_weapon_column_frost');
    event
        .addLootTypeModifier(LootType.CHEST)
        .randomChance(0.0007)
        .thenAdd('iceandfire:troll_weapon_hammer');
    event
        .addLootTypeModifier(LootType.CHEST)
        .randomChance(0.0007)
        .thenAdd('iceandfire:troll_weapon_trunk');
    event
        .addLootTypeModifier(LootType.CHEST)
        .randomChance(0.0007)
        .thenAdd('iceandfire:troll_weapon_trunk_frost');
    event
        .addLootTypeModifier(LootType.CHEST)
        .randomChance(0.0007)
        .thenAdd('cataclysm:infernal_forge');
    event
        .addLootTypeModifier(LootType.CHEST)
        .randomChance(0.0007)
        .thenAdd('mod_lavacow:moltenhammer');
    event
        .addLootTypeModifier(LootType.CHEST)
        .randomChance(0.0007)
        .thenAdd('mod_lavacow:beast_claw');
    event
        .addLootTypeModifier(LootType.CHEST)
        .randomChance(0.0007)
        .thenAdd('mod_lavacow:skeletonking_mace');
    event
        .addLootTypeModifier(LootType.CHEST)
        .randomChance(0.0007)
        .thenAdd('mod_lavacow:soulfirehammer');
    event
        .addLootTypeModifier(LootType.CHEST)
        .randomChance(0.0007)
        .thenAdd('piglin_expansion:piglin_divinity_staff');
    event
        .addLootTypeModifier(LootType.CHEST)
        .randomChance(0.0007)
        .thenAdd('stalwart_dungeons:tungsten_hammer');
    event
        .addLootTypeModifier(LootType.CHEST)
        .randomChance(0.0007)
        .thenAdd('stalwart_dungeons:nether_hammer');
    event
        .addLootTypeModifier(LootType.CHEST)
        .randomChance(0.0007)
        .thenAdd('meetyourfight:depth_star');
    event
        .addLootTypeModifier(LootType.CHEST)
        .randomChance(0.0007)
        .thenAdd('iceandfire:tide_trident');
    event
        .addLootTypeModifier(LootType.CHEST)
        .randomChance(0.0007)
        .thenAdd('graveyard:bone_dagger');
    event
        .addLootTypeModifier(LootType.CHEST)
        .randomChance(0.0007)
        .thenAdd('aquamirae:poisoned_blade');
    event
        .addLootTypeModifier(LootType.CHEST)
        .randomChance(0.0007)
        .thenAdd('aquamirae:dagger_of_greed');
    event
        .addLootTypeModifier(LootType.CHEST)
        .randomChance(0.0007)
        .thenAdd('aquamirae:divider');
    event
        .addLootTypeModifier(LootType.CHEST)
        .randomChance(0.0007)
        .thenAdd('iceandfire:hippogryph_sword');
    event
        .addLootTypeModifier(LootType.CHEST)
        .randomChance(0.0007)
        .thenAdd('iceandfire:stymphalian_bird_dagger');
    event
        .addLootTypeModifier(LootType.CHEST)
        .randomChance(0.0007)
        .thenAdd('iceandfire:ghost_sword');
    event
        .addLootTypeModifier(LootType.CHEST)
        .randomChance(0.0007)
        .thenAdd('mod_lavacow:famine');
    event
        .addLootTypeModifier(LootType.CHEST)
        .randomChance(0.0007)
        .thenAdd('mod_lavacow:tooth_dagger');
    event
        .addLootTypeModifier(LootType.CHEST)
        .randomChance(0.0007)
        .thenAdd('mod_lavacow:vespa_dagger');
    event
        .addLootTypeModifier(LootType.CHEST)
        .randomChance(0.0007)
        .thenAdd('mod_lavacow:frozen_dagger');
    event
        .addLootTypeModifier(LootType.CHEST)
        .randomChance(0.0007)
        .thenAdd('mod_lavacow:spectral_dagger');
    event
        .addLootTypeModifier(LootType.CHEST)
        .randomChance(0.0007)
        .thenAdd('stalwart_dungeons:awful_dagger');
    event
        .addLootTypeModifier(LootType.CHEST)
        .randomChance(0.0007)
        .thenAdd('minecraft:wooden_sword');
    event
        .addLootTypeModifier(LootType.CHEST)
        .randomChance(0.0007)
        .thenAdd('minecraft:stone_sword');
    event
        .addLootTypeModifier(LootType.CHEST)
        .randomChance(0.0007)
        .thenAdd('minecraft:iron_sword');
    event
        .addLootTypeModifier(LootType.CHEST)
        .randomChance(0.0007)
        .thenAdd('minecraft:golden_sword');
    event
        .addLootTypeModifier(LootType.CHEST)
        .randomChance(0.0007)
        .thenAdd('minecraft:diamond_sword');
    event
        .addLootTypeModifier(LootType.CHEST)
        .randomChance(0.0007)
        .thenAdd('minecraft:netherite_sword');
    event
        .addLootTypeModifier(LootType.CHEST)
        .randomChance(0.0007)
        .thenAdd('savageandravage:cleaver_of_beheading');
    event
        .addLootTypeModifier(LootType.CHEST)
        .randomChance(0.0007)
        .thenAdd('ba_bt:platinum_sword');
    event
        .addLootTypeModifier(LootType.CHEST)
        .randomChance(0.0007)
        .thenAdd('aquamirae:terrible_sword');
    event
        .addLootTypeModifier(LootType.CHEST)
        .randomChance(0.0007)
        .thenAdd('aquamirae:fin_cutter');
    event
        .addLootTypeModifier(LootType.CHEST)
        .randomChance(0.0007)
        .thenAdd('aquamirae:remnants_saber');
    event
        .addLootTypeModifier(LootType.CHEST)
        .randomChance(0.0007)
        .thenAdd('iceandfire:silver_sword');
    event
        .addLootTypeModifier(LootType.CHEST)
        .randomChance(0.0007)
        .thenAdd('iceandfire:copper_sword');
    event
        .addLootTypeModifier(LootType.CHEST)
        .randomChance(0.0007)
        .thenAdd('iceandfire:dragonbone_sword');
    event
        .addLootTypeModifier(LootType.CHEST)
        .randomChance(0.0007)
        .thenAdd('iceandfire:dragonbone_sword_fire');
    event
        .addLootTypeModifier(LootType.CHEST)
        .randomChance(0.0007)
        .thenAdd('iceandfire:dragonbone_sword_ice');
    event
        .addLootTypeModifier(LootType.CHEST)
        .randomChance(0.0007)
        .thenAdd('iceandfire:dragonbone_sword_lightning');
    event
        .addLootTypeModifier(LootType.CHEST)
        .randomChance(0.0007)
        .thenAdd('iceandfire:myrmex_desert_sword');
    event
        .addLootTypeModifier(LootType.CHEST)
        .randomChance(0.0007)
        .thenAdd('iceandfire:myrmex_desert_sword_venom');
    event
        .addLootTypeModifier(LootType.CHEST)
        .randomChance(0.0007)
        .thenAdd('iceandfire:myrmex_jungle_sword');
    event
        .addLootTypeModifier(LootType.CHEST)
        .randomChance(0.0007)
        .thenAdd('iceandfire:myrmex_jungle_sword_venom');
    event
        .addLootTypeModifier(LootType.CHEST)
        .randomChance(0.0007)
        .thenAdd('iceandfire:amphithere_macuahuitl');
    event
        .addLootTypeModifier(LootType.CHEST)
        .randomChance(0.0007)
        .thenAdd('iceandfire:dragonsteel_fire_sword');
    event
        .addLootTypeModifier(LootType.CHEST)
        .randomChance(0.0007)
        .thenAdd('iceandfire:dragonsteel_ice_sword');
    event
        .addLootTypeModifier(LootType.CHEST)
        .randomChance(0.0007)
        .thenAdd('iceandfire:dragonsteel_lightning_sword');
    event
        .addLootTypeModifier(LootType.CHEST)
        .randomChance(0.0007)
        .thenAdd('iceandfire:dread_knight_sword');
    event
        .addLootTypeModifier(LootType.CHEST)
        .randomChance(0.0007)
        .thenAdd('iceandfire:dread_sword');
    event
        .addLootTypeModifier(LootType.CHEST)
        .randomChance(0.0007)
        .thenAdd('iceandfire:dread_queen_sword');
    event
        .addLootTypeModifier(LootType.CHEST)
        .randomChance(0.0007)
        .thenAdd('endrem:end_crystal_sword');
    event
        .addLootTypeModifier(LootType.CHEST)
        .randomChance(0.0007)
        .thenAdd('mod_lavacow:bonesword');
    event
        .addLootTypeModifier(LootType.CHEST)
        .randomChance(0.0007)
        .thenAdd('mod_lavacow:reapers_scythe');
    event
        .addLootTypeModifier(LootType.CHEST)
        .randomChance(0.0007)
        .thenAdd('betterendforge:aeternium_sword');
    event
        .addLootTypeModifier(LootType.CHEST)
        .randomChance(0.0007)
        .thenAdd('betterendforge:thallasium_sword');
    event
        .addLootTypeModifier(LootType.CHEST)
        .randomChance(0.0007)
        .thenAdd('betterendforge:terminite_sword');
    event
        .addLootTypeModifier(LootType.CHEST)
        .randomChance(0.0007)
        .thenAdd('betternether:cincinnasite_sword');
    event
        .addLootTypeModifier(LootType.CHEST)
        .randomChance(0.0007)
        .thenAdd('betternether:cincinnasite_sword_diamond');
    event
        .addLootTypeModifier(LootType.CHEST)
        .randomChance(0.0007)
        .thenAdd('betternether:nether_ruby_sword');
    event
        .addLootTypeModifier(LootType.CHEST)
        .randomChance(0.0007)
        .thenAdd('stalwart_dungeons:tungsten_sword');
    event
        .addLootTypeModifier(LootType.CHEST)
        .randomChance(0.0007)
        .thenAdd('byg:pendorite_sword');
    event
        .addLootTypeModifier(LootType.CHEST)
        .randomChance(0.0007)
        .thenAdd('witherstormmod:command_block_sword');
    event
        .addLootTypeModifier(LootType.CHEST)
        .randomChance(0.0007)
        .thenAdd('meetyourfight:cocktail_cutlass');
    event
        .addLootTypeModifier(LootType.CHEST)
        .randomChance(0.0007)
        .thenAdd('stalwart_dungeons:chorundum_sword');
})