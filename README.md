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
    import {world, initialise} from 'fuvr'
        
    // Scene rendering a marker at a position
    
    const MyScene = scene(
        initialState,
        (state) => (
            ['marker', {
                x: state.marker.x,
                y: state.marker.y,
            }],
            
        )
    )
        
    // Nest scenes for nested URLs
    // parentscene/childscene1 -> first scene
    // parentscene/childscene2 -> second scene
    const ParentScene = scene(
        ['childscene1', scene(...)],
        ['childscene2', scene(...)],
    )
        
    const Test = scene(
        ...
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
