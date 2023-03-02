TX = 10
TY = 10

symbol_map = {
    "tb11": "Tile Brick rx ry tx ty 1 1",
    "ek01": "NPC Knight rx ry tx ty 0 0 5 2\nFollow 1",
    "et01": "NPC Tektite rx ry tx ty 0 0 8 1\nPatrol 2 3 2 7 7 7 7 2",
    "p001": "Player rx ry tx ty 48 48 3 14"
}

levels = []

levels.append("""
    0 0
    .... .... .... .... .... .... .... .... .... ....
    .... p001 .... .... .... .... .... .... .... ....
    .... .... .... .... .... .... .... .... .... ....
    .... .... .... .... .... .... .... .... .... ....
    .... .... .... .... .... .... .... .... .... ....
    .... .... .... .... .... .... .... .... .... ....
    .... .... .... .... .... .... .... .... .... ....
    .... .... .... .... .... .... .... .... .... ....
    .... .... .... ek01 .... .... ek01 .... .... ....
    tb11 tb11 tb11 tb11 .... .... tb11 tb11 tb11 tb11

    0 1
    tb11 .... .... .... .... .... .... .... .... tb11
    tb11 .... .... .... .... .... .... .... .... tb11
    tb11 .... .... .... .... .... .... .... .... tb11
    tb11 .... .... .... .... .... .... .... .... tb11
    tb11 .... .... .... .... .... .... .... .... tb11
    tb11 .... .... .... .... .... .... .... .... tb11
    tb11 .... .... .... .... .... .... .... .... tb11
    tb11 .... .... .... .... et01 .... .... .... tb11
    tb11 .... .... .... .... .... .... .... .... tb11
    tb11 tb11 tb11 tb11 tb11 tb11 tb11 tb11 tb11 tb11
""")

for levelIndex in range(len(levels)):
    level = levels[levelIndex]
    rx = None
    ry = None
    ty = None

    with open(f"level{levelIndex + 1}.txt", "w") as file:
        for line in level.split("\n"):
            words = line.strip().split(" ")
            if len(words) < 2:
                continue
            if len(words) == 2:
                rx = int(words[0])
                ry = int(words[1])
                ty = 0
                continue

            for tx in range(len(words)):
                if words[tx] == "....":
                    continue

                r = symbol_map[words[tx]]
                r = r.replace("rx", str(rx)).replace("ry", str(ry)).replace("tx", str(tx)).replace("ty", str(ty))
                file.write(f"{r}\n")

            ty += 1
