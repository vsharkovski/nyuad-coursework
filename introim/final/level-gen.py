TX = 9
TY = 9

symbol_map = {
    "nbub": ["NPC Shape Bubble rx ry tx ty 1"],
    
    "plr1": "Player Animation Fish rx ry tx ty 48 48 5",
    "tuw1": "Tile Animation GreenRock rx ry tx ty 1",
    "tud1": ["Tile Animation GreyRock rx ry tx ty 1"],
    "tcrl": "Tile Animation Coral rx ry tx ty 1",
    "nff1": ["NPC Animation FishFood rx ry tx ty 1 1 0"],
    "nff2": ["NPC Animation FishFood rx ry tx ty 1 0 0", "AI Random 3"],

    "plr2": "Player Animation Toad rx ry tx ty 48 54 5",
    "tcw1": "Tile Animation BrownBrick rx ry tx ty 1",
    "tcd1": ["Tile Animation RedTreeEyes rx ry tx ty 1"],
    "tcg1": "Tile Animation Asphalt rx ry tx ty 0",
    "ncr3": ["NPC Animation Car3 rx ry tx ty 1 0 1", "AI Random 5"],
    "nmn1": ["NPC Animation Coin rx ry tx ty 1 1 0"],
    "ncr1": ["NPC Animation Car1 rx ry tx ty 1 0 0", "AI Follow 1"],

    "plr3": "Player Animation Santa rx ry tx ty 48 48 5",
    "tsw1": "Tile Animation Ice rx ry tx ty 1",
    "tsd1": ["Tile Animation BlueBlock rx ry tx ty 1"],
    "nsm1": ["NPC Animation Snowman rx ry tx ty 1 0 1"],
    "ngft": ["NPC Animation Gift rx ry tx ty 1 1 0"],

    "nsm2": ["NPC Animation Snowman rx ry tx ty 1 1 1", "AI Follow 1"],
    "nmn2": ["NPC Animation Coin rx ry tx ty 1 1 0", "AI Random 2"],

    "trg2": "Trigger None None rx ry tx ty 2",
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
tuw1 .... .... .... .... .... .... .... tuw1
tuw1 .... .... .... .... nff1 .... .... tuw1
tuw1 .... .... nff1 .... tcrl .... .... tuw1
tuw1 .... .... tcrl .... tcrl .... nff1 tuw1
tuw1 .... .... tcrl .... tcrl .... tuw1 tuw1
tuw1 .... nff1 tuw1 .... tcrl tuw1 tuw1 tuw1
tuw1 plr1 tuw1 tuw1 .... tuw1 tuw1 tuw1 tuw1
tuw1 tuw1 tuw1 tuw1 tud1 tuw1 tuw1 tuw1 tuw1

Room 0 1
tuw1 tuw1 tuw1 tuw1 .... tuw1 tuw1 tuw1 tuw1
tuw1 .... .... .... .... .... .... .... tuw1
tuw1 .... .... tcrl tcrl tcrl .... .... tuw1
tuw1 .... tcrl tcrl .... tcrl .... .... tuw1
tuw1 .... tcrl .... .... tcrl tcrl .... tuw1
tuw1 .... tcrl .... .... .... tcrl .... tuw1
tuw1 .... tcrl .... .... .... tcrl .... tuw1
tuw1 .... tcrl .... .... .... .... .... tuw1
tuw1 tuw1 tuw1 tuw1 .... tuw1 tuw1 tuw1 tuw1
"""])

levels.append([2, """
DefaultBG darkgreen

Room 0 0
tcw1 tcw1 tcw1 tcw1 tcw1 tcw1 tcw1 tcw1 tcw1
tcw1 nmn1 .... tcg1 tcg1 .... .... nmn1 tcw1
tcw1 .... .... tcg1 tcg1 .... .... .... tcw1
tcw1 nmn1 ncr3 tcg1 tcg1 .... ncr3 .... tcd1
tcw1 .... .... tcg1 tcg1 .... .... .... tcd1
tcw1 nmn1 .... tcg1 tcg1 ncr3 .... .... tcw1
tcw1 .... .... tcg1 tcg1 .... tcw1 .... tcw1
tcw1 nmn1 .... tcg1 tcg1 .... tcw1 plr2 tcw1
tcw1 tcw1 tcw1 tcw1 tcw1 tcw1 tcw1 tcw1 tcw1

Room 1 0
tcw1 tcw1 tcw1 tcw1 tcw1 tcw1 tcw1 tcw1 tcw1
tcw1 .... tcd1 .... ncr1 .... ncr1 .... tcw1
tcw1 .... tcd1 .... .... .... .... .... tcw1
.... .... tcw1 .... .... .... .... .... tcw1
.... .... tcw1 .... .... .... .... .... tcw1
tcw1 .... tcw1 .... .... .... .... .... tcw1
tcw1 .... tcw1 .... .... .... .... .... ....
tcw1 .... tcw1 .... ncr1 .... ncr1 .... tcw1
tcw1 tcw1 tcw1 tcw1 tcw1 tcw1 tcw1 tcw1 tcw1
"""])

levels.append([3, """
DefaultBG white

Room 0 0
tsw1 tsw1 tsw1 tsw1 tsw1 tsw1 tsw1 tsw1 tsw1
tsw1 .... .... .... .... .... .... plr3 tsw1
tsw1 .... .... .... .... .... .... .... tsw1
tsw1 nsm1 .... .... .... nsm1 .... .... tsw1
tsw1 .... ngft ngft ngft .... .... .... tsw1
tsw1 .... ngft ngft ngft .... .... .... tsd1
tsw1 .... ngft ngft ngft .... .... .... tsd1
tsw1 nsm1 .... .... .... nsm1 .... .... tsw1
tsw1 tsw1 tsw1 tsw1 tsw1 tsw1 tsw1 tsw1 tsw1
"""])

levels.append([4, """
DefaultBG royalblue

Room 0 0
tuw1 tuw1 tuw1 tuw1 tuw1 tuw1 tuw1 tuw1 tuw1
tuw1 nmn1 .... nmn1 nmn1 .... nmn1 .... tuw1
tuw1 .... .... .... .... .... .... .... tuw1
tuw1 .... .... .... .... .... tcrl .... tuw1
tuw1 .... .... ncr1 .... .... tcrl .... tuw1
tuw1 .... .... .... .... .... tcrl .... tuw1
tuw1 .... .... .... .... .... tcrl .... tuw1
tuw1 ngft .... ngft .... ngft tcrl plr1 tuw1
tuw1 tuw1 tuw1 tuw1 tuw1 tud1 tuw1 tuw1 tuw1
"""])

levels.append([5, """
DefaultBG white

Room 0 0

tsw1 tsw1 tsw1 tsw1 tsd1 tsd1 tsw1 tsw1 tsw1
tsw1 plr3 .... .... .... .... .... .... tsw1
tsw1 .... .... .... .... .... .... .... tsw1
tsw1 .... .... nmn2 nmn2 nmn2 .... .... tsw1
tsw1 .... .... nmn2 ngft nmn2 .... .... tsw1
tsw1 .... .... nmn2 ngft nmn2 .... .... tsw1
tsw1 .... .... nmn2 nmn2 nmn2 .... .... tsw1
tsw1 .... nsm2 .... .... .... nsm2 .... tsw1
tsw1 tsw1 tsw1 tsw1 tsw1 tsw1 tsw1 tsw1 tsw1
"""])

levels.append([6, """
DefaultBG darkgreen

Room 0 0
tcw1 tcw1 tcw1 tcw1 tcw1 tcw1 tcw1 tcw1 tcw1
tcw1 nff1 tcw1 nsm2 .... .... nmn2 nmn2 tcw1
tcw1 .... .... .... .... .... nmn2 nmn2 tcw1
tcw1 .... .... .... .... tcw1 tcw1 tcw1 tcw1
tcw1 .... tcw1 nff1 .... .... .... .... tcw1
tcw1 .... tcw1 .... .... tcw1 ngft .... nsm2
tcw1 .... tcw1 nff1 .... tcw1 .... .... ....
tcw1 plr2 tcw1 .... .... .... .... .... tcw1
tcw1 tcw1 tcw1 tcw1 tcw1 tcw1 tcw1 tcw1 tcw1

Room 1 0
tcw1 tcw1 tcw1 tcw1 tcw1 tcw1 tcw1 tcw1 tcw1
tcw1 .... .... .... tcg1 tcg1 .... .... tcw1
tcw1 .... .... ncr3 tcg1 tcg1 .... .... tcw1
tcw1 .... .... .... tcg1 tcg1 .... .... tcw1
tcw1 .... .... .... tcg1 tcg1 .... .... tcw1
.... .... tcw1 .... tcg1 tcg1 .... .... tcw1
.... .... tcw1 .... tcg1 tcg1 ncr3 .... tcw1
tcw1 .... tcw1 ncr1 tcg1 tcg1 .... ncr1 tcw1
tcw1 tcw1 tcw1 tcw1 tcw1 tcd1 tcw1 tcw1 tcw1

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
            
