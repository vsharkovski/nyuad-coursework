TX = 12
TY = 12

symbol_map = {
    "tinv": "Tile None rx ry tx ty 1 0",
    "tbb1": "Tile BrickBlue1 rx ry tx ty 1 1",
    "tbb2": "Tile BrickBlue2 rx ry tx ty 1 1",
    "tbr1": "Tile BrickRed1 rx ry tx ty 1 1",
    "tbr2": "Tile BrickRed2 rx ry tx ty 1 1",
    "tdbl": "Tile DoorBlueLeft rx ry tx ty 1 1",
    "tdrt": "Tile DoorRedTop rx ry tx ty 1 1",
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
    "hrt0": "Tile Heart rx ry tx ty 0 0",
    "hrt1": "Tile Heart rx ry tx ty 1 0",
    "keyb": "Tile KeyBlue rx ry tx ty 0 0",
    "keyr": "Tile KeyRed rx ry tx ty 0 0",
    "nk01": ["NPC Knight rx ry tx ty 1 0 5 2", "Follow 1 7"],
    "nk02": ["NPC Knight rx ry tx ty 1 0 5 3", "Patrol 1.3 2 6 3 6 8", "Follow 1.5 2"],
    "nk03": ["NPC Knight rx ry tx ty 1 0 5 3", "Patrol 1.3 2 2 8 7 8", "Follow 1.5 2"],
    "nt01": ["NPC Tektite rx ry tx ty 1 1 8 4", "Patrol 3 4 2 2 2 9 9 9 9 2"],
    "nt02": ["NPC Tektite rx ry tx ty 1 0 3 3", "Follow 2 4"],
    "nt03": ["NPC TektiteDark rx ry tx ty 1 0 4 3", "Follow 2.5 7"],
    "p001": "Player rx ry tx ty 48 48 3 14"
}

levels = []

