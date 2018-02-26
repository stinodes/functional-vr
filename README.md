# Functional VR

A library meant to (eventually) offer a functional API to make interactive and navigatable VR-scenes.

## Getting Started
To get started with development, follow the steps:  

* Clone the repo wherever you like.
* `$ cd` into the repo's directory
* Run `$ yarn` to install dependencies
* Run `$ yarn test` to startup a watching testing process
* Check your [flow-typing](flow) regularly (enable integration with your IDE if possible!)

## Building
Building is done using `webpack`.  
`$ webpack build` will provide you with a built `dist/` folder.

## API
There is no actual API yet. This part will go over potential proposals.  

###  Basic API
#### Creating a World and Scenes

```javascript
    import {world, scene, initialise} from 'fuvr'
        
        
    // Scene rendering a marker at a position
    const initialState = {
      marker: {x: 0, y: 0, z: 0, opacity: 0.5,},
    }
    const MyScene = scene(
        initialState,
        
        (state) => [
            ['marker', {
                enter: state.action('markerEnter'),
                leave: state.action('markerLeave'),
                // shorter: `...state.marker`
                x: state.marker.x,
                y: state.marker.y,
                z: state.marker.z,
                opacity: state.marker.opacity,
            }],
            // Allow navigation to different screens
            ['navigation', {
                to: '/parentscene/chidscene1',
                x: 20,
                y: 0,
                z: 40,
            }]
        ],
        
        (state, action) => {
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
    const ParentScene = scene(
        ['childscene1', scene(/*...*/)],
        ['childscene2', scene(/*...*/)],
    )
        
    const Test = scene(
        /*...*/
    )
        
    // Creating a world
    // Map URLs/Paths to a scene
    const MyWorld = world(
        'My World',
        ['myscene', MyScene],
        ['parentscene', ParentScene],
        ['test', Test],
    )
        
    initialise(MyWorld)
```


[flow]:[https://flow.org/en/docs/]
