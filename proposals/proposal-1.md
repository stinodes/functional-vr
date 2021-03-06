
###  Basic API

The library would expose a couple of functions to the developer to get started on creating his world.
These functions, alongside some utilities, can be considered to be **primitives**.

Primitives could be:  

* World
* Scene
* Camera
* Sky
* Entity

The Entities can be configured to have any old functionality, and thus be transformed into different components, 
such as **markers**, **navigations**, ...

##### Exposed Functions:

* **entity**: The most basic of primitives. Maps nearly perfectly to an A-Frame entity.
```javascript
import {entity, Entity} from 'fuvr'
import {box} from 'fuvr/geometry'
import {color} from 'fuvr/material'
  
type MyCustomEntityProps = {
  color: string,
}
  
type Props = {}
type State = {}
  
// Define a new Entity-type that renders an entity with some props
const MyCustomEntity = entity(
  (properties: Props, state: State) => 
    Entity({
        geometry: box({height: 20, width: 50, depth: 20,}),
        material: color('red'),
    })
  )
/*
  This component would render the following a-frame entity:
      <a-entity 
        geometry="primitive: box; height: 20; width: 20; depth: 20;"
        material="color: red;"/>
 */
  
// Provide shorthand?
// The following could output identical elements
// Opt1 - might be confusing?
const MyCustomEntity = entity({
    geometry: box({height: 20, width: 50, depth: 20,}),
    material: color('red'),
})
// Opt1 - more explicit
const MyCustomEntity = Entity.withProps({ /* or entity.withProps({ ... */
    geometry: box({height: 20, width: 50, depth: 20,}),
    material: color('red'),
})
```
* **world**: The entry point of the VR-world/module.
A world maps URLs and paths to Scenes. Worlds can be nested.
```javascript
import {world} from 'fuvr'
  
// Type description for world func
declare type world = (...[Path, Scene|World][]) => World
  
type Path = string
type Scene = any
type World = any
  
const MyWorld = world(
  [Path, Scene],
  [Path, World],
  /* ... */
)
```  

* **scene**: A scene describes a scene. It makes use of a declarative API to render 
components onto itself. It can hold (immutable) state and dispatch actions to make 
changes (à la redux). 
```javascript
import {scene, entity} from 'fuvr'
  
// Type description for scene func
declare type scene<SceneState> = (
  output: (state: SceneState) => Output,
  initialState?: SceneState,
  stateReducer?: (state: SceneState, action: Action) => SceneState
) => Scene
  
type Output = any[]
type State = Object
type Action = {type: string, payload?: any, meta?: any}
type Scene = any
  
const MyScene = scene(
  
  (state) => [
    Entity({
      enter: state.action('enter'),
      leave: state.action('leave'),
    })
  ],
  
  (state = {hovering: true}, action) => {
    switch(action.type) {
      case 'enter':
        return {...state, hovering: true}
      case 'leave':
        return {...state, hovering: false}
      default: return state
    }
  }
)
````

#### Example using proposal

```javascript
    import {world, scene, entity, initialise} from 'fuvr'
    
    const Entity: any = entity()
    const Marker: any = {/*...*/}
    const Navigation: any = {/*...*/}
        
    // Scene rendering a marker at a position
    const initialState = {
      marker: {x: 0, y: 0, z: 0, opacity: 0.5,},
    }
    const MyScene = scene(
        (state) => [
        // Marker that changes opacity when hovered 
        Marker({
            enter: state.action('markerEnter'),
            leave: state.action('markerLeave'),
            // shorter: `...state.marker`
            x: state.marker.x,
            y: state.marker.y,
            z: state.marker.z,
            opacity: state.marker.opacity,
        }),
        // Allow navigation to different screens
        Navigation({
            to: '/nestedworld/chidscene1',
            x: 20,
            y: 0,
            z: 40,
        }),
        Entity({/*...*/}),
        Entity({/*...*/}),
    ],
        
    (state = initialState, action) => {
      switch(action.type) {
        // Set marker opacity to 1 on enter
        case 'markerEnter':
          return {...state, marker: {...state.marker, opacity: 1}}
        // Set marker opacity to 0.5 on leave
        case 'markerLeave':
          return {...state, marker: {...state.marker, opacity: 0.5}}
      }
      // Return default
      return state
    }
    )
        
    // Nest scenes for nested URLs
    // parentscene/childscene1 -> first scene
    // parentscene/childscene2 -> second scene
    const NestedScenes = world(
        ['childscene1', scene(/*...*/)],
        ['childscene2', scene(/*...*/)],
    )
        
    const Test = scene(
        /*...*/
    )
        
    // Creating a world
    // Map URLs/Paths to a scene
    const MyWorld = world(
        ['myscene', MyScene],
        ['nestedworld', NestedScenes],
        ['test', Test],
    )
        
    initialise(MyWorld)
```

### What should render?


