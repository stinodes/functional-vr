// @flow
import {world, World} from './world'
import type {Node, TreeNode, RenderTree, Tag, TagMap, TreeInterface} from '../tree/types'

const last = (arr: Array<any>) => arr[arr.length-1]

const api = (tree: RenderTree, map: TagMap): TreeInterface => {
  return {
    tree,
    map,
    
    nodePath(tag: Tag) {
      const map = this.map
      let atRoot = !map.get(tag).parent
      const tags = [tag]
      while (!atRoot) {
        let currentEl: Node = map.get(last(tags))
        
        tags.push(currentEl.parent)
        
        if (!currentEl.parent)
          atRoot = true
      }
      return tags.reverse()
    },
    
    attach(element: Node, to?: Node|Tag) {
      if (!element.tag) {
        const parentTag = typeof to === 'object' ? to.tag : to
        return this.__createNode(parentTag, element)
      }
      return this.__updateNode(element.tag, element)
    },
    
    detach(element: Node) {
    
    },
    
    findByTag(tag: Tag) {
    
    },
    
    generateTag: (() => {
      let nextTag = 0
      return () => {
        const tag = `${nextTag}`
        nextTag++
        return tag
      }
    })()
  }
}

const initialise = (parentElement: Element, worldInstance: World) => {
  
  const rootElement = parentElement
  
  return {
  }
}

export {initialise, world, World}
