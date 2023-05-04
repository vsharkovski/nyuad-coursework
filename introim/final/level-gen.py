TX = 9
TY = 9

symbol_map = {
    "tuw1": "Tile Shape UnderwaterWall rx ry tx ty 1",
    "tud1": ["Tile Shape UnderwaterDoor rx ry tx ty 1", "Trigger None None rx ry tx ty 1"],
    "nbub": ["NPC Shape Bubble rx ry tx ty 1"],

    "tcw1": "Tile Shape CityWall rx ry tx ty 1",
    "tcd1": ["Tile Shape CityDoor rx ry tx ty 1", "Trigger None None rx ry tx ty 1"],

    "tsw1": "Tile Shape SnowWall rx ry tx ty 1",
    "tsd1": ["Tile Shape SnowDoor rx ry tx ty 1", "Trigger None None rx ry tx ty 1"],

    "plr1": "Player rx ry tx ty 48 48 5",
    "plr2": "Player rx ry tx ty 48 48 8",

    "trg2": "Trigger Shape TriggerPurple rx ry tx ty 2",
    "trg3": "Trigger Shape TriggerPurple rx ry tx ty 3",
    "trg4": "Trigger Shape TriggerPurple rx ry tx ty 4",
    "trg5": "Trigger Shape TriggerPurple rx ry tx ty 5",
    "trg6": "Trigger Shape TriggerPurple rx ry tx ty 6",
    "trg7": "Trigger Shape TriggerPurple rx ry tx ty 7",
    "trg8": "Trigger Shape TriggerPurple rx ry tx ty 8",
}

levels = []

levels.append([1, """
DefaultBG royalblue

Room 0 0
tuw1 tuw1 tuw1 tuw1 tuw1 tuw1 tuw1 tuw1 tuw1
tuw1 plr1 .... .... .... .... .... .... tuw1
tuw1 .... nbub trg3 tuw1 trg4 .... .... tuw1
tuw1 .... nbub .... tuw1 nbub .... .... tuw1
tuw1 .... tuw1 nbub trg5 .... nbub .... tuw1
tuw1 .... .... tuw1 tuw1 tuw1 nbub .... tuw1
tuw1 .... .... nbub trg6 nbub .... .... tuw1
tuw1 .... .... .... .... .... .... .... tuw1
tuw1 tuw1 tuw1 tuw1 tud1 tuw1 tuw1 tuw1 tuw1

Room 0 1
.... .... .... .... trg2 .... .... .... ....
"""])

levels.append([2, """
DefaultBG dimgrey

Room 0 0
tcw1 tcw1 tcw1 tcw1 tcw1 tcw1 tcw1 tcw1 tcw1
tcw1 plr2 .... .... .... .... .... .... tcw1
tcw1 .... .... .... trg3 .... .... .... tcw1
tcw1 .... .... .... .... .... .... .... tcw1
tcw1 .... .... .... trg4 .... .... .... tcw1
tcw1 .... .... .... .... .... .... .... tcw1
tcw1 .... .... .... .... .... .... .... tcw1
tcw1 .... .... .... .... .... .... .... tcw1
tcw1 tcw1 tcw1 tcw1 tcd1 tcw1 tcw1 tcw1 tcw1

Room 0 1
.... .... .... .... trg2 .... .... .... ....
"""])

levels.append([3, """
DefaultBG white

Room 0 0
tsw1 tsw1 tsw1 tsw1 tsw1 tsw1 tsw1 tsw1 tsw1
tsw1 plr1 .... .... .... .... .... .... tsw1
tsw1 .... .... .... .... .... .... .... tsw1
tsw1 .... .... .... .... .... .... .... tsw1
tsw1 .... .... .... .... .... .... .... tsw1
tsw1 .... trg3 .... .... .... trg4 .... tsw1
tsw1 .... .... .... .... .... .... .... tsw1
tsw1 .... .... .... .... .... .... .... tsw1
tsw1 tsw1 tsw1 tsw1 tsd1 tsw1 tsw1 tsw1 tsw1

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
                    if word != "....":
                        print(f"Symbol not found: {word} at room ({rx}, {ry}), tile ({tx}, {ty})")
                    
                    continue

                unmapped_lines = symbol_map[word]
                index = 1
                if type(unmapped_lines) == str:
                    unmapped_lines = [unmapped_lines]
                    index = 0
                
                string_map = {
                    " rx ": f" {str(rx)} ",
                    " ry ": f" {str(ry)} ",
                    " tx ": f" {str(tx)} ",
                    " ty ": f" {str(ty)} "
                }

                for unmapped in unmapped_lines:
                    mapped = unmapped
                    for (a, b) in string_map.items():
                        mapped = mapped.replace(a, b)

                    mapped_lines[index].append(mapped)
            
            ty += 1
        
        for lst in mapped_lines:
            for line in lst:
               file.write(f"{line}\n")
            
