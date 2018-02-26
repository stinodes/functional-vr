// @flow
/*
  Any application is centered around a tree, which describes how elements relate to each other,
  and a dictionary/map that houses all elements.
  
  Dictionary holds all elements with all properties
  Tree holds a quick overview of nestability
  
  dict {
    '123123': {
      tag: '123123',
      parent: null,
      attributes: [Object object],
      children: ['12455', '546434'],
      ref: <a-scene></a-scene>,
    },
    '12455': {
      tag: '12455',
      parent: '123123',
      attributes: [Object object],
      children: [],
      ref: <a-entity></a-entity>,
    },
    '546434': {
      tag: '546434',
      parent: '123123',
      attributes: [Object object],
      children: [],
      ref: <a-sky></a-sky>,
    },
  }
  
  tree {
    '123123': {
      '12455': {},
      '546434': {},
    },
  }
  
  Traverse tree -> getByTag( id ) -> logic -> traverse tree -> logic -> ... -> updated elements
 */

export type Tag = string

export type Node = {
  tag: Tag,
  parent: Tag,
  
  element: string,
  attributes: {
    [string]: any
  },
  
  children?: Tag[],
  
  ref: Element,
}
export type TreeNode = {
  [Tag]: TreeNode,
}

export type TagMap = Map<Tag, Node>

export type RenderTree = {
  [Tag]: TreeNode,
}

export interface TreeInterface {
  tree: RenderTree,
  map: TagMap,
  generateTag(): Tag,
  findByTag(tag: Tag): ?Node,
  attach(node: Node, to?: Node|Tag): Tag,
  detach(node: Node): void,
}

export interface ComponentInterface {
  __tag: Tag,
  __mount(tree: TreeInterface): Node, // should attach initially (no tag yet)
  __update(tree: TreeInterface): Node, // later attaches, has tag -> updates existing nodes `attach(element)`
  __unmount(tree: TreeInterface): Node, // detaches, has tag -> removes by tag `detach(element)
  render(): Node,
}
