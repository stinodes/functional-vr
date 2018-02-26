// @flow
import type {RenderTree, TagMap, Tag, TreeNode, Node} from '../modules/tree'
import {callMore, fromNullable} from './logic'

type TreeAndMap = {tree: RenderTree, map: TagMap}

/*
 *
 * tree = setChildNode(tag, node, {tree, map})
 *
 */

export const extractBranch = (tag: Tag, node: Node, treeAndMap: TreeAndMap) => {
  const path = nodePath(tag, treeAndMap)
  const oldNode = nodeByPath(path)

  if (fromNullable(oldNode, 'props') === node.props)
    return nodeByPath(path, treeAndMap)

  const treeNode = node.children.reduce(
    (prev, childTag) =>
      ({
        ...prev,
        [childTag]: extractBranch(childTag, treeAndMap.map.get(childTag))
      })
  )
}

export const parseNode = (node: Node, treeAndMap: TreeAndMap) =>
  callMore(
    [treeAndMap.map.set, node.tag, node],
    []
  )

export const nodePath = (tag: Tag, {tree, map}: TreeAndMap) => {
  let atRoot = !map.get(tag).parent
  const tags = [tag]
  while (!atRoot) {
    let currentEl: Node = map.get(last(tags))

    tags.push(currentEl.parent)

    if (!currentEl.parent)
      atRoot = true
  }
  return tags.reverse()
}

export const nodeByPath = (path: Tag[], {tree, map}: TreeAndMap) =>
  path.reduce(
    (prev, tag) => prev[tag],
    tree
  )

export const setChild = (on: Tag, node: Node, {tree, map}: TreeAndMap) =>
  nodeByPath(on, {tree, map})


