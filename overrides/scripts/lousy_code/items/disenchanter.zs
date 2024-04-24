var egg  = <item:iceandfire:dragonegg_red>  | <item:iceandfire:dragonegg_green>  | <item:iceandfire:dragonegg_bronze>  | <item:iceandfire:dragonegg_gray>  | <item:iceandfire:dragonegg_blue>  | <item:iceandfire:dragonegg_white>  | <item:iceandfire:dragonegg_black>  | <item:iceandfire:dragonegg_amythest>  | <item:iceandfire:dragonegg_electric>  | <item:iceandfire:dragonegg_silver>  | <item:iceandfire:dragonegg_sapphire>  | <item:iceandfire:dragonegg_copper> ;

craftingTable.addShaped("disenchanter", <item:disenchanting:disenchanter>, [
    [<item:minecraft:air>, <item:minecraft:anvil>, <item:minecraft:air>],
    [egg, <item:minecraft:enchanting_table>, egg],
    [<item:minecraft:obsidian>, <item:minecraft:obsidian>, <item:minecraft:obsidian>]
]);