TX = 12
TY = 12

symbol_map = {
    "tbrk": "Tile Brick rx ry tx ty 1 1",
    "trtl": "Tile RockTL rx ry tx ty 1 1",
    "trtm": "Tile RockTM rx ry tx ty 1 1",
    "trtr": "Tile RockTR rx ry tx ty 1 1",
    "trbl": "Tile RockBL rx ry tx ty 1 1",
    "trbm": "Tile RockBM rx ry tx ty 1 1",
    "trbr": "Tile RockBR rx ry tx ty 1 1",
    "twtl": "Tile WaterTL rx ry tx ty 1 0",
    "twtm": "Tile WaterTM rx ry tx ty 1 0",
    "twtr": "Tile WaterTR rx ry tx ty 1 0",
    "twml": "Tile WaterML rx ry tx ty 1 0",
    "twmm": "Tile WaterMM rx ry tx ty 1 0",
    "twmr": "Tile WaterMR rx ry tx ty 1 0",
    "twbl": "Tile WaterBL rx ry tx ty 1 0",
    "twbm": "Tile WaterBM rx ry tx ty 1 0",
    "twbr": "Tile WaterBR rx ry tx ty 1 0",
    "tbsh": "Tile Bush rx ry tx ty 0 1",
    "tblk": "Tile Black rx ry tx ty 0 0",
    "ek01": ["NPC Knight rx ry tx ty 0 0 5 2", "Follow 1"],
    "et01": ["NPC Tektite rx ry tx ty 0 0 8 1", "Patrol 2 3 2 7 7 7 7 2"],
    "p001": "Player rx ry tx ty 48 48 3 14"
}

levels = []

levels.append("""
    DefaultBG #ffc17a
    
    0 0 None
    .... .... .... .... .... .... .... .... .... .... .... ....
    .... .... .... .... .... .... .... .... .... .... .... ....
    .... p001 .... .... .... .... .... .... .... .... .... ....
    .... .... .... .... tbsh .... .... twtl twtm twtr .... ....
    .... .... .... tbsh .... .... .... twml twmm twmr .... ....
    .... .... .... .... .... .... .... twbl twbm twbr .... ....
    .... trtl trtm trtr .... .... .... .... .... .... .... ....
    .... trbl trbm trbr .... .... .... .... .... .... .... ....
    .... .... .... .... .... .... .... .... .... .... .... ....
    .... .... .... .... .... .... .... .... .... .... .... ....
    .... .... .... .... ek01 .... .... ek01 .... .... .... ....
    tbrk tbrk tbrk tbrk tbrk .... .... tbrk tbrk tbrk tbrk tbrk

    0 1 #594c3f
    tbrk .... .... .... .... .... .... .... .... .... .... tbrk
    tbrk .... .... .... .... .... .... .... .... .... .... tbrk
    tbrk .... .... .... .... .... .... .... .... .... .... tbrk
    tbrk .... .... .... .... .... .... .... .... .... .... tbrk
    tbrk .... .... .... .... .... .... .... .... .... .... tbrk
    tbrk .... .... .... .... .... .... .... .... .... .... tbrk
    tbrk .... .... .... .... .... .... .... .... .... .... tbrk
    tbrk .... .... .... .... et01 .... .... .... .... .... tbrk
    tbrk .... .... .... .... .... .... .... .... .... .... tbrk
    tbrk .... .... .... .... .... .... .... .... .... .... tbrk
    tbrk .... .... .... .... .... .... .... .... .... .... tbrk
    tbrk tbrk tbrk tbrk tbrk tbrk tbrk tbrk tbrk tbrk tbrk tbrk
""")

for levelIndex in range(len(levels)):
    level = levels[levelIndex]
    rx = None
    ry = None
    ty = None

    with open(f"level{levelIndex + 1}.txt", "w") as file:
        for level_line in level.split("\n"):
            words = level_line.strip().split(" ")
            if len(words) <= 1:
                continue
                
            if len(words) == 2:
                if words[0] == "DefaultBG":
                    color = words[1]
                    file.write(f"DefaultBG {color}\n")
                   
                continue
                    
            if len(words) == 3:
                rx = int(words[0])
                ry = int(words[1])
                ty = 0
                color = words[2];
                file.write(f"Room {rx} {ry} {color}\n")
                continue

            for tx in range(len(words)):
                if words[tx] == "....":
                    continue

                unmapped_lines = symbol_map[words[tx]]
                if type(unmapped_lines) == str:
                   unmapped_lines = [unmapped_lines]
                
                for unmapped in unmapped_lines:
                    mapped = unmapped.replace("rx", str(rx)).replace("ry", str(ry)).replace("tx", str(tx)).replace("ty", str(ty))
                    file.write(f"{mapped}\n")

            ty += 1
