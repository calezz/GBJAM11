import { create } from "zustand";
export const useGameContext = create(
  (set, get) => ({
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
    playerDirection: [0, 0, 1],
    playerAcceleration: 0,
    updatePlayerSpeed: () =>{
    if(get().playerAcceleration===0){
      set((state) => ({
        playerSpeed: Math.max(state.playerSpeed - 1,0),
      }))
    }
    else{
      set((state) => ({
        playerSpeed: state.playerSpeed + state.playerAcceleration,
      }))}
    },
    updatePlayerPosition: () =>
    get().movePlayer([get().playerDirection[0]*get().playerSpeed,
    get().playerDirection[1]*get().playerSpeed,
    get().playerDirection[2]*get().playerSpeed,]),
    addPlayerSpeed:(value) => {if(get().playerSpeed<value){set((state)=>({ playerSpeed: state.playerSpeed+value }))}},
    setPlayerSpeed: (value) => set({ playerSpeed: value }),
    setPlayerDirection: (value) => set({ playerDirection: value }),
    setPlayerAcceleration: (value) => set({ playerAcceleration: value }),
    movePlayer: (value) => {
      //todo factor in block heights? fix outliers in collision
      const playerSize = 16;
      const direction = value.map(
        (value) => (value = value >= 0 === true ? 1 : -1)
      );
      const targetPlayerPosition = get().playerPosition.map(
        (data, index) => data + (playerSize / 2) * direction[index]
      );

      const checkEntities = get().entities.some((entity) =>
        entity.position.every((value, index) => {
          return (
            (targetPlayerPosition[index] - 16 / 2 < value &&
            value < targetPlayerPosition[index] + 16 / 2)|| value === targetPlayerPosition[index]+(playerSize / 2) * -direction[index]
          );
        })
      );
      //console.log(get().entities.filter(entity=>entity.position.every((value, index) => (((targetPlayerPosition[index]-16/2)<=value)&&(value<(targetPlayerPosition[index]+16/2))))))
      if (!checkEntities)
        [
          set((prev) => ({
            playerPosition: [
              prev.playerPosition[0] + value[0],
              prev.playerPosition[1] + value[1],
              prev.playerPosition[2] + value[2],
            ],
          })),
        ];
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
    level: {},
    fetchSprites: async (src) => {
      try {
        const dataPromises = {};
        for (const key in src) {
          const response = await fetch(`/${src[key]}.json`);
          const data = await response.json();
          console.log(key, "KEY");
          if (key === "level") {
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
                      (chunkX + (index % width) + 2 * Z) * 16,
                      (chunkY + Math.floor(index / width) + 2 * Z) * 16,
                      Z * 16,
                    ];
                    if (id !== 92) {
                      set((state) => ({
                        entities: [
                          ...state.entities,
                          {
                            key: [
                              chunkX + (index % width) + 2 * Z,
                              chunkY + Math.floor(index / width) + 2 * Z,
                              Z,
                            ],
                            position: position,
                            id: id,
                            orientation,
                          },
                        ],
                      }));
                    } else {
                      set((state) => ({
                        playerPosition: position,
                        playerEntity: { id, orientation },
                      }));
                    }
                  }
                });
              });
            });
          }

          dataPromises[key] = data;
        }
        set(dataPromises);
        set({ fetched: true });
      } catch (error) {
        console.error("Fetching error:", error);
      }
    },
    //dumb placeholeders
    //GameInstance
    config: {
      src: "tileset",
      spriteSheet: "tileset_main",
    },

    //Gameloop
  }),
  { shallow: true }
);

//instantly fetches needed data
useGameContext
  .getState()
  .fetchSprites({ spriteSheet: "tileset_main", level: "testlvl" });
