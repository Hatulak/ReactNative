import {Alert} from 'react-native';
import {
  accelerometer,
  setUpdateIntervalForType,
  SensorTypes,
} from 'react-native-sensors';
setUpdateIntervalForType(SensorTypes.accelerometer, 30);
let lifes = 3;
let score = 0;

const VirusSpawner = (entities, {touches, time}) => {
  // petla logiki jest uruchamiana co 16ms... w teorii, w praktyce sa to pobozne zyczenia
  // i odstep czasowy miedzy kolejnymi wywolaniami tej funckji moze wyniesc nawet 100-200ms szczegolnie w emulatorach
  // co skutkowałoby plynnoscią animacji na poziomie 5-10FPS dlatego zamiast bezposrednio kontrolować pozycję obiektow sceny
  // w petli logiki, lepiej jedynie w niej inicjowac i kontrolować przebieg animacji a sama petla animacji jest realizowana
  // wewnętrznie asynchronicznie ze wsparciem sprzętowym => patrz komponenty Animated w renderers.js

  entities[6].lifes = lifes;
  entities[6].score = score;

  for (var key in entities)
    if (entities[key].type == 'v') {
      // wirusy

      if (!entities[2].accelerometerSubscribed) {
        entities[2].accelerometerSubscribed = true;
        const subscription = accelerometer.subscribe(({x, y, z}) => {
          // console.log('x: ' + x + ' y: ' + y + ' z: ' + z);
          entities[2].position = [
            entities[2].position[0] - x * 2 ,
            entities[2].position[1] + y * 2,
          ];
        });
      }

      let id = entities[key].id;

      if (renderers[id] && renderers[id].isMoving) {
        // porusza sie
        // przyblizona (ostatnia) pozycja y wirusa
        // _animatedValue jest uaktualnane asynchronicznie callbackiem
        //console.log(renderers[id]._animatedValue);

        let x = entities[id].position[0] + 40;
        let y = 684 * renderers[id]._animatedValue + 40;

        if (
          Math.abs(entities[2].position[0] + 64 - x) < 64 &&
          Math.abs(entities[2].position[1] + 204 - y) < 64
        ) {
          if (!entities[id].hover) {
            entities[id].hover = 1;
            score += 1;
            lifes -= 1;
            if (lifes == 0) {
              Alert.alert(
                'Porażka',
                'Skończyły się życia :(',
                [
                  {
                    text: 'Restart',
                    onPress: () => {
                      lifes = 3;
                      score = 0;
                    },
                    style: 'cancel',
                  },
                ],
                {cancelable: false},
              );
            }
          }
          entities[id].hit = 1;
        }

        if (entities[2].shooting) {
          if (
            Math.abs(entities[2].position[0] + 64 - x) < 32 &&
            Math.abs(entities[2].position[1] + 104 - y) < 64
          ) {
            if (!entities[id].hover) {
              entities[id].hover = 1;
              score += 1;
            }
            entities[id].hit = 1;
          }
        }
      }

      if (renderers[id] && !renderers[id].isMoving) {
        // "uspiony" za krawedzią ekranu
        let d = 1000 * Math.random();
        if (d < 10) {
          // czestotliwosc wypuszczania nowych wirusow = 10/1000 = 0.01 (czyli 1 raz na 100 tikow)
          entities[id].position = [(412 - 80) * Math.random(), 0]; // losowa pozycja x
          entities[id].hit = 0;
          entities[id].hover = 0;
          renderers[id].play(4000 + 4000 * Math.random()); // losowy czas animacji (przelotu przez cały ekran) 4-8s
        }
      }
    }

  return entities;
};

const PillSpawner = (entities, {touches, time}) => {
  // petla logiki jest uruchamiana co 16ms... w teorii, w praktyce sa to pobozne zyczenia
  // i odstep czasowy miedzy kolejnymi wywolaniami tej funckji moze wyniesc nawet 100-200ms szczegolnie w emulatorach
  // co skutkowałoby plynnoscią animacji na poziomie 5-10FPS dlatego zamiast bezposrednio kontrolować pozycję obiektow sceny
  // w petli logiki, lepiej jedynie w niej inicjowac i kontrolować przebieg animacji a sama petla animacji jest realizowana
  // wewnętrznie asynchronicznie ze wsparciem sprzętowym => patrz komponenty Animated w renderers.js

  for (var key in entities)
    if (entities[key].type == 'p') {
      // tabletki

      let id = entities[key].id;

      if (renderers[id] && renderers[id].isMoving) {
        let x = entities[id].position[0] + 40;
        let y = 684 * renderers[id]._animatedValue + 40;

        if (
          Math.abs(entities[2].position[0] + 64 - x) < 64 &&
          Math.abs(entities[2].position[1] + 204 - y) < 64
        ) {
          if (!entities[id].hover) {
            entities[id].hover = 1;
            entities[id].dead = 2; //Tabletka pobrana
            lifes += 1;
          }

          entities[id].hit = 1;
        }

        if (entities[2].shooting) {
          if (
            Math.abs(entities[2].position[0] + 64 - x) < 32 &&
            Math.abs(entities[2].position[1] + 104 - y) < 64
          ) {
            if (!entities[id].hover) {
              entities[id].hover = 1;
              entities[id].dead = 1; //Tabletka zastrzelona nie doda życia :(
            }
            entities[id].hit = 1;
          }
        }
      }

      if (renderers[id] && !renderers[id].isMoving) {
        // "uspiony" za krawedzią ekranu
        let d = 3000 * Math.random();
        if (d < 10) {
          // czestotliwosc wypuszczania nowych wirusow = 10/1000 = 0.01 (czyli 1 raz na 100 tikow)
          entities[id].position = [(412 - 80) * Math.random(), 0]; // losowa pozycja x
          entities[id].hit = 0;
          entities[id].hover = 0;
          entities[id].dead = 0;
          renderers[id].play(2000 + 2000 * Math.random()); // losowy czas animacji (przelotu przez cały ekran) 4-8s
        }
      }
    }

  return entities;
};

