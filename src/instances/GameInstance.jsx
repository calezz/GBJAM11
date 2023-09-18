import LevelCamera from "../instances/LevelCamera";
export default function GameInstance(){
    return(<>
    <div>
        {" "}
        <LevelCamera
          config={{
            name: "floortest",
            src: "placeholder",
            spriteSheet: "main_char",
          }}
        />
      </div>
    </>)
}