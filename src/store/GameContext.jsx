import { create } from "zustand";
export const useGameContext = create(
  (set, get) => ({
    mobs:[],
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
      get().mobs.forEach(input=>{
      const targetPlayerPosition = get()[input].position.map(
        (data, index) => data + get()[input].moving[index]
      );
      const checkEntities = get().entities.filter((entity) =>
        entity.position.every((value, index) => {
          return (
            (targetPlayerPosition[index] - 15 < value &&
              value < targetPlayerPosition[index] + 15) ||
            value === targetPlayerPosition[index]
          );
        })
      );
      const death = checkEntities.some((entity) => entity.id > 116);
      if (checkEntities[0]) {
        set((state) => ({
          [input]: {
            ...state[input],
            moving: state[input].moving.map((value, index) => value * -1),
          },
        }));
      }
      if (death) {
        set((state) => ({
          [input]: { ...state[input], id: state[input].id + 1 },
        }));
      }
      set((state) => ({
        [input]: {
          ...state[input],
          position: state[input].position.map(
            (position, index) => position + state[input].moving[index]
          ),
        },
      }));})
    },

    //console.log(get().entities.filter(entity=>entity.position.every((value, index) => (((targetPlayerPosition[index]-16/2)<=value)&&(value<(targetPlayerPosition[index]+16/2))))))

    fetched: false,
    setFetched: (value) => set({ fetched: value }),
    entities: [],
    playerEntity: {},
    cameraPosition: [],
    playerPosition: [0, 0, 0],
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
          playerSpeed: Math.max(state.playerSpeed - 0.5, 0),
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
      if (get().playerSpeedZ < value) {
        set((state) => ({ playerSpeedZ: state.playerSpeedZ + value }));
      }
    },
    setPlayerSpeed: (value) => set({ playerSpeed: value }),

    setPlayerDirection: (value) => set({ playerDirection: value }),
    setPlayerAcceleration: (value) => set({ playerAcceleration: value }),
    movePlayer: (value) => {
      //todo factor in block heights? fix outliers in collision
      // console.log("move")
      const playerSize = 8; //not used
      const direction = value.map(
        (value) => (value = value >= 0 === true ? 1 : -1)
      ); //not used
      const targetPlayerPosition = get().playerPosition.map(
        (data, index) => data + value[index]
      );

      const checkEntities = get().entities.filter((entity) =>
        entity.position.every((value, index) => {
          return (
            (targetPlayerPosition[index] - 15 < value &&
              value < targetPlayerPosition[index] + 15) ||
            value === targetPlayerPosition[index]
          );
        })
      );
      const death = checkEntities.some((entity) => entity.id > 116);
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
      if (death) {
        get().resetLevel();
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
    fetchSprites: async () => {
      const mobArray=[]
      const buildArray = [];
      const src = get().currentLevel;
      try {
        const dataPromises = {};
        for (const key in src) {
          const response = await fetch(`/${src[key]}.json`);
          const data = await response.json();
          if (key === "level") {
            let mobid=0
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
                      const position = [
                        (chunkX + (index % width) + 1 * Z) * 16,
                        (chunkY + Math.floor(index / width) + 1 * Z) * 16,
                        Z * 16,
                      ];
                      //mobs
                      if (id === 116) {
                        mobid++
                        get().makeMob({
                          name: `mob${mobid}`,
                          position: position,
                          moving: [0, -1, 0],
                          id: id,
                          
                        })
                        mobArray.push(`mob${mobid}`)
                      }
                        else if (id === 118) {
                          mobid++
                          get().makeMob({
                            name: `mob${mobid}`,
                            position: position,
                            moving: [-1, 0, 0],
                            id: id, 
                          })
                          mobArray.push(`mob${mobid}`)
                          }
                         else if (id === 120) {
                            mobid++
                            get().makeMob({
                              name: `mob${mobid}`,
                              position: position,
                              moving: [-1, 1, 0],
                              id: id, 
                            })
                            mobArray.push(`mob${mobid}`)
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
                    }
                  });
                });
              });
            } else {
              data.layers.map((layer, Z) => {
                return layer.layers.map((layer) => {
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
          console.log(mobArray)
          set(() => ({ entities: buildArray,mobs:mobArray}));
          dataPromises[key] = data;
        }
        set(dataPromises);
        set({ fetched: true });
      } catch (error) {
        console.error("Fetching error:", error);
      }
    },
    setLevel: (value) => {
      set((state) => ({
        currentLevel: { ...state.currentLevel, level: value },
        fetched: false,
      }));
    },
    resetLevel: () => {
      set((state) => ({ fetched: false }));
    },
    currentLevel: { spriteSheet: "tileset_main", level: "testlvl" },
    //dumb placeholeders
    //GameInstance
    config: {
      src: "tileset",
      spriteSheet: "tileset_main",
    },

    levelMap: [
      [0, 0, 0, 0, 0],
      [0, 0, "tileshowcase", "testlvl", "testlvl2"],
      [0, 0, 0, 3, 0],
      [0, 7, 6, 5, 0],
    ],
    //Gameloop
  }),
  { shallow: true }
);