const StarSpawner = (entities, {touches, time}) => {
  // petla logiki jest uruchamiana co 16ms... w teorii, w praktyce sa to pobozne zyczenia
  // i odstep czasowy miedzy kolejnymi wywolaniami tej funckji moze wyniesc nawet 100-200ms szczegolnie w emulatorach
  // co skutkowałoby plynnoscią animacji na poziomie 5-10FPS dlatego zamiast bezposrednio kontrolować pozycję obiektow sceny
  // w petli logiki, lepiej jedynie w niej inicjowac i kontrolować przebieg animacji a sama petla animacji jest realizowana
  // wewnętrznie asynchronicznie ze wsparciem sprzętowym => patrz komponenty Animated w renderers.js

  for (var key in entities)
    if (entities[key].type == 's') {
      // tabletki

      let id = entities[key].id;

      if (renderers[id] && renderers[id].isMoving) {
        let x = entities[id].position[0] + 40;
        let y = 684 * renderers[id]._animatedValue + 40;

        if (
          Math.abs(entities[2].position[0] + 64 - x) < 64 &&
          Math.abs(entities[2].position[1] + 204 - y) < 64
        ) {
          if (!entities[id].hover) {
            entities[id].hover = 1;
            entities[id].dead = 2; //Gwiazdka złapana
            score += 100;
          }

          entities[id].hit = 1;
        }

        if (entities[2].shooting) {
          if (
            Math.abs(entities[2].position[0] + 64 - x) < 32 &&
            Math.abs(entities[2].position[1] + 104 - y) < 64
          ) {
            if (!entities[id].hover) {
              entities[id].hover = 1;
              entities[id].dead = 1; //Gwiazda zabita nie da punktów
            }
            entities[id].hit = 1;
          }
        }
      }

      if (renderers[id] && !renderers[id].isMoving) {
        // "uspiony" za krawedzią ekranu
        let d = 20000 * Math.random();
        if (d < 10) {
          // czestotliwosc wypuszczania nowych wirusow = 10/1000 = 0.01 (czyli 1 raz na 100 tikow)
          entities[id].position = [(412 - 80) * Math.random(), 0]; // losowa pozycja x
          entities[id].hit = 0;
          entities[id].hover = 0;
          entities[id].dead = 0;
          renderers[id].play(1000 + 1000 * Math.random()); // losowy czas animacji (przelotu przez cały ekran) 4-8s
        }
      }
    }

  return entities;
};

const MoveFighter = (entities, {touches}) => {
  if (renderers[2] && !renderers[2].isAnimating) renderers[2].play('idle');

  //-- I'm choosing to update the game state (entities) directly for the sake of brevity and simplicity.
  //-- There's nothing stopping you from treating the game state as immutable and returning a copy..
  //-- Example: return { ...entities, t.id: { UPDATED COMPONENTS }};
  //-- That said, it's probably worth considering performance implications in either case.

  touches
    .filter(t => t.type === 'move')
    .forEach(t => {
      let finger = entities[2];

      if (finger && finger.position) {
        finger.position = [
          finger.position[0] + t.delta.pageX,
          finger.position[1] + t.delta.pageY,
        ];
      }
    });
  touches
    .filter(t => t.type === 'start')
    .forEach(t => {
      let fighter = entities[2];

      if (fighter) {
        fighter.shooting = 1;
      }
    });
  touches
    .filter(t => t.type === 'end')
    .forEach(t => {
      let fighter = entities[2];

      if (fighter) {
        fighter.shooting = 0;
      }
    });

  return entities;
};

export {
  MoveFighter,
  VirusSpawner,
  PillSpawner,
  StarSpawner,
};
