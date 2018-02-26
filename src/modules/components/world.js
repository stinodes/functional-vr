// @flow
import type {
  BrowserHistory,
  BrowserLocation,
  Action as BrowserAction
} from 'history/createBrowserHistory'
import type {
  HashHistory,
  HashLocation,
  Action as HashAction
} from 'history/createHashHistory'
import type {
  MemoryHistory,
  MemoryLocation,
  Action as MemoryAction
} from 'history/createMemoryHistory'
import type {ComponentInterface} from './types'

type History = BrowserHistory|HashHistory|MemoryHistory
type Location = BrowserLocation|HashLocation|MemoryLocation
type Action = BrowserAction|HashAction|MemoryAction

type Path = string
type Scene = any
type WorldProperties = {
  history: History,
}
type WorldChild = [Path, Scene|World]
type Route = {
  location: Location,
  action: Action,
}

const routeFromLocationAndAction = (location: Location, action: Action) => ({
  location,
  action,
})

class World implements ComponentInterface {
  __history: History
  __scenes: Map<Path, Scene|World>
  currentRoute: Route
  
  constructor(options: WorldProperties, ...args: WorldChild[]) {
    this.__history = options.history
    this.__scenes = new Map(args)
    this.__history.listen(this.onLocationChange)
  }
  
  onLocationChange = (location: Location, action: Action) => {
    this.currentRoute = routeFromLocationAndAction(location, action)
  }
  
  get currentScene(): Scene|World {
    return this.__scenes.get(this.currentRoute.location.pathname)
  }
  
  __mount() {
  
  }
  __unmount() {
  
  }
  __render() {
    const currentChild = this.currentScene
    
    /*
    doStuff
     */
  }
}

const world = (opts: WorldProperties, ...scenes: WorldChild[]) => {
  return new World(opts, ...scenes)
}

export {world, World}
