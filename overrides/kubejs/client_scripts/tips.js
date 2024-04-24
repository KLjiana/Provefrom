onEvent('item.tooltip', tooltip => {
  tooltip.addAdvanced('#provefrom:weapon', (item, advanced, text) => {
    if(item.nbt){
      if(item.nbt || item.nbt.sword_attribute){
        text.add(Text.gray('-----------------------'))
        text.add(Text.green('可铸造次数: ').append(item.nbt.sword_attribute))
        text.add(Text.gold(`下次成功率: ${item.nbt.succeed}%`))
      }
    }
  })
  
  tooltip.addAdvanced('kubejs:silver_key', (item, advanced, text) => {
    text.add(Text.gray('一把银制的钥匙，应该是用精细的镂花工艺制成的，散发着难以描述的色彩与微光，匙头的位置模糊不清。'))
  })

  tooltip.addAdvanced('kubejs:sium', (item, advanced, text) => {
    text.add(0,Text.of('锐器升级材料').color(0x1E90FF))
  })

  tooltip.addAdvanced('kubejs:bium', (item, advanced, text) => {
    text.add(0,Text.of('钝器升级材料').color(0x9400D3))
  })

  tooltip.addAdvanced('kubejs:sum', (item, advanced, text) => {
    text.add(0,Text.of('利器升级材料').color(0xDC143C))
  })

  tooltip.addAdvanced('kubejs:sium_advanced_orb', (item, advanced, text) => {
    text.add(0,Text.of('锐器进阶宝珠').color(0x1E90FF))
  })

  tooltip.addAdvanced('kubejs:bium_advanced_orb', (item, advanced, text) => {
    text.add(0,Text.of('钝器进阶宝珠').color(0x9400D3))
  })

  tooltip.addAdvanced('kubejs:sum_advanced_orb', (item, advanced, text) => {
    text.add(0,Text.of('利器进阶宝珠').color(0xDC143C))
  })

  tooltip.addAdvanced('kubejs:stay', (item, advanced, text) => {
    text.add(0,Text.of('保护符文').color(0xFFFF33))
  })

  tooltip.addAdvanced('#provefrom:sharps', (item, advanced, text) => {
    text.add(1,Text.of('武器类型：利器').color(0xDC143C).bold(true))
  })

  tooltip.addAdvanced('#provefrom:blunt_instruments', (item, advanced, text) => {
    text.add(1,Text.of('武器类型：钝器').color(0x9400D3).bold(true))
  })

  tooltip.addAdvanced('#provefrom:sharp_weapon', (item, advanced, text) => {
    text.add(1,Text.of('武器类型：锐器').color(0x1E90FF).bold(true))
  })
})