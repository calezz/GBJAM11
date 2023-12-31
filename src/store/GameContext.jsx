import { current } from "immer";
import { create } from "zustand";
export const useGameContext = create(
  (set, get) => ({
    playerPosition: [0, 0, 0],
    mobs: [],
    makeMob: (input) => {
      set((state) => ({
        [input.name]: {
          position: input.position,
          id: input.id,
          defaultState: input.id,
          moving: input.moving,
        },
      }));
    },

    setMob: () => {
      
      let treasure = false
      get().mobs.forEach((input) => {
        
        const targetPlayerPosition = get()[input].position.map(
          (data, index) => data + get()[input].moving[index]);
          if(get()[input].id===131){
          targetPlayerPosition.push(input)
          }
          const checkEntities = get().entities.filter((entity) =>
          entity.position.every((value, index) => {
            return (
              (targetPlayerPosition[index] - 15 < value &&
                value < targetPlayerPosition[index] + 15) ||
                value === targetPlayerPosition[index]
                );
              })
              );
              const playerDeath = get().playerPosition.every((value, index) => {
                return (
                  (targetPlayerPosition[index] - 15 < value &&
                    value < targetPlayerPosition[index] + 15) ||
                    value === targetPlayerPosition[index]
                    );
                  });
                  
        if (checkEntities[0]) {
          set((state) => ({
            [input]: {
              ...state[input],
              moving: state[input].moving.map((value, index) => value * -1),
            },
          }));
        }
       
        if (playerDeath) {
          if(targetPlayerPosition.length<4){
            get().resetLevel();
            const audio = new Audio("death.mp3");
            audio.play();
          }else{
            const audio = new Audio("pickupItem.mp3");
          audio.play();
            set((state)=>({[targetPlayerPosition[3]]:{...state[targetPlayerPosition[3]],position:[10000,0,0]},treasuresTaken:[...state.treasuresTaken,get().currentLevel.arrayPos]
            }))
            if(get().treasuresTaken.length===5){
              set({won:true})
            }
          }
        }
        set((state) => ({
          [input]: {
            ...state[input],
            position: state[input].position.map(
              (position, index) => position + state[input].moving[index]
            ),
          },
        }));
      });
    },
    won:false,
    //console.log(get().entities.filter(entity=>entity.position.every((value, index) => (((targetPlayerPosition[index]-16/2)<=value)&&(value<(targetPlayerPosition[index]+16/2))))))

    fetched: false,
    setFetched: (value) => set({ fetched: value }),
    entities: [],
    playerEntity: {},
    cameraPosition: [],
    playerOrientation: [],
    setPlayerOrientation: (value) => set({ playerOrientation: value }),
    setPlayerState: (value) =>
      set({ playerEntity: { id: value[0], defaultState: value[2] } }),
    playerSpeed: 0,
    playerSpeedZ: 0,
    playerDirection: [0, 0, 0],
    playerAcceleration: 0,
    updatePlayerSpeed: () => {
      if (get().playerAcceleration === 0) {
        set((state) => ({
          playerSpeed: Math.max(state.playerSpeed -1, 0),
        }));
      } else {
        set((state) => ({
          playerSpeed: state.playerSpeed + state.playerAcceleration,
        }));
      }
      set((state) => ({
        playerSpeedZ: Math.max(state.playerSpeedZ - 0.5, 0),
      }));
    },
    updatePlayerPosition: () =>
      get().movePlayer([
        get().playerDirection[0] * get().playerSpeed,
        get().playerDirection[1] * get().playerSpeed,
        get().playerSpeedZ,
      ]),
    addPlayerSpeed: (value) => {
      if (get().playerSpeed < value) {
        set((state) => ({ playerSpeed: state.playerSpeed + value }));
      }
    },
    addPlayerSpeedZ: (value) => {
      if (get().playerSpeedZ === 0) {
        set((state) => ({ playerSpeedZ: state.playerSpeedZ + value }));
      }
    },
    setPlayerSpeed: (value) => set({ playerSpeed: value }),
    setPlayerDirection: (value) => set({ playerDirection: value }),
    setPlayerAcceleration: (value) => set({ playerAcceleration: value }),
    movePlayer: (value) => {
      if(get().playerPosition[2]<-1){
        get().resetLevel()
          const audio = new Audio("death.mp3");
          audio.play();
      }
      const targetPlayerPosition = get().playerPosition.map(
        (data, index) => data + value[index]
      );

      const checkEntities = get().entities.filter((entity) =>
        entity.position.every((value, index) => {
          return (
            (targetPlayerPosition[index] - 10 < value &&
              value < targetPlayerPosition[index] + 10) ||
            value === targetPlayerPosition[index]
          );
        })
      );
     
      //console.log(checkEntities)
      const portal = checkEntities.map((entity) => {
        switch (entity.id) {
          case 19:
            get().moveLevel([0, -1,"S"]);
            return "north";
          case 27:
            get().moveLevel([1, 0,"W"]);
            return "east";
          case 35:
            get().moveLevel([0, 1,"N"]);
            return "south";
          case 46:
            get().moveLevel([-1, 0,"E"]);
            return "west";
        }
      });
      const death = checkEntities.some((entity) => entity.id > 116 &&entity.id!==131);
     const collect = checkEntities.some((entity) => entity.id===131);
      //console.log(get().entities.filter(entity=>entity.position.every((value, index) => (((targetPlayerPosition[index]-16/2)<=value)&&(value<(targetPlayerPosition[index]+16/2))))))
      if (!checkEntities[0])
        [
          set((prev) => ({
            playerPosition: [
              prev.playerPosition[0] + value[0],
              prev.playerPosition[1] + value[1],
              prev.playerPosition[2] + value[2],
            ],
          })),
        ];
        if(collect){
          const audio = new Audio("pickupItem.mp3");
            audio.play();
        }
      if (death) {
        get().resetLevel();
        set({playerSpeed:0,playerAcceleration:0,})
        const audio = new Audio("death.mp3");
          audio.play();
      }
    },
    moveCamera: (value) =>
      set((prev) => ({
        cameraPosition: [
          prev.cameraPosition[0] - value[0],
          prev.cameraPosition[1] - value[1],
        ],
      })),
    //rewrite using promise.all to fetch them in a batch // for .2ms LOADING SPEED IMPROVMENT!
    spriteSheet: {},
    lastFetch:0,
    fetchSprites: async (value) => {

        set(()=>({fetched:false}))

      
      const mobArray = [];
      const buildArray = [];
      const src = get().currentLevel;
      console.log("fetch",src)
      try {
        const dataPromises = {};
        for (const key in src) {
          if (key !== "arrayPos") {
            const response = await fetch(`/${src[key]}.json`);
            const data = await response.json();
            if (key === "level") {
              let mobid = 0;
              if (data.infinite) {
                data.layers.map((layer, Z) => {
                  const width = 16;
                  
                  return layer.chunks.map((chunk) => {
                    const chunkX = chunk.x;
                    const chunkY = chunk.y;

                    return chunk.data.map((id, index) => {
                      if (id !== 0) {
                        let orientation = [1, 1];
                        //transformations
                        if (id > 3221225474) {
                          orientation = [-1, 1];
                          id = id - 3221225474;
                        } else if (id > 2147483648) {
                          orientation = [-1, 1];
                          id = id - 2147483648;
                        } else if (id > 1073741824) {
                          orientation = [1, -1];
                          id = id - 1073741824;
                        }

                        id = (id - 1) / data.tilesets[0].columns + 1;
                        if(id%1>0){
                          id=0
                        }else{

                        
                        const position = [
                          (chunkX + (index % width) + 1 * Z) * 16,
                          (chunkY + Math.floor(index / width) + 1 * Z) * 16,
                          Z * 16,
                        ];
                        //mobs
                        if(id === 131) {
                          const temp = get().currentLevel.arrayPos 
                          const taken = get().treasuresTaken.some(entry=>entry.every((value,index)=>value===temp[index]))
                          if(!taken){
                            mobid++;
                            get().makeMob({
                            name: `mob${mobid}`,
                            position: position,
                            moving: [0,0, 0],
                            id: id,
                          });
                          mobArray.push(`mob${mobid}`);
                        }
                        } 
                        else if (id === 116) {
                          mobid++;
                          get().makeMob({
                            name: `mob${mobid}`,
                            position: position,
                            moving: [0, -1, 0],
                            id: id,
                          });
                          mobArray.push(`mob${mobid}`);
                        } else if (id === 118) {
                          mobid++;
                          get().makeMob({
                            name: `mob${mobid}`,
                            position: position,
                            moving: [-1, 0, 0],
                            id: id,
                          });
                          mobArray.push(`mob${mobid}`);
                        } else if (id === 120) {
                          mobid++;
                          get().makeMob({
                            name: `mob${mobid}`,
                            position: position,
                            moving: [-1, 1, 0],
                            id: id,
                          });
                          mobArray.push(`mob${mobid}`);
                        } 
                        
                          else if (id === 92) {
                          set((state) => ({
                            playerPosition: position,
                            playerEntity: { id, orientation },
                          }));
                        } else {
                          buildArray.push({
                            key: [position[0], position[1], position[2]],
                            position: position,
                            id: id,
                            orientation,
                          });
                        }
                      }}
                    });
                  });
                });
              } else if(!data.infinite) {
                data.layers.forEach((layer, Z) => {
               //   console.log(layer)
                  return layer.layers.forEach((layer) => {
                    const width = data.width;
                    return layer.data.map((id, index) => {
                      if (id !== 0) {
                        let orientation = [1, 1];
                        //transformations
                        if (id > 3221225474) {
                          orientation = [-1, 1];
                          id = id - 3221225474;
                        } else if (id > 2147483648) {
                          orientation = [-1, 1];
                          id = id - 2147483648;
                        } else if (id > 1073741824) {
                          orientation = [1, -1];
                          id = id - 1073741824;
                        }

                        id = (id - 1) / data.tilesets[0].columns + 1;
                        
                        const position = [
                          ((index % width) + 1 * Z) * 16,
                          (Math.floor(index / width) + 1 * Z) * 16,
                          Z * 16,
                        ];
                        //mobs
                        if (id === 116) {
                          get().makeMob({
                            name: "mob2",
                            position: position,
                            moving: [1, 1, 0],
                            id: id,
                          });
                        } if (id === 131) {
                          get().makeMob({
                            name: "mob10",
                            position: position,
                            moving: [0, 0, 0],
                            id: id,
                          });
                        } else if (id === 92) {
                          set((state) => ({
                            playerPosition: position,
                            playerEntity: { id, orientation },
                          }));
                        } else {
                          buildArray.push({
                            key: [position[0], position[1], position[2]],
                            position: position,
                            id: id,
                            orientation,
                          });
                        }
                      }
                    });
                  });
                });
              }
            }
          
            set(() => ({ entities: buildArray, mobs: mobArray }));
            dataPromises[key] = data;

          }
        }
        set(dataPromises);
        set({ fetched: true });
      } catch (error) {
       // setTimeout(()=>{get().fetchSprites()},100)
        console.error("Fetching error:", error);
        console.log(value)
        set({levelCurrent:value})
      }
      set(()=>({lastFetch:new Date()}))
    },
    setLevel: (value) => {
      set((state) => ({
        currentLevel: {
          ...state.currentLevel,
          level: value,
        },
        
      }))
      get().fetchSprites()
    },
    moveLevel: (value) => {
      //[1, 0,"W"]
      const timeNow = new Date()
      if(get().lastFetch===0||(timeNow.getSeconds()-get().lastFetch.getSeconds()>.5)){
      const newPos=get().currentLevel.arrayPos.map((pos,index)=>pos+value[index])
      const levelCurrent = get().currentLevel
      const newLevel=get().levelMap[newPos[1]][newPos[0]]
    //  console.log(get().currentLevel.arrayPos,newPos)
      if(newLevel){
        set((state) => ({
          currentLevel: {
            ...state.currentLevel,
            arrayPos: newPos,
            level: newLevel+value[2],
          },
          playerSpeed:0,
        }))
        get().fetchSprites(levelCurrent)
     //   console.log(newLevel+value[2])
      }}
      },

    resetLevel: () => {
      get().fetchSprites();
    },

    currentLevel: {
      spriteSheet: "tileset_first",
      level: "room09E",
      arrayPos: [4, 3],
    },
    //dumb placeholeders
    //GameInstance
    config: {
      src: "tileset",
      spriteSheet: "tileset_main",
    },
    treasuresTaken:[],
    levelMap: [
    [null,null,null,null,null,null,null,null,null,null],
    [null,null,null   ,       ,       ,       ,null,"       ",null,null],
    [null,null,null   ,"room10","room07","room17","room16","room13",null,null],
    [null,null,"room12","room18","room09","room15","room20",null,null,null],
    [null,null,"room14","room11","room19","room08",null,null,null,null],
    [null,null,null,null,null,null,null,null,null,null],
  ],
    //Gameloop
  }),
  { shallow: true }
);
