TX = 9
TY = 9

symbol_map = {
    "tbb1": "Tile Shape BrickBlue rx ry tx ty 1",
    
    "tdb1": ["Tile Shape DoorBlue rx ry tx ty 1", "Trigger None rx ry tx ty 1"],
    
    "plr1": "Player rx ry tx ty 48 48 5",
    "plr2": "Player rx ry tx ty 48 48 8",

    "trg2": "Trigger TriggerPurple rx ry tx ty 2",
    "trg3": "Trigger TriggerPurple rx ry tx ty 3",
    "trg4": "Trigger TriggerPurple rx ry tx ty 4",
}

levels = []

levels.append([1, """
DefaultBG #000000

Room 0 0
tbb1 tbb1 tbb1 tbb1 tbb1 tbb1 tbb1 tbb1 tbb1
tbb1 plr1 .... .... .... .... .... .... tbb1
tbb1 .... .... trg3 .... trg4 .... .... tbb1
tbb1 .... .... .... .... .... .... .... tbb1
tbb1 .... .... .... .... .... .... .... tbb1
tbb1 .... .... .... .... .... .... .... tbb1
tbb1 .... .... .... .... .... .... .... tbb1
tbb1 .... .... .... .... .... .... .... tbb1
tbb1 tbb1 tbb1 tbb1 tdb1 tbb1 tbb1 tbb1 tbb1

Room 0 1
.... .... .... .... trg2 .... .... .... ....
"""])

levels.append([2, """
DefaultBG #ffc17a

Room 0 0
tbb1 tbb1 tbb1 tbb1 tbb1 tbb1 tbb1 tbb1 tbb1
tbb1 plr2 .... .... .... .... .... .... tbb1
tbb1 .... .... .... trg3 .... .... .... tbb1
tbb1 .... .... .... .... .... .... .... tbb1
tbb1 .... .... .... trg4 .... .... .... tbb1
tbb1 .... .... .... .... .... .... .... tbb1
tbb1 .... .... .... .... .... .... .... tbb1
tbb1 .... .... .... .... .... .... .... tbb1
tbb1 tbb1 tbb1 tbb1 tdb1 tbb1 tbb1 tbb1 tbb1

Room 0 1
.... .... .... .... trg2 .... .... .... ....
"""])

for [levelNumber, level] in levels:
    rx = None
    ry = None
    ty = None

    with open(f"level{levelNumber}.txt", "w") as file:
        mapped_lines = [[], []]
        
        for level_line in level.split("\n"):
            words = level_line.strip().split(" ")
            if len(words) <= 1:
                continue
            
            if words[0] == "DefaultBG":
                color = words[1]
                file.write(f"DefaultBG {color}\n")
                continue

            if words[0] == "Room":
                rx = int(words[1])
                ry = int(words[2])
                ty = 0
                file.write(f"Room {rx} {ry}\n")
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
            