levels.append("""
DefaultBG #ffc17a

0 0 None
trbm trbm trbm trbm trbm trbm trbm trbm trbm trbm trbm trbm
trbm trbr .... .... .... .... .... .... .... .... trbl trbm 
trbm .... p001 .... .... .... .... .... .... .... .... trbm 
trbm .... .... .... .... .... .... .... .... .... .... trbl
trbm .... .... .... .... .... .... twtl twtm twtm twtm twtm
trbm .... .... .... .... .... .... twml twmm twmm twmm twmm
trbm .... .... .... .... .... .... twml twmm twmm twmm twmm
trbm .... .... .... .... .... .... twbl twbm twbm twbm twbm 
trbm .... .... .... .... .... .... .... .... .... .... trtl 
trbm .... .... .... .... .... .... .... .... .... .... trbm 
trbm .... .... .... .... .... .... .... .... .... .... trbm
trbm .... .... .... .... .... .... .... .... .... .... trbm

0 1 None
trbm .... .... .... .... .... .... .... .... .... .... trbm
trbm .... .... .... .... .... .... .... .... .... .... trbm
trbm .... .... .... .... .... .... .... .... .... .... trbm
trbm .... .... .... tbsh tbsh tbsh .... .... .... .... trbm
trbm .... .... .... .... .... tbsh tbsh tbsh .... .... trbm
trbm trtr .... .... .... .... .... .... .... .... .... trbm
trbm trbm trtm trtr .... .... .... .... .... .... .... trbm
trbm trbm trbm trbr .... .... .... .... .... .... .... trbm
trbm .... .... .... .... .... .... .... .... .... .... trbm
trbm .... .... .... .... .... .... .... .... .... .... trbm
trbr .... .... .... nk01 .... .... nk01 .... .... .... trbl
tbb1 tbb1 tbb1 tbb1 tbb1 .... .... tbb1 tbb1 tbb1 tbb1 tbb1

0 2 #5b687d
tbb1 tbb1 tbb1 tbb1 tbb1 .... .... tbb1 tbb1 tbb1 tbb1 tbb1
tbb1 .... .... .... .... .... .... .... .... .... .... tbb1
tbb1 .... nt01 .... .... .... .... .... .... .... .... tbb1
tbb1 .... .... .... .... .... .... .... .... .... .... tbb1
tbb1 .... .... .... tbb2 .... .... tbb2 .... .... .... tbb1
.... .... .... .... .... .... .... .... .... .... .... tdbl
.... .... .... .... .... nt02 .... .... .... .... .... tdbl
tbb1 .... .... .... tbb2 .... .... tbb2 .... .... .... tbb1
tbb1 .... .... .... .... .... .... .... .... .... .... tbb1
tbb1 .... .... .... .... .... .... .... .... .... .... tbb1
tbb1 .... .... .... .... .... .... .... .... .... .... tbb1
tbb1 tbb1 tbb1 tbb1 tbb1 tdrt tdrt tbb1 tbb1 tbb1 tbb1 tbb1

-1 2 #5b687d
tbb1 tbb1 tbb1 tbb1 tbb1 tbb1 tbb1 tbb1 tbb1 tbb1 tbb1 tbb1
tbb1 .... .... tbb2 .... .... .... .... .... .... .... tbb1
tbb1 .... .... tbb2 .... .... .... .... .... .... .... tbb1
tbb1 .... .... tbb2 .... .... nk02 .... .... .... .... tbb1
tbb1 .... .... tbb2 .... .... .... .... .... .... .... tbb1
.... .... .... tbb2 .... .... .... .... tbb2 .... .... ....
.... .... .... tbb2 .... .... .... .... tbb2 .... .... ....
tbb1 .... .... .... .... .... .... .... tbb2 .... .... tbb1
tbb1 .... .... .... .... nk03 .... .... tbb2 .... .... tbb1
tbb1 .... .... .... .... .... .... .... tbb2 .... .... tbb1
tbb1 .... .... .... .... .... .... .... tbb2 .... .... tbb1
tbb1 tbb1 tbb1 tbb1 tbb1 tbb1 tbb1 tbb1 tbb1 tbb1 tbb1 tbb1

-2 2 #5b687d
tbb1 tbb1 tbb1 tbb1 tbb1 tbb1 tbb1 tbb1 tbb1 tbb1 tbb1 tbb1
tbb1 .... .... twml twmr .... .... .... .... .... .... tbb1
tbb1 .... .... twml twmr .... .... .... .... .... .... tbb1
tbb1 .... .... twml twmr .... .... .... .... .... .... tbb1
tbb1 .... .... twml twmr .... .... .... .... .... .... tbb1
tbb1 .... nt03 twml twmr .... .... .... .... .... .... ....
tbb1 .... .... twml twmr .... keyb .... .... .... .... ....
tbb1 .... .... twml twmr .... .... .... .... .... .... tbb1
tbb1 .... .... twml twmr .... .... .... .... .... .... tbb1
tbb1 .... .... twml twmr .... .... .... .... .... .... tbb1
tbb1 .... .... twml twmr .... .... .... .... .... .... tbb1
tbb1 tbb1 tbb1 tbb1 tbb1 tbb1 tbb1 tbb1 tbb1 tbb1 tbb1 tbb1

1 2 #5b687d
tbb1 tbb1 tbb1 tbb1 tbb1 tbb1 tbb1 tbb1 tbb1 tbb1 tbb1 tbb1
tbb1 .... .... .... .... .... .... .... .... .... .... tbb1
tbb1 .... .... .... .... .... .... .... .... .... .... tbb1
tbb1 .... .... .... .... .... .... .... .... .... .... tbb1
tbb1 .... .... .... .... .... keyr .... .... .... .... tbb1
.... .... .... .... .... .... .... .... .... .... .... tbb1
.... .... .... .... .... .... .... .... .... .... .... tbb1
tbb1 .... .... .... .... .... hrt0 .... .... .... .... tbb1
tbb1 .... .... .... .... .... .... .... .... .... .... tbb1
tbb1 .... .... .... .... .... .... .... .... .... .... tbb1
tbb1 .... .... .... .... .... .... .... .... .... .... tbb1
tbb1 tbb1 tbb1 tbb1 tbb1 tbb1 tbb1 tbb1 tbb1 tbb1 tbb1 tbb1
""")

for levelIndex in range(len(levels)):
    level = levels[levelIndex]
    rx = None
    ry = None
    ty = None

    with open(f"level{levelIndex + 1}.txt", "w") as file:
        mapped_lines = [[], []]
        
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
                word = words[tx]
                if word not in symbol_map:
                    continue

                unmapped_lines = symbol_map[word]
                index = 1
                if type(unmapped_lines) == str:
                    unmapped_lines = [unmapped_lines]
                    index = 0
                
                for unmapped in unmapped_lines:
                    mapped = unmapped.replace("rx", str(rx)).replace("ry", str(ry)).replace("tx", str(tx)).replace("ty", str(ty))
                    mapped_lines[index].append(mapped)
            
            ty += 1
        
        for lst in mapped_lines:
            for line in lst:
                file.write(f"{line}\n")
            
