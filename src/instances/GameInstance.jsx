import LevelCamera from "../instances/LevelCamera";
export default function GameInstance(){
    return(<>
    <div>
        {" "}
        <LevelCamera
          config={{
            name: "tileshowcase",
            src: "tileset",
            spriteSheet: "main_char",
          }}
        />
      </div>
    </>)
}